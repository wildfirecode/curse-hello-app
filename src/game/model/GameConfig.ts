/**
 * Created by rockyl on 2017/1/20.
 *
 * 游戏配置
 */

export default class GameConfig extends egret.HashObject {
	static gameName: string = 'curse-demo';

	static gameConfig: any = {};
	static appConfig: any = {};
	static defenseConfig: any = {};

	static parseConfig() {
		const {gameInfo, appInfo, defenseStrategy} = window['CFG'];
		const {gameConfig, appConfig, defenseConfig} = this;

		const {id, oaId, gameId} = gameInfo;
		gameConfig.id = id;
		gameConfig.oaId = oaId;
		gameConfig.gameId = gameId || window['gameId'];

		const {appId, earnCreditsUrl, open, openLogin} = appInfo;
		appConfig.appId = appId;
		appConfig.earnCreditsUrl = earnCreditsUrl;
		appConfig.open = open;
		appConfig.openLogin = openLogin;

		const {interfaceLimit = 50, scoreUnit = 0} = defenseStrategy;
		defenseConfig.interfaceLimit = interfaceLimit;
		defenseConfig.scoreUnit = scoreUnit;
	}

	static initData() {

	}
}
