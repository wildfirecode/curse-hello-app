/**
 * Created by admin on 2017/5/16.
 *
 * 场景控制器
 */

import CurseNavigator from "../curse/Navigator";
import CurseScene from "../curse/CurseScene";

export default class SceneController {
	private static _instance: SceneController;
	public static get instance(): SceneController {
		if (this._instance == undefined) {
			this._instance = new SceneController();
		}
		return this._instance;
	}

	private _navigator: CurseNavigator;
	private _configured;

	configure(rootView, sceneConfigs, injectProps?) {
		if (this._configured) {
			return;
		}

		this._configured = true;

		this._navigator = new CurseNavigator(rootView, injectProps);

		for (let key in sceneConfigs) {
			this.register(key, sceneConfigs[key]);
		}
	}

	register(name, options) {
		this._navigator.registerScene(name, options);
	}

	get navigator() {
		return this._navigator;
	}

	active() {
		let scene: CurseScene = <CurseScene>this._navigator.currentView;
		scene.active();
	}

	inactive() {
		let scene: CurseScene = <CurseScene>this._navigator.currentView;
		scene.inactive();
	}

	static replace(name: string, parameters: any = null) {
		SceneController.instance.navigator.replace(name, parameters);
	}

	static goto(name: string, parameters: any = null) {
		SceneController.instance.navigator.push(name, parameters);
		return true;
	}

	static back(parameters: any = null) {
		SceneController.instance.navigator.pop(parameters);
	}

	static popAll(name: string, parameters: any = null) {
		SceneController.instance.navigator.popAll(name, parameters);
	}

	static jump(name: string, parameters: any = null) {
		SceneController.instance.navigator.jump(name, parameters);
	}
}
