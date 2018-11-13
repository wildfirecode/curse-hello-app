/**
 * Created by admin on 2017/6/26.
 *
 * 主服务
 */

import GameConfig from "../model/GameConfig";
import Service from "../../core/Service";
import * as api from '../net/api'
import {authData, gameInfo} from "../model/data-center";
import {SCENE_FINAL_REWARD, SCENE_MENU} from "../model/constants";
import {PopUpManager} from "@alienlib/popup";
import SceneController from "../../core/view/SceneController";
import {doStart, getStartStatus, gameSubmit, getSubmitResult} from "../net/api";

class MainService extends Service {
	private playing;

	async start() {
		GameConfig.parseConfig();

		await super.start();

		// await Promise.all([
		// 	api.getInfo(),
		// 	//api.getCredits(),
		// 	//api.getPrizeInfo(drawPluginId),
		// 	//api.plugDrawInfo(drawPluginId),
		// ])
	}

	afterStart() {
		// const code = gameInfo.statusCode;
		// const sceneName = code == 4 || code == 5 ? SCENE_FINAL_REWARD :
		// 	SCENE_MENU;

		PopUpManager.removeAllPupUp();
		SceneController.popAll(SCENE_MENU);
	}

	async tryStartGame() {
		if(this.playing){
			return ;
		}

		await doStart();
		const {ticketId} = authData;
		await getStartStatus(ticketId);

		this.playing = true;
	}

	async trySubmit(score, collection?, strategyCollection?) {
		const {orderId} = await gameSubmit(score, strategyCollection, collection);
		const result = getSubmitResult(orderId);

		this.playing = false;

		return result;
	}
}

const mainService: MainService = new MainService();
export default mainService
