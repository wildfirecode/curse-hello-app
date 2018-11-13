/**
 * Created by rockyl on 16/3/30.
 *
 * 滚动图片
 */
import {ITicker, TickerManager} from "../support/TickerManager";

export class ScrollImage extends eui.Group implements ITicker {
	private _orgWidth: number;
	private _playing: boolean;
	private _bmp: eui.Image;

	public speedX: number = -0.5;
	public speedY: number = 0;
	public repeatedImage: string = '';

	constructor() {
		super();

		this.init();
	}

	private init(): void {
		this.scrollEnabled = true;

		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedToStage, this);
	}

	private onAddedToStage(event: egret.Event): void {
		if (this._playing) {
			TickerManager.register(this);
		}
	}

	private onRemovedToStage(event: egret.Event): void {
		TickerManager.unregister(this);
	}

	protected createChildren(): void {
		super.createChildren();

		let bmp = this._bmp = new eui.Image();
		this.addChild(bmp);
		bmp.source = this.repeatedImage;
		this._orgWidth = bmp.width;
		bmp.fillMode = egret.BitmapFillMode.REPEAT;
		bmp.width *= 2;

		this.play();
	}

	play(): void {
		if (this._playing) {
			return;
		}
		this._playing = true;
		TickerManager.register(this);
	}

	stop(): void {
		if (!this._playing) {
			return;
		}
		this._playing = false;
		TickerManager.unregister(this);
	}

	update(): void {
		this.scrollH -= this.speedX;
		if (this.speedX < 0 && this.scrollH > this._orgWidth) {
			this.scrollH -= this._orgWidth;
		}

		if (this.speedX > 0 && this.scrollH < 0) {
			this.scrollH += this._orgWidth;
		}

		/*this.scrollV -= this.speedY;
		if(this.speedY < 0 && this.scrollV > this._orgWidth){
			this.scrollV -= this._orgWidth;
		}*/
	}
}
