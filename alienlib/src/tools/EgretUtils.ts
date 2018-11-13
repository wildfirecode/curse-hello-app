/**
 * Created by rockyl on 2017/1/22.
 */

export function getTweenPromise(tween: egret.Tween): Promise<any> {
	return new Promise((resolve) => {
		tween.call(resolve);
	});
}

export function waitPromise(duration): Promise<any> {
	return new Promise((resolve) => {
		setTimeout(resolve, duration);
	});
}

export function callLater(callback, count = 1) {
	count--;
	egret.callLater(() => {
		if (count > 0) {
			this.callLater(callback, count);
		} else {
			callback();
		}
	}, this);
}

export class Bezier {
	private _onUpdate;
	private _posArr;

	constructor(onUpdate) {
		this._onUpdate = onUpdate;
	}

	init(posArr) {
		this._posArr = posArr;
		this.factor = 0;
	}

	public get factor(): number {
		return 0;
	}

	public set factor(value: number) {
		let p = this._posArr;
		let x = (1 - value) * (1 - value) * p[0].x + 2 * value * (1 - value) * p[1].x + value * value * p[2].x;
		let y = (1 - value) * (1 - value) * p[0].y + 2 * value * (1 - value) * p[1].y + value * value * p[2].y;

		this._onUpdate({x, y});
	}
}

export function enumChildren(container: egret.DisplayObjectContainer, callback: Function): void {
	for (let i = 0, li = container.numChildren; i < li; i++) {
		if (callback(container.getChildAt(i), i)) {
			break;
		}
	}
}

export function removeChildren(container: egret.DisplayObjectContainer, callback: Function): void {
	let i = 0;
	while (container.numChildren > 0) {
		callback(container.removeChildAt(0), i);
		i++;
	}
}

export function getDisplayPath(target) {
	let arr = [];
	let temp = target;
	do {
		arr.unshift(temp.parent.getChildIndex(temp));
	} while ((temp = temp.parent) && temp.parent);

	return arr;
}

export function getTargetByPath(root, link) {
	let target: any = root;
	for (let i = 0, li = link.length; i < li; i++) {
		try {
			target = target.getChildAt(link[i]);
		} catch (e) {
			return null;
		}
	}

	return target;
}
