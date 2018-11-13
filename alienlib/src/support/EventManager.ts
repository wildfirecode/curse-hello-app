/**
 * Created by rockyl on 16/5/19.
 *
 * 事件管理器
 */
import {injectProp} from "../tools/Utils";

class EventManager {
	private _groups: any = {};

	register(groupName: string, target: any, eventName, callback: Function, thisObj: any, priority: number = 0): void {
		if (!target) {
			console.error('target is empty');
		}

		let item: RegisterItem = new RegisterItem();
		injectProp(item, {target, eventName, callback, thisObj, priority}, null, false);

		let group: any = this._groups[groupName];
		if (!group) {
			group = this._groups[groupName] = {enable: false, items: []};
		}
		group.items.push(item);

		if (group.enable) { //如果组已生效，添加进去的就立马生效
			this.addEventListener(item);
		}
	}

	registerOn(obj: any, target: any, eventName, callback: Function, thisObj: any, priority: number = 0): void {
		this.register(obj['__class__'], target, eventName, callback, thisObj, priority);
	}

	enable(groupName: string): void {
		let group: any = this._groups[groupName];
		if (!group) {
			group = this._groups[groupName] = {enable: false, items: []};
		}
		if (!group.enable) {
			group.enable = true;
			group.items.forEach(this.addEventListener);
		}
	}

	private addEventListener(item: RegisterItem) {
		item.target['addEventListener'](item.eventName, item.callback, item.thisObj, false, item.priority);
	}

	enableOn(obj: any): void {
		this.enable(obj['__class__']);
	}

	disable(groupName: string): void {
		let group: any = this._groups[groupName];
		if (group && group.enable) {
			group.enable = false;
			group.items.forEach(this.removeEventListener);
		}
	}

	private removeEventListener(item: RegisterItem) {
		item.target['removeEventListener'](item.eventName, item.callback, item.thisObj);
	}

	disableOn(obj: any): void {
		this.disable(obj['__class__']);
	}

	dump(groupName: string = null): void {
		for (let key in this._groups) {
			let group: any = this._groups[key];
			console.log(key + '[' + group.items.length + ']: ' + (group.enable ? '● enable' : '○ disable'));
			console.log(group.items.map((item: RegisterItem) => {
				return item.eventName;
			}).join(','));
		}
	}
}

class RegisterItem {
	target: any;
	eventName: string;
	callback: Function;
	thisObj: any;
	priority: number;
}

const eventManager:EventManager = new EventManager();
export default eventManager;
