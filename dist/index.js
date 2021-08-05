import childProcess from 'child_process';
import { promises } from 'fs';
import { fileURLToPath } from 'url';
import * as pathTool from 'path';

var coreLib = 'lib/core.ps1';

var infoLib = 'lib/info.ps1';

const absoluteCoreLib = pathTool.join(fileURLToPath(import.meta.url), coreLib);
const absoluteInfoLib = pathTool.join(fileURLToPath(import.meta.url), infoLib);
class WindowsSS {
    static async info() {
        const child = childProcess.spawn('powershell', [absoluteInfoLib]);
        return JSON.parse((await WindowsSS.getBufferFromStream(child.stdout))
            .toString('utf8'));
    }
    static async screenshot(options = {}) {
        if (!options.displayId) {
            options.displayId = (await WindowsSS.info())[0].id;
        }
        if (options.save
            && !options.format) {
            // @ts-expect-error
            options.format = options.save.substr(options.save.lastIndexOf('.') + 1);
        }
        const child = childProcess.spawn('powershell', [
            absoluteCoreLib,
            ['--DeviceName', options.displayId],
            options.format ? ['--Format', options.format] : [],
            options.crop ? ['--Crop', options.crop.join(',')] : [],
            options.bounds ? ['--Bounds', options.bounds.join(',')] : [],
        ].flat());
        const buffer = await WindowsSS.getBufferFromStream(child.stdout);
        if (options.save) {
            await promises.writeFile(options.save, buffer, { encoding: 'binary' });
        }
        return buffer;
    }
    static async getBufferFromStream(stream) {
        return new Promise((resolve, reject) => {
            const buffers = [];
            stream.on('data', (chunk) => {
                buffers.push(chunk);
            });
            stream.on('end', () => {
                resolve(Buffer.concat(buffers));
            });
            stream.on('error', (error) => {
                reject(error);
            });
        });
    }
}
const { info, screenshot, } = WindowsSS;

export { WindowsSS, info, screenshot };
