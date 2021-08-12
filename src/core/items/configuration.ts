import type { PlainRectangle } from './plainRectangle';

export type Format =
	| 'bmp'
	| 'emf'
	| 'exif'
	| 'gif'
	| 'icon'
	| 'jpg'
	| 'jpeg'
	| 'png'
	| 'tiff'
	| 'wmf';

export type Path = string;

export interface Configuration {
	format?: Format;
	crop?: PlainRectangle;
	bounds?: PlainRectangle;
	save?: Path;
}
