/**
 * Created by rockyl on 2017/1/19.
 *
 * 场景
 */

import {INavigatorViewBase} from "@alienlib/navigator/Navigator";
import {Dispatcher} from "@alienlib/support";
import {NavigatorAction} from "@alienlib/navigator/StackNavigator";
import {ResourceLoader} from "@alienlib/egret";
import {waitPromise} from "@alienlib/tools/EgretUtils";
import CurseNavigator from "./Navigator";

export default class Scene extends eui.Component implements INavigatorViewBase {
	public navigator: CurseNavigator;
	private needLoad: boolean;

	private resolveEnter;
	private resolveLeave;

	constructor() {
		super();

		this.onBeginLoadResGroups = this.onBeginLoadResGroups.bind(this);
		this.onEndLoadResGroups = this.onEndLoadResGroups.bind(this);
		this.onProgress = this.onProgress.bind(this);
	}

	protected get tweenEnter(): egret.tween.TweenGroup {
		return this['enter' + (this.currentState ? '_' + this.currentState : '')];
	}

	protected get tweenLeave(): egret.tween.TweenGroup {
		return this['leave' + (this.currentState ? '_' + this.currentState : '')];
	}

	protected childrenCreated(): void {
		super.childrenCreated();

		this.percentWidth = this.percentHeight = 100;

		let tween;
		if (this.tweenEnter) {
			this.tweenEnter.addEventListener(egret.Event.COMPLETE, this.onTweenEnterComplete, this);
		} else if (this.skin) {
			this.skin.states.forEach(state => {
				if (tween = this['enter_' + state.name]) {
					tween.addEventListener(egret.Event.COMPLETE, this.onTweenEnterComplete, this);
				}
			})
		}
		if (this.tweenLeave) {
			this.tweenLeave.addEventListener(egret.Event.COMPLETE, this.onTweenLeaveComplete, this);
		} else if (this.skin) {
			this.skin.states.forEach(state => {
				if (tween = this['leave_' + state.name]) {
					tween.addEventListener(egret.Event.COMPLETE, this.onTweenLeaveComplete, this);
				}
			})
		}
	}

	protected getResGroupNames(): string[] {
		return null;
	}

	protected getSkinName(): any {
		return null;
	}

	protected onBeginLoadResGroups(needLoad) {

	}

	protected onEndLoadResGroups() {

	}

	protected onProgress(current, total) {
		Dispatcher.dispatch('RES_LOAD_PROGRESS', {current, total})
	}

	active() {

	}

	inactive() {

	}

	onWillUnMount(next: string, action: NavigatorAction, parameters: any): Promise<any> {
		return Promise.resolve()
	}

	protected onSkinOn() {

	}

	onAddView(): boolean {
		return true;
	}

	onDidEnter(last: string, action: NavigatorAction, parameters: any): void {
	}

	onDidLeave(next: string, action: NavigatorAction, parameters: any): void {
		if (this.parent) {
			this.parent.removeChild(this);
		}

		/*if(action != NavigatorAction.Push){
			let resGroupNames = this.getResGroupNames();
			if(resGroupNames){
				resGroupNames.forEach((resGroupName)=>{
					RES.destroyRes(resGroupName, false);
				});
			}
		}*/
	}

	protected shouldShowLeaveLayer(next, action, parameters) {
		return true;
	}


	protected onBeginLoadResGroups(needLoad) {
		this.needLoad = needLoad;
		Dispatcher.dispatch('show_loading', {needLoad})
	}

	protected onEndLoadResGroups() {

	}

	async onWillMount(next: string, action: NavigatorAction, parameters: any): Promise<any> {
		let resGroupNames = this.getResGroupNames();
		let p: Promise<any> = ResourceLoader.load(resGroupNames, this.onProgress, this.onBeginLoadResGroups, this.onEndLoadResGroups);

		await waitPromise(500);
		await p.then(() => {
			if (!this.skinName) {
				let skinName = this.getSkinName();
				if (skinName) {
					this.skinName = skinName;
				}
			} else {
				this.onSkinOn();
			}
		});
	}

	async onWillEnter(last: string, action: NavigatorAction, parameters: any): Promise<any> {
		this.resetScene(parameters);
		this.active();
		await waitPromise(100);
		if (this.tweenEnter) {
			this.tweenEnter.play(0);
		}
		this.onPlayEnter();
		const p = Promise.resolve();
		Dispatcher.dispatch('hide_black_layer', p);
		await p;
		await this.waitingForEnter();
	}

	private waitingForEnter() {
		return new Promise(resolve => {
			if (this.tweenEnter && this.resolveEnter === false) {
				this.resolveEnter = resolve;
			} else {
				resolve();
			}
		});
	}

	async onWillLeave(next: string, action: NavigatorAction, parameters: any): Promise<any> {
		if (this.tweenLeave) {
			this.tweenLeave.play(0);
		}
		this.onPlayLeave();
		await this.waitingForLeave();
		if (this.shouldShowLeaveLayer(next, action, parameters)) {
			Dispatcher.dispatch('show_black_layer');
			await waitPromise(300);
		}
		this.inactive();
	}

	private waitingForLeave() {
		return new Promise(resolve => {
			if (this.tweenLeave) {
				this.resolveLeave = resolve;
			} else {
				resolve();
			}
		});
	}

	private onTweenEnterComplete(event: egret.Event): void {
		this.resolveEnter && this.resolveEnter();
		this.resolveEnter = null;
	}

	private onTweenLeaveComplete(event: egret.Event): void {
		this.resolveLeave && this.resolveLeave();
		this.resolveLeave = null;
	}

	protected onPlayEnter() {

	}

	protected onPlayLeave() {

	}

	protected resetScene(parameters) {

	}

	protected goto(name, parameters = null) {
		this.navigator.push(name, parameters);
	}

	protected back(parameters = null) {
		this.navigator.pop(parameters);
	}
}