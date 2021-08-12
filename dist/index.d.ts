/// <reference types="node" />
import type { Configuration } from './core/items/configuration';
import type { MonitorInfo } from './core/items/monitorInfo';
declare type Unpromisify<T extends (...args: any[]) => any> = (...args: Parameters<T>) => ReturnType<T> extends PromiseLike<infer U> ? U : T;
declare type UnpromisifyWindowsSS<T extends keyof WindowsSS> = Unpromisify<WindowsSS[T]>;
export declare class WindowsSS {
}
export declare const WindowsSSMethodNames: (keyof WindowsSS)[];
export declare class WindowsSSFactory {
    create(): WindowsSS;
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
export declare const captureMonitorByIndex: (deviceIndex: number, config?: Configuration | undefined) => Promise<Buffer | null>, captureMonitorByIndexSync: UnpromisifyWindowsSS<"captureMonitorByIndex">, captureMonitorByName: (deviceName: string, config?: Configuration | undefined) => Promise<Buffer | null>, captureMonitorByNameSync: UnpromisifyWindowsSS<"captureMonitorByName">, capturePrimaryMonitor: (config: Configuration) => Promise<Buffer | null>, capturePrimaryMonitorSync: UnpromisifyWindowsSS<"capturePrimaryMonitor">, captureWindowByTitle: (title: string, config?: Configuration | undefined) => Promise<Buffer | null>, captureWindowByTitleSync: UnpromisifyWindowsSS<"captureWindowByTitle">, captureActiveWindow: (config?: Configuration | undefined) => Promise<Buffer | null>, captureActiveWindowSync: UnpromisifyWindowsSS<"captureActiveWindow">, getMonitorInfos: () => MonitorInfo[], getMonitorInfosSync: UnpromisifyWindowsSS<"getMonitorInfos">;
export {};
