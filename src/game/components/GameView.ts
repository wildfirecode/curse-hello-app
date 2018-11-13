/**
 * Created by rockyl on 2018/10/23.
 *
 * 游戏视图
 */

import CurseComponent from "@core/curse/CurseComponent";
import {broadcast, getComponent} from "@core/curse/Manager";
import {Dispatcher} from "@alienlib/support";
import Ball from "./game/Ball";
import {distance} from "@alienlib/tools/MathUtils";

export default class GameView extends CurseComponent {
	container: eui.Group = null;
	labCD: eui.Label = null;
	labScore: eui.Label = null;

	private containerSize;
	private targetPos;
	private ball;

	private counting;
	private seconds;
	private timerMain;

	private targetRadius;

	protected onCreate() {
		super.onCreate();

	}

	protected awake() {
		super.awake();

		this.ball = getComponent(this.host.ball, Ball);
	}

	protected sleep() {
		super.sleep();

	}

	protected destroy() {
		super.destroy();

	}

	readyGo() {
		this.updateSecond(0);
		this.increaseCounting(0);
	}

	startGame() {
		this.targetPos = null;
		this.timerMain = setInterval(this.onMainTimer, 1000);
		broadcast('start');
	}

	stopGame() {
		clearInterval(this.timerMain);
	}

	private onMainTimer = () => {
		this.updateSecond(this.seconds + 1);
		const loopSeconds = this.seconds % 6;
		switch (loopSeconds) {
			case 0:
				this.makeTarget();
				break;
			case 4:
				this.dealResult();
				break;
		}

	};

	private dealResult() {
		if (!this.targetPos) {
			return;
		}
		const {x, y} = this.ball.position;
		const {x: tx, y: ty} = this.targetPos;

		const success = distance(x, y, tx, ty) <= this.targetRadius;
		broadcast('playResult', null, success ? 1 : 2);
		if (success) {
			this.increaseCounting();
		} else {
			clearInterval(this.timerMain);
			broadcast('stop');

			setTimeout(() => {
				broadcast('endGame', null, this.counting);
			}, 500)
		}
	};

	makeTarget() {
		if (!this.containerSize) {
			const {width, height} = this.container;
			this.containerSize = {width, height};
		}

		const {width, height} = this.containerSize;
		const pos = this.targetPos = {
			x: Math.random() * width,
			y: Math.random() * height,
		};
		this.targetRadius = Math.max((10 - this.counting) * 10, 50);
		broadcast('showTarget', null, pos, 4000, this.targetRadius)
	}

	private updateSecond(seconds) {
		this.seconds = seconds;
		this.labCD.text = seconds.toString();
	}

	private increaseCounting(t?) {
		if (t !== undefined) {
			this.counting = t;
		} else {
			this.counting++;
		}
		this.labScore.text = this.counting.toString();
	}

	private onBallHitBorder(hitBorders) {

	}
}
