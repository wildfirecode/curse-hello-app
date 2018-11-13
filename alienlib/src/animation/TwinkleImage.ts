/**
 * Created by rockyl on 2018/1/5.
 *
 * 闪烁图片
 */
import {Wave} from "./Wave";

export class TwinkleImage extends eui.Image {
	private _autoPlay = true;
	private _duration = 1000;
	private _max = 1;
	private _min = 0;
	private _loop = 0;

	private _wave;

	protected childrenCreated(): void {
		super.childrenCreated();

		this.resetWave();
		if (this._autoPlay) {
			this.play();
		}
	}

	private resetWave() {
		if (this._wave) {
			this._wave.stop();
		}
		this._wave = new Wave(this, this._duration, this.wave.bind(null, this._max, this._min), this._loop, false);
	}

	private wave(max, min, t) {
		return {
			alpha: (Math.sin(t) / 2 + 0.5) * (max - min) + min
		}
	}

	play() {
		this._wave.play();
	}

	stop() {
		this._wave.stop();
	}

	public get autoPlay() {
		return this._autoPlay;
	}

	public set autoPlay(value) {
		if (this._autoPlay != value) {
			this._autoPlay = value;
			this.resetWave();
		}
	}

	public get duration() {
		return this._duration;
	}

	public set duration(value) {
		if (this._duration != value) {
			this._duration = value;
			this.resetWave();
		}
	}

	public get max() {
		return this._max;
	}

	public set max(value) {
		if (this._max != value) {
			this._max = value;
			this.resetWave();
		}
	}

	public get min() {
		return this._min;
	}

	public set min(value) {
		if (this._min != value) {
			this._min = value;
			this.resetWave();
		}
	}

	public get loop() {
		return this._loop;
	}

	public set loop(value) {
		if (this._loop != value) {
			this._loop = value;
			this.resetWave();
		}
	}
}
