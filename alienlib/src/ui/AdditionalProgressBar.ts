/**
 * Created by rockyl on 2018/1/22.
 *
 * 有附加部分的进度条
 */

export class AdditionalProgressBar extends eui.ProgressBar {
	public thumbAdditional: eui.UIComponent = null;
	private _additionalRect: egret.Rectangle;

	private _additional = 0;

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);

		switch (partName) {
			case 'thumbAdditional':
				this.thumbAdditional.scrollRect = this._additionalRect = new egret.Rectangle();

				egret.callLater(() => {
					this._additionalRect.height = this.thumbAdditional.height;
					this.thumbAdditional.scrollRect = this._additionalRect;
				}, this);

				break;
		}
	}

	protected updateSkinDisplayList(): void {
		super.updateSkinDisplayList();

		if (this.thumbAdditional) {
			this.renderAdditional();
		}
	}

	private renderAdditional() {
		this._additionalRect.width = this.thumbAdditional.width * this._additional / this.maximum;

		this.thumbAdditional.scrollRect = this._additionalRect;
	}

	get additional() {
		return this._additional;
	}

	set additional(value) {
		this._additional = Math.max((Math.min(value + this.value, this.maximum)), this.value);

		if (this.thumbAdditional) {
			this.invalidateDisplayList();
		}
	}
}
