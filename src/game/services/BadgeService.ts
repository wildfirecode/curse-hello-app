/**
 * Created by rockyl on 2018/8/23.
 *
 * 任务服务
 */

import {BADGE_CHANGED} from "../model/events";
import Service from "../../core/Service";

class BadgeService extends Service {
	items: any;

	async start(): Promise<void> {
		await super.start();

		this.items = {};
	}

	private getItem(name){
		let item = this.items[name];
		if(!item){
			item = this.items[name] = {
				number: 0,
			};
		}

		return item;
	}

	private updateItem(name, item, number){
		item.number = number;
		
		this.dispatchEventWith(BADGE_CHANGED, false, {name, number})
	}

	update(name, number){
		const item = this.getItem(name);
		this.updateItem(name, item, number);
	}

	change(name, number){
		const item = this.getItem(name);
		this.updateItem(name, item, item.number + number);
	}
	
	getNumber(name){
		const item = this.getItem(name);
		return item.number;
	}
}

const badgeService: BadgeService = new BadgeService();
export default badgeService;
