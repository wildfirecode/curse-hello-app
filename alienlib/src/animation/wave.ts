/**
 * Created by rockyl on 16/3/9.
 */
import {IAnimation} from "./IAnimation";

export function round(h: number, t: number): any {
	return {x: Math.cos(t) * h, y: Math.sin(t) * h};
}

export function cos(h: number, t: number): any {
	return {x: Math.cos(t) * h, y: 0};
}

export function sin(h: number, t: number): any {
	h = h || 1;
	return {x: 0, y: Math.sin(t) * h};
}

export function rotate(t: number): any {
	return {r: 360 * t / Math.PI / 2};
}

export function shake(angle: number, count: number, t: number): any {
	return {r: Math.sin(t * count) * angle};
}

export function breath(scale: number = 0.1, t: number): any {
	return {sx: Math.sin(t) * scale + 1, sy: -Math.sin(t + Math.PI / 4) * scale + 1};
}

export function zoom(scale: number = 0.1, t: number): any {
	return {sx: Math.sin(t) * scale + 1, sy: Math.sin(t) * scale + 1};
}

export function fade(base = 1, t: number): any {
	return {alpha: (Math.sin(t) + 1) * 0.5 + base};
}

export class Wave implements IAnimation {
	_tween: egret.Tween;

	target: any;
	duration: number;
	delay: number;
	offset: number;
	loop: number;
	reverse: boolean;
	private _calProps;
	private _oldProperties: any = {};
	private _count;

	constructor(target: any, duration: number, calProps: Function = null, loop: number = 0, autoPlay: boolean = true, reverse: boolean = false, delay: number = 0, offset: number = 0) {
		this.target = target;
		this._calProps = calProps ? calProps : Wave.round;
		this.duration = duration;
		this.loop = loop;
		this.reverse = reverse;
		this.delay = delay;
		this.offset = offset;

		this.updateRegisterPos();

		if (autoPlay) {
			this.play();
		}
	}

	updateRegisterPos(): void {
		this._oldProperties.x = this.target.x;
		this._oldProperties.y = this.target.y;
		this._oldProperties.scaleX = this.target.scaleX;
		this._oldProperties.scaleY = this.target.scaleY;
		this._oldProperties.skewX = this.target.skewX;
		this._oldProperties.skewY = this.target.skewY;
		this._oldProperties.rotation = this.target.rotation;
		this._oldProperties.alpha = this.target.alpha;
	}

	play() {
		if (this._tween) {
			return this._tween;
		}

		this._count = 0;
		return this._playStep();
	}

	_playStep() {
		if (this.loop > 0 && this._count >= this.loop) {
			this.stop();

			return;
		}
		this._count++;

		this.t = this.reverse ? Math.PI * 2 : 0;

		this._tween = egret.Tween.get(this);
		this._tween.wait(this.delay).to({t: this.reverse ? 0 : Math.PI * 2}, this.duration).call(this._playStep, this);

		return this._tween;
	}

	private _t: number = 0;
	private get t(): number {
		return this._t;
	}

	private set t(value: number) {
		if (!this.target.stage) {
			return;
		}
		this._t = value;
		let props: any = this._calProps.call(this, this._t + this.offset);
		if (props.hasOwnProperty('x')) {
			this.target.x = (props.x || 0) + this._oldProperties.x;
		}
		if (props.hasOwnProperty('y')) {
			this.target.y = (props.y || 0) + this._oldProperties.y;
		}
		if (props.hasOwnProperty('sx')) {
			this.target.scaleX = props.sx;
		}
		if (props.hasOwnProperty('sy')) {
			this.target.scaleY = props.sy;
		}
		if (props.hasOwnProperty('skewX')) {
			this.target.skewX = props.skewX;
		}
		if (props.hasOwnProperty('skewY')) {
			this.target.skewY = props.skewY;
		}
		if (props.hasOwnProperty('r')) {
			this.target.rotation = props.r;
		}
		if (props.hasOwnProperty('alpha')) {
			this.target.alpha = props.alpha;
		}
	}

	stop(recovery: boolean = false, animation: boolean = false, duration: number = 1000): void {
		if (!this._tween) {
			return;
		}
		egret.Tween.removeTweens(this);

		if (recovery) {
			egret.Tween.get(this.target).to(this._oldProperties, duration);
		}
		this._tween = null;
	}

	get playing(): boolean {
		return this._tween != null;
	}
}
