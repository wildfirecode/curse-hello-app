/**
 * Created by rockyl on 16/3/9.
 */

const MAX: number = 20;

const createMethods: any = {};
const initMethods: any = {};
const pools: any = {};

export function registerPool(name: string, createMethod: Function, initMethod: Function = null): void {
	createMethods[name] = createMethod;
	initMethods[name] = initMethod;
	pools[name] = [];
}

export function getObject(name: string, ...params): any {
	let pool = pools[name];
	if (!pool) {
		console.warn(name + "没有注册在对象池中。");
		return null;
	}

	let obj: any;
	if (pool.length > 0) {
		obj = pool.pop();
	} else {
		let createMethod = createMethods[name];
		obj = createMethod.apply(null, params);
	}

	let initMethod = initMethods[name];
	if (initMethod) {
		params.unshift(obj);
		initMethod.apply(null, params);
	}

	debug();

	return obj;
}

export function recycleObject(name: string, obj: any): void {
	if (!obj) {
		return;
	}
	let pool = pools[name];
	if (!pool) {
		console.warn(name + "没有注册在对象池中。");
		return;
	}

	if (pool.indexOf(obj) < 0 && pool.length <= MAX) {
		pool.push(obj);
	}

	debug();
}

export function debug(): void {
	let text = "";
	for (let key in pools) {
		let pool = pools[key];
		text += key + ":" + pool.length + "\n";
	}
	//DebugWindow.instance.text = text;
}
