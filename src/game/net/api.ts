/**
 * Created by rockyl on 2018/8/21.
 *
 * api
 */

import {injectProp} from "@alienlib/tools/Utils";
import {md5} from "@alienlib/tools/md5";
import webService from "../../core/WebService";
import {authData, gameInfo, pluginInfos} from "../model/data-center";
import GameConfig from "../model/GameConfig";

export async function getToken() {
	return new Promise((resolve, reject) => {
		if (window['getDuibaToken']) {
			getDuibaToken(
				({token}) => {
					resolve(token);
				},
				(key, msg) => {
					reject(msg);
				}
			)
		} else {
			resolve();
		}
	});
}

export async function getCredits() {
	const {unitName, credits} = await webService.callApi(
		'/ctool/getCredits',
		{},
		'get'
	);

	gameInfo.creditUnit = unitName;
}

export async function getInfo() {
	gameInfo.update(
		await webService.callApi(
			'/ngame/new/getInfo',
			{id: GameConfig.gameConfig.gameId},
			'get'
		)
	);
}

export async function getRule() {
	return await webService.callApi(
		'/ngapi/getRule',
		{id: GameConfig.gameConfig.gameId},
		'post',
		'html'
	)
}

export async function getRealtimeRank(type, count = 50) {
	return await webService.callApi(
		'/ngapi/realtimerank/' + type,
		{
			id: GameConfig.gameConfig.gameId,
			count,
		},
		'get'
	)
}

export async function doStart(credits = null, customizedType = null) {
	let {gameId, oaId} = GameConfig.gameConfig;

	const params: any = {
		id: gameId,
		oaId: oaId
	};

	if (credits) {
		params.credits = credits;
	}
	if (customizedType) {
		params.customizedType = customizedType;
	}

	params.token = await getToken();
	const {token, submitToken, ticketId} = await webService.callApi(
		'/ngapi/dostart',
		params
	);

	injectProp(authData, {
		token: devil(token),
		submitToken: devil(submitToken),
		ticketId
	})
}

export async function getStartStatus(ticketId, customizedType = null) {
	const params: any = {
		ticketId: ticketId
	};
	if (customizedType) {
		params.customizedType = customizedType
	}

	return await webService.polling(
		data => {
			return data.code === 1
		},
		'/ngapi/getStartStatus',
		params
	);
}

export async function getPrizeInfo(activityId) {
	pluginInfos[activityId] = await webService.callApi(
		'/activityPlugDrawInfo/getPrizeInfo',
		{activityId},
		'get'
	);
}

export async function plugDrawInfo(activityId) {
	const {plugin} = await webService.callApi(
		'/plugin/plugDrawInfo',
		{id: activityId},
		'get'
	);

}

export async function datapash(collection) {
	await webService.callApi(
		'/ngame/new/datapash',
		{
			gameId: GameConfig.gameConfig.id,
			ticketId: authData.ticketId,
			dynamicData: JSON.stringify(collection),
		}
	);
}

export async function getRankRewardList(showName = false) {
	return webService.callApi(
		'/ngapi/winranks',
		{
			id: GameConfig.gameConfig.gameId,
			showName,
		}
	);
}

export async function draw(activityId, deductCredits = false) {
	const {orderId} = await doJoinPlugDraw(activityId, deductCredits);
	return getPlugOrderStatus(orderId);
}

export async function doJoinPlugDraw(activityId, deductCredits = false) {
	return webService.callApi(
		'/activityPlugDrawInfo/doJoinPlugdraw',
		{activityId, deductCredits}
	);
}

export async function getPlugOrderStatus(orderId) {
	return webService.polling(
		function (data) {
			return data.result != 0;
		},
		'/plugin/getOrderStatus',
		{orderId},
		10,
	);
}

export async function gameSubmit(score, gameData = [], dynamicData = [[]]) {
	const {submitToken, ticketId} = authData;

	const gameDataStr = JSON.stringify(gameData);
	const dynamicDataStr = JSON.stringify(dynamicData);

	let sign = md5(ticketId + '' + score + '' + gameDataStr + '' + submitToken);

	const data = await webService.callApi(
		'/ngame/new/submit',
		{
			ticketId,
			score,
			gameData: gameDataStr,
			sgin: sign,
			dynamicData: dynamicDataStr
		}
	);

	gameInfo.update(data.rsp);

	return data;
}

export async function getSubmitResult(orderId) {
	const params: any = {
		orderId
	};

	return await webService.polling(
		data => {
			return !data.flag;
		},
		'/ngame/new/getSubmitResult',
		params
	);
}

export async function getBaiduGameInfo() {
	updateBaiduGameInfo(await webService.callApi(
		'/aaw/baidu/api/getInfo',
		{
			activityId: GameConfig.gameConfig.gameId,
		},
		'get'
	));
}

export async function addTimes(type) {
	return webService.callApi(
		'/aaw/baidu/api/addTimes',
		{
			activityId: GameConfig.gameConfig.gameId,
			type,
		},
		'get'
	);
}

export async function doPlay() {
	return webService.callApi(
		'/aaw/baidu/api/doPlay',
		{
			activityId: GameConfig.gameConfig.gameId,
		}
	);
}
