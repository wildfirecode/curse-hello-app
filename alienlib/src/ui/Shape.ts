/**
 * Created by rocky.l on 2017/9/2.
 */
import {VisualEventComponent} from "../support/EventComponent";

export class Shape extends VisualEventComponent {
	protected _shape: egret.Shape;

	constructor() {
		super();

		this._shape = new egret.Shape();
		this.addChild(this._shape);
	}

	protected childrenCreated(): void {
		super.childrenCreated();

		this.onResize();
		this.registerEvent(this, egret.Event.RESIZE, this.onResize, this);
	}

	protected onResize(event: egret.Event = null): void {
		let g = this._shape.graphics;
		this.redraw(g);
	}

	protected redraw(graphics: egret.Graphics) {

	}
}

