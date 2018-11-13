/**
 * Created by rockyl on 2018/8/23.
 *
 * 防作弊服务
 */

import Service from "../../core/Service";
import GameConfig from "../model/GameConfig";
import * as api from "../net/api";

class DefenseService extends Service {
	collection: any[] = [];
	strategyCollection: any[] = [];
	pashCount;

	setView(view){
		this.registerEvent(view, egret.TouchEvent.TOUCH_BEGIN, this.onTouch.bind(this, 'md'), this);
	}

	reset() {
		this.collection.splice(0);
		this.strategyCollection.splice(0);
		this.pashCount = 0;
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

const defenseService: DefenseService = new DefenseService();
export default defenseService;