/**
 * Created by rockyl on 2018/8/20.
 *
 * 弹窗
 */

import {Flew} from "@alienlib/popup/PopupEffect";
import {PopupBase} from "@alienlib/popup/PopupBase";
import {awakeView, mountView, sleepView} from "./Manager";

export default class CursePanel extends PopupBase {
	options: any;
	data: any;

	constructor(name, options) {
		super(
			Flew, {direction: 'up', withFade: true, ease: egret.Ease.backOut},
			Flew, {direction: 'up', withFade: true, ease: egret.Ease.backIn},
		);

		this.name = name;
		this.options = options;
	}

	protected getSkinName(): any {
		return this.options.skin;
	}

	protected childrenCreated(): void {
		super.childrenCreated();

		mountView(this, this.name);
		//unmountScene(this, this.name);
	}

	async show(data, callback) {
		this.data = data;
		this._callback = callback;

		await this.popup();

		awakeView(this, this.name);
	}

	active(): void {
		super.active();
	}

	inactive(): void {
		super.inactive();

		sleepView(this, this.name);
	}
}
