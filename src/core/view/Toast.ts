/**
 * Created by admin on 2017/9/14.
 *
 * Toast组件
 */
import {VisualEventComponent} from "@alienlib/support/EventComponent";
import {Dispatcher} from "@alienlib/support";
import {HIDE_TOAST, SHOW_TOAST} from "../model/events";

export default class Toast extends VisualEventComponent {
	private static _instance:Toast;
	public static get instance():Toast {
		return this._instance;
	}

	protected grp: eui.Group;
	protected labContent: eui.Label;

	private _queue;
	private _tween;

	constructor(){
		super();

		Toast._instance = this;
	}

	createChildren(): void {
		super.createChildren();

		this.grp.alpha = 0;
		this._queue = [];

		this.registerEvent(Dispatcher, SHOW_TOAST, this.onShow, this);
		this.registerEvent(Dispatcher, HIDE_TOAST, this.onClean, this);
	}

	addAndPlayOne(data = null){
		if(data && this._queue.length == 0 && !this._tween){
			this._queue.push(data);
		}
		else if(data && this._queue.length > 0 && data.content != this._queue[this._queue.length-1].text){
			this._queue.push(data);
		}

		if(this._queue.length == 0 || this._tween){
			return;
		}

		let item = this._queue.shift();

		let {content, color = 0xfff1d3, duration = 1000} = item;

		this.labContent.text = content;
		this.labContent.textColor = color;

		this._tween = egret.Tween.get(this.grp, null, null, true)
			.to({alpha: 1}, 300)
			.wait(duration)
			.to({alpha: 0}, 200)
			.call(()=>{
				this._tween = null;
				this.addAndPlayOne();
			});
	}

	clean(){
		this._queue.splice(0);
	}

	private onShow(event: egret.Event): void {
		this.addAndPlayOne(event.data);
	}

	private onClean(event: egret.Event): void {
		this.clean();
		egret.Tween.get(this.grp, null, null, true)
			.to({alpha: 0}, 200);
	}

	static show(data){
		Toast._instance.addAndPlayOne(data);
	}

	static clean(){
		Toast._instance.clean();
	}
}