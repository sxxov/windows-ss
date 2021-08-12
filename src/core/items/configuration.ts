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

/**
 * Contains options that can be provided by the user when taking a screenshot.
 */
export interface Configuration {
	/**
	 * The format of the returned buffer & saved file.
	 */
	format?: Format;
	/**
	 * How much to carve off the edges.
	 */
	crop?: PlainRectangle;
	/**
	 * The bounds where the screen will be captured.
	 */
	bounds?: PlainRectangle;
	/**
	 * The path to where the screenshot will be saved to.
	 * @note If this property is not provided, the screenshot is simply returned as a Buffer.
	 */
	save?: Path;
}
