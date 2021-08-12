'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var url = require('url');
var pathTool = require('path');
var require$$0 = require('fs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () {
                        return e[k];
                    }
                });
            }
        });
    }
    n['default'] = e;
    return Object.freeze(n);
}

var pathTool__namespace = /*#__PURE__*/_interopNamespace(pathTool);
var pathTool__default = /*#__PURE__*/_interopDefaultLegacy(pathTool);
var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);

if (globalThis.__dirname == null
    && globalThis.__filename == null) {
    Object.defineProperties(globalThis, {
        __filename: {
            get: () => url.fileURLToPath((typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('index.js', document.baseURI).href))),
            enumerable: true,
        },
        __dirname: {
            get: () => pathTool__namespace.dirname(url.fileURLToPath((typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('index.js', document.baseURI).href)))),
            enumerable: true,
        },
    });
}

process.env.EDGE_USE_CORECLR = '1';
process.env.EDGE_APP_ROOT = `${__dirname}/lib/SS/bin/Release/net5.0`;

var edge$2 = {};

var fs = require$$0__default['default']
    , path = pathTool__default['default']
    , builtEdge = path.resolve(__dirname, '../build/Release/' + (process.env.EDGE_USE_CORECLR || !fs.existsSync(path.resolve(__dirname, '../build/Release/edge_nativeclr.node')) ? 'edge_coreclr.node' : 'edge_nativeclr.node'))
    , edge$1;

var versionMap = [
    [ /^12\./, '12.13.0' ],
    [ /^14\./, '14.17.4' ],
    [ /^16\./, '16.6.0' ],
];

function determineVersion() {
    for (var i in versionMap) {
        if (process.versions.node.match(versionMap[i][0])) {
            return versionMap[i][1];
        }
    }

    throw new Error('The edge module has not been pre-compiled for node.js version ' + process.version +
        '. You must build a custom version of edge.node. Please refer to https://github.com/agracio/edge-js ' +
        'for building instructions.');
}
var edgeNative;
if (process.env.EDGE_NATIVE) {
    edgeNative = process.env.EDGE_NATIVE;
}
else if (fs.existsSync(builtEdge)) {
    edgeNative = builtEdge;
}
else if (process.platform === 'win32') {
    edgeNative = path.resolve(__dirname, './native/' + process.platform + '/' + process.arch + '/' + determineVersion() + '/' + (process.env.EDGE_USE_CORECLR ? 'edge_coreclr' : 'edge_nativeclr'));
}
else {
    throw new Error('The edge native module is not available at ' + builtEdge 
        + '. You can use EDGE_NATIVE environment variable to provide alternate location of edge.node. '
        + 'If you need to build edge.node, follow build instructions for your platform at https://github.com/agracio/edge-js');
}
if (process.env.EDGE_DEBUG) {
    console.log('Load edge native library from: ' + edgeNative);
}
if (edgeNative.match(/edge_coreclr\.node$/i)) {
    // Propagate the choice between desktop and coreclr to edge-cs; this is used in deciding
    // how to compile literal C# at https://github.com/tjanczuk/edge-cs/blob/master/lib/edge-cs.js
    process.env.EDGE_USE_CORECLR = 1;
}
if (process.env.EDGE_USE_CORECLR && !process.env.EDGE_BOOTSTRAP_DIR && fs.existsSync(path.join(__dirname, 'bootstrap', 'bin', 'Release', 'netcoreapp1.1', 'bootstrap.dll'))) {
    process.env.EDGE_BOOTSTRAP_DIR = path.join(__dirname, 'bootstrap', 'bin', 'Release', 'netcoreapp1.1');
}

process.env.EDGE_NATIVE = edgeNative;

edge$1 = require(edgeNative);

