/**
 * Created by admin on 2017/5/27.
 */

export class TimeCountDown {
	timer = null;
	onRender: Function;
	onComplete: Function;

	private time;
	private type;

	constructor(onRender, onComplete = null) {
		this.onRender = onRender;
		this.onComplete = onComplete;
	}

	startWithSecond(second) {
		this.time = second;
		this.type = 0;
		this.start(1000);
	}

	startWithMillisecond(millisecond) {
		this.time = millisecond;
		this.type = 1;
		this.start(1000 / 60);
	}

	stop() {
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = null;
		}
	}

	private start(interval) {
		this.stop();
		this.timer = setInterval(() => {
			this.time--;

			if (this.onRender) {
				this.onRender(this.time);
			}

			if (this.time <= 0) {
				this.stop();
				if (this.onComplete) {
					this.onComplete();
				}
			}
		}, this, interval);
	}
}
