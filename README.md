# windows-ss

Take screenshots quickly on Windows by communicating directly with native API's.

> Did I mention that it's DPI aware too?



## Benchmark

Using [this repo](https://github.com/sxxov/windows-ss-benchmark). The numbers below were taken over 1000 runs, each at 2560x1440[^*], outputing `bmp`.

| Library            | Save to buffer | Save to file |
| ------------------ | -------------- | ------------ |
| windows-ss         | **52ms**       | **51ms**     |
| screenshot-desktop | 152ms          | 141ms        |
| desktop-screenshot | n/a            | 63ms[^**]    |

[^*]: Except for `desktop-screenshot`, it ran at 1706x960 as it's DPI unaware.
[^**]: Times are relative to lower resolution of 1706x960. If interpolated back to 1440p according to a DPI of 1.5, `63 * (1.5 ^ 2) = 141ms`



## Installation

```bash
npm i windows-ss
```

> **IMPORTANT**: You'll need [.NET 4.5](http://www.microsoft.com/en-us/download/details.aspx?id=30653) or [.NET Core](https://www.microsoft.com/net/core) installed, as this library depends on `edge-js`. Refer [here](https://github.com/agracio/edge-js#scripting-clr-from-nodejs) for more info regarding installation.



## Usage

```ts
import { capturePrimaryMonitor } from 'windows-ss';

await capturePrimaryMonitor({    
    // The format of the returned Buffer & saved file.
    format: 'png',
    
    // How much to carve off the edges. (Left, Top, Right, Bottom)
    crop: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    
    // The bounds where the screen will be captured. (Left, Top, Right, Bottom)
    bounds: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    
    // The file the screenshot will be saved to.
    save: './ss.png', 
});
```



## API

### Table of Contents

* [Methods](#methods)
  * <code>[getMonitorInfos](#getMonitorInfos)(): Promise<[MonitorInfo](#monitorinfo)[]></code>
  * <code>[getMonitorInfosSync](#getMonitorInfosSync)(): [MonitorInfo](#monitorinfo)[]</code>
  * <code>[captureMonitorByIndex](#captureMonitorByIndex)(deviceIndex: [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), config?: [Configuration](#configuration)): Promise\<[Buffer](https://nodejs.org/api/buffer.html) | null\></code>
  * <code>[captureMonitorByIndexSync](#captureMonitorByIndexSync)(deviceIndex: [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), config?: [Configuration](#configuration)): [Buffer](https://nodejs.org/api/buffer.html) | null</code>
  * <code>[captureMonitorByName](#captureMonitorByName)(deviceName: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), config?: [Configuration](#configuration)): Promise\<[Buffer](https://nodejs.org/api/buffer.html) | null\></code>
  * <code>[captureMonitorByNameSync](#captureMonitorByNameSync)(deviceName: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), config?: [Configuration](#configuration)): [Buffer](https://nodejs.org/api/buffer.html) | null</code>
  * <code>[captureWindowByTitle](#captureWindowByTitle)(title: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), config?: [Configuration](#configuration)): Promise\<[Buffer](https://nodejs.org/api/buffer.html) | null\></code>
  * <code>[captureWindowByTitleSync](#captureWindowByTitleSync)(title: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), config?: [Configuration](#configuration)): [Buffer](https://nodejs.org/api/buffer.html) | null</code>
  * <code>[captureActiveWindow](#captureActiveWindow)(config?: [Configuration](#configuration)): Promise\<[Buffer](https://nodejs.org/api/buffer.html) | null\></code>
  * <code>[captureActiveWindowSync](#captureActiveWindowSync)(config?: [Configuration](#configuration)): [Buffer](https://nodejs.org/api/buffer.html) | null</code>
* [Interfaces](#interfaces)
  * [`Configuration`](#configuration)
  * [`MonitorInfo`](#monitorinfo)
  * [`PlainRectangle`](#plainrectangle)
* [Errors](#errors)
  * [`NoMatchError`](#NoMatchError)
  * [`InvalidArgumentCountError`](#InvalidArgumentCountError)
  * [`InvalidConfigurationError`](InvalidConfigurationError)



### Methods

#### captureWindowByTitle`getMonitorInfos`

#### `getMonitorInfosSync`

Returns information about the the currently connected monitors.

##### Parameters

* n/a

##### Returns

* <code>Promise\<[MonitorInfo](#monitorinfo)[]\></code>  —— <code>[MonitorInfo](#monitorinfo)[]</code>
  * An array of [`MonitorInfo`](#monitorinfo)s gotten from the current system.

##### Example

```ts
import { getMonitorInfos, getMonitorInfosSync } from 'windows-ss';

await getMonitorInfos();
getMonitorInfosSync();
/*
	// Example output
    [
      {
        monitor: { left: 0, top: 0, right: 2560, bottom: 1440 },
        workArea: { left: 0, top: 0, right: 2560, bottom: 1380 },
        deviceName: '\\\\.\\DISPLAY1'
      },
      {
        monitor: { left: 304, top: -1080, right: 2224, bottom: 0 },
        workArea: { left: 304, top: -1080, right: 2224, bottom: -40 },
        deviceName: '\\\\.\\DISPLAY2'
      }
    ]
*/
```



#### `captureMonitorByIndex`

#### `captureMonitorByIndexSync`

Captures a screenshot of the monitor matching the index.

##### Parameters

* <code>deviceIndex: [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)</code> 
  * Index of monitor according to Windows.
* *(Optional)*  <code>options: [Configuration](#configuration)</code> 
  * Additional options for capturing the screenshot.

##### Returns

* <code>Promise\<[Buffer](https://nodejs.org/api/buffer.html) | null\></code> —— <code>[Buffer](https://nodejs.org/api/buffer.html) | null</code>
  * The binary image data of the screenshot, with the format specified in `options.format`. `null` is returned instead if `save` was passed into the `config` parameter.

##### Throws

* `NoMatchError`
* `InvalidArgumentCountError`
* `InvalidConfigurationError`

##### Example

```ts
import { captureMonitorByIndex, captureMonitorByIndexSync, getMonitorInfos } from 'windows-ss';

const monitorInfos = await getMonitorInfos();

await captureMonitorByIndex(monitorInfos.length - 1);
captureMonitorByIndexSync(0);
```



#### `captureMonitorByName`

#### `captureMonitorByNameSync`

Captures a screenshot of the monitor matching the index.

##### Parameters

* <code>deviceName: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)</code> 
  * Name of monitor according to Windows.
* *(Optional)*  <code>options: [Configuration](#configuration)</code> 
  * Additional options for capturing the screenshot.

##### Returns

* <code>Promise\<[Buffer](https://nodejs.org/api/buffer.html) | null\></code> —— <code>[Buffer](https://nodejs.org/api/buffer.html) | null</code>
  * The binary image data of the screenshot, with the format specified in `options.format`. `null` is returned instead if `save` was passed into the `config` parameter.

##### Throws

* `NoMatchError`
* `InvalidArgumentCountError`
* `InvalidConfigurationError`

##### Example

```ts
import { captureMonitorByName, captureMonitorByNameSync, getMonitorInfos } from 'windows-ss';

const monitorInfos = await getMonitorInfos();

await captureMonitorByName(monitorInfos[0].deviceName);
captureMonitorByNameSync(String.raw`\\.\DISPLAY1`);
```



#### `capturePrimaryMonitor`

#### `capturePrimaryMonitorSync`

Captures a screenshot of the primary monitor.

##### Parameters

* *(Optional)*  <code>options: [Configuration](#configuration)</code> 
  * Additional options for capturing the screenshot.

##### Returns

* <code>Promise\<[Buffer](https://nodejs.org/api/buffer.html) | null\></code> —— <code>[Buffer](https://nodejs.org/api/buffer.html) | null</code>
  * The binary image data of the screenshot, with the format specified in `options.format`. `null` is returned instead if `save` was passed into the `config` parameter.

##### Throws

* `InvalidConfigurationError`

##### Example

```ts
import { capturePrimaryMonitor, capturePrimaryMonitorSync } from 'windows-ss';

await capturePrimaryMonitor();
capturePrimaryMonitorSync();
```



#### `captureWindowByTitle`

#### `captureWindowByTitleSync`

Captures a screenshot of the window matching the title.

##### Parameters

* <code>title: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)</code> 
  * Title of window.
* *(Optional)*  <code>options: [Configuration](#configuration)</code> 
  * Additional options for capturing the screenshot.

##### Returns

* <code>Promise\<[Buffer](https://nodejs.org/api/buffer.html) | null\></code> —— <code>[Buffer](https://nodejs.org/api/buffer.html) | null</code>
  * The binary image data of the screenshot, with the format specified in `options.format`. `null` is returned instead if `save` was passed into the `config` parameter.

##### Throws

* `NoMatchError`
* `InvalidArgumentCountError`
* `InvalidConfigurationError`

##### Example

```ts
import { captureWindowByTitle, captureWindowByTitleSync } from 'windows-ss';

await captureWindowByTitle('Task Manager');
captureWindowByTitleSync('Notepad');
```



#### `captureActiveWindow`

#### `captureActiveWindowSync`

Captures a screenshot of the currently active/focused window.

##### Parameters

* *(Optional)*  <code>options: [Configuration](#configuration)</code> 
  * Additional options for capturing the screenshot.

##### Returns

* <code>Promise\<[Buffer](https://nodejs.org/api/buffer.html) | null\></code> —— <code>[Buffer](https://nodejs.org/api/buffer.html) | null</code>
  * The binary image data of the screenshot, with the format specified in `options.format`. `null` is returned instead if `save` was passed into the `config` parameter.

##### Throws

* `InvalidConfigurationError`

##### Example

```ts
import { captureActiveWindow, captureActiveWindowSync } from 'windows-ss';

await captureActiveWindow();
captureActiveWindowSync();
```



### Interfaces

#### `Configuration`

Contains options that can be provided by the user when taking a screenshot.

##### Properties

*  *(Optional)*  <code>format: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)</code> — The format of the returned buffer & saved file.
   
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
   
* *(Optional)*  <code>crop: [PlainRectangle](#plainrectangle)</code> — How much to carve off the edges.

* *(Optional)*  <code>bounds: [PlainRectangle](#plainrectangle)</code> — The bounds where the screen will be captured.

* *(Optional)* <code>save: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)</code> — The path to where the screenshot will be saved to.

  * > Note: If this property is not provided, the screenshot is simply returned as a [Buffer](https://nodejs.org/api/buffer.html).



#### `MonitorInfo`

Contains a description of a monitor.

##### Properties

* <code>monitor: [PlainRectangle](#plainrectangle)</code> — The resolution of the entire monitor.
* <code>workArea: [PlainRectangle](#plainrectangle)</code> — The resolution of the entire monitor excluding the taskbar.
* <code>deviceName: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)</code> — The device name of the monitor.
* <code>dpiScale: [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)</code> — The DPI scale of the monitor.



#### `PlainRectangle`

Contains properties to form a plain rectangle.

##### Properties

* <code>left: [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)</code> — The left edge of the rectangle.

  * > **IMPORTANT**: This must be of `int` type, meaning no decimals. Else, it will fail applying configuration.

* <code>top: [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)</code> — The top edge of the rectangle.

  * > **IMPORTANT**: This must be of `int` type, meaning no decimals. Else, it will fail applying configuration.

* <code>right: [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)</code> — The right edge of the rectangle.

  * > **IMPORTANT**: This must be of `int` type, meaning no decimals. Else, it will fail applying configuration.

* <code>bottom: [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)</code> — The bottom edge of the rectangle.

  * > **IMPORTANT**: This must be of `int` type, meaning no decimals. Else, it will fail applying configuration.



### Errors

#### `NoMatchError`

Thrown when no match can be found with the provided arguments.

##### Extends

* [`CSArgumentError`](#csargumenterror)

##### Properties

* *(Inherited)* <code>paramName: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)</code>
* *(Inherited)* <code>name: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)</code>
* *(Inherited)* <code>stack: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)</code>
* *(Inherited)* <code>raw: CSException</code>



#### `InvalidArgumentCountError`

Thrown when an invalid amount of arguments were provided.

##### Extends

* [`CSArgumentError`](#csargumenterror)

##### Properties

* *(Inherited)* <code>paramName: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)</code>
* *(Inherited)* <code>name: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)</code>
* *(Inherited)* <code>stack: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)</code>
* *(Inherited)* <code>raw: CSException</code>



#### `InvalidConfigurationError`

Thrown when an invalid [`Configuration`](#configuration) object was provided.

##### Extends

* [`CSArgumentError`](#csargumenterror)

##### Properties

* *(Inherited)* <code>paramName: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)</code>
* *(Inherited)* <code>name: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)</code>
* *(Inherited)* <code>stack: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)</code>
* *(Inherited)* <code>raw: CSException</code>



#### *(Internal)* `CSArgumentError`

Based on C#'s `ArgumentException`.

##### Extends

* [`CSError`](#cserror)

##### Properties

* <code>paramName: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)</code>
* *(Inherited)* <code>name: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)</code>
* *(Inherited)* <code>stack: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)</code>
* *(Inherited)* <code>raw: CSException</code>



#### *(Internal)* `CSError`

Based on C#'s `SystemException`.

##### Extends

* `ClientError`
  * An internal wrapper for [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

##### Properties

* *(Inherited)* <code>paramName: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)</code>
* *(Inherited)* <code>name: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)</code>
* *(Inherited)* <code>stack: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)</code>
* *(Inherited)* <code>raw: CSException</code>
  * The `InnerException` property of the raw [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) object thrown by `edge-js`



## Contributing

All contributions are welcome. File an [issue](https://github.com/sxxov/windows-ss/issues) if you find something wrong, & a [pull request](https://github.com/sxxov/windows-ss/pulls) if you can fix it.



## License

[MIT](https://opensource.org/licenses/MIT).

