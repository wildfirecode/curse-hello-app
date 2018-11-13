/**
 * Created by admin on 2017/6/14.
 */
import {disable, enable, register} from "../EventManager";
import {getStage} from "../StageProxy";

export class Gesture extends egret.EventDispatcher {
	static ID_INK = 0;

	protected _target: egret.DisplayObject;
	protected _configuration: any;

	protected _id;
	protected _touchPoints = [];
	protected _centerPoint;
	protected _beginDistance;

	constructor(target: egret.DisplayObject, configuration: any = {}) {
		super();

		this._target = target;
		this._configuration = configuration;

		this.setup();
	}

	protected setup() {
		this._id = 'Gesture_' + (Gesture.ID_INK++);
		register(this._id, this._target, egret.TouchEvent.TOUCH_BEGIN, this._onTouchBegin, this);
		register(this._id, this._target, egret.TouchEvent.TOUCH_TAP, this._onTouchTap, this);
		register(this._id, getStage(), egret.TouchEvent.TOUCH_MOVE, this._onTouchMove, this);
		register(this._id, getStage(), egret.TouchEvent.TOUCH_END, this._onTouchEnd, this);
	}

	protected getTouchPoint(id) {
		let result = null;
		this._touchPoints.some(touchPoint => {
			if (touchPoint.id == id) {
				result = touchPoint;
				return true;
			}
		});
		return result;
	}

	protected addTouchPoint(event): any {
		let touchPoint = {
			id: event.touchPointID,
			beginPoint: {
				x: event.stageX,
				y: event.stageY,
			},
			point: {
				x: event.stageX,
				y: event.stageY,
			},
			delta: {
				x: 0,
				y: 0,
				time: 0,
			},
			lastTime: Date.now(),
		};
		this._touchPoints.push(touchPoint);
		return touchPoint;
	}

	protected removeTouchPoint(id) {
		this._touchPoints.some((touchPoint, index) => {
			if (touchPoint.id == id) {
				this._touchPoints.splice(index, 1);
				return true;
			}
		});
	}

	private _onTouchBegin(event: egret.TouchEvent): void {
		this.onTouchBegin(this.addTouchPoint(event), event);
	}

	protected onTouchBegin(touchPoint, event): void {

	}

	private _onTouchTap(event: egret.TouchEvent): void {
		this.onTouchTap(this.getTouchPoint(event.touchPointID), event);
	}

	protected onTouchTap(touchPoint, event): void {

	}

	private _onTouchMove(event: egret.TouchEvent): void {
		let touchPoint = this.getTouchPoint(event.touchPointID);
		if (!touchPoint) {
			return;
		}
		touchPoint.point.x = event.stageX;
		touchPoint.point.y = event.stageY;

		this.updateDelta(touchPoint, event);
		this.onTouchMove(touchPoint, event);
	}

	protected onTouchMove(touchPoint, event): void {

	}

	private _onTouchEnd(event: egret.TouchEvent): void {
		let touchPoint = this.getTouchPoint(event.touchPointID);
		if (!touchPoint) {
			return;
		}
		this.updateDelta(touchPoint, event);

		this.onTouchEnd(touchPoint, event);

		this.removeTouchPoint(event.touchPointID);
	}

	protected onTouchEnd(touchPoint, event) {

	}

	private updateDelta(touchPoint, event) {
		touchPoint.delta.x = event.stageX - touchPoint.beginPoint.x;
		touchPoint.delta.y = event.stageY - touchPoint.beginPoint.y;
		touchPoint.delta.time = Date.now() - touchPoint.lastTime;
		touchPoint.lastTime = Date.now();
	}

	get target(): egret.DisplayObject {
		return this._target;
	}

	active() {
		enable(this._id);
	}

	inactive() {
		disable(this._id);
	}

	cancel() {
		this._touchPoints.splice(0);
	}
}
