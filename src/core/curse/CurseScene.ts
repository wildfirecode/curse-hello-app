/**
 * Created by rockyl on 2018/8/15.
 *
 * Curse场景
 */

import {NavigatorAction} from "@alienlib/navigator/StackNavigator";
import Scene from "./Scene";
import {awakeView, mountView, setCurrentGroup, sleepView, unMountView} from "./Manager";

export default class CurseScene extends Scene {
	options: any;

	constructor(name, options){
		super();

		this.name = name;
		this.options = options;
	}

	protected getSkinName(): any {
		return this.options.skin;
	}

	protected getResGroupNames(): string[] {
		return this.options.resGroupNames;
	}

	async onWillEnter(last: string, action: NavigatorAction, parameters: any): Promise<any> {
		setCurrentGroup(this.name);
		awakeView(this, this.name);

		return super.onWillEnter(last, action, parameters);
	}

	async onWillLeave(next: string, action: NavigatorAction, parameters: any): Promise<any> {
		sleepView(this, this.name);

		return super.onWillLeave(next, action, parameters);
	}

	active(): void {
		super.active();

	}

	inactive(): void {
		super.inactive();

	}

	childrenCreated(): void {
		super.childrenCreated();

		setCurrentGroup(this.name);
		mountView(this, this.name);
		//unmountScene(this, this.name);
	}
}
