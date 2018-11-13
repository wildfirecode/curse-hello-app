/**
 * Created by rockyl on 16/3/9.
 */

/**
 * 计算距离
 * @param p1
 * @param p2
 * @returns {number}
 */
export function distancePoint(p1: any, p2: any): number {
	return distance(p1.x, p1.y, p2.x, p2.y);
}

/**
 * 计算距离
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @returns {number}
 */
export function distance(x1: number, y1: number, x2: number, y2: number): number {
	return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

export function centerPoint(p1: any, p2: any) {
	return {
		x: Math.min(p1.x, p2.x) + Math.abs(p1.x - p2.x) / 2,
		y: Math.min(p1.y, p2.y) + Math.abs(p1.y - p2.y) / 2,
	}
}

/**
 * 计算两点直线的弧度
 * @param p1
 * @param p2
 * @returns {number}
 */
export function radian(p1: any, p2: any): number {
	if(p2.y == p1.y || p2.x == p1.x){
		return NaN;
	}
	return Math.atan2(p2.y - p1.y, p2.x - p1.x);
}

/**
 * 计算两点直线的角度
 * @param p1
 * @param p2
 * @returns {number}
 */
export function angle(p1: any, p2: any): number {
	const r = radian(p1, p2);
	if(isNaN(r)){
		return r;
	}
	return radiusToAngle(r);
}

/**
 * 获取一个随机整数
 * @param max
 * @param min
 * @returns {number}
 */
export function makeRandomInt(max: number, min: number = 0): number {
	return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * 获取一个随机浮点数
 * @param max
 * @param min
 * @returns {number}
 */
export function makeRandomFloat(max: number, min: number = 0): number {
	return Math.random() * (max - min) + min;
}

/**
 * 生成一个基于value的range偏移的随机数
 * @param value
 * @param range
 * @returns {number}
 */
export function makeRandomByRange(value: number, range: number): number {
	return value + (Math.random() * range * 2 - range);
}

/**
 * 生成一个随机整数数组
 * @param len
 * @param max
 * @param min
 * @returns {string}
 */
export function makeRandomIntArr(len: number, max: number, min: number = 0): number[] {
	let target: number[] = [];
	for (let i: number = 0; i < len; i++) {
		target.push(makeRandomInt(max));
	}

	return target;
}

/**
 * 生成一个范围数组
 * @param to
 * @param from
 * @param step
 * @returns {Array<number>}
 */
export function makeOrderIntArray(to: number, from: number = 0, step: number = 1): Array<number> {
	let result: Array<number> = [];
	for (let i: number = from; i <= to; i += step) {
		result.push(i);
	}

	return result;
}

/**
 * 打乱一个数组
 * @param arr
 * @returns {any}
 */
export function mixArray(arr: any): Array<any> {
	for (let i: number = 0, len: number = Math.round(arr.length / 2); i < len; i++) {
		let a: number = makeRandomInt(arr.length);
		let b: number = makeRandomInt(arr.length);
		let temp = arr[a];
		arr[a] = arr[b];
		arr[b] = temp;
	}

	return arr;
}

/**
 * 打乱一个二维数组
 * @param arr
 * @returns {Array<Array<any>>}
 */
export function mixArray2(arr: Array<Array<any>>): Array<Array<any>> {
	let cH: number = arr[0].length;
	let cV: number = arr.length;
	let pos0: number[];
	let pos1: number[];
	for (let i: number = 0, len: number = Math.round(cH * cV / 2); i < len; i++) {
		pos0 = [makeRandomInt(cH), makeRandomInt(cV)];
		pos1 = [makeRandomInt(cH), makeRandomInt(cV)];
		let temp = arr[pos0[0]][pos0[1]];
		arr[pos0[0]][pos0[1]] = arr[pos1[0]][pos1[1]];
		arr[pos1[0]][pos1[1]] = temp;
	}

	return arr;
}

/**
 * 随机从一个数组中取出一项
 * @param arr
 * @param del
 * @returns {*}
 */
export function getRandomFromArray(arr: any, del = false): any {
	let index = makeRandomInt(arr.length);
	let item = arr[index];
	if (del) {
		arr.splice(index, 1);
	}

	return item;
}

/**
 * 根据范围阻隔
 * @param value
 * @param lower
 * @param upper
 * @returns {number}
 */
export function fixRange(value: number, lower: number, upper: number): number {
	if (value < lower) {
		value = lower;
	} else if (value > upper) {
		value = upper;
	}

	return value;
}

/**
 * 根据范围补足
 * @param value
 * @param max
 * @param min
 * @returns {number}
 */
export function roundFix(value: number, max: number, min: number = 0): number {
	if (value < min) {
		value += max - min;
	} else if (value >= max) {
		value -= max - min;
	}

	return value;
}

/**
 * 弧度转角度
 * @param radius
 * @returns {number}
 */
export function radiusToAngle(radius: number): number {
	return radius * 180 / Math.PI;
}

/**
 * 角度转弧度
 * @param angle
 * @returns {number}
 */
export function angleToRadius(angle: number): number {
	return angle * Math.PI / 180;
}

/**
 * 数组向右旋转
 * @param arr
 * @returns {Array}
 */
export function turnRight(arr) {
	let temp = [];
	for (let t = 0, tl = arr.length; t < tl; t++) {
		temp.push([]);
	}
	for (let i = 0, il = arr.length; i < il; i++) {
		for (let j = 0, jl = arr[i].length; j < jl; j++) {
			temp[i][j] = arr[jl - j - 1][i];
		}
	}
	return temp;
}

/**
 * 数组向左旋转
 * @param arr
 * @returns {Array}
 */
export function turnLeft(arr) {
	let temp = [];
	for (let t = 0, tl = arr.length; t < tl; t++) {
		temp.push([]);
	}
	for (let i = 0, il = arr.length; i < il; i++) {
		for (let j = 0, jl = arr[i].length; j < jl; j++) {
			temp[i][j] = arr[j][jl - i - 1];
		}
	}
	return temp;
}

/**
 * 根据两点计算量化方向,用于手势识别
 * @param x0
 * @param y0
 * @param x1
 * @param y1
 * @returns {number}
 */
export function calDir(x0: number, y0: number, x1: number, y1: number): number {
	if (x0 == x1 && y0 == y1) {
		return -1;
	}

	let r: number = Math.atan2(y1 - y0, x1 - x0);
	let d: number;
	if (Math.abs(r) < Math.PI / 4) {
		d = 0;
	} else if (Math.abs(r) > Math.PI / 4 * 3) {
		d = 2;
	} else if (r > 0) {
		d = 1;
	} else {
		d = 3;
	}
	return d;
}

/**
 * 数值正负计算
 * @param num
 * @returns {number}
 */
export function sign(num: number): number {
	return num == 0 ? 0 : (num > 0 ? 1 : -1);
}

/**
 * 把一个正整数分割成若干个整数
 * @param total
 * @param count
 * @returns {Array}
 */
export function split(total, count) {
	let result = [];
	for (let i = 0; i < count; i++) {
		result[i] = 0;
	}
	for (let i = 0; i < total; i++) {
		result[makeRandomInt(count)]++;
	}
	return result;
}

/**
 * 贝塞尔曲线
 * @param points
 * @param t
 */
export function getBezier(points, t) {
	let result = {x: 0, y: 0}, temp, n = points.length - 1;
	for (let i = 0; i <= n; i++) {
		temp = Math.pow(1 - t, n - i) * Math.pow(t, i) * (i == 0 || i == n ? 1 : n);
		result.x += points[i].x * temp;
		result.y += points[i].y * temp;
	}

	return result;
}

export function pointInPolygon(points: any[], point: any) {
	let polySides = points.length, i, j = polySides - 1;
	let oddNodes = false;

	let x = point.x, y = point.y;

	for (i = 0; i < polySides; i++) {
		let ix = points[i].x;
		let iy = points[i].y;
		let jx = points[j].x;
		let jy = points[j].y;
		if ((iy < y && jy >= y
			|| jy < y && iy >= y)
			&& (ix <= x || jx <= x)) {
			if (ix + (y - iy) / (jy - iy) * (jx - ix) < x) {
				oddNodes = !oddNodes;
			}
		}
		j = i;
	}

	return oddNodes;
}

export function intersectToPolygon(points: any[], intersect: any[]) {
	let aa = intersect[0];
	let bb = intersect[1];

	let cc, dd;

	let result = false;
	for (let i = 0, li = points.length; i < li; i++) {
		cc = points[i];
		if (i == li - 1) {
			dd = points[0];
		} else {
			dd = points[i + 1];
		}

		if (intersectToIntersect(aa, bb, cc, dd)) {
			result = true;
			break;
		}
	}

	return result;
}

export function intersectToIntersect(aa, bb, cc, dd) {
	let delta = determinant(bb.x - aa.x, cc.x - dd.x, bb.y - aa.y, cc.y - dd.y);
	if (delta <= (1e-6) && delta >= -(1e-6)) {
		return false;
	}
	let namenda = determinant(cc.x - aa.x, cc.x - dd.x, cc.y - aa.y, cc.y - dd.y) / delta;
	if (namenda > 1 || namenda < 0) {
		return false;
	}
	let miu = determinant(bb.x - aa.x, cc.x - aa.x, bb.y - aa.y, cc.y - aa.y) / delta;
	if (miu > 1 || miu < 0) {
		return false;
	}
	return true;

	function determinant(v1, v2, v3, v4) {
		return (v1 * v3 - v2 * v4);
	}
}

export function segmentsIntr(a, b, c, d) {
	let area_abc = (a.x - c.x) * (b.y - c.y) - (a.y - c.y) * (b.x - c.x);
	let area_abd = (a.x - d.x) * (b.y - d.y) - (a.y - d.y) * (b.x - d.x);

	if (area_abc * area_abd >= 0) {
		return false;
	}

	let area_cda = (c.x - a.x) * (d.y - a.y) - (c.y - a.y) * (d.x - a.x);
	let area_cdb = area_cda + area_abc - area_abd;
	if (area_cda * area_cdb >= 0) {
		return false;
	}

	let t = area_cda / (area_abd - area_abc);
	let dx = t * (b.x - a.x),
		dy = t * (b.y - a.y);
	return {x: a.x + dx, y: a.y + dy};
}

export function isNullArray(arr) {
	let result = true;
	arr.some(item => {
		if (item !== undefined && item !== null) {
			result = false;

			return true;
		}
	});

	return result;
}

export function valueRange(value, min, max) {
	return Math.min(Math.max(value, min), max);
}

export function lineHitTest(l0, l1) {
	return l0.a < l1.b && l0.b > l1.a;
}
