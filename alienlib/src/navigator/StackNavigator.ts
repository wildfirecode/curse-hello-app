/**
 * Created by rocky.l on 2017/1/17.
 *
 * 堆栈导航器
 */

export enum NavigatorAction {Push, Pop, Replace, Jump}

export interface INavigatorDelegate {
	onEnter(name: string, last: string, action: NavigatorAction, parameters: any);

	onLeave(name: string, next: string, action: NavigatorAction, parameters: any);

	onError(error: Error);
}

export class StackNavigator {
	private _stack: string[];
	private _delegate: INavigatorDelegate;

	constructor(delegate: INavigatorDelegate) {
		this._stack = [];
		this._delegate = delegate;
	}

	private catchPromise(p: Promise<any>) {
		if (p) {
			p.catch((e => {
				this._delegate.onError(e);
			}))
		}
	}

	push(name: string, parameters: any = null) {
		let last: string = this.getTopSceneName();
		if (last) {
			if (last == name) {
				return;
			}
			this.catchPromise(this._delegate.onLeave(last, name, NavigatorAction.Push, parameters));
		}
		this._stack.push(name);
		this.catchPromise(this._delegate.onEnter(name, last, NavigatorAction.Push, parameters));
	}

	popTo(index, name?: string, parameters: any = null) {
		if (this._stack.length > 0 && this._stack.length < (index + 1)) {
			return;
		}

		let last: string = this.getTopSceneName();
		this._stack.splice(Math.max(index + 1, 0));
		let next: string = this._stack[index];
		if (!next) {
			this._stack.push(next = name);
		}
		if (last) {
			this.catchPromise(this._delegate.onLeave(last, next, NavigatorAction.Pop, parameters));
		}
		this.catchPromise(this._delegate.onEnter(next, last, NavigatorAction.Pop, parameters));
	}

	pop(parameters: any = null) {
		this.popTo(this._stack.length - 2, null, parameters);
	}

	popAll(name: string, parameters: any = null) {
		this.popTo(-1, name, parameters);
	}

	replace(name: string, parameters: any = null) {
		let last: string = this._stack.pop();
		this._stack.push(name);

		this.catchPromise(this._delegate.onLeave(last, name, NavigatorAction.Replace, parameters));
		this.catchPromise(this._delegate.onEnter(name, last, NavigatorAction.Replace, parameters));
	}

	jump(name: string, parameters: any = null) {
		if (this._stack.length < 2) {
			this.push(name, parameters);
			return;
		}
		let last: string = this._stack.pop();
		this._stack.splice(1);
		let next: string = name;
		this._stack.push(next);
		this._delegate.onLeave(last, next, NavigatorAction.Pop, parameters);
		this._delegate.onEnter(next, last, NavigatorAction.Pop, parameters);
	}

	private getTopSceneName(): string {
		return this._stack.length > 0 ? this._stack[this._stack.length - 1] : null;
	}

	private getBottomSceneName(): string {
		return this._stack.length > 0 ? this._stack[0] : null;
	}
}

