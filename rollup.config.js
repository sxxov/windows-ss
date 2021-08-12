/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import run from '@rollup/plugin-run';
import execute from 'rollup-plugin-execute';
import del from 'rollup-plugin-delete';
import keysTransformer from 'ts-transformer-keys/transformer';

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

	commonjs({
		ignoreDynamicRequires: true,
	}),

	production && del({ targets: 'dist/*' }),

	execute([
		'pushd "src/lib/SS" && dotnet build /property:GenerateFullPaths=true /consoleloggerparameters:NoSummary -c Release && popd',
		'xcopy "node_modules/edge-js/lib/native" "dist/native" /E/H/C/I/Y >nul',
		'xcopy "node_modules/edge-js/lib/bootstrap" "dist/bootstrap" /E/H/C/I/Y >nul',
		'xcopy "src/lib" "dist/lib" /E/H/C/I/Y >nul',
	]),

	json(),

	typescript({
		include: ['src/**/*.ts'],
		declaration: production,
		transformers: {
			before: [{
				type: 'program',
				factory: keysTransformer,
			}],
		},
	}),

	!production && run(),
];

export default [{
	input: 'src/index.ts',
	output: {
		sourcemap: !production,
		format: 'cjs',
		name: 'index',
		dir: 'dist',
		entryFileNames: 'index.js',
	},
	onwarn,
	watch,
	plugins,
}];
