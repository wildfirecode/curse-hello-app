/**
 * Created by admin on 2017/6/23.
 */
import {eventManager} from "./";

export class EventComponent extends eui.Component {
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
}

export class VisualEventComponent extends EventComponent {
	constructor() {
		super();

		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
	}

	protected onAddedToStage(event: egret.Event): void {
		this.enableEvents();
	}

	protected onRemovedFromStage(event: egret.Event): void {
		this.disableEvents();
	}
}

export class VisualEventItemRenderer extends eui.ItemRenderer {
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

	constructor() {
		super();

		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
	}

	protected onAddedToStage(event: egret.Event): void {
		this.enableEvents();
	}

	protected onRemovedFromStage(event: egret.Event): void {
		this.disableEvents();
	}
}
