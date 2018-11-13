/**
 * Created by rockyl on 2018/10/10.
 */

import CurseComponent from "@core/curse/CurseComponent";
import buriedPointService from "../services/BuriedPointService";

export default class BuriedPointButton extends CurseComponent {
	dpm: string;
	dcm: string;

	private buriedPointName: string;

	protected onCreate() {
		super.onCreate();

		this.buriedPointName = 'buried-point-' + Date.now();
		buriedPointService.addBuriedPointConfig(
			this.buriedPointName,
			{dpm: this.dpm, dcm: this.dcm}
		);

		this.registerEvent(this.host, egret.TouchEvent.TOUCH_TAP, this.onHostTap, this);
	}

	protected awake() {
		super.awake();

		buriedPointService.logExposure(this.buriedPointName);
	}

	protected sleep() {
		super.sleep();
	}

	protected destroy() {
		super.destroy();

	}

	private onHostTap(event) {
		buriedPointService.logClick(this.buriedPointName);
	}
}
