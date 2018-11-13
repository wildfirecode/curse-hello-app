/**
 * Created by rockyl on 2018/10/10.
 */

import CurseComponent from "@core/curse/CurseComponent";
import {delayLoad,} from "../Utils";
import defenseService from "../services/DefenseService";
import {broadcast,} from "@core/curse/Manager";
import {waitPromise} from "@alienlib/tools/EgretUtils";
import PanelController from "@core/view/PanelController";
import {PANEL_RESULT} from "../model/constants";
import SceneController from "@core/view/SceneController";
import {catchError} from "@core/ErrorUtils";
import mainService from "../services/MainService";

export default class ScenePlay extends CurseComponent {
	btnAdjust: eui.Button = null;
	grpAdjust: eui.Group = null;

	protected onCreate() {
		super.onCreate();

		defenseService.setView(this.host);

		delayLoad();

		this.registerEvent(this.btnAdjust, egret.TouchEvent.TOUCH_TAP, this.onBtnAdjustTap, this);
	}

	protected awake() {
		super.awake();

		broadcast('reset');
		this.showAdjust();
	}

	protected sleep() {
		super.sleep();

		broadcast('stopGame');
	}

	protected destroy() {
		super.destroy();

	}

	private onBtnAdjustTap(event) {
		this.grpAdjust.visible = false;
		broadcast('resetOffset');

		catchError(this.tryStart());
	}

	private async tryStart(){
		await mainService.tryStartGame();
		PanelController.instance.close(PANEL_RESULT);
		this._startGame();
	}

	private async _startGame() {
		broadcast('readyGo');
		await waitPromise(3000);
		broadcast('startGame');
	}

	endGame(score){
		mainService.trySubmit(score);
		PanelController.instance.show(PANEL_RESULT, {score}, this.onPanelResult)
	}

	showAdjust() {
		this.grpAdjust.visible = true;
	}

	private onPanelResult=(action)=>{
		if(action == 'retry'){
			catchError(this.tryStart());
		}else{
			SceneController.back();
		}
	}
}
