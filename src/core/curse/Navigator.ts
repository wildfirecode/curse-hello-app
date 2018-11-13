/**
 * Created by admin on 2017/9/25.
 *
 * 自定义导航
 */

import {NavigatorAction} from "@alienlib/navigator/StackNavigator";
import {injectProp} from "@alienlib/tools/Utils";
import {INavigatorViewBase, Navigator} from "@alienlib/navigator/Navigator";
import Scene from "./Scene";
import CurseScene from "./CurseScene";

export default class CurseNavigator extends Navigator{
	private _rootView:eui.Group;
	private readonly _injectProps;
	private readonly _optionsMap;

	constructor(rootView:eui.Group, injectProps = {}){
		super();

		this._rootView = rootView;
		this._injectProps = injectProps;
		this._injectProps.navigator = this;
		this._optionsMap = {};
	}

	registerScene(name: string, options: any): void {
		this._optionsMap[name] = options;
	}

	protected newView(name: string): INavigatorViewBase {
		const view = new CurseScene(name, this._optionsMap[name]);
		injectProp(view, this._injectProps);

		return view;
	}

	protected addView(view:Scene, addToBottom){
		if(addToBottom){
			this._rootView.addChildAt(view, 0);
		}else{
			this._rootView.addChild(view);
		}
	}

	async onEnter(name: string, last: string, action: NavigatorAction, parameters: any): Promise<void> {
		this._rootView.touchThrough = true;
		await super.onEnter(name, last, action, parameters);
		this._rootView.touchThrough = false;
	}

	async onLeave(name: string, next: string, action: NavigatorAction, parameters: any): Promise<void> {
		await super.onLeave(name, next, action, parameters);
	}

	onError(error:Error): void {
		if(DEBUG){
			console.log(error);
		}

	}
}
