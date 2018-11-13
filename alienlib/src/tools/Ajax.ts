/**
 * Created by rockyl on 15/12/24.
 *
 * Ajax异步请求
 */
import {obj2query} from "./Utils";

export function callNet(url: string, params: any = null, method: string = egret.HttpMethod.GET, header: any = null, parseUrl: Function = null, parseBody: Function = null): Promise<string> {
	return new Promise((resolve, reject) => {
		let finalUrl: string = parseUrl ? parseUrl() : url;

		let request: egret.HttpRequest = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;

		request.addEventListener(egret.Event.COMPLETE, function (event: egret.Event): void {
			resolve(request.response);
		}, this);
		request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event: egret.Event): void {
			reject(new Error('request error.'));
		}, this);
		request.open(finalUrl, method);

		for (let k in header) {
			request.setRequestHeader(k, header[k]);
		}

		let data: any = null;
		if (parseBody) {
			data = parseBody();
		} else {
			request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			data = obj2query(params);
		}
		try {
			if (data) {
				request.send(data);
			} else {
				request.send();
			}
		} catch (e) {
			reject(e);
		}
	});
}

export function GET(url: string, params: any = null, header: any = null): Promise<string> {
	return this.callNet(url, params, egret.HttpMethod.GET, header, (): string => {
		if (params) {
			let data = obj2query(params);
			url += (data.length > 0 && url.indexOf('?') < 0 ? '?' : '') + data;
		}
		return url;
	}, () => null);
}

export function POST(url: string, params: any = null, header: any = null): Promise<string> {
	return this.callNet(url, params, egret.HttpMethod.POST, header);
}

export function POSTDirectory(url: string, params: any = null, header: any = null): Promise<string> {
	return this.callNet(url, params, egret.HttpMethod.POST, header, null, (): any => {
		return params
	});
}

export function JSONP(url, params, method = 'get') {
	let ts = Math.floor(Date.now() / 1000);
	url += (url.indexOf('?') < 0 ? '?' : '') + '_=' + ts;

	return new Promise((resolve, reject) => {
		$.ajax({
			type: method,
			url,
			dataType: 'jsonp',
			data: params,
			async: true,
			success: (result) => {
				resolve(result);
			},
			error: (message) => {
				reject(message);
			}
		});
	});
}
