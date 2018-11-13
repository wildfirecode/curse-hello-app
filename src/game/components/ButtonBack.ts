/**
 * Created by rockyl on 2018/10/10.
 */

import CurseComponent from "@core/curse/CurseComponent";
import SceneController from "@core/view/SceneController";

export default class ButtonBack extends CurseComponent{
	type: number;

	protected onCreate() {
		super.onCreate();

		this.registerEvent(this.host, egret.TouchEvent.TOUCH_TAP, this.onHostTap, this);
	}

	protected destroy() {
		super.destroy();

	}

	private onHostTap(event){
		SceneController.back();
	}
}