edge$2.func = function(language, options) {
    if (!options) {
        options = language;
        language = 'cs';
    }

    if (typeof options === 'string') {
        if (options.match(/\.dll$/i)) {
            options = { assemblyFile: options };
        }
        else {
            options = { source: options };
        }
    }
    else if (typeof options === 'function') {
        var originalPrepareStackTrace = Error.prepareStackTrace;
        var stack;
        try {
            Error.prepareStackTrace = function(error, stack) {
                return stack;
            };
            stack = new Error().stack;
        }
        finally
        {
            Error.prepareStackTrace = originalPrepareStackTrace;
        }
        
        options = { source: options, jsFileName: stack[1].getFileName(), jsLineNumber: stack[1].getLineNumber() };
    }
    else if (typeof options !== 'object') {
        throw new Error('Specify the source code as string or provide an options object.');
    }

    if (typeof language !== 'string') {
        throw new Error('The first argument must be a string identifying the language compiler to use.');
    }
    else if (!options.assemblyFile) {
        var compilerName = 'edge-' + language.toLowerCase();
        var compiler;
        try {
            compiler = require(compilerName);
        }
        catch (e) {
            throw new Error("Unsupported language '" + language + "'. To compile script in language '" + language +
                "' an npm module '" + compilerName + "' must be installed.");
        }

        try {
            options.compiler = compiler.getCompiler();
        }
        catch (e) {
            throw new Error("The '" + compilerName + "' module required to compile the '" + language + "' language " +
                "does not contain getCompiler() function.");
        }

        if (typeof options.compiler !== 'string') {
            throw new Error("The '" + compilerName + "' module required to compile the '" + language + "' language " +
                "did not specify correct compiler package name or assembly.");
        }

        if (process.env.EDGE_USE_CORECLR) {
            var defaultManifest = path.join(__dirname, 'bootstrap', 'bin', 'Release', 'netcoreapp1.1', 'bootstrap.deps.json');
            var compilerManifest;
            if(compiler.getBootstrapDependencyManifest){
                compilerManifest = compiler.getBootstrapDependencyManifest();
            }
            options.bootstrapDependencyManifest =
                compilerManifest && fs.existsSync(compilerManifest)
                ? compilerManifest
                : defaultManifest;
        }
    }

    if (!options.assemblyFile && !options.source) {
        throw new Error('Provide DLL or source file name or .NET script literal as a string parmeter, or specify an options object '+
            'with assemblyFile or source string property.');
    }
    else if (options.assemblyFile && options.source) {
        throw new Error('Provide either an asseblyFile or source property, but not both.');
    }

    if (typeof options.source === 'function') {
        var match = options.source.toString().match(/[^]*\/\*([^]*)\*\/\s*\}$/);
        if (match) {
            options.source = match[1];
        }
        else {
            throw new Error('If .NET source is provided as JavaScript function, function body must be a /* ... */ comment.');
        }
    }

    if (options.references !== undefined) {
        if (!Array.isArray(options.references)) {
            throw new Error('The references property must be an array of strings.');
        }

        options.references.forEach(function (ref) {
            if (typeof ref !== 'string') {
                throw new Error('The references property must be an array of strings.');
            }
        });
    }

    if (options.assemblyFile) {
        if (!options.typeName) {
            var matched = options.assemblyFile.match(/([^\\\/]+)\.dll$/i);
            if (!matched) {
                throw new Error('Unable to determine the namespace name based on assembly file name. ' +
                    'Specify typeName parameter as a namespace qualified CLR type name of the application class.');
            }

            options.typeName = matched[1] + '.Startup';
        }
    }
    else if (!options.typeName) {
        options.typeName = "Startup";
    }

    if (!options.methodName) {
        options.methodName = 'Invoke';
    }

    return edge$1.initializeClrFunc(options);
};

edge$2.func({
    assemblyFile: 'SS',
    typeName: 'SS.Bridge',
    methodName: 'InvokeLoad',
})([{
        currentWorkingDirectory: process.cwd(),
    }], true);

class EdgeManager {
    static getEdgeInstance() {
        return edge$2;
    }
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

// stolen wholesale from https://stackoverflow.com/a/61863345
function unenumerable(target, name, desc) {
    if (desc) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        desc.enumerable = false;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return desc;
    }
    Object.defineProperty(target, name, {
        set(value) {
            Object.defineProperty(this, name, {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                value,
                writable: true,
                configurable: true,
            });
        },
        configurable: true,
    });
}

class ClientError extends Error {
    constructor(message = 'No message provided, an error with errors?') {
        super(message);
        this.name = this.constructor.name;
        // eslint is drunk
        // eslint-disable-next-line
        Error.captureStackTrace?.(this, this.constructor);
    }
    static from(obj) {
        const clientError = new this();
        clientError.name = obj.name;
        clientError.message = obj.message;
        clientError.stack = obj.stack;
        // @ts-expect-error
        return clientError;
    }
    toPlainObject() {
        return {
            name: this.name,
            message: this.message,
            stack: this.stack,
        };
    }
}

