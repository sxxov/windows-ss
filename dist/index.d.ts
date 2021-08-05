/// <reference types="node" />
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
export declare class WindowsSS {
    static info(): Promise<DisplayInfo[]>;
    static screenshot(options?: ScreenshotOptions): Promise<Buffer>;
    private static getBufferFromStream;
}
export declare const info: typeof WindowsSS.info, screenshot: typeof WindowsSS.screenshot;
