/**
 * Created by admin on 2017/6/16.
 *
 * 存储数据服务
 */

import Service from "../../core/Service";
import {LocalStorage} from "@alienlib/support";
import {SETTING_CHANGED} from "../model/events";

class StorageService extends Service{
	protected store:any;

	protected _initialized;

	start(): Promise<any> {
		this.load();

		this.store.launch_count = this.store.launch_count ? this.store.launch_count + 1 : 1;
		this.save();

		return super.start();
	}

	private load(){
		this.store = LocalStorage.getItemObj('store', {});
	}

	save(){
		LocalStorage.setItemObj('store', this.store);
	}
	
	clean(keeps = null){
		if(keeps){
			for(let k in this.store){
				if(keeps.indexOf(k) < 0 && this.store.hasOwnProperty(k)){
					delete this.store[k];
				}
			}
		}else{
			this.store = {};
		}
		this.save();
		this._initialized = false;
	}

	get launchCount(){
		return this.store.launch_count;
	}

	getSettingItem(field){
		return this.store.setting ? (this.store.setting[field] === undefined ? true : this.store.setting[field]) : true;
	}

	setSettingItem(field, value, dispatch = true){
		let setting = this.store.setting;
		if(!setting){
			setting = this.store.setting = {};
		}

		setting[field] = value;
		this.save();

		if(dispatch){
			this.dispatchEventWith(SETTING_CHANGED, false, {field, value});
		}
	}

	switchSettingItem(field, dispatch = true){
		this.setSettingItem(field, !this.getSettingItem(field), dispatch);
	}
}

const storageService:StorageService = new StorageService();
export default storageService;