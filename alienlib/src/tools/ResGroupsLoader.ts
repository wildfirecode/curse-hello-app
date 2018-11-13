/**
 * Created by rockyl on 2017/1/22.
 */

export function checkNeedLoad(resGroupNames: string[]): boolean {
	let needLoad = false;
	for (let i = 0, li = resGroupNames.length; i < li; i++) {
		if (!RES.isGroupLoaded(resGroupNames[i])) {
			needLoad = true;
			break;
		}
	}

	return needLoad;
}

export async function loadResGroups(resGroupNames: string[], progressCallback: Function = null): Promise<any> {
	let loaded = 0;

	const resLoadReporter = new ResLoadReporter(function (current, total) {
		progressCallback && progressCallback(++loaded, total);
	});

	const total = resGroupNames.reduce((p, c) => {
		return p + (RES.isGroupLoaded(c) ? 0 : RES.getGroupByName(c).length);
	}, 0);

	for (let i = 0, li = resGroupNames.length; i < li; i++) {
		if (!RES.isGroupLoaded(resGroupNames[i])) {
			await RES.loadGroup(resGroupNames[i], 0, resLoadReporter);
		}
	}
}

class ResLoadReporter implements RES.PromiseTaskReporter {
	progressCallback;

	constructor(progressCallback) {
		this.progressCallback = progressCallback;
	}

	onProgress(current: number, total: number) {
		this.progressCallback(current, total)
	}
}
