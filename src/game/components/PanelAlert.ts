/**
 * Created by rockyl on 2018/10/11.
 *
 * 提示弹窗
 */

import CurseComponent from "@core/curse/CurseComponent";
import PanelController from "@core/view/PanelController";
import {PANEL_ALERT} from "../model/constants";

export default class PanelAlert extends CurseComponent {
	protected onCreate() {
		super.onCreate();

		const {btnConfirm} = this.host;
		this.registerEvent(btnConfirm, egret.TouchEvent.TOUCH_TAP, this.onBtnConfirmTap, this);
	}

	protected awake(): void {
		super.awake();
		const {labContent, btnConfirm} = this.host;

		const {content, button = 'Confirm'} = this.host.data;
		labContent.text = content;
		btnConfirm.label = button;
	}

	private onBtnConfirmTap(event) {
		PanelController.instance.dealAction(PANEL_ALERT);
	}
}
