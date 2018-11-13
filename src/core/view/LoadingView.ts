/**
 * Created by rockyl on 2018/8/27.
 *
 * 加载视图
 */
import {Dispatcher} from "@alienlib/support";

export default class LoadingView extends eui.Component implements RES.PromiseTaskReporter {
	private static _instance:LoadingView;
	public static get instance():LoadingView {
		if (this._instance == undefined) {
			this._instance = new LoadingView();
		}
		return this._instance;
	}
	
	public progressBar: eui.ProgressBar;

	constructor() {
		super();

		this.percentWidth = this.percentHeight = 100;
		this.skinName = LoadingViewSkin;

		this.onProgress(0, 100);

		Dispatcher.addEventListener('RES_LOAD_PROGRESS', function(e){
			const {current, total} = e.data;
			
			this.setProgress(current/total);
		}, this)
	}

	public setProgress(process, immediately: boolean = false){
		let d = this.progressBar.slideDuration;
		if(immediately){
			this.progressBar.slideDuration = 0;
		}
		this.progressBar.value = Math.floor(process * 100);
		if(immediately){
			this.progressBar.slideDuration = d;
		}
	}

	public onProgress(current: number, total: number): void {
		this.setProgress(current/total);
	}

	setState(state){
		this.currentState = state;
	}
}
