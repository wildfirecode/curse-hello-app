/**
 * Created by rockyl on 16/3/9.
 */
import {getTweenPromise} from "../tools/EgretUtils";
import {getItem, setItem} from "./LocalStorage";

let conflictPercent = 0.5;

let musicRes: string;
let musicChannel: egret.SoundChannel;
let musicPlaying: boolean;
let musicVolume: number;

export function setMusic(res: string) {
	musicRes = res;
}

export function playMusic(res: string = null, {goon = false, volume = 1} = {}): void {
	if (musicRes == res && !getMusicMute()) {
		return;
	}

	let vol = goon ? musicVolume || 1 : volume;

	if (!goon) {
		musicRes = res;
	}

	if (getMusicMute()) {
		return;
	}

	musicPlaying = true;

	/*if (musicChannel) {
		musicChannel.stop();
	}*/

	if (RES.getRes(musicRes)) {
		_playMusic(RES.getRes(musicRes), vol);
	} else {
		RES.getResAsync(musicRes, (music: egret.Sound) => {
			_playMusic(music, vol);
		}, this);
	}
}

async function _playMusic(music: egret.Sound, volume) {
	musicVolume = volume;

	if (music) {
		if (musicChannel) {
			await _channelFade(musicChannel, 0);
		}
		musicChannel = music.play();
		musicChannel.volume = 0;
		await _channelFade(musicChannel, volume, 2000);
	}
}

async function _channelFade(channel: egret.SoundChannel, volume, duration = 500) {
	if (duration == 0) {
		if (volume == 0) {
			egret.Tween.removeTweens(channel);
			channel.stop();
		}
	} else {
		await getTweenPromise(
			egret.Tween
				.get(channel, null, null, true)
				.to({volume}, duration)
		);
	}
}

export function stopMusic(mute: boolean = false): void {
	musicPlaying = false;
	if (!mute) {
		musicRes = null;
	}
	if (musicChannel) {
		_channelFade(musicChannel, 0, 0);
		musicChannel = null;
	}
}

export function switchMusic(): void {
	if (musicRes) {
		if (getMusicMute()) {
			stopMusic(true)
		} else {
			if (!musicPlaying) {
				playMusic(null, {goon: true, volume: musicVolume});
			}
		}
	}
}

export function getMusicMute(): boolean {
	return false;
	//return !dataCenterService.getSettingItem('music');
}

export function setMusicMute(value: boolean) {
	//dataCenterService.setSettingItem('music', !value);
}

let effectRes: string;
let effectChannelMap: any = {};

export function playEffect(res: string = null, {loop = 1, conflict = false, force = false} = {}) {
	if (res) {
		effectRes = res;
	}
	if (!force && getEffectMute()) {
		return Promise.resolve();
		//return Promise.reject('effect mute');
	}

	let callback;
	let p = new Promise((resolve => {
		callback = resolve;
	}));

	if (RES.getRes(res)) {
		_playEffect(res, RES.getRes(res), loop, conflict, callback);
	} else {
		RES.getResAsync(res, (music: egret.Sound) => {
			_playEffect(res, music, loop, conflict, callback);
		}, this);
	}

	return p;
}

function _playEffect(res, effect, loop, conflict, callback) {
	if (effect) {
		//console.log('playEffect', res);
		effect.type = egret.Sound.EFFECT;
		let effectChannel = effect.play(0, loop);
		effectChannelMap[res] = effectChannel;
		effectChannel.once(egret.Event.SOUND_COMPLETE, (event) => {
			onEffectComplete({res, conflict});
			callback();
		}, this);
	} else {
		//reject('can\'t loaded ' + res);
		callback();
	}
}

export function stopEffect(res, {fade = false} = {}) {
	let channel = effectChannelMap[res];
	if (channel) {
		if (fade) {
			return new Promise(resolve => {
				egret.Tween
					.get(channel, null, null, true)
					.to({volume: 0.1}, 300)
					.call(() => {
						_stopEffect(res);
						resolve();
					});
			});
		} else {
			_stopEffect(res);
			return Promise.resolve();
		}
	} else {
		return Promise.resolve();
		//return Promise.reject(`${res} is not on channel`)
	}
}

function _stopEffect(res) {
	let channel = effectChannelMap[res];
	if (channel) {
		channel.stop();
	}

	delete effectChannelMap[res];
}

function onEffectComplete({res, conflict}): void {
	if (conflict && musicChannel && !getMusicMute()) {
		egret.Tween
			.get(musicChannel, null, null, true)
			.to({volume: musicVolume}, 200);
		//musicChannel.volume = 1;
	}

	delete effectChannelMap[res];
}

export function switchEffect(): void {
	if (getEffectMute()) {
		for (let res in effectChannelMap) {
			let channel = effectChannelMap[res];
			channel.stop();
		}
	}
}

export function getEffectMute(): boolean {
	return false
	//return !dataCenterService.getSettingItem('effect');
}

export function setEffectMute(value: boolean) {
	//dataCenterService.setSettingItem('effect', !value);
}

export function getAllMute(): boolean {
	return getMusicMute();
}

export function switchAll(): void {
	switchEffect();
	switchMusic();
}

/**
 * 震动
 */
export function vibrate(): void {
	if (getVibrateMute()) {
		return;
	}

	//Native.instance.vibrate();
}

export function getVibrateMute(): boolean {
	let mm: string = getItem('vibrateMute');
	return mm ? mm == '1' : false;
}

export function setVibrateMute(value: boolean) {
	setItem('vibrateMute', value ? '1' : '0');
}

export function switchVibrate(): void {
	setVibrateMute(!getVibrateMute());
}

