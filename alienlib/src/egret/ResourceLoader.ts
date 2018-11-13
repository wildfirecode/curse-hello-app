/**
 * Created by rockyl on 2018/3/16.
 */
import {checkNeedLoad, loadResGroups} from "../tools/ResGroupsLoader";

let watchPromise;

export function load(resGroupNames, onProgress, onBeginLoadResGroups, onEndLoadResGroups) {
	let p: Promise<any>;

	let loading = true;
	if (resGroupNames && resGroupNames.length > 0 && checkNeedLoad(resGroupNames)) {
		onBeginLoadResGroups(true);
		p = loadResGroups(resGroupNames, onProgress).then(() => {
			loading = false;
			onEndLoadResGroups();
		});
	} else {
		onBeginLoadResGroups(false);
		loading = false;
		onEndLoadResGroups();
		p = Promise.resolve();
	}

	return p.then(() => {
		watchPromise && watchPromise();
	});
}

export function watchLoaded() {
	return new Promise(resolve => {
		watchPromise = resolve;
	})
}