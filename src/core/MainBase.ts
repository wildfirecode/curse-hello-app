import AssetAdapter from "./view/adapters/AssetAdapter";
import ThemeAdapter from "./view/adapters/ThemeAdapter";
import LoadingView from "./view/LoadingView";
import MainStage from "./MainStage";
import {Dispatcher} from "@alienlib/support";
import {init as initStageProxy} from "@alienlib/support/StageProxy";
import '../generated/MustCompile'

export default class MainBase extends eui.UILayer {
	constructor() {
		super();

		this.once(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
	}

	protected onAddedToStage() {
		Dispatcher.init();
		initStageProxy(this.stage, this);

		this.stage.scaleMode = egret.Capabilities.isMobile ? egret.StageScaleMode.FIXED_WIDTH : egret.StageScaleMode.SHOW_ALL;
		this.stage.orientation = egret.Capabilities.isMobile ? egret.OrientationMode.PORTRAIT : egret.OrientationMode.AUTO;
	}

	protected createChildren(): void {
		super.createChildren();

		egret.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
		egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

		this.runGame().catch(e => {
			console.log(e);
		})
	}

	private async runGame() {
		await this.loadResource();
		this.createGameScene();
	}

	private async loadResource() {
		try {
			egret.ImageLoader.crossOrigin = "anonymous";
			const resBasePath = window['resPath'] || '';
			await RES.loadConfig("default.res.json", resBasePath + "resource/");
			await this.loadTheme();
			let loadingView = LoadingView.instance;
			this.addChild(loadingView);
			await RES.loadGroup("common", 0, loadingView);
		}
		catch (e) {
			console.error(e);
		}
	}

	private loadTheme() {
		return new Promise((resolve, reject) => {
			let theme = new eui.Theme("resource/default.thm.json", this.stage);
			theme.addEventListener(eui.UIEvent.COMPLETE, () => {
				resolve();
			}, this);
		})
	}

	/**
	 * 创建场景界面
	 * Create scene interface
	 */
	protected createGameScene(): void {
		let mainStage:MainStage = MainStage.instance;
		this.addChildAt(mainStage, 0);
	}
}
