/**
 * Created by admin on 2017/6/30.
 */
import {StringUtils, Utils} from "@alienlib/tools";
import {LanguageIds, LanguagePack} from "../../generated/LanguagePack";

export default class Language extends LanguagePack{
	public ids:LanguageIds;
	public htmlParser:egret.HtmlTextParser;

	constructor(){
		super();

		this.ids = new LanguageIds();

		this.htmlParser = new egret.HtmlTextParser();
	}

	initData(){
		Utils.injectProp(this, RES.getRes('lang'));
	}

	format(template, ...params){
		return StringUtils.formatApply(template, params);
	}

	formatHtml(template, ...params){
		return this.htmlParser.parse(StringUtils.formatApply(template, params));
	}
}