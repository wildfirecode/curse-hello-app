/**
 * Created by Rocky.L on 2015/4/22.
 */

let _ID: string;

export function init(ID: string): void {
	_ID = ID;
}

export function getName(key: string, prefix: string = null): string {
	return (prefix || !_ID || _ID == '' ? prefix : _ID) + '_' + key;
}

export function getItem(key: string, prefix: string = null): string {
	return egret.localStorage.getItem(getName(key, prefix));
}

export function setItem(key: string, value: string, prefix: string = null): boolean {
	egret.localStorage.setItem(getName(key, prefix), value);
	return true;
}

export function getItemObj(key: string, defaultObj: any = null, prefix: string = null): any {
	let result: any;
	try {
		result = JSON.parse(getItem(key, prefix));
	} catch (e) {

	}
	if (!result) {
		result = defaultObj;
	}
	return result;
}

export function setItemObj(key: string, itemObj: any, prefix: string = null): boolean {
	return setItem(key, JSON.stringify(itemObj), prefix);
}
