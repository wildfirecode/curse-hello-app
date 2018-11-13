/**
 * Created by rockyl on 2018/10/23.
 *
 *
 */

import CurseComponent from "@core/curse/CurseComponent";
import {Vector2D} from "@alienlib/tools/Vector2D";
import {Dispatcher} from "@alienlib/support";
import {broadcast} from "@core/curse/Manager";

export default class Ball extends CurseComponent {
	factor = 0.005;
	maxSpeed = 10;

	private force: Vector2D;
	private velocity: Vector2D;
	position: Vector2D;
	private playing;

	private offset = {
		alpha: 0,
		beta: 0,
		gamma: 0,
	};

	private resetWhenNextFrame;

	protected onCreate() {
		super.onCreate();

		this.force = new Vector2D();
		this.position = new Vector2D();
		this.velocity = new Vector2D();

		window.addEventListener("deviceorientation", this.onDevicerorientation, true);
		this.registerEvent(this.host, egret.Event.ENTER_FRAME, this.onEnterFrame, this);
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

	readyGo(){
		let {width, height} = this.host.parent;

		this.velocity.zero();
		this.force.zero();
		this.position.setXY(width / 2, height / 2);
		this.updatePosition();
	}

	start(){
		this.playing = true;
	}

	stop(){
		this.playing = false;
	}

	stopGame(){
		this.playing = false;
	}

	resetOffset() {
		this.resetWhenNextFrame = true;
	}

	private updatePosition(){
		const ball = this.host;

		ball.x = this.position.x;
		ball.y = this.position.y;
	}

	private onEnterFrame(event) {
		if(!this.playing){
			return;
		}

		this.velocity.add(this.force);
		this.velocity.truncate(this.maxSpeed);
		this.position.add(this.velocity);

		let {x, y} = this.position;
		let {width, height} = this.host.parent;

		this.position.x = x < 0 ? 0 : (x > width ? width : x);
		this.position.y = y < 0 ? 0 : (y > height ? height : y);

		this.updatePosition();

		if (x < 0 || x > width) {
			this.velocity.x = 0;
		}
		if (y < 0 || y > height) {
			this.velocity.y = 0;
		}

		let {x: px, y: py} = this.position;

		let hitBorders = [];
		if (px == 0) {
			hitBorders.push(0);
		} else if (px == width) {
			hitBorders.push(2);
		}
		if (py == 0) {
			hitBorders.push(1);
		} else if (py == height) {
			hitBorders.push(3);
		}

		if(hitBorders.length > 0){
			broadcast('onBallHitBorder', null, hitBorders)
		}
	}

	private onDevicerorientation = (event) => {
		const {alpha, beta, gamma} = event;

		if (this.resetWhenNextFrame) {
			this.resetWhenNextFrame = false;

			this.offset.alpha = alpha * this.factor;
			this.offset.beta = beta * this.factor;
			this.offset.gamma = gamma * this.factor;

			this.velocity.zero();
		}

		const {alpha: alphaOff, beta: betaOff, gamma: gammaOff} = this.offset;

		this.force.x = gamma * this.factor - gammaOff;
		this.force.y = beta * this.factor - betaOff;
	}
}
