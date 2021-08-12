import type { PlainRectangle } from './plainRectangle';
export declare type Format = 'bmp' | 'emf' | 'exif' | 'gif' | 'icon' | 'jpg' | 'jpeg' | 'png' | 'tiff' | 'wmf';
export declare type Path = string;
export interface Configuration {
    format?: Format;
    crop?: PlainRectangle;
    bounds?: PlainRectangle;
    save?: Path;
}
