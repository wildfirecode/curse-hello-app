/**
 * 滑动手势
 */
import {Gesture} from "./Gesture";
import {sign} from "../../tools/MathUtils";

export class SlideGesture extends Gesture {
	static SLIDE: string = 'SLIDE';

	private touchMoved;
	private downTarget: egret.DisplayObject;

	protected onTouchBegin(touchPoint, event): void {
		this.downTarget = event.target;
	}

	protected onTouchMove(touchPoint, event): void {
		if (!this._configuration.dispatchCancelEvent) {
			return;
		}

		if (event.isDefaultPrevented()) {
			return;
		}

		if (!this.touchMoved) {
			this.touchMoved = true;
			this.dispatchCancelEvent(event);
		}

		event.preventDefault();
	}

	protected onTouchEnd(touchPoint, event) {
		this.touchMoved = false;
		let {threshold = 300} = this._configuration;

		let delta = Math.abs(touchPoint.delta.x);
		if ((touchPoint.delta.time < 30 && delta > 50) || delta > threshold) {
			let dir = sign(touchPoint.delta.x);
			this.dispatchEventWith(SlideGesture.SLIDE, false, {dir});
		}
	}

	private dispatchCancelEvent(event: egret.TouchEvent) {
		let cancelEvent = egret.Event.create(egret.TouchEvent, egret.TouchEvent.TOUCH_CANCEL, event.bubbles, event.cancelable);
		cancelEvent.$initTo(event.$stageX, event.$stageY, event.touchPointID);
		let target: egret.DisplayObject = this.downTarget;
		cancelEvent.$setTarget(target);
		let list = this._target.$getPropagationList(target);
		let length = list.length;
		let targetIndex = list.length * 0.5;
		let startIndex = -1;

		for (let i = 0; i < length; i++) {
			if (list[i] === this._target) {
				startIndex = i;
				break;
			}
		}
		list.splice(0, startIndex + 1 - 2);
		list.splice(list.length - 1 - startIndex + 2, startIndex + 1 - 2);

		targetIndex -= startIndex + 1;
		this._target.$dispatchPropagationEvent(cancelEvent, list, targetIndex);
		egret.Event.release(cancelEvent);
	}
}
