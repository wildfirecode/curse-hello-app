/**
 * Created by rockyl on 2018/10/10.
 */

import CurseComponent from "@core/curse/CurseComponent";
import PanelController from "@core/view/PanelController";
import {PANEL_RULE} from "../model/constants";

export default class ButtonRule extends CurseComponent{
	type: number;

	protected onCreate() {
		super.onCreate();

		this.registerEvent(this.host, egret.TouchEvent.TOUCH_TAP, this.onHostTap, this);
	}

	private onHostTap(event){
		PanelController.instance.show(PANEL_RULE)
	}
}
