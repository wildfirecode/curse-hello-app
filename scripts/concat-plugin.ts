/**
 * Created by rockyl on 2018/9/10.
 */

import * as minimatch from "minimatch"

export class ConcatPlugin implements plugins.Command {

	private codeMap = {};
	private matchers: { sources: string[], target: string }[];
	private showLog;

	constructor(matchers, showLog = false) {
		this.matchers = matchers;
		this.showLog = showLog;
	}

	async onFile(file) {
		const filename = file.origin;
		if (file.extname != ".js") {
			return file;
		}

		for (let matcher of this.matchers) {
			let codes = this.codeMap[matcher.target];
			if (!codes) {
				codes = this.codeMap[matcher.target] = [];
			}
			for (let mat of matcher.sources) {
				if (minimatch(filename, mat)) {
					if (this.showLog) console.log(filename, file.contents.byteLength);
					codes.push(file.contents.toString());
					return null;
				}
			}
		}
		return file;
	}

	async onFinish(pluginContext) {
		for (let matcher of this.matchers) {
			let codeMap = this.codeMap;
			let codes = [] = codeMap[matcher.target];
			let jscode = codes.join('\n');
			pluginContext.createFile(matcher.target, new Buffer(jscode));
		}
	}

	[options: string]: any;
}
