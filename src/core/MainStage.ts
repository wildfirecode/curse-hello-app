/**
 * Created by rockyl on 2018/8/15.
 *
 * 主舞台
 */

import Service from "./Service";
import LoadingView from "./view/LoadingView";
import lang from "./lang";
import {catchError} from "./ErrorUtils";
import {ready as readyCurseManager} from "./curse/Manager";
import SceneController from "./view/SceneController";
import PanelController from "./view/PanelController";
import Toast from "./view/Toast";

import {getTweenPromise} from "@alienlib/tools/EgretUtils";
import {Dispatcher} from "@alienlib/support";

Toast;

export default class MainStage extends eui.Component {
	private static _instance: MainStage;
	public static get instance(): MainStage {
		if (this._instance == undefined) {
			this._instance = new MainStage();
		}
		return this._instance;
	}

	projectConfig: any;
	services: Service[];

	sceneContainer: eui.Group;
	popLayer: eui.Group;

	loadingView: LoadingView;

	constructor() {
		super();

		this.init();

		this.percentWidth = 100;
		this.percentHeight = 100;
		this.skinName = MainStageSkin;
	}

	protected init() {
		lang.initData();

		this.projectConfig = RES.getRes('project-config');
		this.services = this.projectConfig.settings.services.map(item => {
			return window[item + 'Service'];
		});
	}

	childrenCreated(): void {
		super.createChildren();

		this.addChildAt(this.loadingView = LoadingView.instance, 1);

		readyCurseManager(this.projectConfig.bindings);

		const sceneConfig = {};
		const panelConfig = {};
		for (let binding of this.projectConfig.bindings) {
			const {name, skin, resGroups} = binding;
			const config = {
				skin: skin,
				resGroupNames: resGroups,
			};
			if (binding.name.indexOf('scene') >= 0) {
				sceneConfig[name] = config;
			} else {
				panelConfig[name] = config;
			}
		}

		SceneController.instance.configure(this.sceneContainer, sceneConfig);
		PanelController.instance.configure(this.popLayer, panelConfig);

		Dispatcher.addEventListener('show_loading', this.showLoading, this);
		Dispatcher.addEventListener('show_black_layer', this.showBlackLayer, this);
		Dispatcher.addEventListener('hide_black_layer', this.hideBlackLayer, this);

		catchError(this.start());
	}

	showLoading(event) {
		const {needLoad} = event.data;
		this.loadingView.setState(needLoad ? 'loading' : 'blank');
		if (needLoad) {
			this.loadingView.setProgress(0, true);
		}
	}

	showBlackLayer(event) {
		const p = event.data;

		const layer = this.loadingView;

		Toast.clean();

		this.addChildAt(layer, 3);
		egret.Tween.get(layer, null, null, true)
			.to({alpha: 1}, 200)
	}

	hideBlackLayer(event) {
		const p = event.data;

		const layer = this.loadingView;

		if (!this.contains(layer)) {
			return Promise.resolve();
		}

		p.then(
			(data) => {
				return getTweenPromise(
					egret.Tween.get(layer, null, null, true)
						.to({alpha: 0}, 200).call(() => {
						if (this.contains(layer)) {
							this.removeChild(layer);
						}
					})
				)
			}
		)
	}

	async start(params = null) {
		await Promise.all(this.services.map(service => service.start()));

		this.services.forEach(service => service.afterStart())
	}

	async stop() {
		return Promise.all(this.services.map(service => service.stop()));
	}
}
