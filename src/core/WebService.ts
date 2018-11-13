/**
 * Created by rockyl on 15/12/16.
 *
 * 网络服务
 */

import {Ajax, EgretUtils} from "@alienlib/tools";

const WEB_SERVICE_URL: string = DEBUG ? 'https://localhost:3000' : '';

class WebService {
	/**
	 * 调用API
	 * @param uri
	 * @param params
	 * @param method
	 * @param responseType
	 */
	callApi(uri: string, params: any = null, method: string = 'post', responseType = 'json'): Promise<any> {
		if (!params) {
			params = {};
		}

		let url: string = WEB_SERVICE_URL + uri;

		let m: Function = method == 'post' ? Ajax.POST : Ajax.GET;

		return m.call(Ajax, url, params).then(
			(response) => {
				let data;
				switch (responseType) {
					case 'json':
						try {
							data = JSON.parse(response);
						} catch (e) {
							if(DEBUG) console.log('decode json failed: ' + url);
							return Promise.reject(e);
						}

						if (data.success) {
							return data.data || data;
						} else {
							return Promise.reject(data.message || data.desc);
						}
					default:
						return response;
				}
			},
			(error) => {
				if (DEBUG) {
					console.log(error);
				}
				return Promise.reject(error);
			}
		);
	}

	polling(successFunc, uri, params, maxTimes = 5, delay = 400, method = 'POST', responseType = 'json'): Promise<any> {
		let p = Promise.resolve();

		for (let i = 0; i < maxTimes; i++) {
			p = p.then(func);
			p = p.then(() => {
				return EgretUtils.waitPromise(delay)
			})
		}

		const callApi = this.callApi;
		let lastData;

		return p.then(
			() => {
				return Promise.reject(null);
			},
			(e) => {
				if (e === 'success') {
					return Promise.resolve(lastData);
				}

				return Promise.reject(e);
			}
		);

		function func() {
			return callApi(uri, params, method, responseType).then(
				(data) => {
					if (successFunc(data)) {
						lastData = data;
						return Promise.reject('success');
					}
				},
				(e) => {
					return Promise.reject(e);
				}
			)
		}
	}
}

const webService = new WebService();
export default webService;
