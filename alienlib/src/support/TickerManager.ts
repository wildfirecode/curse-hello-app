/**
 * Created by Rocky.L on 2015/5/21.
 *
 * Ticker管理类
 */

let _playing: boolean = false;
let _interval: number = 1;
let _intervalCount: number;
let _all: ITicker[] = [];

export function register(ticker: ITicker): void {
	if (_all.indexOf(ticker) < 0) {
		_all.push(ticker);
	}
}

export function unregister(ticker: ITicker): void {
	let index = _all.indexOf(ticker);
	if (index >= 0) {
		_all.splice(index, 1);
	}
}

export function activate(): void {
	_intervalCount = 0;

	if (!_playing) {
		_playing = true;
		egret.startTick(onTicker, this);
	}
}

export function sleep(): void {
	if (_playing) {
		_playing = false;
		egret.stopTick(onTicker, this);
	}
}

/**
 * 时钟回调
 */
function onTicker(timeStamp: number): boolean {
	_intervalCount++;
	if (_intervalCount < _interval) {
		return;
	}
	_intervalCount = 0;

	_all.forEach(function (ticker: ITicker): void {
		ticker.update();
	});
}

/**
 * 始终接口
 */
export interface ITicker {
	update(): void;
}
