import { keys } from 'ts-transformer-keys';
import { EdgeManager } from './core/edge/manager';
import type { Configuration } from './core/items/configuration';
import type { MonitorInfo } from './core/items/monitorInfo';

const edge = EdgeManager.getEdgeInstance();

type Unpromisify<T extends (...args: any[]) => any> = (...args: Parameters<T>) => ReturnType<T> extends PromiseLike<infer U> ? U : T;
type UnpromisifyWindowsSS<T extends keyof WindowsSS> = Unpromisify<WindowsSS[T]>;

export class WindowsSS {}

export const WindowsSSMethodNames = keys<WindowsSS>();

export class WindowsSSFactory {
	public create() {
		const instance = new WindowsSS();

		WindowsSSMethodNames.forEach((methodName) => {
			const isSyncVariant = methodName.endsWith('Sync');
			const baseMethodName = isSyncVariant ? methodName.replace(/Sync$/, '') : methodName;
			const impl = edge.func({
				assemblyFile: 'SS',
				typeName: 'SS.Bridge',
				methodName: `Invoke${baseMethodName[0].toUpperCase()}${baseMethodName.substr(1)}`,
			});

			if (isSyncVariant) {
				// @ts-expect-error
				instance[methodName] = (...args) => impl([...args], true);
			} else {
				// @ts-expect-error
				instance[methodName] = async (...args) => new Promise<unknown>((resolve, reject) => {
					impl([...args], (err, res) => {
						if (err) {
							reject(err);

							return;
						}

						resolve(res);
					});
				});
			}
		});

		return instance;
	}
}

export interface WindowsSS {
	captureMonitorByIndex(deviceIndex: number, config?: Configuration): Promise<Buffer | null>;
	captureMonitorByIndexSync: UnpromisifyWindowsSS<'captureMonitorByIndex'>;
	captureMonitorByName(deviceName: string, config?: Configuration): Promise<Buffer | null>;
	captureMonitorByNameSync: UnpromisifyWindowsSS<'captureMonitorByName'>;
	capturePrimaryMonitor(config: Configuration): Promise<Buffer | null>;
	capturePrimaryMonitorSync: UnpromisifyWindowsSS<'capturePrimaryMonitor'>;
	captureWindowByTitle(title: string, config?: Configuration): Promise<Buffer | null>;
	captureWindowByTitleSync: UnpromisifyWindowsSS<'captureWindowByTitle'>;
	captureActiveWindow(config?: Configuration): Promise<Buffer | null>;
	captureActiveWindowSync: UnpromisifyWindowsSS<'captureActiveWindow'>;
	getMonitorInfos(): MonitorInfo[];
	getMonitorInfosSync: UnpromisifyWindowsSS<'getMonitorInfos'>;
}

export const {
	captureMonitorByIndex,
	captureMonitorByIndexSync,
	captureMonitorByName,
	captureMonitorByNameSync,
	capturePrimaryMonitor,
	capturePrimaryMonitorSync,
	captureWindowByTitle,
	captureWindowByTitleSync,
	captureActiveWindow,
	captureActiveWindowSync,
	getMonitorInfos,
	getMonitorInfosSync,
} = new WindowsSSFactory().create();
