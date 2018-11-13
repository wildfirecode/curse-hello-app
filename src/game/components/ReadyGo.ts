/**
 * Created by rockyl on 2018/10/23.
 *
 *
 */

import CurseComponent from "@core/curse/CurseComponent";
import {getWidth} from "@alienlib/support/StageProxy";

export default class ReadyGo extends CurseComponent {
	protected onCreate() {
		super.onCreate();

	}

	protected awake() {
		super.awake();

	}

	protected sleep() {
		super.sleep();

	}

	protected destroy() {
		super.destroy();

	}

	reset(){
		this.host.visible = false;
	}

	readyGo(p) {
		const sw = getWidth();

		const {lab, bg} = this.host;

		lab.text = 'Ready';
		lab.horizontalCenter = -sw;

		this.host.visible = true;

		egret.Tween.get(bg, null, null, true)
			.set({visible: true})
			.to({scaleY: 1}, 200, egret.Ease.cubicOut)
			.wait(2000)
			.to({scaleY: 0}, 200, egret.Ease.cubicIn);

		egret.Tween.get(lab, null, null, true)
			.wait(200)
			.to({horizontalCenter: 0}, 200, egret.Ease.cubicOut)
			.wait(600)
			.to({horizontalCenter: sw}, 200, egret.Ease.cubicIn)
			.set({
				text: 'Go',
				horizontalCenter: -sw,
			})
			.to({horizontalCenter: 0}, 200, egret.Ease.cubicOut)
			.wait(600)
			.to({horizontalCenter: sw}, 200, egret.Ease.cubicIn)
	}
}