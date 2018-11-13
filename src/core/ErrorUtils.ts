/**
 * Created by rockyl on 2018/8/21.
 */

import lang from "./lang";
import Toast from "@core/view/Toast";

export function showErrorAlert(e = null, callback?){
	let content = !e || e instanceof Error ? lang.net_error : e;

	Toast.show({
		content
	});

	/*PanelController.instance.show(PANEL_ALERT, {content}, function(){
		if(callback){
			callback();
		}else{
			location.reload();
		}
	})*/
}

export function catchError(p, callback?){
	p.catch(e=>{
		if(e instanceof Error){
			console.log(e.message);
			console.log(e.stack);
		}
		showErrorAlert(e, callback);
	})
}
