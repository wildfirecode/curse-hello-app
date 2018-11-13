/**
 * Created by rockyl on 16/3/9.
 */
import {format, supplement} from "./StringUtils";

export function repeat(handler: any, timeout: any, repeat: number = -1, onComplete: Function = null, immediately: boolean = false, ...args: any[]) {
	let c: number = 0;
	if (immediately) {
		c++;
		handler.apply(null, args);
	}

	let timer = setInterval(() => {
		if (repeat > 0 && c >= repeat) {
			clearInterval(timer);
			if (onComplete) {
				onComplete();
			}
			return;
		}
		handler.apply(null, args);
		c++;
	}, this, timeout);
	return timer;
}

const timeLang = ['sky', 'hour', 'minutes', 'second'];

export function timeFormat(second: number, formatStr: string = '{1}:{0}', placeZero: boolean = true, hideEmpty: boolean = false): string {
	let ss: any = second % 60;
	let mm: any = Math.floor(second / 60) % 60;
	let hh: any = Math.floor(second / 3600) % 24;
	let dd: any = Math.floor(second / 3600 / 24);

	if (placeZero) {
		ss = supplement(ss, 2);
		mm = supplement(mm, 2);
		hh = supplement(hh, 2);
		dd = supplement(dd, 2);
	}

	if (hideEmpty) {
		let result = '';
		[dd, hh, mm, ss].forEach((item, index) => {
			if (item > 0) {
				//result += item + lang[this.timeLang[index]];
			}
		});
		return result;
	} else {
		return format(formatStr, ss, mm, hh, dd);
	}
}

export function parseFromString(str: string): Date {
	return new Date(str.replace('T', ' ').replace(/-/g, '/'));
}

export function parseFromStringScope(str: string[]): Date[] {
	return str.map((item) => this.parseFromString(item));
}

export function dateTimeToString(date: Date): string {
	return this.dateToString(date, '{0}年{1}月{2}日') + ' ' + this.dateToTimeString(date, '{2}:{1}');
}

export function tsToDate(ts: number): Date {
	let newDate: Date = new Date();
	newDate.setTime(ts * 1000);
	return newDate;
}

export function parseTime(str: string): number {
	let t: string[] = str.split(':');
	return parseInt(t[0]) * 3600 + parseInt(t[1]) * 60 + parseInt(t[2]);
}

export function tsToDateString(ts: number, format: string = '{0}/{1}/{2}'): string {
	return this.dateToString(this.tsToDate(ts), format);
}

export function dateToString(date: Date, formatStr: string = '{0}/{1}/{2}'): string {
	return format(formatStr, date.getFullYear(), supplement(date.getMonth() + 1, 2), supplement(date.getDate(), 2))
}

export function dateToTimeString(date: Date, formatStr: string = '{2}:{1}:{0}'): string {
	return format(formatStr, supplement(date.getSeconds(), 2), supplement(date.getMinutes(), 2), supplement(date.getHours(), 2))
}

export function dateToTs(date: Date): number {
	return Math.floor(date.valueOf() / 1000);
}

export function dateCut(date: Date): Date {
	let h = date.getHours();
	let m = date.getMinutes();
	let s = date.getSeconds();

	return this.tsToDate(this.dateToTs(date) - h * 3600 - m * 60 - s);
}

export function tsToMonthDayString(ts: number): string {
	let date: Date = this.tsToDate(ts);
	return format('{0}' + '月' + '{1}' + '日', supplement(date.getMonth() + 1, 2), supplement(date.getDate(), 2))
}

export function scopeToDateString(scope: Date[], format: string): string {
	return this.dateToString(scope[0], format) + '-' +
		this.dateToString(scope[1], format);
}

export function scopeToTimeString(scope: Date[], format: string): string {
	let ts1 = this.dateToTimeString(scope[0], format);
	let ts2 = this.dateToTimeString(scope[1], format);

	return ts1 + '-' + ts2;
}

export function scopeToDateTimeString(scope: Date[], dateFormat: string, timeFormat: string, combine: boolean = false): string {
	let t1 = scope[0];
	let t2 = scope[1];
	if (combine && t1.getDate() == t2.getDate()) {
		return this.dateToString(t1, dateFormat) + ' ' +
			this.dateToTimeString(t1, timeFormat) + '-' +
			this.dateToTimeString(t2, timeFormat);
	} else {
		return this.dateTimeToString(t1) + ' - ' + this.dateTimeToString(t2);
	}
}

export function remainDays(time1: any, time2: any, include = false): number {
	let t1, t2;
	if (time1 instanceof Date) {
		t1 = this.dateToTs(time1);
	} else if (typeof time1 == 'string') {
		t1 = this.parseFromString(time1)
	}
	if (time2 instanceof Date) {
		t2 = this.dateToTs(time2);
	} else if (typeof time2 == 'string') {
		t2 = this.parseFromString(time2)
	}

	return (t1 - t2 + (include ? 1 : 0)) / 24 / 3600;
}

export function compareScope(scope, time): number {
	let t1 = this.dateToTs(scope[0]);
	let t2 = this.dateToTs(scope[1]);
	if (time < t1) {
		return time - t1;
	} else if (time >= t1 && time <= t2) {
		return 0;
	} else {
		return time - t2;
	}
}

export function getWeekIndex(ts: number) {
	let dateObj = this.tsToDate(ts);
	let firstDay = this.getFirstWeekBegDay(dateObj.getFullYear());
	if (dateObj < firstDay) {
		firstDay = this.getFirstWeekBegDay(dateObj.getFullYear() - 1);
	}
	let d = Math.floor((dateObj.valueOf() - firstDay.valueOf()) / 86400000);
	return Math.floor(d / 7) + 1;
}

export function getFirstWeekBegDay(year) {
	let tempdate = new Date(year, 0, 1);
	let temp = tempdate.getDay();
	if (temp == 1)
		return tempdate;
	temp = temp == 0 ? 7 : temp;
	let t = tempdate.setDate(tempdate.getDate() + (8 - temp));
	return new Date(t);
}