class CSError extends ClientError {
    constructor(message) {
        super(message);
    }
    static from(error) {
        const obj = this.getInnerException(error);
        const instance = new this(obj.message);
        instance.stack = `${instance.stack ? `${instance.stack}\n` : ''}[C#]\n${obj.StackTrace}`;
        instance.raw = obj;
        // @ts-expect-error
        return instance;
    }
    static getInnerException(error) {
        return error.InnerException
            ? error.InnerException
            : error;
    }
    static creatable(csName) {
        return (target) => {
            this.csNameToCSError.set(csName, target);
        };
    }
}
CSError.csNameToCSError = new Map();
__decorate([
    unenumerable
], CSError.prototype, "raw", void 0);

let CSArgumentError = class CSArgumentError extends CSError {
    static from(error) {
        const instance = super.from(error);
        instance.paramName = instance.raw.ParamName;
        // @ts-expect-error
        return instance;
    }
};
CSArgumentError = __decorate([
    CSError.creatable('System.ArgumentError')
], CSArgumentError);

let InvalidArgumentCountError = class InvalidArgumentCountError extends CSArgumentError {
};
InvalidArgumentCountError = __decorate([
    CSError.creatable('SS.InvalidArgumentCountException')
], InvalidArgumentCountError);
let InvalidConfigurationError = class InvalidConfigurationError extends CSArgumentError {
};
InvalidConfigurationError = __decorate([
    CSError.creatable('SS.InvalidConfigurationException')
], InvalidConfigurationError);
let NoMatchError = class NoMatchError extends CSArgumentError {
};
NoMatchError = __decorate([
    CSError.creatable('SS.NoMonitorMatchException')
], NoMatchError);

class CSErrorFactory {
    create(error) {
        const obj = CSError.getInnerException(error);
        const CreatableCSError = CSError.csNameToCSError.get(obj.name);
        if (CreatableCSError == null) {
            return CSError.from(obj);
        }
        return CreatableCSError.from(obj);
    }
}

const edge = EdgeManager.getEdgeInstance();
const WindowsSSMethodNames = ["captureMonitorByIndex", "captureMonitorByIndexSync", "captureMonitorByName", "captureMonitorByNameSync", "capturePrimaryMonitor", "capturePrimaryMonitorSync", "captureWindowByTitle", "captureWindowByTitleSync", "captureActiveWindow", "captureActiveWindowSync", "getMonitorInfos", "getMonitorInfosSync"];
class WindowsSS {
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
                    }
                    catch (err) {
                        if (err instanceof Error) {
                            throw csErrorFactory.create(err);
                        }
                        throw err;
                    }
                };
            }
            else {
                // @ts-expect-error
                this[methodName] = async (...args) => new Promise((resolve, reject) => {
                    impl([...args], (err, res) => {
                        if (err) {
                            reject(csErrorFactory.create(err));
                            return;
                        }
                        resolve(res);
                    });
                });
            }
        });
    }
}
const { captureMonitorByIndex, captureMonitorByIndexSync, captureMonitorByName, captureMonitorByNameSync, capturePrimaryMonitor, capturePrimaryMonitorSync, captureWindowByTitle, captureWindowByTitleSync, captureActiveWindow, captureActiveWindowSync, getMonitorInfos, getMonitorInfosSync, } = new WindowsSS();

exports.WindowsSS = WindowsSS;
exports.captureActiveWindow = captureActiveWindow;
exports.captureActiveWindowSync = captureActiveWindowSync;
exports.captureMonitorByIndex = captureMonitorByIndex;
exports.captureMonitorByIndexSync = captureMonitorByIndexSync;
exports.captureMonitorByName = captureMonitorByName;
exports.captureMonitorByNameSync = captureMonitorByNameSync;
exports.capturePrimaryMonitor = capturePrimaryMonitor;
exports.capturePrimaryMonitorSync = capturePrimaryMonitorSync;
exports.captureWindowByTitle = captureWindowByTitle;
exports.captureWindowByTitleSync = captureWindowByTitleSync;
exports.getMonitorInfos = getMonitorInfos;
exports.getMonitorInfosSync = getMonitorInfosSync;
