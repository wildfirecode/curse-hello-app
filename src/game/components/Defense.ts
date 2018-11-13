/**
 * Created by rockyl on 2018/11/2.
 *
 * 防作弊组件
 */

import CurseComponent from "@core/curse/CurseComponent";
import GameConfig from "../model/GameConfig";
import * as api from "../net/api";

export default class Defense extends CurseComponent {
	collection: any[] = [];
	strategyCollection: any[] = [];
	pashCount;

	protected onCreate() {
		super.onCreate();

		this.registerEvent(this.host, egret.TouchEvent.TOUCH_BEGIN, this.onTouch.bind(this, 'md'), this);
	}

	protected awake() {
		super.awake();

	}

	protected sleep() {
		super.sleep();

	}

	protected destroy() {
		super.destroy();

	}

	private onTouch(type, e:egret.TouchEvent){
		const data = { a: type, t: Date.now(), x: e.stageX, y: e.stageY };
		/*let str = JSON.stringify(data);
		str = md5(str);
		let result = '';
		for(let i = 0, li = str.length; i < li; i++){
			result += Math.random() < 0.3 ? str.charAt(i) : '';
		}*/
		this.strategyCollection.push(data)
	}

	start() {
		this.collection.splice(0);
		this.strategyCollection.splice(0);
		this.pashCount = 0;
	}

	scoreChanged(score){
		const {interfaceLimit, scoreUnit} = GameConfig.defenseConfig;

		const nextDatapashScore = score - this.pashCount * scoreUnit;
		if (scoreUnit == 0 || nextDatapashScore < scoreUnit || this.pashCount > interfaceLimit) {
			return;
		}

		this.collection.push(this.strategyCollection.concat());
		api.datapash(this.strategyCollection);
		this.strategyCollection.splice(0);
		this.pashCount++;
	}

	close(){
		this.collection.push(this.strategyCollection.concat());

		return {
			strategyCollection: this.strategyCollection,
			collection: this.collection,
		}
	}
}