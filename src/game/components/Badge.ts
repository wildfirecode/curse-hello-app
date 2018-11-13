/**
 * Created by rockyl on 2018/9/26.
 *
 * 角标
 */

import CurseComponent from "@core/curse/CurseComponent";
import badgeService from "../services/BadgeService";
import {BADGE_CHANGED} from "../model/events";

export default class Badge extends CurseComponent {
	public name:string = '';

	private lab: eui.Label = null;

	protected onCreate() {
		super.onCreate();

		this.registerEvent(badgeService, BADGE_CHANGED, this.onBadgeChange, this);
		this.registerEvent(this.host, egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
	}

	protected awake() {
		super.awake();

		this.update();
	}

	protected sleep() {
		super.sleep();
	}
	
	private onBadgeChange(event){
		const {name, number} = event.data;

		if(name == this.name){
			this.setNum(number);
		}
	}

	update(){
		this.setNum(badgeService.getNumber(this.name));
	}

	setNum(value){
		this.lab.text = value + '';
	}

	private onAddedToStage(event){
		this.update();
	}
}
