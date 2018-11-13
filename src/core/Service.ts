/**
 * Created by admin on 2017/6/26.
 *
 * 事件管理器
 */

import eventManager from "@alienlib/support/EventManager";

export default class Service extends egret.EventDispatcher{
	constructor(){
		super();

		this.init();
	}

	protected init(){

	}

	private get eventGroupName(){
		return this['__class__'] + '_' + this.hashCode;
	}

	registerEvent(target:any, eventName:any, callback:Function, thisObj:any, priority:number = 0):void{
		eventManager.register(this.eventGroupName, target, eventName, callback, thisObj, priority);
	}

	async start(){
		eventManager.enable(this.eventGroupName);
	}

	async stop(){
		eventManager.disable(this.eventGroupName);
	}

	afterStart(){

	}
}