/**
 * Created by rockyl on 16/8/4.
 */
import {VisualEventComponent} from "../support/EventComponent";

export class ViewStack extends VisualEventComponent {
	private _viewDefs: any[];
	private _selectedIndex: number = -1;
	private _lastParams: any;

	views: any[] = [];

	setup(...defs): void {
		this._viewDefs = defs;
	}

	public get selectedIndex(): number {
		return this._selectedIndex
	}

	public setSelectedIndex(value: number, params: any = null, force = false) {
		if (this._selectedIndex != value) {
			this._hideView(this._selectedIndex);
		}
		if (force || this._selectedIndex != value) {
			this._selectedIndex = value;

			if (this._viewDefs && this._selectedIndex >= 0 && this._selectedIndex < this._viewDefs.length) {
				this._showView(this._selectedIndex, params);
			}
		}
	}

	public set selectedIndex(value: number) {
		this.setSelectedIndex(value);
	}

	public get selectedChild(): egret.DisplayObject {
		return this.numChildren == 0 ? null : this.getChildAt(0);
	}

	private _hideView(index: number): void {
		let view: egret.DisplayObject = this.views[index];
		if (view && view['inactive']) {
			view['inactive']();
		}
	}

	private createView(index) {
		let config = this._viewDefs[index];
		let {def, params} = config;
		let view: egret.DisplayObject = this.views[index] = new def();
		if (view['initData']) {
			view['initData'](params);
		}
		return view;
	}

	private _showView(index: number, params: any = null): void {
		this._lastParams = params;

		let view: egret.DisplayObject = this.views[index];
		if (!view) {
			view = this.createView(index);
		}
		this.removeChildren();
		this.addChild(view);

		if (view['active']) {
			view['active'](params);
		}
	}

	get currentView() {
		return this.numChildren > 0 ? this.getChildAt(0) : null;
	}

	enableEvents() {
		super.enableEvents();

		let view = this.currentView;
		if (view && view['active']) {
			view['active'](this._lastParams);
		}
	}

	disableEvents() {
		super.disableEvents();

		let view = this.currentView;
		if (view && view['inactive']) {
			view['inactive']();
		}
	}
}
