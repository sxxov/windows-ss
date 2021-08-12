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
	/**
	 * Captures a screenshot of the monitor matching the device index.
	 * @param deviceIndex Index of monitor according to Windows.
	 * @param config Additional options for capturing the screenshot.
	 * @returns The binary image data of the screenshot, with the format specified in `options.format`. `null` is returned instead if `save` was passed into the `config` parameter.
	 * @throws `NoMatchError`
	 * @throws `InvalidArgumentCountError`
	 * @throws `InvalidConfigurationError`
	 */
	captureMonitorByIndex(deviceIndex: number, config?: Configuration): Promise<Buffer | null>;
	/**
	 * Captures a screenshot of the monitor matching the device index.
	 * @param deviceIndex Index of monitor according to Windows.
	 * @param config Additional options for capturing the screenshot.
	 * @returns The binary image data of the screenshot, with the format specified in `options.format`. `null` is returned instead if `save` was passed into the `config` parameter.
	 * @throws `NoMatchError`
	 * @throws `InvalidArgumentCountError`
	 * @throws `InvalidConfigurationError`
	 */
	captureMonitorByIndexSync: UnpromisifyWindowsSS<'captureMonitorByIndex'>;
	/**
	 * Captures a screenshot of the monitor matching the device name.
	 * @param deviceName Name of monitor according to Windows.
	 * @param config Additional options for capturing the screenshot.
	 * @returns The binary image data of the screenshot, with the format specified in `options.format`. `null` is returned instead if `save` was passed into the `config` parameter.
	 * @throws `NoMatchError`
	 * @throws `InvalidArgumentCountError`
	 * @throws `InvalidConfigurationError`
	 */
	captureMonitorByName(deviceName: string, config?: Configuration): Promise<Buffer | null>;
	/**
	 * Captures a screenshot of the monitor matching the device name.
	 * @param deviceName Name of monitor according to Windows.
	 * @param config Additional options for capturing the screenshot.
	 * @returns The binary image data of the screenshot, with the format specified in `options.format`. `null` is returned instead if `save` was passed into the `config` parameter.
	 * @throws `NoMatchError`
	 * @throws `InvalidArgumentCountError`
	 * @throws `InvalidConfigurationError`
	 */
	captureMonitorByNameSync: UnpromisifyWindowsSS<'captureMonitorByName'>;
	/**
	 * Captures a screenshot of the primary monitor.
	 * @param config Additional options for capturing the screenshot.
	 * @returns The binary image data of the screenshot, with the format specified in `options.format`. `null` is returned instead if `save` was passed into the `config` parameter.
	 * @throws `InvalidConfigurationError`
	 */
	capturePrimaryMonitor(config: Configuration): Promise<Buffer | null>;
	/**
	 * Captures a screenshot of the primary monitor.
	 * @param config Additional options for capturing the screenshot.
	 * @returns The binary image data of the screenshot, with the format specified in `options.format`. `null` is returned instead if `save` was passed into the `config` parameter.
	 * @throws `InvalidConfigurationError`
	 */
	capturePrimaryMonitorSync: UnpromisifyWindowsSS<'capturePrimaryMonitor'>;
	/**
	 * Captures a screenshot of the window matching the title.
	 * @param title Title of window.
	 * @param config Additional options for capturing the screenshot.
	 * @returns The binary image data of the screenshot, with the format specified in `options.format`. `null` is returned instead if `save` was passed into the `config` parameter.
	 * @throws `InvalidConfigurationError`
	 */
	captureWindowByTitle(title: string, config?: Configuration): Promise<Buffer | null>;
	/**
	 * Captures a screenshot of the window matching the title.
	 * @param title Title of window.
	 * @param config Additional options for capturing the screenshot.
	 * @returns The binary image data of the screenshot, with the format specified in `options.format`. `null` is returned instead if `save` was passed into the `config` parameter.
	 * @throws `InvalidConfigurationError`
	 */
	captureWindowByTitleSync: UnpromisifyWindowsSS<'captureWindowByTitle'>;
	/**
	 * Captures a screenshot of the currently active/focused window.
	 * @param config Additional options for capturing the screenshot.
	 * @returns The binary image data of the screenshot, with the format specified in `options.format`. `null` is returned instead if `save` was passed into the `config` parameter.
	 * @throws `InvalidConfigurationError`
	 */
	captureActiveWindow(config?: Configuration): Promise<Buffer | null>;
	/**
	 * Captures a screenshot of the currently active/focused window.
	 * @param config Additional options for capturing the screenshot.
	 * @returns The binary image data of the screenshot, with the format specified in `options.format`. `null` is returned instead if `save` was passed into the `config` parameter.
	 * @throws `InvalidConfigurationError`
	 */
	captureActiveWindowSync: UnpromisifyWindowsSS<'captureActiveWindow'>;
	/**
	 * Returns information about the the currently connected monitors.
	 * @returns An array of [`MonitorInfo`](#monitorinfo)s gotten from the current system.
	 */
	getMonitorInfos(): Promise<MonitorInfo[]>;
	/**
	 * Returns information about the the currently connected monitors.
	 * @returns An array of [`MonitorInfo`](#monitorinfo)s gotten from the current system.
	 */
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
