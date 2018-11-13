/**
 * Created by rockyl on 2018/10/10.
 *
 * 脚本组件基类
 */

import eventManager from "@alienlib/support/EventManager";

export default class CurseComponent extends egret.HashObject{
	protected host;

	private get eventGroupName() {
		return this['__class__'] + '_' + this.hashCode;
	}

	registerEvent(target: any, eventName: any, callback: Function, thisObj: any, priority: number = 0): void {
		eventManager.register(this.eventGroupName, target, eventName, callback, thisObj, priority);
	}

	enableEvents() {
		eventManager.enable(this.eventGroupName);
	}

	disableEvents() {
		eventManager.disable(this.eventGroupName);
	}

	/**
	 * 初始化
	 */
	protected onCreate() {
		
	}

	/**
	 * 唤醒
	 */
	protected awake() {
		this.enableEvents();
	}

	/**
	 * 沉睡
	 */
	protected sleep() {
		this.disableEvents();
	}

	/**
	 * 销毁
	 */
	protected destroy() {

	}
}