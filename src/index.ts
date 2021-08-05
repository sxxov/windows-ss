import childProcess from 'child_process';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import * as pathTool from 'path';
import coreLib from './lib/core.ps1';
import infoLib from './lib/info.ps1';

const absoluteCoreLib = pathTool.join(fileURLToPath(import.meta.url), coreLib);
const absoluteInfoLib = pathTool.join(fileURLToPath(import.meta.url), infoLib);

// TODO: Add tests

export interface DisplayInfo {
	/**
	 * @description The `DeviceName` property of a display.
	 */
	id: string;
	/**
	 * @description The friendly name of a display (Currently just an alias for `DeviceName`).
	 */
	name: string;
	/**
	 * @description The left edge of the bounding box of a display.
	 */
	left: number;
	/**
	 * @description The top edge of the bounding box of a display.
	 */
	top: number;
	/**
	 * @description The right edge of the bounding box of a display.
	 */
	right: number;
	/**
	 * @description The bottom edge of the bounding box of a display.
	 */
	bottom: number;
	/**
	 * @description The DPI multiplier of a display.
	 */
	dpiScale: number;
}

export interface ScreenshotOptions {
	/**
	 * @description The ID of the display to take a screenshot of. Probably retrieved by using `await `[`info()`](#info)`[0].id`
	 * @Default The id of the first monitor in the result of `await `[`info()`](#info).
	 */
	displayId?: string;
	/**
	 * @description The format of the returned buffer & saved file.
	 * @Default `'png'`
	 */
	format?: 'png' | 'jpg' | 'jpeg' | 'bmp' | 'emf' | 'exif' | 'gif' | 'icon' | 'tiff' | 'wmf';
	/**
	 * @description How much to carve off the edges.
	 * @Note These numbers should be whole numbers (integers).
	 */
	crop?: [left: number, top: number, right: number, bottom: number];
	/**
	 * @description The bounds where the screen will be captured.
	 * @Note These numbers should be whole numbers (integers).
	 */
	bounds?: [left: number, top: number, right: number, bottom: number];
	/**
	 * @description The path to where the screenshot will be saved to.
	 * @Note If this property is not provided, the screenshot is not saved.
	 */
	save?: string;
}

export class WindowsSS {
	public static async info() {
		const child = childProcess.spawn(
			'powershell',
			[absoluteInfoLib],
		);

		return JSON.parse(
			(
				await WindowsSS.getBufferFromStream(child.stdout)
			)
				.toString('utf8'),
		) as DisplayInfo[];
	}

	public static async screenshot(options: ScreenshotOptions = {}) {
		if (!options.displayId) {
			options.displayId = (await WindowsSS.info())[0].id;
		}

		if (options.save
			&& !options.format) {
			// @ts-expect-error
			options.format = options.save.substr(options.save.lastIndexOf('.') + 1);
		}

		const child = childProcess.spawn(
			'powershell',
			[
				absoluteCoreLib,
				['--DeviceName', options.displayId],
				options.format ? 	['--Format', options.format] : [],
				options.crop ? 		['--Crop', options.crop.join(',')] : [],
				options.bounds ? 	['--Bounds', options.bounds.join(',')] : [],
			].flat(),
		);

		const buffer = await WindowsSS.getBufferFromStream(child.stdout);

		if (options.save) {
			await fs.writeFile(options.save, buffer, { encoding: 'binary' });
		}

		return buffer;
	}

	private static async getBufferFromStream(stream: NodeJS.ReadableStream) {
		return new Promise<Buffer>((resolve, reject) => {
			const buffers: Buffer[] = [];

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

export const {
	info,
	screenshot,
} = WindowsSS;

