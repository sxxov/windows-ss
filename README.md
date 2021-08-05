# windows-ss

Take screenshots quickly (15-20ms) on Windows.



## Installation

`npm i windows-ss`



## Usage

```ts
import { screenshot, info } from 'windows-ss';

await screenshot({
    // The ID of the display to take a screenshot of. (The first display in this case)
    displayId: (await info())[0].id,
    
    // The format of the returned buffer & saved file.
    format: 'png',
    
    // How much to carve off the edges. (Left, Top, Right, Bottom)
    crop: [0, 0, 0, 0],
    
    // The bounds where the screen will be captured. (Left, Top, Right, Bottom)
    bounds: [0, 0, 1920, 1080],
    
    // The file the screenshot will be saved to.
    save: './ss.png', 
});
```



## API

### Methods

#### `screenshot(options?: `[`ScreenshotOptions`](#screenshotoptions)`): Promise<`[`Buffer`](https://nodejs.org/api/buffer.html)`>`

Takes a screenshot.

##### Parameters

* *(Optional)*  `options: `[`ScreenshotOptions`](#screenshotoptions) — Options for the screenshot. Valid properties can be found at the [`ScreenshotOptions`](#screenshotoptions) section.

##### Returned

* `Promise<`[`Buffer`](https://nodejs.org/api/buffer.html)`>`: The binary image data of the screenshot, with the format specified in `options.format`.

##### Example

The below example shows how to output the taken screenshot as a base64 string & save it into a text file named `ss.txt`.

```ts
import { screenshot } from 'windows-ss';
import { promises as fs } from 'fs';

const buffer = await screenshot();
await fs.writeFile('./ss.txt', buffer.toString('base64'));
```



#### `info(): Promise<`[`DisplayInfo`](#displayinfo)`[]>`

Returns information about the the current displays.

##### Parameters

* n/a

##### Returned

* `Promise<`[`DisplayInfo`](#displayinfo)`[]>`: An array of [`DisplayInfo`](#displayinfo)s gotten from the current system.

##### Example

The below example shows how to get the DPI scale of the secondary monitor & print it to the console.

```ts
import { info } from 'windows-ss';

console.log(
    (
        await info()
    )[1] // [1] is the 2nd monitor
    	.dpiScale
);
```



### Interfaces

#### `ScreenshotOptions`

Contains options that can be provided by the user when taking a screenshot.

##### Properties

*  *(Optional)*  `displayId: `[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) — The ID of the display to take a screenshot of. Probably retrieved by using `await `[`info()`](#info)`[0].id`.
   
   *  **Default** — The id of the first monitor in the result of `await `[`info()`](#info).
   
*  *(Optional)*  `format: `[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) — The format of the returned buffer & saved file.
   
   *  **Default** — `'png'`
   *  **Valid Values**
      *  `'png'`
      *  `'jpg' `
      *  `'jpeg'`
      *  `'bmp' `
      *  `'emf' `
      *  `'exif'`
      *  `'gif'`
      *  `'icon'`
      *  `'tiff'`
      *  `'wmf'`
   
* *(Optional)*  `crop: [left: `[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)`, top: `[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)`, right: `[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)`, bottom: `[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)`]` — How much to carve off the edges.

  *  > Note: These numbers should be whole numbers (integers).

* *(Optional)*  `bounds: [left: `[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)`, top: `[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)`, right: `[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)`, bottom: `[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)`]` — The bounds where the screen will be captured.

  * > Note: These numbers should be whole numbers (integers).

* *(Optional)* `save: `[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) — The path to where the screenshot will be saved to.

  * > Note: If this property is not provided, the screenshot is not saved.



#### `DisplayInfo`

Contains information about a display.

##### Properties

* `id: `[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) — The `DeviceName` property of a display.

* `name: `[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) — The friendly name of a display (Currently just an alias for `DeviceName`).

* `left: `[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) — The left edge of the bounding box of a display.

* `top: `[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) — The top edge of the bounding box of a display.

* `right: `[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) — The right edge of the bounding box of a display.

* `bottom: `[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) — The bottom edge of the bounding box of a display.

* `dpiScale: `[`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) — The DPI multiplier of a display.



## Contributing

All contributions are welcome. File an [issue](https://github.com/sxxov/windows-ss/issues) if you find something wrong, & a [pull request](https://github.com/sxxov/windows-ss/pulls) if you can fix it.



## License

[MIT](https://opensource.org/licenses/MIT).

