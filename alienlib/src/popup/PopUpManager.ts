/**
 * Created by rockyl on 16/3/9.
 */
import {StageProxy} from "../support";
import {IDialogEffect, None} from "./PopupEffect";
import {combineProp} from "../tools/Utils";
import {enumChildren} from "../tools/EgretUtils";

const defaultModalConfig: any = {
	color: 0,
	alpha: 0.7,
	duration: 200,
};

const POPUP_SHOW: string = 'POPUP_SHOW';
const POPUP_HIDE: string = 'POPUP_HIDE';

let _modalMask: eui.Rect;
let _pupUpStack: Array<any> = [];
let _popLayer: eui.Group;
let _modalConfig: any;

export function init(popLayer: eui.Group) {
	_popLayer = popLayer;
	_popLayer.width = StageProxy.getWidth();
	_popLayer.height = StageProxy.getHeight();

	StageProxy.getStage().addEventListener(egret.Event.RESIZE, onStageResize, this);
}

function onStageResize(event: egret.Event = null): void {
	if (_modalMask) {
		_modalMask.width = StageProxy.getWidth();
		_modalMask.height = StageProxy.getHeight();
	}
}

export function addPopUp(target: eui.Component, effectClazz: any = null, effectParams: any = null, modalTouchFun: Function = null, modal: boolean = true, modalConfig: any = null): void {
	if (target.parent) {
		return;
	}

	let dispatchPopUpShow = _pupUpStack.length == 0;

	let top = getTopPupUp();
	if (top && top['inactive']) {
		top['inactive']();
	}

	_modalConfig = combineProp(defaultModalConfig, modalConfig);

	_pupUpStack.unshift({target: target, modalTouchFun: modalTouchFun, modal: modal});

	updateModalMask(_pupUpStack[0]);

	let effect: IDialogEffect = createEffectInstance(effectClazz);
	effect.show(target, _popLayer, function (): void {
		if (target['active']) {
			target['active']();
		}
	}, this, effectParams);

	if (dispatchPopUpShow) {
		//dispatchEventWith(PopUpManager.POPUP_SHOW);
	}
}

export function removePopUp(target: eui.Component, effectClazz: any = null, effectParams: any = null): void {
	if (!target.parent) {
		return;
	}
	if (!getInStack(target, true)) {
		return;
	}
	let aimItem: any;
	_pupUpStack.some(function (item: any): boolean {
		if (item.modal) {
			aimItem = item;
			return true;
		}
	});

	if (aimItem) {
		updateModalMask(aimItem);
	} else {
		setModalMaskVisible(false);
	}

	let effect: IDialogEffect = createEffectInstance(effectClazz);
	effect.hide(target, _popLayer, function (): void {
		if (target['inactive']) {
			target['inactive']();
		}

		let top = getTopPupUp();
		if (top && top['active']) {
			top['active']();
		}

	}, this, effectParams);

	let dispatchPopUpHide = _pupUpStack.length == 0;
	if (dispatchPopUpHide) {
		//dispatchEventWith(PopUpManager.POPUP_HIDE);
	}
}

function getTopPupUp() {
	if (_pupUpStack.length > 0) {
		return _pupUpStack[_pupUpStack.length - 1];
	} else {
		return null;
	}
}

export function removeTopPupUp(): boolean {
	let top = getTopPupUp();
	if (top) {
		if (top['close']) {
			top['close']();
		}
		return true;
	}
	return false;
}

export function removeAllPupUp(): void {
	enumChildren(_popLayer, (popup: any) => {
		if (popup != _modalMask) {
			popup['close']();
		}
	});
}

function getInStack(target: egret.DisplayObjectContainer, del: boolean = false): any {
	let data: any;
	_pupUpStack.some(function (item: any, index: number): boolean {
		if (item.target == target) {
			data = {item: item, index: index};
			return true;
		}
	});

	if (data && del) {
		_pupUpStack.splice(data.index, 1);
	}

	return data;
}

function createEffectInstance(effectClazz: any = null): IDialogEffect {
	let effect: IDialogEffect;
	if (effectClazz) {
		effect = new effectClazz();
	} else {
		effect = new None();
	}

	return effect;
}

function onModalMaskTap(event: egret.TouchEvent): void {
	let item: any = _pupUpStack[0];
	if (item && item.modal && item.modalTouchFun) {
		item.modalTouchFun();
	}
}

function updateModalMask(item: any): void {
	let maskIndex: number = _popLayer.getChildIndex(_modalMask);
	let index: number = _popLayer.getChildIndex(item.target);
	if (maskIndex != index - 1) {
		setModalMaskVisible(item.modal, index);
	}
}

function setModalMaskVisible(visible: boolean, index: number = -1): void {
	const modalMask = getModalMask();
	if (visible) {
		modalMask.fillColor = _modalConfig.color;
		modalMask.fillAlpha = _modalConfig.alpha;

		if (index >= 0) {
			setModalMaskVisible(true);
			_popLayer.addChildAt(modalMask, index);
		} else {
			_popLayer.addChild(modalMask);
		}
		egret.Tween.get(modalMask, null, null, true).to({alpha: 1}, _modalConfig.duration);
	} else {
		if (modalMask.parent) {
			egret.Tween.get(modalMask, null, null, true).to({alpha: 0}, _modalConfig.duration).call(function (modalMask: eui.Rect): void {
				_popLayer.removeChild(modalMask);
			}, this, [modalMask]);
		}
	}
}

function getModalMask(): eui.Rect {
	if (!_modalMask) {
		_modalMask = new eui.Rect();
		_modalMask.width = StageProxy.getWidth();
		_modalMask.height = StageProxy.getHeight();
		_modalMask.addEventListener(egret.TouchEvent.TOUCH_TAP, onModalMaskTap, this);
	}

	return _modalMask;
}
