/**
 * Created by rockyl on 2018/10/23.
 *
 *
 */

import CurseComponent from "@core/curse/CurseComponent";
import {Dispatcher} from "@alienlib/support";
import {injectProp} from "@alienlib/tools/Utils";

export default class Target extends CurseComponent {
	target: eui.Rect = null;
	avatar: eui.Rect = null;

	colors = [
		0x0091FF,
		0x8FFF00,
		0xFF0000,
	];

	stopGame(){
		egret.Tween.removeTweens(this.avatar);
	}

	reset() {
		this.avatar.strokeColor = this.colors[0];

		return 100;
	}

	readyGo() {
		this.host.visible = false;
	}

	showTarget(pos, duration, toRadius) {
		const {avatar, target} = this;

		const fromRadius = toRadius + 200;

		this.host.visible = true;
		injectProp(this.host, {
			x: pos.x,
			y: pos.y,
		});
		injectProp(avatar, {
			width: fromRadius * 2,
			height: fromRadius * 2,
			anchorOffsetX: fromRadius,
			anchorOffsetY: fromRadius,
			strokeColor: this.colors[0],
		});
		injectProp(target, {
			width: toRadius * 2,
			height: toRadius * 2,
			anchorOffsetX: toRadius,
			anchorOffsetY: toRadius,
		});

		egret.Tween.get(avatar, null, null, true)
			.to({
				width: toRadius * 2,
				height: toRadius * 2,
				anchorOffsetX: toRadius,
				anchorOffsetY: toRadius,
			}, duration, egret.Ease.cubicInOut)
	}

	playResult(result, count = 2) {
		const tween = egret.Tween.get(this.avatar, null, null, true)
		for (let i = 0; i < count; i++) {
			tween
				.to({strokeColor: this.colors[result]})
				.wait(100)
				.to({strokeColor: this.colors[0]})
				.wait(100)
		}
		tween
			.set({strokeColor: this.colors[result]})
	}
}
