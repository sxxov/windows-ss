import { fileURLToPath } from 'url';
import * as pathTool from 'path';

if (globalThis.__dirname == null
	&& globalThis.__filename == null) {
	Object.defineProperties(globalThis, {
		__filename: {
			get: () => fileURLToPath(import.meta.url),
			enumerable: true,
		},
		__dirname: {
			get: () => pathTool.dirname(fileURLToPath(import.meta.url)),
			enumerable: true,
		},
	});
}
