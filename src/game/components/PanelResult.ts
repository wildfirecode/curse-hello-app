/**
 * Created by rockyl on 2018/10/11.
 *
 * 结果弹窗
 */

import CurseComponent from "@core/curse/CurseComponent";
import PanelController from "@core/view/PanelController";
import {PANEL_RESULT, } from "../model/constants";
import lang from "@core/lang";

export default class PanelResult extends CurseComponent {
	btnRetry: eui.Button = null;
	btnClose: eui.Button = null;

	protected onCreate() {
		super.onCreate();

		this.host.addExcludeForClose(['retry']);

		this.registerEvent(this.btnRetry, egret.TouchEvent.TOUCH_TAP, this.onBtnRetryTap, this);
		this.registerEvent(this.btnClose, egret.TouchEvent.TOUCH_TAP, this.onBtnCloseTap, this);
	}

	private onBtnRetryTap(event) {
		PanelController.instance.dealAction(PANEL_RESULT, 'retry');
	}

	private onBtnCloseTap(event) {
		PanelController.instance.dealAction(PANEL_RESULT);
	}

	protected awake(): void {
		super.awake();

		const {labContent} = this.host;

		const {score} = this.host.data;
		labContent.text= lang.format(lang.result_text, score);
	}
}
