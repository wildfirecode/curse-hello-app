/**
 * Created by rockyl on 2018/7/24.
 *
 * 埋点
 */

export default class BuriedPoint {
	dpm: string;
	dcm: string;

	constructor(dpm, dcm, env){

		this.dpm = this.fill(dpm, env);
		this.dcm = this.fill(dcm, env);
	}

	fill(src, env){
		let result = src;
		for(let key in env){
			result = result.replace(key, env[key]);
		}
		return result;
	}
}
