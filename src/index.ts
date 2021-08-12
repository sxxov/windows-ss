import { keys } from 'ts-transformer-keys';
import { EdgeManager } from './core/edge/manager';
import type { Configuration } from './core/items/configuration';
import type { MonitorInfo } from './core/items/monitorInfo';
import type { CSAggregateException } from './resources/errors/ss/cs.error';
import { CSErrorFactory } from './resources/errors/ss/cs.error.factory';

const edge = EdgeManager.getEdgeInstance();

type Unpromisify<T extends (...args: any[]) => any> = (...args: Parameters<T>) => ReturnType<T> extends PromiseLike<infer U> ? U : ReturnType<T>;
type UnpromisifyWindowsSS<T extends keyof WindowsSS> = Unpromisify<WindowsSS[T]>;

const WindowsSSMethodNames = keys<WindowsSS>();
export class WindowsSS {
	constructor() {
		WindowsSSMethodNames.forEach((methodName) => {
			const isSyncVariant = methodName.endsWith('Sync');
			const baseMethodName = isSyncVariant ? methodName.replace(/Sync$/, '') : methodName;
			const impl = edge.func({
				assemblyFile: 'SS',
				typeName: 'SS.Bridge',
				methodName: `Invoke${baseMethodName[0].toUpperCase()}${baseMethodName.substr(1)}`,
			});
			const csErrorFactory = new CSErrorFactory();

			if (isSyncVariant) {
				// @ts-expect-error
				this[methodName] = (...args) => {
					try {
						return impl([...args], true);
					} catch (err: unknown) {
						if (err instanceof Error) {
							throw csErrorFactory.create(err as CSAggregateException);
						}

						throw err;
					}
				};
			} else {
				// @ts-expect-error
				this[methodName] = async (...args) => new Promise<unknown>((resolve, reject) => {
					impl([...args], (err, res) => {
						if (err) {
							reject(csErrorFactory.create(err as CSAggregateException));

							return;
						}

						resolve(res);
					});
				});
			}
		});
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
} = new WindowsSS();
