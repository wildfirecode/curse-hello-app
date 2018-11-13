/**
 * Created by rockyl on 2018/8/6.
 */


export class CountingTime {
	from;
	to;
	sign;
	autoStart;
	interval;
	renderer;
	onComplete;

	timer;
	counting;

	constructor(from, to, options = null) {
		this.from = from;
		this.to = to;
		this.sign = to - from > 0 ? 1 : -1;
		this.autoStart = options ? options.autoStart || true : true;
		this.interval = options ? options.interval || 1000 : 1000;
		this.renderer = options ? options.renderer : null;
		this.onComplete = options ? options.onComplete : null;
	}

	start(override = true, goon = false) {
		if (!goon && override && this.timer) {
			this.stop();
		}

		if (this.timer) {
			return;
		}

		if (!goon) {
			this.counting = this.from;
		}
		this.onTimer(true);
		this.timer = setInterval(this.onTimer, this.interval);
	}

	stop(callOnComplete = false) {
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = null;
		}

		if (callOnComplete) {
			this.onComplete && this.onComplete();
		}
	}

	onTimer = (pure = false) => {
		if (!pure) {
			this.counting += this.sign;
		}
		let {counting, to} = this;
		if (counting == to) {
			this.stop(true);
			return;
		}

		this.renderer && this.renderer(counting);
	}
}
