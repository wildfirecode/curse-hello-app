/**
 * Created by lenovo on 2014/7/23.
 */

export class Dispatcher {
	static eventDispatcher: egret.EventDispatcher;

	static init(): void {
		Dispatcher.eventDispatcher = new egret.EventDispatcher();
	}

	static dispatch(eventName: string, params: any = null): void {
		if (params) {
			Dispatcher.eventDispatcher.dispatchEventWith(eventName, false, params);
		} else {
			Dispatcher.eventDispatcher.dispatchEvent(new egret.Event(eventName));
		}
	}

	static addEventListener(eventName: string, callback: Function, thisObj: any): void {
		Dispatcher.eventDispatcher.addEventListener(eventName, callback, thisObj);
	}

	static removeEventListener(eventName: string, callback: Function, thisObj: any): void {
		Dispatcher.eventDispatcher.removeEventListener(eventName, callback, thisObj);
	}
}
