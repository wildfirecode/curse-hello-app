/**
 * Created by rockyl on 2018/10/11.
 *
 * 规则弹窗
 */

import CurseComponent from "@core/curse/CurseComponent";
import PanelController from "@core/view/PanelController";
import {PANEL_RULE} from "../model/constants";
import {getRule} from "../net/api";
import {parseHtmlText} from "@alienlib/tools/Utils";

export default class PanelRule extends CurseComponent {
	button: string;

	protected onCreate() {
		super.onCreate();

		const {labContent, btnConfirm} = this.host;
		labContent.text= '';
		btnConfirm.label = this.button;

		this.readyRule();

		this.registerEvent(btnConfirm, egret.TouchEvent.TOUCH_TAP, this.onBtnConfirmTap, this);
	}

	private async readyRule(){
		const {labContent} = this.host;

		let content = await getRule();
		labContent.textFlow = parseHtmlText(content);
	}

	private onBtnConfirmTap(event) {
		PanelController.instance.dealAction(PANEL_RULE);
	}
}
