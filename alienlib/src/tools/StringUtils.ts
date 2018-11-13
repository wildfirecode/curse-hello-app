/**
 * Created by rockyl on 16/3/9.
 */
import {makeRandomInt} from "./MathUtils";

const chars: string = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function makeRandomString(len: number): string {
	let s: string = "";
	let cl: number = this.chars.length;
	for (let i: number = 0; i < len; i++) {
		s += this.chars.charAt(makeRandomInt(cl));
	}

	return s;
}

export function makeRandomIntString(len: number): string {
	let s: string = "";
	for (let i: number = 0; i < len; i++) {
		s += makeRandomInt(10);
	}

	return s;
}

export function stringCut(str: string, len: number, fill: string = '...'): string {
	let result: string = str;
	if (str.length > len) {
		result = str.substr(0, len) + fill;
	}
	return result;
}

export function fixed(num, count) {
	let p = Math.pow(10, count);
	let result = ((Math.floor(num) * p + Math.floor(num * p % p) / p * p) / p).toString();
	let dotIndex = result.indexOf('.');
	return result + (dotIndex < 0 ? '.00' : repeat('0', count - (result.length - dotIndex - 1)));
}

const zeros: Array<string> = [
	"0",
	"00",
	"000",
	"0000",
	"00000",
	"000000",
	"0000000",
	"00000000",
	"000000000",
	"0000000000"
];

export function supplement(value: number, count: number): string {
	let index = count - value.toString().length - 1;
	if (index < 0) {
		return value.toString();
	}
	return this.zeros[index] + value;
}

export function format(formatStr: string, ...params): string {
	return this.formatApply(formatStr, params);
}

export function formatApply(formatStr: string, params: any[]): string {
	let result: string = formatStr;
	for (let i = 0, len = params.length; i < len; i++) {
		let reg = new RegExp("\\{" + i + "\\}", 'g');
		result = result.replace(reg, params[i]);
	}

	return result;
}

/**
 *
 * @param string
 * @param cutSize
 * @returns {Array}
 */
export function splitBySize(string, cutSize) {
	let result = [];
	for (let i = 0, li = Math.ceil(string.length / cutSize); i < li; i++) {
		result.push(string.substr(i * cutSize, cutSize));
	}

	return result;
}

export function repeat(string, count) {
	let result = '';
	for (let i = 0; i < count; i++) {
		result += string;
	}
	return result;
}

export function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

export function join(arr, str, lineLimit = 0) {
	if (arr && arr.length > 0) {
		if (lineLimit > 0) {
			let result = '';
			for (let i = 0, li = arr.length; i < li; i++) {
				result += arr[i] + (i < li - 1 ? ((i + 1) % lineLimit == 0 ? '\n' : str) : '');
			}

			return result;
		} else {
			return arr.join(str);
		}
	} else {
		return null;
	}
}
