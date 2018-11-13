/**
 * Created by admin on 2017/5/16.
 *
 * 弹窗控制器
 */
import CursePanel from "../curse/CursePanel";
import {init as initPopUpManager} from "@alienlib/popup/PopUpManager";

export default class PanelController {
	private static _instance: PanelController;
	public static get instance(): PanelController {
		if (this._instance == undefined) {
			this._instance = new PanelController();
		}
		return this._instance;
	}

	private _configured;

	private _registerMap:any = {};
	private _instanceMap:any = {};

	configure(rootView, panelConfigs) {
		if (this._configured) {
			return;
		}

		this._configured = true;

		initPopUpManager(rootView);

		for (let key in panelConfigs) {
			this.register(key, panelConfigs[key]);
		}
	}

	register(name, options) {
		this._registerMap[name] = options;
	}

	show(name, params?, callback?){
		let instance: CursePanel = this._instanceMap[name];
		let options = this._registerMap[name];
		if(!instance){
			instance = this._instanceMap[name] = new CursePanel(name, options);
		}

		instance.show(params, callback);

		return instance;
	}

	dealAction(name, action?, data?){
		let instance: CursePanel = this._instanceMap[name];
		if(!instance){
			return ;
		}

		instance.dealAction(action, data)
	}

	close(name){
		let instance: CursePanel = this._instanceMap[name];
		if(!instance){
			return ;
		}

		instance.close()
	}
}
