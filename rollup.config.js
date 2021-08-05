/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import run from '@rollup/plugin-run';
import importAssets from 'rollup-plugin-import-assets';

const production = !process.env.ROLLUP_WATCH;

const onwarn = (message, warn) => {
	const ignored = {
		EVAL: ['node_modules'],
		CIRCULAR_DEPENDENCY: [''],
	};
	const ignoredKeys = Object.keys(ignored);
	const ignoredValues = Object.values(ignored);

	for (let i = 0, l = ignoredKeys.length; i < l; ++i) {
		const ignoredKey = ignoredKeys[i];
		const ignoredValue = ignoredValues[i];

		for (const ignoredValuePart of ignoredValue) {
			if (message.code !== ignoredKey
				|| !message.toString().includes(ignoredValuePart)) {
				continue;
			}

			return;
		}
	}

	warn(message);
};

const watch = {
	clearScreen: false,
};

const plugins = [
	// If you have external dependencies installed from
	// npm, you'll most likely need these plugins. In
	// some cases you'll need additional configuration -
	// consult the documentation for details:
	// https://github.com/rollup/plugins/tree/master/packages/commonjs
	resolve({
		preferBuiltins: true,
	}),

	commonjs(),

	importAssets({
		// files to import
		include: [/\.ps1$/i],
		// files to exclude
		exclude: [],
		// copy assets to output folder
		emitAssets: true,
		// name pattern for the asset copied
		fileNames: 'lib/[name].[ext]',
		// public path of the assets
		publicPath: '',
	}),

	json(),

	typescript({
		sourceMap: !production,
		include: ['src/**/*.ts'],
		declaration: production,
	}),

	!production && run(),
];

export default [{
	input: 'src/index.ts',
	output: {
		sourcemap: !production,
		format: 'esm',
		name: 'index',
		dir: 'dist',
		entryFileNames: 'index.js',
	},
	onwarn,
	watch,
	plugins,
}];
