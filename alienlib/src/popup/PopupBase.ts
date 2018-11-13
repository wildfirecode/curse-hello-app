/**
 * Created by rockyl on 16/3/9.
 */

import {None} from "./PopupEffect";
import {addPopUp, removePopUp} from "./PopUpManager";
import {checkNeedLoad, loadResGroups} from "../tools/ResGroupsLoader";
import {EventComponent} from "../support/EventComponent";

export class PopupBase extends eui.Component {
	protected showEffect: any;
	protected showEffectParams: any;
	protected closeEffect: any;
	protected closeEffectParams: any;
	protected popupShowBanner: boolean;

	protected _callback: Function;
	protected _excludeActionsClose: string[] = [];

	constructor(showEffect: any = null, showEffectParams: any = null, closeEffect: any = null, closeEffectParams: any = null, popupShowBanner: boolean = false) {
		super();

		this.showEffect = showEffect || None;
		this.showEffectParams = showEffectParams;

		this.closeEffect = closeEffect || None;
		this.closeEffectParams = closeEffectParams;

		this.popupShowBanner = popupShowBanner;

		this._excludeActionsClose = [];
		this.init();
	}

	protected init(): void {

	}

	protected getResGroupNames(): string[] {
		return null;
	}

	protected onBeginLoadResGroups() {

	}

	protected onEndLoadResGroups() {

	}

	protected getSkinName(): any {
		return null;
	}

	/**
	 * 添加不用关闭的动作
	 * @param actions
	 */
	addExcludeForClose(actions: string[]): void {
		this._excludeActionsClose = this._excludeActionsClose.concat(actions);
	}

	dealAction = (action: string = null, data: any = null) => {
		if (this._callback) {
			this._callback(action || 'close', data);
		}

		if (this._excludeActionsClose.indexOf(action) < 0) {
			this.close();

			this._callback = null;
		}
	};

	async popup(modalTouchFun: Function = null, modal: boolean = true, modalConfig: any = null) {
		let resGroupNames = this.getResGroupNames();
		if (resGroupNames && resGroupNames.length > 0 && checkNeedLoad(resGroupNames)) {
			this.onBeginLoadResGroups();
			await loadResGroups(resGroupNames);
			this.onEndLoadResGroups();
		} else {
			this.onEndLoadResGroups();
		}

		if (!this.skinName) {
			let skinName = this.getSkinName();
			if (skinName) {
				this.skinName = skinName;
			}
		}

		this._popup(modalTouchFun, modal, modalConfig);
	}

	private _popup(modalTouchFun: Function = null, modal: boolean = true, modalConfig: any = null) {
		addPopUp(this, this.showEffect, this.showEffectParams, modalTouchFun, modal, modalConfig);
	}

	close(): void {
		removePopUp(this, this.closeEffect, this.closeEffectParams);
	}

	active() {
		
	}

	inactive() {
		
	}
}
