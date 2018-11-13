/**
 * Created by rockyl on 16/3/29.
 */

export class Shake {
	private _tween: egret.Tween;
	private _target: any;
	private _callback;
	private _size;
	private _perDuration;
	private _count = 0;

	private _oldPos: any = {};

	constructor(target: any) {
		this._target = target;
	}

	play(callback, count = 1, size = 10, duration = 300): void {
		this._callback = callback;
		this._size = size;
		this._perDuration = duration / 8;

		this._count = count;
		this._playOnce()
	}

	_playOnce() {
		let {x, y} = this._target;
		this._oldPos = {x, y};

		let s = this._size;
		let offsets = [
			[0, -s],
			[s, -s],
			[s, 0],
			[0, 0],
			[-s, 0],
			[-s, s],
			[0, s],
			[0, 0],
		];
		let tween = this._tween = egret.Tween.get(this._target, null, null, true);
		offsets.forEach(offset => {
			tween.to({x: x + offset[0], y: y + offset[1]}, this._perDuration)
		});
		tween.call(() => {
			if (this._count > 0) {
				this._count--;
				this._playOnce();
			} else {
				this._onFinished();
			}
		});
	}

	_onFinished() {
		if (this._callback) {
			this._callback();
		}
	}

	stop(): void {
		if (this._tween) {
			egret.Tween.get(this._target, null, null, true)
				.to(this._oldPos, 10);
		}
	}
}

