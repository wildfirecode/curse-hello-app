/**
 * Created by rockyl on 2017/12/5.
 *
 * 自填充组件
 */

export class FullChild extends eui.Group {
	constructor() {
		super();

		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
	}

	protected onAddedToStage(event: egret.Event): void {
		this.addEventListener(egret.Event.RESIZE, this.onResize, this);
	}

	protected onRemovedFromStage(event: egret.Event): void {
		this.removeEventListener(egret.Event.RESIZE, this.onResize, this);
	}

	private onResize(event: egret.Event): void {
		if (this.numChildren > 0) {
			this.updateChild(this.getChildAt(0))
		}
	}

	private updateChild(child) {
		let scale;
		if (this.width / this.height > child.width / child.height) {
			scale = this.width / child.width;
		} else {
			scale = this.height / child.height;
		}

		child.scaleX = child.scaleY = scale;
	}
}
