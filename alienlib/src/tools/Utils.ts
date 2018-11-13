/**
 * Created by rockyl on 16/3/9.
 */

import {HtmlTextParser} from '../egret/HtmlTextParser'

export function injectProp(target: Object, data: Object = null, callback: Function = null, ignoreMethod: boolean = true, ignoreNull: boolean = true): boolean {
	if (!target || !data) {
		return false;
	}

	let result = true;
	for (let key in data) {
		let value: any = data[key];
		if ((!ignoreMethod || typeof value != 'function') && (!ignoreNull || value != null)) {
			if (callback) {
				callback(target, key, value);
			} else {
				target[key] = value;
			}
		}
	}
	return result;
}

export function getDirtyData(oldData: any, newData: any): any {
	let dirtyData: any;

	for (let key in newData) {
		if (oldData[key] != newData[key]) {
			if (!dirtyData) {
				dirtyData = {};
			}
			dirtyData[key] = newData[key];
		}
	}

	return dirtyData;
}

export function combineProp(...sources): any {
	let ret: any = {};
	sources.forEach((source: any) => {
		if (!source) {
			return;
		}
		for (let key in source) {
			if (source[key] !== null && source[key] !== undefined && source[key] !== '') {
				ret[key] = source[key];
			}
		}
	});

	return ret;
}

export function clone(source: any, def: any = null, ignoreMethod: boolean = true): any {
	let target: any = def ? new def() : {};
	this.injectProp(target, source, null, ignoreMethod);

	return target;
}

export function arrToIntArr(arr: any[]): number[] {
	for (let i: number = 0, li: number = arr.length; i < li; i++) {
		arr[i] = parseInt(arr[i]);
	}

	return arr;
}

export function getUrlParams(): any {
	let params: any = {};
	let href: string = window.location.href;
	let index: number = href.indexOf("?");
	if (index < 0) {
		return params;
	}

	params = this.parseQuery(href.substr(index + 1));

	return params;
}

export function parseQuery(query) {
	let params: any = {};
	let hashes = query.split('&');
	for (let i = 0; i < hashes.length; i++) {
		let arr: Array<string> = hashes[i].split('=');
		params[arr[0]] = arr[1];
	}
	return params;
}

export function getUrlBase(): string {
	let href: string = window.location.href;
	let index: number = href.indexOf("?");
	return href.substring(0, index < 0 ? href.length : index);
}

export function anchorCenter(target: any, width: number = 0, height: number = 0, resetPos = true): void {
	anchorRate(target, 0.5, 0.5, width, height, resetPos);
}

export function anchorRate(target: any, rx: number, ry: number, width: number = 0, height: number = 0, resetPos = true): void {
	if (width == 0) {
		width = target.width;
	}
	if (height == 0) {
		height = target.height;
	}
	if (resetPos) {
		if (rx == 0) {
			target.x -= target.anchorOffsetX;
		}
		if (ry == 0) {
			target.y -= target.anchorOffsetY;
		}
	}

	target.anchorOffsetX = width * rx;
	target.anchorOffsetY = height * ry;

	if (resetPos) {
		if (rx > 0) {
			target.x += target.anchorOffsetX;
		}
		if (ry > 0) {
			target.y += target.anchorOffsetY;
		}
	}
}

/**
 * object转成查询字符串
 * @param obj
 * @returns {string}
 */
export function obj2query(obj: any): string {
	if (!obj) {
		return '';
	}
	let arr: string[] = [];
	for (let key in obj) {
		arr.push(key + '=' + obj[key]);
	}
	return arr.join('&');
}

export function parseColorTextFlow(source: string): any[] {
	let statics: string[] = source.split(/\[.*?\]/g);
	let dynamics: string[] = source.match(/\[.*?\]/g);

	let ret: any[] = [];
	let s;
	let i = 0;
	let li = statics.length - 1;
	for (; i < li; i++) {
		s = statics[i];

		if (s) {
			ret.push({text: s});
		}
		let cs: string = dynamics[i];
		cs = cs.substr(1, cs.length - 2);
		let obj: any = {};
		let arr = cs.split('|');
		if (arr.length == 1) {
			obj.style = {textColor: parseInt(arr[0], 16)};
		} else {
			obj.text = arr[0];
			obj.style = {textColor: parseInt(arr[1], 16)};
		}
		ret.push(obj);
	}
	s = statics[i];
	if (s) {
		ret.push({text: s});
	}

	return ret;
}

export function scrollTo(index, itemSize, gap = 0) {
	return (itemSize + gap) * index;
}

export function getByteLen(str) {
	return str.replace(/[^\x00-\xff]/g, '__').length;
}

export function findArr(array, func) {
	let result = null;
	array.some((item) => {
		if (func(item)) {
			result = item;
			return true;
		}
	});

	return result;
}

export function objectValues(obj) {
	let arr = [];
	for (let key in obj) {
		arr.push(obj[key]);
	}
	return arr;
}

export function getFileName(fullName) {
	return fullName.substr(0, fullName.indexOf('.'));
}

const htmlParser:HtmlTextParser = new HtmlTextParser()
export function parseHtmlText(html){
	return htmlParser.parse(html);
}
