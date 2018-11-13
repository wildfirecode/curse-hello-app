/**
 * Created by rockyl on 2018/10/10.
 */

import CurseComponent from "@core/curse/CurseComponent";
import SceneController from "@core/view/SceneController";
import {SCENE_PLAY} from "../model/constants";
import {catchError} from "@core/ErrorUtils";
import mainService from "../services/MainService";

export default class ButtonStart extends CurseComponent{
	type: number;

	protected onCreate() {
		super.onCreate();

		this.registerEvent(this.host, egret.TouchEvent.TOUCH_TAP, this.onHostTap, this);
	}

	private onHostTap(event){
		catchError(this.tryStart());
	}

	private async tryStart(){
		await mainService.tryStartGame();
		SceneController.goto(SCENE_PLAY);
	}
}
