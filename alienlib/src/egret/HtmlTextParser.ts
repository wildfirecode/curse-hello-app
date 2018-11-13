/**
 * Convert the text in html format to the object that can be assigned to the egret.TextField#textFlow property
 * @see http://edn.egret.com/cn/docs/page/146 Text mixed in a variety of style
 * @version Egret 2.4
 * @platform Web,Native
 * @includeExample egret/text/HtmlTextParser.ts
 * @language en_US
 */
/**
 * 将html格式文本转换为可赋值给 egret.TextField#textFlow 属性的对象
 * @see http://edn.egret.com/cn/docs/page/146 多种样式文本混合
 * @version Egret 2.4
 * @platform Web,Native
 * @includeExample egret/text/HtmlTextParser.ts
 * @language zh_CN
 */
export class HtmlTextParser {

	/**
	 * @version Egret 2.4
	 * @platform Web,Native
	 */
	constructor() {
		this.initReplaceArr();
		this.initPreReplaceArr();
	}

	private replaceArr: any[] = [];

	private initReplaceArr(): void {
		const arr = this.replaceArr = [];
		arr.push([/&lt;/g, "<"]);
		arr.push([/&gt;/g, ">"]);
		arr.push([/&amp;/g, "&"]);
		arr.push([/&quot;/g, "\""]);
		arr.push([/&apos;/g, "\'"]);
	}

	private preReplaceArr: any[] = [];

	private initPreReplaceArr() {
		const arr = this.preReplaceArr = [];
		arr.push([/\\\"/g, "\""]);
		arr.push([/<br>/g, "\n"]);
	}

	/**
	 * @private
	 *
	 * @param value
	 * @returns
	 */
	private replaceSpecial(value: string): string {
		for (let i = 0; i < this.replaceArr.length; i++) {
			let k = this.replaceArr[i][0];
			let v = this.replaceArr[i][1];

			value = value.replace(k, v);
		}
		return value;
	}

	/**
	 * @private
	 */
	private resutlArr: Array<egret.ITextElement> = [];

	/**
	 * Convert the text in html format to the object that can be assigned to the egret.TextField#textFlow property
	 * @param htmltext {string} Text in html
	 * @returns {Array<egret.ITextElement>} 可赋值给 egret.TextField#textFlow Object that can be assigned to the egret.TextField#textFlow property
	 * @version Egret 2.4
	 * @platform Web,Native
	 * @language en_US
	 */
	/**
	 * 将html格式文本转换为可赋值给 egret.TextField#textFlow 属性的对象
	 * @param htmltext {string} html文本
	 * @returns {Array<egret.ITextElement>} 可赋值给 egret.TextField#textFlow 属性的对象
	 * @version Egret 2.4
	 * @platform Web,Native
	 * @language zh_CN
	 */
	public parse(htmltext: string): egret.ITextElement[] {
		this.preReplaceArr.forEach(p => {
			htmltext = htmltext.replace(p[0], p[1]);
		});

		this.stackArray = [];
		this.resutlArr = [];

		let firstIdx = 0;//文本段开始位置
		let length: number = htmltext.length;
		while (firstIdx < length) {
			let starIdx: number = htmltext.indexOf("<", firstIdx);
			if (starIdx < 0) {
				this.addToResultArr(htmltext.substring(firstIdx));
				firstIdx = length;
			}
			else {
				this.addToResultArr(htmltext.substring(firstIdx, starIdx));

				let fontEnd = htmltext.indexOf(">", starIdx);
				if (fontEnd == -1) {
					egret.$error(1038);
					fontEnd = starIdx;
				}
				else if (htmltext.charAt(starIdx + 1) == "\/") {//关闭
					this.stackArray.pop();
				}
				else {
					this.addToArray(htmltext.substring(starIdx + 1, fontEnd));
				}

				firstIdx = fontEnd + 1;
			}
		}

		return this.resutlArr;
	}

	public parser(htmltext: string): Array<egret.ITextElement> {
		return this.parse(htmltext);
	}

	/**
	 * @private
	 *
	 * @param value
	 */
	private addToResultArr(value: string): void {
		if (value == "") {
			return;
		}

		value = this.replaceSpecial(value);

		if (this.stackArray.length > 0) {
			this.resutlArr.push({text: value, style: this.stackArray[this.stackArray.length - 1]})
		}
		else {
			this.resutlArr.push(<egret.ITextElement>{text: value});
		}
	}

	//将字符数据转成Json数据
	private changeStringToObject(str: string): egret.ITextStyle {
		str = this.replaceSpecial(str.trim());
		let info: any = {};

		let header = [];
		if (str.charAt(0) == "i" || str.charAt(0) == "b" || str.charAt(0) == "u") {
			this.addProperty(info, str, "true");
		}
		else if (header = str.match(/^(font|a)\s/)) {
			str = str.substring(header[0].length).trim();

			let next: number = 0;
			let titles;
			while (titles = str.match(this.getHeadReg())) {
				let title = titles[0];
				let value = "";
				str = str.substring(title.length).trim();
				if (str.charAt(0) == "\"") {
					next = str.indexOf("\"", 1);
					value = str.substring(1, next);
					next += 1;
				}
				else if (str.charAt(0) == "\'") {
					next = str.indexOf("\'", 1);
					value = str.substring(1, next);
					next += 1;
				}
				else {
					value = str.match(/(\S)+/)[0];
					next = value.length;
				}

				this.addProperty(info, title.substring(0, title.length - 1).trim(), value.trim());

				str = str.substring(next).trim();
			}
		}

		return info;
	}

	/**
	 * @private
	 *
	 * @returns
	 */
	private getHeadReg(): RegExp {
		return /^(color|textcolor|strokecolor|stroke|b|bold|i|italic|u|size|fontfamily|href|target)(\s)*=/;
	}

	/**
	 * @private
	 *
	 * @param info
	 * @param head
	 * @param value
	 */
	private addProperty(info: egret.ITextStyle, head: string, value: string): void {

		switch (head.toLowerCase()) {
			case "color":
			case "textcolor":
				value = value.replace(/#/, "0x");
				info.textColor = parseInt(value);
				break;
			case "strokecolor":
				value = value.replace(/#/, "0x");
				info.strokeColor = parseInt(value);
				break;
			case "stroke":
				info.stroke = parseInt(value);
				break;
			case "b":
			case "bold":
				info.bold = value == "true";
				break;
			case "u":
				info.underline = value == "true";
				break;
			case "i":
			case "italic":
				info.italic = value == "true";
				break;
			case "size":
				info.size = parseInt(value);
				break;
			case "fontfamily":
				info.fontFamily = value;
				break;
			case "href":
				info.href = this.replaceSpecial(value);
				break;
			case "target":
				info.target = this.replaceSpecial(value);
				break;
		}
	}

	/**
	 * @private
	 */
	private stackArray: Array<egret.ITextStyle>;

	/**
	 * @private
	 *
	 * @param infoStr
	 */
	private addToArray(infoStr: string): void {
		let info: egret.ITextStyle = this.changeStringToObject(infoStr);

		if (this.stackArray.length == 0) {
			this.stackArray.push(info);
		}
		else {
			let lastInfo: Object = this.stackArray[this.stackArray.length - 1];
			for (let key in lastInfo) {
				if (info[key] == null) {
					info[key] = lastInfo[key];
				}
			}
			this.stackArray.push(info);
		}
	}
}

