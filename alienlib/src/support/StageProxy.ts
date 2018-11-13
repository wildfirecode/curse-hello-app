/**
 * Created by rockyl on 16/3/9.
 */

let _stage: egret.Stage;
let _root: egret.DisplayObjectContainer;

let lastTouchPos: any = {};
let autoAdjustTargets: egret.DisplayObject[];

export function init(stage: egret.Stage, root: egret.DisplayObjectContainer): void {
	_stage = stage;
	_root = root;

	stage.addEventListener(egret.TouchEvent.TOUCH_END, function (event: egret.TouchEvent): void {
		lastTouchPos.x = event.stageX;
		lastTouchPos.y = event.stageY;
	}, this);

	autoAdjustTargets = [];
	stage.addEventListener(egret.Event.RESIZE, onStageResize, this);
}

function onStageResize(event: egret.Event = null): void {
	const {width, height} = getSize();
	//console.log(`resize stage: (${width}, ${height})`);
	autoAdjustTargets.forEach((child: egret.DisplayObject) => {
		child.width = width;
		child.height = height;
	});
}

export function getStage() {
	return _stage;
}

export function getWidth(): number {
	return _stage.stageWidth;
}

export function getHeight(): number {
	return _stage.stageHeight;
}

export function getSize(): any {
	return {
		width: getWidth(),
		height: getHeight(),
	};
}

export function getCenter(): any {
	const {width, height} = getSize();
	return {
		x: width / 2,
		y: height / 2
	}
}

export function registerAutoAdjust(target: egret.DisplayObject): void {
	let index = autoAdjustTargets.indexOf(target);
	if (index < 0) {
		autoAdjustTargets.push(target);
	}
	onStageResize();
}

export function unregisterAutoAdjust(target: egret.DisplayObject): void {
	let index = autoAdjustTargets.indexOf(target);
	if (index >= 0) {
		autoAdjustTargets.splice(index, 1);
	}
}
