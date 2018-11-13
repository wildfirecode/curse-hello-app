/**
 * Created by rocky.l on 2017/1/19.
 *
 * 场景导航器
 */
import {INavigatorDelegate, NavigatorAction, StackNavigator} from "./StackNavigator";

export interface INavigatorViewBase {
	onAddView(): boolean;

	onWillMount(last: string, action: NavigatorAction, parameters: any): Promise<any>;

	onWillUnMount(next: string, action: NavigatorAction, parameters: any): Promise<any>;

	onWillEnter(last: string, action: NavigatorAction, parameters: any): Promise<any>;

	onDidEnter(last: string, action: NavigatorAction, parameters: any): void;

	onWillLeave(next: string, action: NavigatorAction, parameters: any): Promise<any>;

	onDidLeave(next: string, action: NavigatorAction, parameters: any): void;
}

export class Navigator extends egret.EventDispatcher implements INavigatorDelegate {
	static VIEW_WILL_ENTER: string = 'VIEW_WILL_ENTER';
	static VIEW_DID_ENTER: string = 'VIEW_DID_ENTER';
	static VIEW_WILL_LEAVE: string = 'VIEW_WILL_LEAVE';
	static VIEW_DID_LEAVE: string = 'VIEW_DID_LEAVE';

	public static log = false;

	stack: StackNavigator;

	protected _classDic: any;
	protected _instanceDic: any;
	protected _currentName: string;
	protected _currentView: INavigatorViewBase;

	constructor() {
		super();

		this._classDic = {};
		this._instanceDic = {};

		this.stack = new StackNavigator(this);
	}

	register(name: string, clazz: any): void {
		this._classDic[name] = clazz;
	}

	push(name: string, parameters: any = null) {
		this.stack.push(name, parameters);
	}

	pop(parameters: any = null) {
		this.stack.pop(parameters);
	}

	popToBottom(parameters: any = null) {
		this.stack.popTo(0, null, parameters);
	}

	popAll(name: string, parameters: any = null) {
		this.stack.popAll(name, parameters);
	}

	replace(name: string, parameters: any = null) {
		this.stack.replace(name, parameters);
	}

	jump(name: string, parameters: any = null) {
		this.stack.jump(name, parameters);
	}

	get currentView(): INavigatorViewBase {
		return this._currentView;
	}

	get currentName(): string {
		return this._currentName;
	}

	protected newView(name: string): INavigatorViewBase {
		return new this._classDic[name]();
	}

	protected getViewInstanceByName(name: string): INavigatorViewBase {
		let view: INavigatorViewBase = this._instanceDic[name];
		if (!view) {
			view = this._instanceDic[name] = this.newView(name);
		}

		return view;
	}

	protected addView(view: INavigatorViewBase, addToBottom) {

	}

	/**
	 * 栈入实现
	 * @param name
	 * @param last
	 * @param action
	 * @param parameters
	 * @returns {Promise<void>}
	 */
	async onEnter(name: string, last: string, action: NavigatorAction, parameters: any) {
		let view: INavigatorViewBase = this.getViewInstanceByName(name);
		this._currentView = view;
		this._currentName = name;
		await view.onWillMount(last, action, parameters);
		let addToBottom = view.onAddView();
		this.addView(view, addToBottom);
		if (Navigator.log) console.log(name + ' will enter.');
		this.dispatchEventWith(Navigator.VIEW_WILL_ENTER, false, {name, last, action, parameters});
		await view.onWillEnter(last, action, parameters);
		if (Navigator.log) console.log(name + ' did enter.');
		this.dispatchEventWith(Navigator.VIEW_DID_ENTER, false, {name, last, action, parameters});
		view.onDidEnter(last, action, parameters);
	}

	/**
	 * 栈出实现
	 * @param name
	 * @param next
	 * @param action
	 * @param parameters
	 * @returns {Promise<void>}
	 */
	async onLeave(name: string, next: string, action: NavigatorAction, parameters: any) {
		let view: INavigatorViewBase = this.getViewInstanceByName(name);
		await view.onWillUnMount(name, action, parameters);
		if (Navigator.log) console.log(name + ' will leave.');
		this.dispatchEventWith(Navigator.VIEW_WILL_LEAVE, false, {name, next, action, parameters});
		await view.onWillLeave(next, action, parameters);
		if (Navigator.log) console.log(name + ' did leave.');
		this.dispatchEventWith(Navigator.VIEW_DID_LEAVE, false, {name, next, action, parameters});
		view.onDidLeave(next, action, parameters);
	}

	/**
	 * 当收到错误实现
	 * @param error
	 */
	onError(error: Error) {

	}
}
