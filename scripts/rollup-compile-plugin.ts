import * as fs from "fs";
import * as path from "path";

const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const typescriptPlugin = require('./rollup-plugin-typescript');
const typescript = require('typescript');
const {uglify} = require('rollup-plugin-uglify');
const glob = require('glob');

export class RollupCompilePlugin implements plugins.Command {
	options;

	[options: string]: any;

	constructor(options) {
		this.options = options;
	}

	async onFile(file: plugins.File) {
		return file;
	}

	async onFinish(commandContext: plugins.CommandContext) {
		const {publishPolicy, libraryType, defines, generateSourceMap} = this.options;

		const debugMode = publishPolicy === 'debug';

		let plugins = [
			typescriptPlugin({
				typescript,
			}),
			resolve(),
		];

		if (!debugMode) {
			plugins.push(uglify());
		}

		let outputConfig: any = {
			format: 'cjs',
		};

		if (debugMode || generateSourceMap) {
			outputConfig.sourcemap = true;
		}

		const bundle = await rollup.rollup({
			input: './src/Main.ts',
			plugins,
		});

		const ps = [];
		if (!debugMode) {
			const propertiesFile = path.resolve(commandContext.projectRoot, 'egretProperties.json');
			const properties = require(propertiesFile);
			const minStr = libraryType == 'release' ? '.min' : '';
			for (let module of properties.modules) {
				glob.sync(`libs/modules/${module.name}/*${minStr}.js`).forEach(libFile => {
						ps.push(new Promise((resolve, reject) => {
							fs.readFile(libFile, function (e, content) {
								if (e) {
									reject(e);
								} else {
									resolve({libFile, content});
								}
							});
						}))
					}
				);
			}
		}

		const results = await Promise.all([
			Promise.all(ps),
			bundle.generate(outputConfig),
		]);
		results[0].forEach(({libFile, content}) => {
			commandContext.createFile(libFile, content);
		});
		const {code, map} = results[1];

		let bundleFile = debugMode ?
			`bin-debug/bundle.js` :
			'bundle.min.js';

		let sourceCode = code;
		if (!debugMode) {
			sourceCode = 'RELEASE=true;DEBUG=false;' + sourceCode;
		}
		if (map) {
			commandContext.createFile(bundleFile + '.map', new Buffer(map.toString()));
			sourceCode += `//# sourceMappingURL=bundle.js.map\n`;
		}
		commandContext.createFile(bundleFile, new Buffer(sourceCode));

		if (!debugMode) {
			const projectRoot = commandContext.projectRoot;
			const filepath = path.join(projectRoot, 'template/web/index.html');
			const htmlContent = fs.readFileSync(filepath);
			commandContext.createFile("index.html", htmlContent);
		}
	}
}
