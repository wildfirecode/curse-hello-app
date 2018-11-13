/**
 * Created by rockyl on 2018/9/29.
 *
 * 埋点服务
 */

import Service from "../../core/Service";
import GameConfig from "../model/GameConfig";
import {JSONP} from "@alienlib/tools/Ajax";
import BuriedPoint from "../model/BuriedPoint";
import {gameInfo} from "../model/data-center";
import webService from "../../core/WebService";

class BuriedPointService extends Service {
	private _buriedPoints: any = {};

	env: any;

	async start(): Promise<void> {
		await super.start();

		this.initEnv();
	}

	initEnv(){
		this.env = {
			app_id: GameConfig.appConfig.appId,
			oaid: GameConfig.gameConfig.oaId,
		}
	}

	addBuriedPoints(buriedPoints) {
		for (let name in buriedPoints) {
			this._buriedPoints[name] = buriedPoints[name];
		}
	}

	addBuriedPointConfig(name, config) {
		const {dpm, dcm} = config;
		this._buriedPoints[name] = new BuriedPoint(dpm, dcm, this.env);
	}

	addBuriedPointConfigs(configs) {
		for (let name in configs) {
			this.addBuriedPointConfig(name, configs[name]);
		}
	}

	logExposure(name) {
		return this.log(name, 'exposure');
	}

	logClick(name) {
		return this.log(name, 'click');
	}

	log(name, type) {
		let logPoint = this._buriedPoints[name];
		
		// let {consumerId} = gameInfo;
		// let {appId} = GameConfig.appConfig;
		let {dpm, dcm} = logPoint;
		console.log('发了个曝光埋点','dpm',dpm,'dcm',dcm)

		// if (type == 'exposure') {
		// 	return JSONP('//embedlog.duiba.com.cn/exposure/standard', {
		// 		dpm, dcm, consumerId, appId,
		// 	}, 'get').catch(e => {
		// 		//console.log(e);
		// 	});
		// } else {
		// 	return webService.callApi(
		// 		'/log/click',
		// 		{
		// 			dpm, dcm, consumerId, appId
		// 		},
		// 		'get'
		// 	).catch(e => {
		// 		//console.log(e);
		// 	});
		// }
	}
}

const buriedPointService: BuriedPointService = new BuriedPointService();
export default buriedPointService;
