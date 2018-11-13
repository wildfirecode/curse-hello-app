/// 阅读 api.d.ts 查看文档
///<reference path="api.d.ts"/>

import {
	UglifyPlugin,
	ExmlPlugin,
} from 'built-in';
import {ResultNotificationPlugin} from "./result-notification-plugin";
import {ConcatPlugin} from "./concat-plugin";
import {RollupCompilePlugin} from "./rollup-compile-plugin";
import {GenerateDependencePlugin} from "./generate-dependence-plugin";

const config: ResourceManagerConfig = {
	buildConfig: (params) => {

		const {target, command, projectName, version} = params;

		if (command == 'build') {
			const outputDir = '.';
			return {
				outputDir,
				commands: [
					new GenerateDependencePlugin(),
					new ExmlPlugin('debug'), // 非 EUI 项目关闭此设置
					new RollupCompilePlugin({
						publishPolicy: 'debug',
					}),
					new ResultNotificationPlugin('Build'),
				]
			}
		}
		else if (command == 'publish') {
			const outputDir = `bin-release/web/${version}`;
			return {
				outputDir,
				commands: [
					new GenerateDependencePlugin(),
					new RollupCompilePlugin({
						publishPolicy: 'release',
						libraryType: 'release',
						defines: {DEBUG: false, RELEASE: true},
						//generateSourceMap: true,
					}),
					new ExmlPlugin('commonjs'), // 非 EUI 项目关闭此设置
					new UglifyPlugin([{
						sources: ["resource/default.thm.js"],
						target: "resource/default.thm.min.js"
					}]),
					new ConcatPlugin([
						{
							sources: [
								"libs/modules/**/*.min.js",
								"resource/default.thm.min.js",
							],
							target: "vendor.js"
						}
					]),
					new ResultNotificationPlugin('Publish', version),
				]
			}
		}
		else {
			throw `unknown command : ${params.command}`
		}
	},

	mergeSelector: (path) => {
		if (path.indexOf("assets/bitmap/") >= 0) {
			return "assets/bitmap/sheet.sheet"
		}
		else if (path.indexOf("armature") >= 0 && path.indexOf(".json") >= 0) {
			return "assets/armature/1.zip";
		}
	},

	typeSelector: (path) => {
		const ext = path.substr(path.lastIndexOf(".") + 1);
		const typeMap = {
			"jpg": "image",
			"png": "image",
			"webp": "image",
			"json": "json",
			"fnt": "font",
			"pvr": "pvr",
			"mp3": "sound",
			"zip": "zip",
			"sheet": "sheet",
			"exml": "text"
		}

		let type = typeMap[ext];
		if (type == "json") {
			if (path.indexOf("sheet") >= 0) {
				type = "sheet";
			} else if (path.indexOf("movieclip") >= 0) {
				type = "movieclip";
			}
			;
		}
		return type;
	}
}

export = config;
