/**
 * Created by rockyl on 2018/8/16.
 *
 * 滚动式背景图
 */

export enum LOOP_DIRECTION {
	LEFT,
	RIGHT,
	UP,
	DOWN,
}

export class LoopComponent extends egret.DisplayObjectContainer {
	_direction: LOOP_DIRECTION;

	_sizeField: string;
	_posField: string;
	_moveSign;
	_lastPos = 0;

	_onceDistance;
	_loopDistance;
	_distance = 0;
	_scrollRect: egret.Rectangle;

	constructor(direction: LOOP_DIRECTION, width, height) {
		super();

		this._scrollRect = new egret.Rectangle(0, 0, width, height);

		this._direction = direction;

		this._sizeField = direction < 2 ? 'width' : 'height';
		this._posField = direction < 2 ? 'x' : 'y';
		this._moveSign = direction % 2 == 0 ? 1 : -1;
	}

	private setup(parts) {
		let distance = 0;
		for (let item of parts) {
			let part;
			if (typeof item == 'string') {
				part = new egret.Bitmap(RES.getRes(item));
			} else if (item instanceof egret.Texture) {
				part = new egret.Bitmap(item);
			} else {
				part = item;
			}

			if(this._moveSign < 0){
				this._lastPos = part[this._posField] = this.numChildren == 0 ? 0 : this._lastPos - part[this._sizeField];
			}else{
				part[this._posField] = this.numChildren == 0 ? 0 : this._lastPos;
				this._lastPos += part[this._sizeField];
			}

			distance += part[this._sizeField];

			this.addChild(part);
		}
		return distance;
	}

	setupOnce(resArr) {
		this._distance = this._onceDistance = this.setup(resArr);
		this.update();
	}

	setupLoop(resArr) {
		this._loopDistance = this.setup(resArr);
		this._distance = this._onceDistance + this._loopDistance - (this._moveSign < 0);
		this.setup(resArr);

		this.update();
	}

	setViewport(pos) {
		let nPos;
		if (pos < this._distance) {
			nPos = this._moveSign * pos
		} else {
			nPos = this._moveSign * (pos - this._distance) % this._loopDistance + this._onceDistance - (this._moveSign < 0 ? this._onceDistance * 2 : 0)
		}

		this._scrollRect[this._posField] = nPos;

		this.update();
	}

	update() {
		this.scrollRect = this._scrollRect;
	}
}