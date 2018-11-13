/**
 * Created by admin on 2017/8/2.
 */
import {Gesture} from "./Gesture";
import {centerPoint, distancePoint} from "../../tools/MathUtils";

export class ZoomGesture extends Gesture {
	protected _beginScale = 1;
	protected _scale = 1;
	protected _container: egret.DisplayObject;

	constructor(target: egret.DisplayObject, configuration: any = null) {
		super(target, configuration);

		this._container = configuration.container;
	}

	protected onTouchBegin(touchPoint): void {
		if (this._touchPoints.length == 2) {  //scale
			this._beginDistance = distancePoint(this._touchPoints[0].point, this._touchPoints[1].point);
			this.adjustAnchor();
		}
	}

	protected onTouchMove(touchPoint): void {
		let touchCount = this._touchPoints.length;
		switch (touchCount) {
			case 2:  //scale
				let distance = distancePoint(this._touchPoints[0].point, this._touchPoints[1].point);
				this.adjustAnchor();

				let offset = distance - this._beginDistance;

				//this._target.scaleX = this._target.scaleY = distance / 750;
				this._target.scaleX = this._target.scaleY = this._beginScale + offset * 0.001;
				break;
		}
	}

	protected onTouchEnd(touchPoint): void {
		this._beginScale = this._target.scaleX;
	}

	private adjustAnchor() {
		let target = this._target;

		this._centerPoint = centerPoint(this._touchPoints[0].point, this._touchPoints[1].point);
		let p = target.parent.globalToLocal(this._centerPoint.x, this._centerPoint.y);
		target.x = target.anchorOffsetX = p.x * this._beginScale;
		target.y = target.anchorOffsetY = p.y * this._beginScale;
		console.log(this._centerPoint, p);
	}
}
