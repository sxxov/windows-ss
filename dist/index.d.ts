/// <reference types="node" />
import type { Configuration } from './core/items/configuration';
import type { MonitorInfo } from './core/items/monitorInfo';
declare type Unpromisify<T extends (...args: any[]) => any> = (...args: Parameters<T>) => ReturnType<T> extends PromiseLike<infer U> ? U : ReturnType<T>;
declare type UnpromisifyWindowsSS<T extends keyof WindowsSS> = Unpromisify<WindowsSS[T]>;
export declare class WindowsSS {
    constructor();
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
export declare const captureMonitorByIndex: (deviceIndex: number, config?: Configuration | undefined) => Promise<Buffer | null>, captureMonitorByIndexSync: UnpromisifyWindowsSS<"captureMonitorByIndex">, captureMonitorByName: (deviceName: string, config?: Configuration | undefined) => Promise<Buffer | null>, captureMonitorByNameSync: UnpromisifyWindowsSS<"captureMonitorByName">, capturePrimaryMonitor: (config: Configuration) => Promise<Buffer | null>, capturePrimaryMonitorSync: UnpromisifyWindowsSS<"capturePrimaryMonitor">, captureWindowByTitle: (title: string, config?: Configuration | undefined) => Promise<Buffer | null>, captureWindowByTitleSync: UnpromisifyWindowsSS<"captureWindowByTitle">, captureActiveWindow: (config?: Configuration | undefined) => Promise<Buffer | null>, captureActiveWindowSync: UnpromisifyWindowsSS<"captureActiveWindow">, getMonitorInfos: () => Promise<MonitorInfo[]>, getMonitorInfosSync: UnpromisifyWindowsSS<"getMonitorInfos">;
export {};
