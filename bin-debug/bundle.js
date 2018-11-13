'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p]; };
    return extendStatics(d, b);
};
function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function __generator(thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1)
            throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f)
            throw new TypeError("Generator is already executing.");
        while (_)
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                    return t;
                if (y = 0, t)
                    op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:
                    case 1:
                        t = op;
                        break;
                    case 4:
                        _.label++;
                        return { value: op[1], done: false };
                    case 5:
                        _.label++;
                        y = op[1];
                        op = [0];
                        continue;
                    case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;
                            continue;
                        }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                            _.label = op[1];
                            break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];
                            t = op;
                            break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];
                            _.ops.push(op);
                            break;
                        }
                        if (t[2])
                            _.ops.pop();
                        _.trys.pop();
                        continue;
                }
                op = body.call(thisArg, _);
            }
            catch (e) {
                op = [6, e];
                y = 0;
            }
            finally {
                f = t = 0;
            }
        if (op[0] & 5)
            throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var AssetAdapter = (function () {
    function AssetAdapter() {
    }
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    return AssetAdapter;
}());

var ThemeAdapter = (function () {
    function ThemeAdapter() {
    }
    ThemeAdapter.prototype.getTheme = function (url, onSuccess, onError, thisObject) {
        var _this = this;
        function onResGet(e) {
            onSuccess.call(thisObject, e);
        }
        function onResError(e) {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }
        if (typeof generateEUI !== 'undefined') {
            egret.callLater(function () {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        }
        else if (typeof generateEUI2 !== 'undefined') {
            RES.getResByUrl("resource/gameEui.json", function (data, url) {
                window["JSONParseClass"]["setData"](data);
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateEUI2);
                }, _this);
            }, this, RES.ResourceItem.TYPE_JSON);
        }
        else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    };
    return ThemeAdapter;
}());

var Dispatcher = (function () {
    function Dispatcher() {
    }
    Dispatcher.init = function () {
        Dispatcher.eventDispatcher = new egret.EventDispatcher();
    };
    Dispatcher.dispatch = function (eventName, params) {
        if (params === void 0) { params = null; }
        if (params) {
            Dispatcher.eventDispatcher.dispatchEventWith(eventName, false, params);
        }
        else {
            Dispatcher.eventDispatcher.dispatchEvent(new egret.Event(eventName));
        }
    };
    Dispatcher.addEventListener = function (eventName, callback, thisObj) {
        Dispatcher.eventDispatcher.addEventListener(eventName, callback, thisObj);
    };
    Dispatcher.removeEventListener = function (eventName, callback, thisObj) {
        Dispatcher.eventDispatcher.removeEventListener(eventName, callback, thisObj);
    };
    return Dispatcher;
}());

var HtmlTextParser = (function () {
    function HtmlTextParser() {
        this.replaceArr = [];
        this.preReplaceArr = [];
        this.resutlArr = [];
        this.initReplaceArr();
        this.initPreReplaceArr();
    }
    HtmlTextParser.prototype.initReplaceArr = function () {
        var arr = this.replaceArr = [];
        arr.push([/&lt;/g, "<"]);
        arr.push([/&gt;/g, ">"]);
        arr.push([/&amp;/g, "&"]);
        arr.push([/&quot;/g, "\""]);
        arr.push([/&apos;/g, "\'"]);
    };
    HtmlTextParser.prototype.initPreReplaceArr = function () {
        var arr = this.preReplaceArr = [];
        arr.push([/\\\"/g, "\""]);
        arr.push([/<br>/g, "\n"]);
    };
    HtmlTextParser.prototype.replaceSpecial = function (value) {
        for (var i = 0; i < this.replaceArr.length; i++) {
            var k = this.replaceArr[i][0];
            var v = this.replaceArr[i][1];
            value = value.replace(k, v);
        }
        return value;
    };
    HtmlTextParser.prototype.parse = function (htmltext) {
        this.preReplaceArr.forEach(function (p) {
            htmltext = htmltext.replace(p[0], p[1]);
        });
        this.stackArray = [];
        this.resutlArr = [];
        var firstIdx = 0;
        var length = htmltext.length;
        while (firstIdx < length) {
            var starIdx = htmltext.indexOf("<", firstIdx);
            if (starIdx < 0) {
                this.addToResultArr(htmltext.substring(firstIdx));
                firstIdx = length;
            }
            else {
                this.addToResultArr(htmltext.substring(firstIdx, starIdx));
                var fontEnd = htmltext.indexOf(">", starIdx);
                if (fontEnd == -1) {
                    egret.$error(1038);
                    fontEnd = starIdx;
                }
                else if (htmltext.charAt(starIdx + 1) == "\/") {
                    this.stackArray.pop();
                }
                else {
                    this.addToArray(htmltext.substring(starIdx + 1, fontEnd));
                }
                firstIdx = fontEnd + 1;
            }
        }
        return this.resutlArr;
    };
    HtmlTextParser.prototype.parser = function (htmltext) {
        return this.parse(htmltext);
    };
    HtmlTextParser.prototype.addToResultArr = function (value) {
        if (value == "") {
            return;
        }
        value = this.replaceSpecial(value);
        if (this.stackArray.length > 0) {
            this.resutlArr.push({ text: value, style: this.stackArray[this.stackArray.length - 1] });
        }
        else {
            this.resutlArr.push({ text: value });
        }
    };
    HtmlTextParser.prototype.changeStringToObject = function (str) {
        str = this.replaceSpecial(str.trim());
        var info = {};
        var header = [];
        if (str.charAt(0) == "i" || str.charAt(0) == "b" || str.charAt(0) == "u") {
            this.addProperty(info, str, "true");
        }
        else if (header = str.match(/^(font|a)\s/)) {
            str = str.substring(header[0].length).trim();
            var next = 0;
            var titles = void 0;
            while (titles = str.match(this.getHeadReg())) {
                var title = titles[0];
                var value = "";
                str = str.substring(title.length).trim();
                if (str.charAt(0) == "\"") {
                    next = str.indexOf("\"", 1);
                    value = str.substring(1, next);
                    next += 1;
                }
                else if (str.charAt(0) == "\'") {
                    next = str.indexOf("\'", 1);
                    value = str.substring(1, next);
                    next += 1;
                }
                else {
                    value = str.match(/(\S)+/)[0];
                    next = value.length;
                }
                this.addProperty(info, title.substring(0, title.length - 1).trim(), value.trim());
                str = str.substring(next).trim();
            }
        }
        return info;
    };
    HtmlTextParser.prototype.getHeadReg = function () {
        return /^(color|textcolor|strokecolor|stroke|b|bold|i|italic|u|size|fontfamily|href|target)(\s)*=/;
    };
    HtmlTextParser.prototype.addProperty = function (info, head, value) {
        switch (head.toLowerCase()) {
            case "color":
            case "textcolor":
                value = value.replace(/#/, "0x");
                info.textColor = parseInt(value);
                break;
            case "strokecolor":
                value = value.replace(/#/, "0x");
                info.strokeColor = parseInt(value);
                break;
            case "stroke":
                info.stroke = parseInt(value);
                break;
            case "b":
            case "bold":
                info.bold = value == "true";
                break;
            case "u":
                info.underline = value == "true";
                break;
            case "i":
            case "italic":
                info.italic = value == "true";
                break;
            case "size":
                info.size = parseInt(value);
                break;
            case "fontfamily":
                info.fontFamily = value;
                break;
            case "href":
                info.href = this.replaceSpecial(value);
                break;
            case "target":
                info.target = this.replaceSpecial(value);
                break;
        }
    };
    HtmlTextParser.prototype.addToArray = function (infoStr) {
        var info = this.changeStringToObject(infoStr);
        if (this.stackArray.length == 0) {
            this.stackArray.push(info);
        }
        else {
            var lastInfo = this.stackArray[this.stackArray.length - 1];
            for (var key in lastInfo) {
                if (info[key] == null) {
                    info[key] = lastInfo[key];
                }
            }
            this.stackArray.push(info);
        }
    };
    return HtmlTextParser;
}());

function injectProp(target, data, callback, ignoreMethod, ignoreNull) {
    if (data === void 0) { data = null; }
    if (callback === void 0) { callback = null; }
    if (ignoreMethod === void 0) { ignoreMethod = true; }
    if (ignoreNull === void 0) { ignoreNull = true; }
    if (!target || !data) {
        return false;
    }
    var result = true;
    for (var key in data) {
        var value = data[key];
        if ((!ignoreMethod || typeof value != 'function') && (!ignoreNull || value != null)) {
            if (callback) {
                callback(target, key, value);
            }
            else {
                target[key] = value;
            }
        }
    }
    return result;
}
function combineProp() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    var ret = {};
    sources.forEach(function (source) {
        if (!source) {
            return;
        }
        for (var key in source) {
            if (source[key] !== null && source[key] !== undefined && source[key] !== '') {
                ret[key] = source[key];
            }
        }
    });
    return ret;
}
function anchorCenter(target, width, height, resetPos) {
    if (width === void 0) { width = 0; }
    if (height === void 0) { height = 0; }
    if (resetPos === void 0) { resetPos = true; }
    anchorRate(target, 0.5, 0.5, width, height, resetPos);
}
function anchorRate(target, rx, ry, width, height, resetPos) {
    if (width === void 0) { width = 0; }
    if (height === void 0) { height = 0; }
    if (resetPos === void 0) { resetPos = true; }
    if (width == 0) {
        width = target.width;
    }
    if (height == 0) {
        height = target.height;
    }
    if (resetPos) {
        if (rx == 0) {
            target.x -= target.anchorOffsetX;
        }
        if (ry == 0) {
            target.y -= target.anchorOffsetY;
        }
    }
    target.anchorOffsetX = width * rx;
    target.anchorOffsetY = height * ry;
    if (resetPos) {
        if (rx > 0) {
            target.x += target.anchorOffsetX;
        }
        if (ry > 0) {
            target.y += target.anchorOffsetY;
        }
    }
}
function obj2query(obj) {
    if (!obj) {
        return '';
    }
    var arr = [];
    for (var key in obj) {
        arr.push(key + '=' + obj[key]);
    }
    return arr.join('&');
}
var htmlParser = new HtmlTextParser();
function parseHtmlText(html) {
    return htmlParser.parse(html);
}

var EventManager = (function () {
    function EventManager() {
        this._groups = {};
    }
    EventManager.prototype.register = function (groupName, target, eventName, callback, thisObj, priority) {
        if (priority === void 0) { priority = 0; }
        if (!target) {
            console.error('target is empty');
        }
        var item = new RegisterItem();
        injectProp(item, { target: target, eventName: eventName, callback: callback, thisObj: thisObj, priority: priority }, null, false);
        var group = this._groups[groupName];
        if (!group) {
            group = this._groups[groupName] = { enable: false, items: [] };
        }
        group.items.push(item);
        if (group.enable) {
            this.addEventListener(item);
        }
    };
    EventManager.prototype.registerOn = function (obj, target, eventName, callback, thisObj, priority) {
        if (priority === void 0) { priority = 0; }
        this.register(obj['__class__'], target, eventName, callback, thisObj, priority);
    };
    EventManager.prototype.enable = function (groupName) {
        var group = this._groups[groupName];
        if (!group) {
            group = this._groups[groupName] = { enable: false, items: [] };
        }
        if (!group.enable) {
            group.enable = true;
            group.items.forEach(this.addEventListener);
        }
    };
    EventManager.prototype.addEventListener = function (item) {
        item.target['addEventListener'](item.eventName, item.callback, item.thisObj, false, item.priority);
    };
    EventManager.prototype.enableOn = function (obj) {
        this.enable(obj['__class__']);
    };
    EventManager.prototype.disable = function (groupName) {
        var group = this._groups[groupName];
        if (group && group.enable) {
            group.enable = false;
            group.items.forEach(this.removeEventListener);
        }
    };
    EventManager.prototype.removeEventListener = function (item) {
        item.target['removeEventListener'](item.eventName, item.callback, item.thisObj);
    };
    EventManager.prototype.disableOn = function (obj) {
        this.disable(obj['__class__']);
    };
    EventManager.prototype.dump = function (groupName) {
        if (groupName === void 0) { groupName = null; }
        for (var key in this._groups) {
            var group = this._groups[key];
            console.log(key + '[' + group.items.length + ']: ' + (group.enable ? '● enable' : '○ disable'));
            console.log(group.items.map(function (item) {
                return item.eventName;
            }).join(','));
        }
    };
    return EventManager;
}());
var RegisterItem = (function () {
    function RegisterItem() {
    }
    return RegisterItem;
}());
var eventManager = new EventManager();

var _ID;
function init(ID) {
    _ID = ID;
}
function getName(key, prefix) {
    if (prefix === void 0) { prefix = null; }
    return (prefix || !_ID || _ID == '' ? prefix : _ID) + '_' + key;
}
function getItem(key, prefix) {
    if (prefix === void 0) { prefix = null; }
    return egret.localStorage.getItem(getName(key, prefix));
}
function setItem(key, value, prefix) {
    if (prefix === void 0) { prefix = null; }
    egret.localStorage.setItem(getName(key, prefix), value);
    return true;
}
function getItemObj(key, defaultObj, prefix) {
    if (defaultObj === void 0) { defaultObj = null; }
    if (prefix === void 0) { prefix = null; }
    var result;
    try {
        result = JSON.parse(getItem(key, prefix));
    }
    catch (e) {
    }
    if (!result) {
        result = defaultObj;
    }
    return result;
}
function setItemObj(key, itemObj, prefix) {
    if (prefix === void 0) { prefix = null; }
    return setItem(key, JSON.stringify(itemObj), prefix);
}

function getTweenPromise(tween) {
    return new Promise(function (resolve) {
        tween.call(resolve);
    });
}
function waitPromise(duration) {
    return new Promise(function (resolve) {
        setTimeout(resolve, duration);
    });
}
var Bezier = (function () {
    function Bezier(onUpdate) {
        this._onUpdate = onUpdate;
    }
    Bezier.prototype.init = function (posArr) {
        this._posArr = posArr;
        this.factor = 0;
    };
    Object.defineProperty(Bezier.prototype, "factor", {
        get: function () {
            return 0;
        },
        set: function (value) {
            var p = this._posArr;
            var x = (1 - value) * (1 - value) * p[0].x + 2 * value * (1 - value) * p[1].x + value * value * p[2].x;
            var y = (1 - value) * (1 - value) * p[0].y + 2 * value * (1 - value) * p[1].y + value * value * p[2].y;
            this._onUpdate({ x: x, y: y });
        },
        enumerable: true,
        configurable: true
    });
    return Bezier;
}());
function enumChildren(container, callback) {
    for (var i = 0, li = container.numChildren; i < li; i++) {
        if (callback(container.getChildAt(i), i)) {
            break;
        }
    }
}

var _stage;
var lastTouchPos = {};
var autoAdjustTargets;
function init$1(stage, root) {
    _stage = stage;
    stage.addEventListener(egret.TouchEvent.TOUCH_END, function (event) {
        lastTouchPos.x = event.stageX;
        lastTouchPos.y = event.stageY;
    }, this);
    autoAdjustTargets = [];
    stage.addEventListener(egret.Event.RESIZE, onStageResize, this);
}
function onStageResize(event) {
    if (event === void 0) { event = null; }
    var _a = getSize(), width = _a.width, height = _a.height;
    autoAdjustTargets.forEach(function (child) {
        child.width = width;
        child.height = height;
    });
}
function getStage() {
    return _stage;
}
function getWidth() {
    return _stage.stageWidth;
}
function getHeight() {
    return _stage.stageHeight;
}
function getSize() {
    return {
        width: getWidth(),
        height: getHeight(),
    };
}

var LoadingView = (function (_super) {
    __extends(LoadingView, _super);
    function LoadingView() {
        var _this = _super.call(this) || this;
        _this.percentWidth = _this.percentHeight = 100;
        _this.skinName = LoadingViewSkin;
        _this.onProgress(0, 100);
        Dispatcher.addEventListener('RES_LOAD_PROGRESS', function (e) {
            var _a = e.data, current = _a.current, total = _a.total;
            this.setProgress(current / total);
        }, _this);
        return _this;
    }
    Object.defineProperty(LoadingView, "instance", {
        get: function () {
            if (this._instance == undefined) {
                this._instance = new LoadingView();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    LoadingView.prototype.setProgress = function (process, immediately) {
        if (immediately === void 0) { immediately = false; }
        var d = this.progressBar.slideDuration;
        if (immediately) {
            this.progressBar.slideDuration = 0;
        }
        this.progressBar.value = Math.floor(process * 100);
        if (immediately) {
            this.progressBar.slideDuration = d;
        }
    };
    LoadingView.prototype.onProgress = function (current, total) {
        this.setProgress(current / total);
    };
    LoadingView.prototype.setState = function (state) {
        this.currentState = state;
    };
    return LoadingView;
}(eui.Component));

function distance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

function formatApply(formatStr, params) {
    var result = formatStr;
    for (var i = 0, len = params.length; i < len; i++) {
        var reg = new RegExp("\\{" + i + "\\}", 'g');
        result = result.replace(reg, params[i]);
    }
    return result;
}

function checkNeedLoad(resGroupNames) {
    var needLoad = false;
    for (var i = 0, li = resGroupNames.length; i < li; i++) {
        if (!RES.isGroupLoaded(resGroupNames[i])) {
            needLoad = true;
            break;
        }
    }
    return needLoad;
}
function loadResGroups(resGroupNames, progressCallback) {
    if (progressCallback === void 0) { progressCallback = null; }
    return __awaiter(this, void 0, Promise, function () {
        var loaded, resLoadReporter, total, i, li;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    loaded = 0;
                    resLoadReporter = new ResLoadReporter(function (current, total) {
                        progressCallback && progressCallback(++loaded, total);
                    });
                    total = resGroupNames.reduce(function (p, c) {
                        return p + (RES.isGroupLoaded(c) ? 0 : RES.getGroupByName(c).length);
                    }, 0);
                    i = 0, li = resGroupNames.length;
                    _a.label = 1;
                case 1:
                    if (!(i < li)) return [3, 4];
                    if (!!RES.isGroupLoaded(resGroupNames[i])) return [3, 3];
                    return [4, RES.loadGroup(resGroupNames[i], 0, resLoadReporter)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3, 1];
                case 4: return [2];
            }
        });
    });
}
var ResLoadReporter = (function () {
    function ResLoadReporter(progressCallback) {
        this.progressCallback = progressCallback;
    }
    ResLoadReporter.prototype.onProgress = function (current, total) {
        this.progressCallback(current, total);
    };
    return ResLoadReporter;
}());

function callNet(url, params, method, header, parseUrl, parseBody) {
    var _this = this;
    if (params === void 0) { params = null; }
    if (method === void 0) { method = egret.HttpMethod.GET; }
    if (header === void 0) { header = null; }
    if (parseUrl === void 0) { parseUrl = null; }
    if (parseBody === void 0) { parseBody = null; }
    return new Promise(function (resolve, reject) {
        var finalUrl = parseUrl ? parseUrl() : url;
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.addEventListener(egret.Event.COMPLETE, function (event) {
            resolve(request.response);
        }, _this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
            reject(new Error('request error.'));
        }, _this);
        request.open(finalUrl, method);
        for (var k in header) {
            request.setRequestHeader(k, header[k]);
        }
        var data = null;
        if (parseBody) {
            data = parseBody();
        }
        else {
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            data = obj2query(params);
        }
        try {
            if (data) {
                request.send(data);
            }
            else {
                request.send();
            }
        }
        catch (e) {
            reject(e);
        }
    });
}
function GET(url, params, header) {
    if (params === void 0) { params = null; }
    if (header === void 0) { header = null; }
    return this.callNet(url, params, egret.HttpMethod.GET, header, function () {
        if (params) {
            var data = obj2query(params);
            url += (data.length > 0 && url.indexOf('?') < 0 ? '?' : '') + data;
        }
        return url;
    }, function () { return null; });
}
function POST(url, params, header) {
    if (params === void 0) { params = null; }
    if (header === void 0) { header = null; }
    return this.callNet(url, params, egret.HttpMethod.POST, header);
}
function POSTDirectory(url, params, header) {
    if (params === void 0) { params = null; }
    if (header === void 0) { header = null; }
    return this.callNet(url, params, egret.HttpMethod.POST, header, null, function () {
        return params;
    });
}
function JSONP(url, params, method) {
    if (method === void 0) { method = 'get'; }
    var ts = Math.floor(Date.now() / 1000);
    url += (url.indexOf('?') < 0 ? '?' : '') + '_=' + ts;
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: method,
            url: url,
            dataType: 'jsonp',
            data: params,
            async: true,
            success: function (result) {
                resolve(result);
            },
            error: function (message) {
                reject(message);
            }
        });
    });
}

var Ajax = /*#__PURE__*/Object.freeze({
    callNet: callNet,
    GET: GET,
    POST: POST,
    POSTDirectory: POSTDirectory,
    JSONP: JSONP
});

var LanguagePack = (function () {
    function LanguagePack() {
    }
    return LanguagePack;
}());
var LanguageIds = (function () {
    function LanguageIds() {
        this.need_login = 'need_login';
        this.net_error = 'net_error';
        this.current_score = 'current_score';
        this.max_score = 'max_score';
        this.score_unit = 'score_unit';
        this.free = 'free';
        this.my_credit = 'my_credit';
        this.no_more_credits = 'no_more_credits';
        this.revive_cost = 'revive_cost';
        this.revive_failed = 'revive_failed';
        this.rank_first = 'rank_first';
        this.rank_second = 'rank_second';
        this.rank_third = 'rank_third';
        this.rank_num = 'rank_num';
        this.rank_out = 'rank_out';
        this.me = 'me';
        this.rank_max_score = 'rank_max_score';
        this.rank_reward_content = 'rank_reward_content';
        this.result_text = 'result_text';
    }
    return LanguageIds;
}());

var Language = (function (_super) {
    __extends(Language, _super);
    function Language() {
        var _this = _super.call(this) || this;
        _this.ids = new LanguageIds();
        _this.htmlParser = new egret.HtmlTextParser();
        return _this;
    }
    Language.prototype.initData = function () {
        injectProp(this, RES.getRes('lang'));
    };
    Language.prototype.format = function (template) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return formatApply(template, params);
    };
    Language.prototype.formatHtml = function (template) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return this.htmlParser.parse(formatApply(template, params));
    };
    return Language;
}(LanguagePack));

var lang = new Language();

var EventComponent = (function (_super) {
    __extends(EventComponent, _super);
    function EventComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(EventComponent.prototype, "eventGroupName", {
        get: function () {
            return this['__class__'] + '_' + this.hashCode;
        },
        enumerable: true,
        configurable: true
    });
    EventComponent.prototype.registerEvent = function (target, eventName, callback, thisObj, priority) {
        if (priority === void 0) { priority = 0; }
        eventManager.register(this.eventGroupName, target, eventName, callback, thisObj, priority);
    };
    EventComponent.prototype.enableEvents = function () {
        eventManager.enable(this.eventGroupName);
    };
    EventComponent.prototype.disableEvents = function () {
        eventManager.disable(this.eventGroupName);
    };
    return EventComponent;
}(eui.Component));
var VisualEventComponent = (function (_super) {
    __extends(VisualEventComponent, _super);
    function VisualEventComponent() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddedToStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemovedFromStage, _this);
        return _this;
    }
    VisualEventComponent.prototype.onAddedToStage = function (event) {
        this.enableEvents();
    };
    VisualEventComponent.prototype.onRemovedFromStage = function (event) {
        this.disableEvents();
    };
    return VisualEventComponent;
}(EventComponent));
var VisualEventItemRenderer = (function (_super) {
    __extends(VisualEventItemRenderer, _super);
    function VisualEventItemRenderer() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddedToStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemovedFromStage, _this);
        return _this;
    }
    Object.defineProperty(VisualEventItemRenderer.prototype, "eventGroupName", {
        get: function () {
            return this['__class__'] + '_' + this.hashCode;
        },
        enumerable: true,
        configurable: true
    });
    VisualEventItemRenderer.prototype.registerEvent = function (target, eventName, callback, thisObj, priority) {
        if (priority === void 0) { priority = 0; }
        eventManager.register(this.eventGroupName, target, eventName, callback, thisObj, priority);
    };
    VisualEventItemRenderer.prototype.enableEvents = function () {
        eventManager.enable(this.eventGroupName);
    };
    VisualEventItemRenderer.prototype.disableEvents = function () {
        eventManager.disable(this.eventGroupName);
    };
    VisualEventItemRenderer.prototype.onAddedToStage = function (event) {
        this.enableEvents();
    };
    VisualEventItemRenderer.prototype.onRemovedFromStage = function (event) {
        this.disableEvents();
    };
    return VisualEventItemRenderer;
}(eui.ItemRenderer));

var SHOW_TOAST = 'SHOW_TOAST';
var HIDE_TOAST = 'HIDE_TOAST';

var Toast = (function (_super) {
    __extends(Toast, _super);
    function Toast() {
        var _this = _super.call(this) || this;
        Toast._instance = _this;
        return _this;
    }
    Object.defineProperty(Toast, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Toast.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.grp.alpha = 0;
        this._queue = [];
        this.registerEvent(Dispatcher, SHOW_TOAST, this.onShow, this);
        this.registerEvent(Dispatcher, HIDE_TOAST, this.onClean, this);
    };
    Toast.prototype.addAndPlayOne = function (data) {
        var _this = this;
        if (data === void 0) { data = null; }
        if (data && this._queue.length == 0 && !this._tween) {
            this._queue.push(data);
        }
        else if (data && this._queue.length > 0 && data.content != this._queue[this._queue.length - 1].text) {
            this._queue.push(data);
        }
        if (this._queue.length == 0 || this._tween) {
            return;
        }
        var item = this._queue.shift();
        var content = item.content, _a = item.color, color = _a === void 0 ? 0xfff1d3 : _a, _b = item.duration, duration = _b === void 0 ? 1000 : _b;
        this.labContent.text = content;
        this.labContent.textColor = color;
        this._tween = egret.Tween.get(this.grp, null, null, true)
            .to({ alpha: 1 }, 300)
            .wait(duration)
            .to({ alpha: 0 }, 200)
            .call(function () {
            _this._tween = null;
            _this.addAndPlayOne();
        });
    };
    Toast.prototype.clean = function () {
        this._queue.splice(0);
    };
    Toast.prototype.onShow = function (event) {
        this.addAndPlayOne(event.data);
    };
    Toast.prototype.onClean = function (event) {
        this.clean();
        egret.Tween.get(this.grp, null, null, true)
            .to({ alpha: 0 }, 200);
    };
    Toast.show = function (data) {
        Toast._instance.addAndPlayOne(data);
    };
    Toast.clean = function () {
        Toast._instance.clean();
    };
    return Toast;
}(VisualEventComponent));

function showErrorAlert(e, callback) {
    if (e === void 0) { e = null; }
    var content = !e || e instanceof Error ? lang.net_error : e;
    Toast.show({
        content: content
    });
}
function catchError(p, callback) {
    p.catch(function (e) {
        if (e instanceof Error) {
            console.log(e.message);
            console.log(e.stack);
        }
        showErrorAlert(e, callback);
    });
}

var componentDefinitions = {};
var bindingsMap = {};
var currentGroup;
var bindingConfig;
function getDefName(str) {
    return str.substr(str.lastIndexOf('/') + 1);
}
function ready(config) {
    bindingConfig = config;
    for (var _i = 0, config_1 = config; _i < config_1.length; _i++) {
        var scene = config_1[_i];
        for (var _a = 0, _b = scene.bindings; _a < _b.length; _a++) {
            var binding = _b[_a];
            for (var _c = 0, _d = binding.components; _c < _d.length; _c++) {
                var component = _d[_c];
                var name = getDefName(component.script);
                componentDefinitions[name] = window[name];
            }
        }
    }
}
function newComponent(name) {
    var def = componentDefinitions[name];
    if (!def) {
        return null;
    }
    var ins = new def();
    return ins;
}
function getHostKey(host) {
    return host['__class__'] + '_' + host.hashCode;
}
function getBindingByName(name) {
    return bindingConfig.find(function (item) { return item.name == name; });
}
function getComponents(host, createWhenNotExist) {
    if (createWhenNotExist === void 0) { createWhenNotExist = false; }
    var group = bindingsMap[currentGroup];
    if (!group) {
        group = bindingsMap[currentGroup] = {};
    }
    var key = getHostKey(host);
    var bindings = group[key];
    if (!bindings && createWhenNotExist) {
        bindings = group[key] = [];
    }
    return bindings;
}
function getComponent(host, nameOrDef) {
    var target;
    var components = getComponents(host);
    if (components) {
        for (var _i = 0, components_1 = components; _i < components_1.length; _i++) {
            var component = components_1[_i];
            if (components['__class__'] == nameOrDef || component instanceof nameOrDef) {
                target = component;
                break;
            }
        }
    }
    return target;
}
function transData(data) {
    for (var key in data) {
        var child = data[key];
        var type = typeof child;
        if (type == 'object') {
            transData(child);
        }
        else if (type == 'string') {
            child = child.replace(/\\n/g, '\n');
            if (child.indexOf('${') >= 0) {
                var result = child.match(/\${[.|\w]+}/g);
                if (result) {
                    for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                        var item = result_1[_i];
                        var code = item.substr(2, item.length - 3);
                        var ret = devil(code);
                        child = child.replace(item, ret);
                    }
                }
            }
            data[key] = child;
        }
    }
}
function bindComponent(host, component, injection) {
    var components = getComponents(host, true);
    components.push(component);
    transData(injection);
    injectProp(component, injection);
    component['host'] = host;
    if (host.skin) {
        host.skin.skinParts.forEach(function (part) {
            if (component.hasOwnProperty(part)) {
                component[part] = host[part];
            }
        });
    }
}
function findTargetInObject(object, targetName) {
    var target = null;
    if (!targetName || targetName == 'this') {
        target = object;
    }
    else {
        try {
            var arr = targetName.split('.');
            target = arr.reduce(function (a, b) {
                if (a[b]) {
                    return a[b];
                }
            }, object);
        }
        catch (e) { }
    }
    return target;
}
function forEachBindings(sceneView, name, func) {
    var item = getBindingByName(name);
    for (var _i = 0, _a = item.bindings; _i < _a.length; _i++) {
        var binding = _a[_i];
        var target = binding.target;
        var targetView = findTargetInObject(sceneView, target);
        if (targetView) {
            func(targetView, binding);
        }
        else {
            console.warn("target " + target + " is not exist");
        }
    }
}
function setCurrentGroup(name) {
    currentGroup = name;
}
function mountView(sceneView, name) {
    forEachBindings(sceneView, name, function (targetView, binding) {
        for (var _i = 0, _a = binding.components; _i < _a.length; _i++) {
            var component = _a[_i];
            var script = component.script, injection = component.injection, enabled = component.enabled;
            if (!enabled) {
                continue;
            }
            var name_1 = getDefName(script);
            var instance = newComponent(name_1);
            if (instance) {
                bindComponent(targetView, instance, injection);
                instance.onCreate();
            }
            else {
                console.warn('script is not exist:', name_1);
            }
        }
    });
}
function awakeView(view, name) {
    forEachBindings(view, name, function (targetView) {
        var components = getComponents(targetView);
        if (components) {
            for (var _i = 0, components_3 = components; _i < components_3.length; _i++) {
                var component = components_3[_i];
                component.awake();
            }
        }
    });
}
function sleepView(view, name) {
    forEachBindings(view, name, function (targetView) {
        var components = getComponents(targetView);
        if (components) {
            for (var _i = 0, components_4 = components; _i < components_4.length; _i++) {
                var component = components_4[_i];
                component.sleep();
            }
        }
    });
}
function broadcast(method, targetComponent) {
    if (targetComponent === void 0) { targetComponent = null; }
    var params = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        params[_i - 2] = arguments[_i];
    }
    var group = bindingsMap[currentGroup];
    if (!group) {
        return;
    }
    var result = [];
    for (var key in group) {
        var bindings = group[key];
        for (var _a = 0, bindings_1 = bindings; _a < bindings_1.length; _a++) {
            var binding = bindings_1[_a];
            var m = binding[method];
            if (m && !(targetComponent && typeof targetComponent === 'function' && binding instanceof targetComponent)) {
                result.push({
                    component: binding,
                    result: m.apply(binding, params),
                });
            }
        }
    }
    return result;
}

var NavigatorAction;
(function (NavigatorAction) {
    NavigatorAction[NavigatorAction["Push"] = 0] = "Push";
    NavigatorAction[NavigatorAction["Pop"] = 1] = "Pop";
    NavigatorAction[NavigatorAction["Replace"] = 2] = "Replace";
    NavigatorAction[NavigatorAction["Jump"] = 3] = "Jump";
})(NavigatorAction || (NavigatorAction = {}));
var StackNavigator = (function () {
    function StackNavigator(delegate) {
        this._stack = [];
        this._delegate = delegate;
    }
    StackNavigator.prototype.catchPromise = function (p) {
        var _this = this;
        if (p) {
            p.catch((function (e) {
                _this._delegate.onError(e);
            }));
        }
    };
    StackNavigator.prototype.push = function (name, parameters) {
        if (parameters === void 0) { parameters = null; }
        var last = this.getTopSceneName();
        if (last) {
            if (last == name) {
                return;
            }
            this.catchPromise(this._delegate.onLeave(last, name, NavigatorAction.Push, parameters));
        }
        this._stack.push(name);
        this.catchPromise(this._delegate.onEnter(name, last, NavigatorAction.Push, parameters));
    };
    StackNavigator.prototype.popTo = function (index, name, parameters) {
        if (parameters === void 0) { parameters = null; }
        if (this._stack.length > 0 && this._stack.length < (index + 1)) {
            return;
        }
        var last = this.getTopSceneName();
        this._stack.splice(Math.max(index + 1, 0));
        var next = this._stack[index];
        if (!next) {
            this._stack.push(next = name);
        }
        if (last) {
            this.catchPromise(this._delegate.onLeave(last, next, NavigatorAction.Pop, parameters));
        }
        this.catchPromise(this._delegate.onEnter(next, last, NavigatorAction.Pop, parameters));
    };
    StackNavigator.prototype.pop = function (parameters) {
        if (parameters === void 0) { parameters = null; }
        this.popTo(this._stack.length - 2, null, parameters);
    };
    StackNavigator.prototype.popAll = function (name, parameters) {
        if (parameters === void 0) { parameters = null; }
        this.popTo(-1, name, parameters);
    };
    StackNavigator.prototype.replace = function (name, parameters) {
        if (parameters === void 0) { parameters = null; }
        var last = this._stack.pop();
        this._stack.push(name);
        this.catchPromise(this._delegate.onLeave(last, name, NavigatorAction.Replace, parameters));
        this.catchPromise(this._delegate.onEnter(name, last, NavigatorAction.Replace, parameters));
    };
    StackNavigator.prototype.jump = function (name, parameters) {
        if (parameters === void 0) { parameters = null; }
        if (this._stack.length < 2) {
            this.push(name, parameters);
            return;
        }
        var last = this._stack.pop();
        this._stack.splice(1);
        var next = name;
        this._stack.push(next);
        this._delegate.onLeave(last, next, NavigatorAction.Pop, parameters);
        this._delegate.onEnter(next, last, NavigatorAction.Pop, parameters);
    };
    StackNavigator.prototype.getTopSceneName = function () {
        return this._stack.length > 0 ? this._stack[this._stack.length - 1] : null;
    };
    StackNavigator.prototype.getBottomSceneName = function () {
        return this._stack.length > 0 ? this._stack[0] : null;
    };
    return StackNavigator;
}());

var Navigator = (function (_super) {
    __extends(Navigator, _super);
    function Navigator() {
        var _this = _super.call(this) || this;
        _this._classDic = {};
        _this._instanceDic = {};
        _this.stack = new StackNavigator(_this);
        return _this;
    }
    Navigator.prototype.register = function (name, clazz) {
        this._classDic[name] = clazz;
    };
    Navigator.prototype.push = function (name, parameters) {
        if (parameters === void 0) { parameters = null; }
        this.stack.push(name, parameters);
    };
    Navigator.prototype.pop = function (parameters) {
        if (parameters === void 0) { parameters = null; }
        this.stack.pop(parameters);
    };
    Navigator.prototype.popToBottom = function (parameters) {
        if (parameters === void 0) { parameters = null; }
        this.stack.popTo(0, null, parameters);
    };
    Navigator.prototype.popAll = function (name, parameters) {
        if (parameters === void 0) { parameters = null; }
        this.stack.popAll(name, parameters);
    };
    Navigator.prototype.replace = function (name, parameters) {
        if (parameters === void 0) { parameters = null; }
        this.stack.replace(name, parameters);
    };
    Navigator.prototype.jump = function (name, parameters) {
        if (parameters === void 0) { parameters = null; }
        this.stack.jump(name, parameters);
    };
    Object.defineProperty(Navigator.prototype, "currentView", {
        get: function () {
            return this._currentView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Navigator.prototype, "currentName", {
        get: function () {
            return this._currentName;
        },
        enumerable: true,
        configurable: true
    });
    Navigator.prototype.newView = function (name) {
        return new this._classDic[name]();
    };
    Navigator.prototype.getViewInstanceByName = function (name) {
        var view = this._instanceDic[name];
        if (!view) {
            view = this._instanceDic[name] = this.newView(name);
        }
        return view;
    };
    Navigator.prototype.addView = function (view, addToBottom) {
    };
    Navigator.prototype.onEnter = function (name, last, action, parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var view, addToBottom;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        view = this.getViewInstanceByName(name);
                        this._currentView = view;
                        this._currentName = name;
                        return [4, view.onWillMount(last, action, parameters)];
                    case 1:
                        _a.sent();
                        addToBottom = view.onAddView();
                        this.addView(view, addToBottom);
                        if (Navigator.log)
                            console.log(name + ' will enter.');
                        this.dispatchEventWith(Navigator.VIEW_WILL_ENTER, false, { name: name, last: last, action: action, parameters: parameters });
                        return [4, view.onWillEnter(last, action, parameters)];
                    case 2:
                        _a.sent();
                        if (Navigator.log)
                            console.log(name + ' did enter.');
                        this.dispatchEventWith(Navigator.VIEW_DID_ENTER, false, { name: name, last: last, action: action, parameters: parameters });
                        view.onDidEnter(last, action, parameters);
                        return [2];
                }
            });
        });
    };
    Navigator.prototype.onLeave = function (name, next, action, parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var view;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        view = this.getViewInstanceByName(name);
                        return [4, view.onWillUnMount(name, action, parameters)];
                    case 1:
                        _a.sent();
                        if (Navigator.log)
                            console.log(name + ' will leave.');
                        this.dispatchEventWith(Navigator.VIEW_WILL_LEAVE, false, { name: name, next: next, action: action, parameters: parameters });
                        return [4, view.onWillLeave(next, action, parameters)];
                    case 2:
                        _a.sent();
                        if (Navigator.log)
                            console.log(name + ' did leave.');
                        this.dispatchEventWith(Navigator.VIEW_DID_LEAVE, false, { name: name, next: next, action: action, parameters: parameters });
                        view.onDidLeave(next, action, parameters);
                        return [2];
                }
            });
        });
    };
    Navigator.prototype.onError = function (error) {
    };
    Navigator.VIEW_WILL_ENTER = 'VIEW_WILL_ENTER';
    Navigator.VIEW_DID_ENTER = 'VIEW_DID_ENTER';
    Navigator.VIEW_WILL_LEAVE = 'VIEW_WILL_LEAVE';
    Navigator.VIEW_DID_LEAVE = 'VIEW_DID_LEAVE';
    Navigator.log = false;
    return Navigator;
}(egret.EventDispatcher));

var watchPromise;
function load(resGroupNames, onProgress, onBeginLoadResGroups, onEndLoadResGroups) {
    var p;
    if (resGroupNames && resGroupNames.length > 0 && checkNeedLoad(resGroupNames)) {
        onBeginLoadResGroups(true);
        p = loadResGroups(resGroupNames, onProgress).then(function () {
            onEndLoadResGroups();
        });
    }
    else {
        onBeginLoadResGroups(false);
        onEndLoadResGroups();
        p = Promise.resolve();
    }
    return p.then(function () {
        watchPromise && watchPromise();
    });
}

var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        var _this = _super.call(this) || this;
        _this.onBeginLoadResGroups = _this.onBeginLoadResGroups.bind(_this);
        _this.onEndLoadResGroups = _this.onEndLoadResGroups.bind(_this);
        _this.onProgress = _this.onProgress.bind(_this);
        return _this;
    }
    Object.defineProperty(Scene.prototype, "tweenEnter", {
        get: function () {
            return this['enter' + (this.currentState ? '_' + this.currentState : '')];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "tweenLeave", {
        get: function () {
            return this['leave' + (this.currentState ? '_' + this.currentState : '')];
        },
        enumerable: true,
        configurable: true
    });
    Scene.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.percentWidth = this.percentHeight = 100;
        var tween;
        if (this.tweenEnter) {
            this.tweenEnter.addEventListener(egret.Event.COMPLETE, this.onTweenEnterComplete, this);
        }
        else if (this.skin) {
            this.skin.states.forEach(function (state) {
                if (tween = _this['enter_' + state.name]) {
                    tween.addEventListener(egret.Event.COMPLETE, _this.onTweenEnterComplete, _this);
                }
            });
        }
        if (this.tweenLeave) {
            this.tweenLeave.addEventListener(egret.Event.COMPLETE, this.onTweenLeaveComplete, this);
        }
        else if (this.skin) {
            this.skin.states.forEach(function (state) {
                if (tween = _this['leave_' + state.name]) {
                    tween.addEventListener(egret.Event.COMPLETE, _this.onTweenLeaveComplete, _this);
                }
            });
        }
    };
    Scene.prototype.getResGroupNames = function () {
        return null;
    };
    Scene.prototype.getSkinName = function () {
        return null;
    };
    Scene.prototype.onBeginLoadResGroups = function (needLoad) {
    };
    Scene.prototype.onEndLoadResGroups = function () {
    };
    Scene.prototype.onProgress = function (current, total) {
        Dispatcher.dispatch('RES_LOAD_PROGRESS', { current: current, total: total });
    };
    Scene.prototype.active = function () {
    };
    Scene.prototype.inactive = function () {
    };
    Scene.prototype.onWillUnMount = function (next, action, parameters) {
        return Promise.resolve();
    };
    Scene.prototype.onSkinOn = function () {
    };
    Scene.prototype.onAddView = function () {
        return true;
    };
    Scene.prototype.onDidEnter = function (last, action, parameters) {
    };
    Scene.prototype.onDidLeave = function (next, action, parameters) {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    Scene.prototype.shouldShowLeaveLayer = function (next, action, parameters) {
        return true;
    };
    Scene.prototype.onBeginLoadResGroups = function (needLoad) {
        this.needLoad = needLoad;
        Dispatcher.dispatch('show_loading', { needLoad: needLoad });
    };
    Scene.prototype.onEndLoadResGroups = function () {
    };
    Scene.prototype.onWillMount = function (next, action, parameters) {
        return __awaiter(this, void 0, Promise, function () {
            var resGroupNames, p;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resGroupNames = this.getResGroupNames();
                        p = load(resGroupNames, this.onProgress, this.onBeginLoadResGroups, this.onEndLoadResGroups);
                        return [4, waitPromise(500)];
                    case 1:
                        _a.sent();
                        return [4, p.then(function () {
                                if (!_this.skinName) {
                                    var skinName = _this.getSkinName();
                                    if (skinName) {
                                        _this.skinName = skinName;
                                    }
                                }
                                else {
                                    _this.onSkinOn();
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Scene.prototype.onWillEnter = function (last, action, parameters) {
        return __awaiter(this, void 0, Promise, function () {
            var p;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.resetScene(parameters);
                        this.active();
                        return [4, waitPromise(100)];
                    case 1:
                        _a.sent();
                        if (this.tweenEnter) {
                            this.tweenEnter.play(0);
                        }
                        this.onPlayEnter();
                        p = Promise.resolve();
                        Dispatcher.dispatch('hide_black_layer', p);
                        return [4, p];
                    case 2:
                        _a.sent();
                        return [4, this.waitingForEnter()];
                    case 3:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Scene.prototype.waitingForEnter = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.tweenEnter && _this.resolveEnter === false) {
                _this.resolveEnter = resolve;
            }
            else {
                resolve();
            }
        });
    };
    Scene.prototype.onWillLeave = function (next, action, parameters) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.tweenLeave) {
                            this.tweenLeave.play(0);
                        }
                        this.onPlayLeave();
                        return [4, this.waitingForLeave()];
                    case 1:
                        _a.sent();
                        if (!this.shouldShowLeaveLayer(next, action, parameters)) return [3, 3];
                        Dispatcher.dispatch('show_black_layer');
                        return [4, waitPromise(300)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        this.inactive();
                        return [2];
                }
            });
        });
    };
    Scene.prototype.waitingForLeave = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.tweenLeave) {
                _this.resolveLeave = resolve;
            }
            else {
                resolve();
            }
        });
    };
    Scene.prototype.onTweenEnterComplete = function (event) {
        this.resolveEnter && this.resolveEnter();
        this.resolveEnter = null;
    };
    Scene.prototype.onTweenLeaveComplete = function (event) {
        this.resolveLeave && this.resolveLeave();
        this.resolveLeave = null;
    };
    Scene.prototype.onPlayEnter = function () {
    };
    Scene.prototype.onPlayLeave = function () {
    };
    Scene.prototype.resetScene = function (parameters) {
    };
    Scene.prototype.goto = function (name, parameters) {
        if (parameters === void 0) { parameters = null; }
        this.navigator.push(name, parameters);
    };
    Scene.prototype.back = function (parameters) {
        if (parameters === void 0) { parameters = null; }
        this.navigator.pop(parameters);
    };
    return Scene;
}(eui.Component));

var CurseScene = (function (_super) {
    __extends(CurseScene, _super);
    function CurseScene(name, options) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.options = options;
        return _this;
    }
    CurseScene.prototype.getSkinName = function () {
        return this.options.skin;
    };
    CurseScene.prototype.getResGroupNames = function () {
        return this.options.resGroupNames;
    };
    CurseScene.prototype.onWillEnter = function (last, action, parameters) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                setCurrentGroup(this.name);
                awakeView(this, this.name);
                return [2, _super.prototype.onWillEnter.call(this, last, action, parameters)];
            });
        });
    };
    CurseScene.prototype.onWillLeave = function (next, action, parameters) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                sleepView(this, this.name);
                return [2, _super.prototype.onWillLeave.call(this, next, action, parameters)];
            });
        });
    };
    CurseScene.prototype.active = function () {
        _super.prototype.active.call(this);
    };
    CurseScene.prototype.inactive = function () {
        _super.prototype.inactive.call(this);
    };
    CurseScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        setCurrentGroup(this.name);
        mountView(this, this.name);
    };
    return CurseScene;
}(Scene));

var CurseNavigator = (function (_super) {
    __extends(CurseNavigator, _super);
    function CurseNavigator(rootView, injectProps) {
        if (injectProps === void 0) { injectProps = {}; }
        var _this = _super.call(this) || this;
        _this._rootView = rootView;
        _this._injectProps = injectProps;
        _this._injectProps.navigator = _this;
        _this._optionsMap = {};
        return _this;
    }
    CurseNavigator.prototype.registerScene = function (name, options) {
        this._optionsMap[name] = options;
    };
    CurseNavigator.prototype.newView = function (name) {
        var view = new CurseScene(name, this._optionsMap[name]);
        injectProp(view, this._injectProps);
        return view;
    };
    CurseNavigator.prototype.addView = function (view, addToBottom) {
        if (addToBottom) {
            this._rootView.addChildAt(view, 0);
        }
        else {
            this._rootView.addChild(view);
        }
    };
    CurseNavigator.prototype.onEnter = function (name, last, action, parameters) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._rootView.touchThrough = true;
                        return [4, _super.prototype.onEnter.call(this, name, last, action, parameters)];
                    case 1:
                        _a.sent();
                        this._rootView.touchThrough = false;
                        return [2];
                }
            });
        });
    };
    CurseNavigator.prototype.onLeave = function (name, next, action, parameters) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, _super.prototype.onLeave.call(this, name, next, action, parameters)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    CurseNavigator.prototype.onError = function (error) {
        if (DEBUG) {
            console.log(error);
        }
    };
    return CurseNavigator;
}(Navigator));

var SceneController = (function () {
    function SceneController() {
    }
    Object.defineProperty(SceneController, "instance", {
        get: function () {
            if (this._instance == undefined) {
                this._instance = new SceneController();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    SceneController.prototype.configure = function (rootView, sceneConfigs, injectProps) {
        if (this._configured) {
            return;
        }
        this._configured = true;
        this._navigator = new CurseNavigator(rootView, injectProps);
        for (var key in sceneConfigs) {
            this.register(key, sceneConfigs[key]);
        }
    };
    SceneController.prototype.register = function (name, options) {
        this._navigator.registerScene(name, options);
    };
    Object.defineProperty(SceneController.prototype, "navigator", {
        get: function () {
            return this._navigator;
        },
        enumerable: true,
        configurable: true
    });
    SceneController.prototype.active = function () {
        var scene = this._navigator.currentView;
        scene.active();
    };
    SceneController.prototype.inactive = function () {
        var scene = this._navigator.currentView;
        scene.inactive();
    };
    SceneController.replace = function (name, parameters) {
        if (parameters === void 0) { parameters = null; }
        SceneController.instance.navigator.replace(name, parameters);
    };
    SceneController.goto = function (name, parameters) {
        if (parameters === void 0) { parameters = null; }
        SceneController.instance.navigator.push(name, parameters);
        return true;
    };
    SceneController.back = function (parameters) {
        if (parameters === void 0) { parameters = null; }
        SceneController.instance.navigator.pop(parameters);
    };
    SceneController.popAll = function (name, parameters) {
        if (parameters === void 0) { parameters = null; }
        SceneController.instance.navigator.popAll(name, parameters);
    };
    SceneController.jump = function (name, parameters) {
        if (parameters === void 0) { parameters = null; }
        SceneController.instance.navigator.jump(name, parameters);
    };
    return SceneController;
}());

var Utils = (function () {
    function Utils() {
    }
    Utils.centerPopUp = function (popUp) {
        popUp.horizontalCenter = popUp.verticalCenter = 0;
    };
    Utils.centerHorizontal = function (popUp) {
        popUp.horizontalCenter = 0;
    };
    Utils.centerVertical = function (popUp) {
        popUp.verticalCenter = 0;
    };
    Utils.notCenterPopUp = function (popUp) {
        popUp.horizontalCenter = popUp.verticalCenter = NaN;
    };
    Utils.getCenterPos = function (popUp) {
        var x = 0;
        var y = 0;
        var parent = popUp.parent;
        if (parent) {
            x = (parent.width - popUp.width) * 0.5;
            y = (parent.height - popUp.height) * 0.5;
        }
        return { x: x, y: y };
    };
    Utils.transDirection = function (dStr) {
        var d;
        switch (dStr) {
            case "up":
                d = 0;
                break;
            case "right":
                d = 1;
                break;
            case "bottom":
                d = 2;
                break;
            case "left":
                d = 3;
                break;
        }
        return d;
    };
    return Utils;
}());
var None = (function () {
    function None() {
    }
    None.prototype.show = function (target, parent, callback, thisObj, params) {
        target.scaleX = target.scaleY = target.alpha = 1;
        parent.addChild(target);
        Utils.centerPopUp(target);
        callback.call(thisObj);
    };
    None.prototype.hide = function (target, parent, callback, thisObj, params) {
        parent.removeChild(target);
        callback.call(thisObj);
    };
    return None;
}());
var Flew = (function () {
    function Flew() {
    }
    Flew.prototype.show = function (target, parent, callback, thisObj, params) {
        if (!Flew.outPos) {
            Flew.outPos = [
                { x: 0, y: -getHeight() },
                { x: getWidth(), y: 0 },
                { x: 0, y: getHeight() },
                { x: -getWidth(), y: 0 }
            ];
        }
        parent.addChild(target);
        Utils.notCenterPopUp(target);
        var startPos = params.startPos || Flew.outPos[Utils.transDirection(params.direction)];
        var endPos = params.endPos || Utils.getCenterPos(target);
        target.x = startPos.x || endPos.x;
        target.y = startPos.y || endPos.y;
        var duration = (params && params.duration) || Flew.DEFAULT_DURATION;
        var state = { x: endPos.x, y: endPos.y };
        egret.Tween.get(target).to(state, duration, params ? params.ease : null).call(callback, thisObj);
        if (params && params.withFade) {
            egret.Tween.get(target).to({ alpha: 1 }, duration);
        }
    };
    Flew.prototype.hide = function (target, parent, callback, thisObj, params) {
        var defaultPos = Flew.outPos[Utils.transDirection(params.direction)];
        var endPos = params.endPos || Utils.getCenterPos(target);
        var duration = (params && params.duration) || Flew.DEFAULT_DURATION;
        var state = { x: defaultPos.x || endPos.x, y: defaultPos.y || endPos.y };
        egret.Tween.get(target).to(state, duration, params ? params.ease : null).call(function () {
            parent.removeChild(target);
            Utils.centerPopUp(target);
            callback.call(thisObj);
        }, this);
        if (params && params.withFade) {
            egret.Tween.get(target).to({ alpha: 0 }, duration);
        }
    };
    Flew.DEFAULT_DURATION = 300;
    return Flew;
}());

var defaultModalConfig = {
    color: 0,
    alpha: 0.7,
    duration: 200,
};
var _modalMask;
var _pupUpStack = [];
var _popLayer;
var _modalConfig;
function init$2(popLayer) {
    _popLayer = popLayer;
    _popLayer.width = getWidth();
    _popLayer.height = getHeight();
    getStage().addEventListener(egret.Event.RESIZE, onStageResize$1, this);
}
function onStageResize$1(event) {
    if (event === void 0) { event = null; }
    if (_modalMask) {
        _modalMask.width = getWidth();
        _modalMask.height = getHeight();
    }
}
function addPopUp(target, effectClazz, effectParams, modalTouchFun, modal, modalConfig) {
    if (effectClazz === void 0) { effectClazz = null; }
    if (effectParams === void 0) { effectParams = null; }
    if (modalTouchFun === void 0) { modalTouchFun = null; }
    if (modal === void 0) { modal = true; }
    if (modalConfig === void 0) { modalConfig = null; }
    if (target.parent) {
        return;
    }
    var top = getTopPupUp();
    if (top && top['inactive']) {
        top['inactive']();
    }
    _modalConfig = combineProp(defaultModalConfig, modalConfig);
    _pupUpStack.unshift({ target: target, modalTouchFun: modalTouchFun, modal: modal });
    updateModalMask(_pupUpStack[0]);
    var effect = createEffectInstance(effectClazz);
    effect.show(target, _popLayer, function () {
        if (target['active']) {
            target['active']();
        }
    }, this, effectParams);
}
function removePopUp(target, effectClazz, effectParams) {
    if (effectClazz === void 0) { effectClazz = null; }
    if (effectParams === void 0) { effectParams = null; }
    if (!target.parent) {
        return;
    }
    if (!getInStack(target, true)) {
        return;
    }
    var aimItem;
    _pupUpStack.some(function (item) {
        if (item.modal) {
            aimItem = item;
            return true;
        }
    });
    if (aimItem) {
        updateModalMask(aimItem);
    }
    else {
        setModalMaskVisible(false);
    }
    var effect = createEffectInstance(effectClazz);
    effect.hide(target, _popLayer, function () {
        if (target['inactive']) {
            target['inactive']();
        }
        var top = getTopPupUp();
        if (top && top['active']) {
            top['active']();
        }
    }, this, effectParams);
}
function getTopPupUp() {
    if (_pupUpStack.length > 0) {
        return _pupUpStack[_pupUpStack.length - 1];
    }
    else {
        return null;
    }
}
function removeAllPupUp() {
    enumChildren(_popLayer, function (popup) {
        if (popup != _modalMask) {
            popup['close']();
        }
    });
}
function getInStack(target, del) {
    if (del === void 0) { del = false; }
    var data;
    _pupUpStack.some(function (item, index$$1) {
        if (item.target == target) {
            data = { item: item, index: index$$1 };
            return true;
        }
    });
    if (data && del) {
        _pupUpStack.splice(data.index, 1);
    }
    return data;
}
function createEffectInstance(effectClazz) {
    if (effectClazz === void 0) { effectClazz = null; }
    var effect;
    if (effectClazz) {
        effect = new effectClazz();
    }
    else {
        effect = new None();
    }
    return effect;
}
function onModalMaskTap(event) {
    var item = _pupUpStack[0];
    if (item && item.modal && item.modalTouchFun) {
        item.modalTouchFun();
    }
}
function updateModalMask(item) {
    var maskIndex = _popLayer.getChildIndex(_modalMask);
    var index$$1 = _popLayer.getChildIndex(item.target);
    if (maskIndex != index$$1 - 1) {
        setModalMaskVisible(item.modal, index$$1);
    }
}
function setModalMaskVisible(visible, index$$1) {
    if (index$$1 === void 0) { index$$1 = -1; }
    var modalMask = getModalMask();
    if (visible) {
        modalMask.fillColor = _modalConfig.color;
        modalMask.fillAlpha = _modalConfig.alpha;
        if (index$$1 >= 0) {
            setModalMaskVisible(true);
            _popLayer.addChildAt(modalMask, index$$1);
        }
        else {
            _popLayer.addChild(modalMask);
        }
        egret.Tween.get(modalMask, null, null, true).to({ alpha: 1 }, _modalConfig.duration);
    }
    else {
        if (modalMask.parent) {
            egret.Tween.get(modalMask, null, null, true).to({ alpha: 0 }, _modalConfig.duration).call(function (modalMask) {
                _popLayer.removeChild(modalMask);
            }, this, [modalMask]);
        }
    }
}
function getModalMask() {
    if (!_modalMask) {
        _modalMask = new eui.Rect();
        _modalMask.width = getWidth();
        _modalMask.height = getHeight();
        _modalMask.addEventListener(egret.TouchEvent.TOUCH_TAP, onModalMaskTap, this);
    }
    return _modalMask;
}

var PopupBase = (function (_super) {
    __extends(PopupBase, _super);
    function PopupBase(showEffect, showEffectParams, closeEffect, closeEffectParams, popupShowBanner) {
        if (showEffect === void 0) { showEffect = null; }
        if (showEffectParams === void 0) { showEffectParams = null; }
        if (closeEffect === void 0) { closeEffect = null; }
        if (closeEffectParams === void 0) { closeEffectParams = null; }
        if (popupShowBanner === void 0) { popupShowBanner = false; }
        var _this = _super.call(this) || this;
        _this._excludeActionsClose = [];
        _this.dealAction = function (action, data) {
            if (action === void 0) { action = null; }
            if (data === void 0) { data = null; }
            if (_this._callback) {
                _this._callback(action || 'close', data);
            }
            if (_this._excludeActionsClose.indexOf(action) < 0) {
                _this.close();
                _this._callback = null;
            }
        };
        _this.showEffect = showEffect || None;
        _this.showEffectParams = showEffectParams;
        _this.closeEffect = closeEffect || None;
        _this.closeEffectParams = closeEffectParams;
        _this.popupShowBanner = popupShowBanner;
        _this._excludeActionsClose = [];
        _this.init();
        return _this;
    }
    PopupBase.prototype.init = function () {
    };
    PopupBase.prototype.getResGroupNames = function () {
        return null;
    };
    PopupBase.prototype.onBeginLoadResGroups = function () {
    };
    PopupBase.prototype.onEndLoadResGroups = function () {
    };
    PopupBase.prototype.getSkinName = function () {
        return null;
    };
    PopupBase.prototype.addExcludeForClose = function (actions) {
        this._excludeActionsClose = this._excludeActionsClose.concat(actions);
    };
    PopupBase.prototype.popup = function (modalTouchFun, modal, modalConfig) {
        if (modalTouchFun === void 0) { modalTouchFun = null; }
        if (modal === void 0) { modal = true; }
        if (modalConfig === void 0) { modalConfig = null; }
        return __awaiter(this, void 0, void 0, function () {
            var resGroupNames, skinName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resGroupNames = this.getResGroupNames();
                        if (!(resGroupNames && resGroupNames.length > 0 && checkNeedLoad(resGroupNames))) return [3, 2];
                        this.onBeginLoadResGroups();
                        return [4, loadResGroups(resGroupNames)];
                    case 1:
                        _a.sent();
                        this.onEndLoadResGroups();
                        return [3, 3];
                    case 2:
                        this.onEndLoadResGroups();
                        _a.label = 3;
                    case 3:
                        if (!this.skinName) {
                            skinName = this.getSkinName();
                            if (skinName) {
                                this.skinName = skinName;
                            }
                        }
                        this._popup(modalTouchFun, modal, modalConfig);
                        return [2];
                }
            });
        });
    };
    PopupBase.prototype._popup = function (modalTouchFun, modal, modalConfig) {
        if (modalTouchFun === void 0) { modalTouchFun = null; }
        if (modal === void 0) { modal = true; }
        if (modalConfig === void 0) { modalConfig = null; }
        addPopUp(this, this.showEffect, this.showEffectParams, modalTouchFun, modal, modalConfig);
    };
    PopupBase.prototype.close = function () {
        removePopUp(this, this.closeEffect, this.closeEffectParams);
    };
    PopupBase.prototype.active = function () {
    };
    PopupBase.prototype.inactive = function () {
    };
    return PopupBase;
}(eui.Component));

var CursePanel = (function (_super) {
    __extends(CursePanel, _super);
    function CursePanel(name, options) {
        var _this = _super.call(this, Flew, { direction: 'up', withFade: true, ease: egret.Ease.backOut }, Flew, { direction: 'up', withFade: true, ease: egret.Ease.backIn }) || this;
        _this.name = name;
        _this.options = options;
        return _this;
    }
    CursePanel.prototype.getSkinName = function () {
        return this.options.skin;
    };
    CursePanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        mountView(this, this.name);
    };
    CursePanel.prototype.show = function (data, callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.data = data;
                        this._callback = callback;
                        return [4, this.popup()];
                    case 1:
                        _a.sent();
                        awakeView(this, this.name);
                        return [2];
                }
            });
        });
    };
    CursePanel.prototype.active = function () {
        _super.prototype.active.call(this);
    };
    CursePanel.prototype.inactive = function () {
        _super.prototype.inactive.call(this);
        sleepView(this, this.name);
    };
    return CursePanel;
}(PopupBase));

var PanelController = (function () {
    function PanelController() {
        this._registerMap = {};
        this._instanceMap = {};
    }
    Object.defineProperty(PanelController, "instance", {
        get: function () {
            if (this._instance == undefined) {
                this._instance = new PanelController();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    PanelController.prototype.configure = function (rootView, panelConfigs) {
        if (this._configured) {
            return;
        }
        this._configured = true;
        init$2(rootView);
        for (var key in panelConfigs) {
            this.register(key, panelConfigs[key]);
        }
    };
    PanelController.prototype.register = function (name, options) {
        this._registerMap[name] = options;
    };
    PanelController.prototype.show = function (name, params, callback) {
        var instance = this._instanceMap[name];
        var options = this._registerMap[name];
        if (!instance) {
            instance = this._instanceMap[name] = new CursePanel(name, options);
        }
        instance.show(params, callback);
        return instance;
    };
    PanelController.prototype.dealAction = function (name, action, data) {
        var instance = this._instanceMap[name];
        if (!instance) {
            return;
        }
        instance.dealAction(action, data);
    };
    PanelController.prototype.close = function (name) {
        var instance = this._instanceMap[name];
        if (!instance) {
            return;
        }
        instance.close();
    };
    return PanelController;
}());

var MainStage = (function (_super) {
    __extends(MainStage, _super);
    function MainStage() {
        var _this = _super.call(this) || this;
        _this.init();
        _this.percentWidth = 100;
        _this.percentHeight = 100;
        _this.skinName = MainStageSkin;
        return _this;
    }
    Object.defineProperty(MainStage, "instance", {
        get: function () {
            if (this._instance == undefined) {
                this._instance = new MainStage();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    MainStage.prototype.init = function () {
        lang.initData();
        this.projectConfig = RES.getRes('project-config');
        this.services = this.projectConfig.settings.services.map(function (item) {
            return window[item + 'Service'];
        });
    };
    MainStage.prototype.childrenCreated = function () {
        _super.prototype.createChildren.call(this);
        this.addChildAt(this.loadingView = LoadingView.instance, 1);
        ready(this.projectConfig.bindings);
        var sceneConfig = {};
        var panelConfig = {};
        for (var _i = 0, _a = this.projectConfig.bindings; _i < _a.length; _i++) {
            var binding = _a[_i];
            var name = binding.name, skin = binding.skin, resGroups = binding.resGroups;
            var config = {
                skin: skin,
                resGroupNames: resGroups,
            };
            if (binding.name.indexOf('scene') >= 0) {
                sceneConfig[name] = config;
            }
            else {
                panelConfig[name] = config;
            }
        }
        SceneController.instance.configure(this.sceneContainer, sceneConfig);
        PanelController.instance.configure(this.popLayer, panelConfig);
        Dispatcher.addEventListener('show_loading', this.showLoading, this);
        Dispatcher.addEventListener('show_black_layer', this.showBlackLayer, this);
        Dispatcher.addEventListener('hide_black_layer', this.hideBlackLayer, this);
        catchError(this.start());
    };
    MainStage.prototype.showLoading = function (event) {
        var needLoad = event.data.needLoad;
        this.loadingView.setState(needLoad ? 'loading' : 'blank');
        if (needLoad) {
            this.loadingView.setProgress(0, true);
        }
    };
    MainStage.prototype.showBlackLayer = function (event) {
        var p = event.data;
        var layer = this.loadingView;
        Toast.clean();
        this.addChildAt(layer, 3);
        egret.Tween.get(layer, null, null, true)
            .to({ alpha: 1 }, 200);
    };
    MainStage.prototype.hideBlackLayer = function (event) {
        var _this = this;
        var p = event.data;
        var layer = this.loadingView;
        if (!this.contains(layer)) {
            return Promise.resolve();
        }
        p.then(function (data) {
            return getTweenPromise(egret.Tween.get(layer, null, null, true)
                .to({ alpha: 0 }, 200).call(function () {
                if (_this.contains(layer)) {
                    _this.removeChild(layer);
                }
            }));
        });
    };
    MainStage.prototype.start = function (params) {
        if (params === void 0) { params = null; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Promise.all(this.services.map(function (service) { return service.start(); }))];
                    case 1:
                        _a.sent();
                        this.services.forEach(function (service) { return service.afterStart(); });
                        return [2];
                }
            });
        });
    };
    MainStage.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, Promise.all(this.services.map(function (service) { return service.stop(); }))];
            });
        });
    };
    return MainStage;
}(eui.Component));

var Service = (function (_super) {
    __extends(Service, _super);
    function Service() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    Service.prototype.init = function () {
    };
    Object.defineProperty(Service.prototype, "eventGroupName", {
        get: function () {
            return this['__class__'] + '_' + this.hashCode;
        },
        enumerable: true,
        configurable: true
    });
    Service.prototype.registerEvent = function (target, eventName, callback, thisObj, priority) {
        if (priority === void 0) { priority = 0; }
        eventManager.register(this.eventGroupName, target, eventName, callback, thisObj, priority);
    };
    Service.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                eventManager.enable(this.eventGroupName);
                return [2];
            });
        });
    };
    Service.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                eventManager.disable(this.eventGroupName);
                return [2];
            });
        });
    };
    Service.prototype.afterStart = function () {
    };
    return Service;
}(egret.EventDispatcher));

var BADGE_CHANGED = 'BADGE_CHANGED';
var SETTING_CHANGED = 'SETTING_CHANGED';

var StorageService = (function (_super) {
    __extends(StorageService, _super);
    function StorageService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StorageService.prototype.start = function () {
        this.load();
        this.store.launch_count = this.store.launch_count ? this.store.launch_count + 1 : 1;
        this.save();
        return _super.prototype.start.call(this);
    };
    StorageService.prototype.load = function () {
        this.store = getItemObj('store', {});
    };
    StorageService.prototype.save = function () {
        setItemObj('store', this.store);
    };
    StorageService.prototype.clean = function (keeps) {
        if (keeps === void 0) { keeps = null; }
        if (keeps) {
            for (var k in this.store) {
                if (keeps.indexOf(k) < 0 && this.store.hasOwnProperty(k)) {
                    delete this.store[k];
                }
            }
        }
        else {
            this.store = {};
        }
        this.save();
        this._initialized = false;
    };
    Object.defineProperty(StorageService.prototype, "launchCount", {
        get: function () {
            return this.store.launch_count;
        },
        enumerable: true,
        configurable: true
    });
    StorageService.prototype.getSettingItem = function (field) {
        return this.store.setting ? (this.store.setting[field] === undefined ? true : this.store.setting[field]) : true;
    };
    StorageService.prototype.setSettingItem = function (field, value, dispatch) {
        if (dispatch === void 0) { dispatch = true; }
        var setting = this.store.setting;
        if (!setting) {
            setting = this.store.setting = {};
        }
        setting[field] = value;
        this.save();
        if (dispatch) {
            this.dispatchEventWith(SETTING_CHANGED, false, { field: field, value: value });
        }
    };
    StorageService.prototype.switchSettingItem = function (field, dispatch) {
        if (dispatch === void 0) { dispatch = true; }
        this.setSettingItem(field, !this.getSettingItem(field), dispatch);
    };
    return StorageService;
}(Service));
var storageService = new StorageService();

var GameConfig = (function (_super) {
    __extends(GameConfig, _super);
    function GameConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameConfig.parseConfig = function () {
        var _a = window['CFG'], gameInfo = _a.gameInfo, appInfo = _a.appInfo, defenseStrategy = _a.defenseStrategy;
        var _b = this, gameConfig = _b.gameConfig, appConfig = _b.appConfig, defenseConfig = _b.defenseConfig;
        var id = gameInfo.id, oaId = gameInfo.oaId, gameId = gameInfo.gameId;
        gameConfig.id = id;
        gameConfig.oaId = oaId;
        gameConfig.gameId = gameId || window['gameId'];
        var appId = appInfo.appId, earnCreditsUrl = appInfo.earnCreditsUrl, open = appInfo.open, openLogin = appInfo.openLogin;
        appConfig.appId = appId;
        appConfig.earnCreditsUrl = earnCreditsUrl;
        appConfig.open = open;
        appConfig.openLogin = openLogin;
        var _c = defenseStrategy.interfaceLimit, interfaceLimit = _c === void 0 ? 50 : _c, _d = defenseStrategy.scoreUnit, scoreUnit = _d === void 0 ? 0 : _d;
        defenseConfig.interfaceLimit = interfaceLimit;
        defenseConfig.scoreUnit = scoreUnit;
    };
    GameConfig.initData = function () {
    };
    GameConfig.gameName = 'curse-demo';
    GameConfig.gameConfig = {};
    GameConfig.appConfig = {};
    GameConfig.defenseConfig = {};
    return GameConfig;
}(egret.HashObject));

function rotateLeft(lValue, iShiftBits) {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
}
function addUnsigned(lX, lY) {
    var lX4, lY4, lX8, lY8, lResult;
    lX8 = (lX & 0x80000000);
    lY8 = (lY & 0x80000000);
    lX4 = (lX & 0x40000000);
    lY4 = (lY & 0x40000000);
    lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
    if (lX4 & lY4)
        return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
    if (lX4 | lY4) {
        if (lResult & 0x40000000)
            return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
        else
            return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
    }
    else {
        return (lResult ^ lX8 ^ lY8);
    }
}
function F(x, y, z) {
    return (x & y) | ((~x) & z);
}
function G(x, y, z) {
    return (x & z) | (y & (~z));
}
function H(x, y, z) {
    return (x ^ y ^ z);
}
function I(x, y, z) {
    return (y ^ (x | (~z)));
}
function FF(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
}
function GG(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
}
function HH(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
}
function II(a, b, c, d, x, s, ac) {
    a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
}
function convertToWordArray(string) {
    var lWordCount;
    var lMessageLength = string.length;
    var lNumberOfWordsTempOne = lMessageLength + 8;
    var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;
    var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
    var lWordArray = Array(lNumberOfWords - 1);
    var lBytePosition = 0;
    var lByteCount = 0;
    while (lByteCount < lMessageLength) {
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
        lByteCount++;
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
}
function wordToHex(lValue) {
    var WordToHexValue = "", WordToHexValueTemp = "", lByte, lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
        lByte = (lValue >>> (lCount * 8)) & 255;
        WordToHexValueTemp = "0" + lByte.toString(16);
        WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
    }
    return WordToHexValue;
}
function uTF8Encode(string) {
    string = string.replace(/\x0d\x0a/g, "\x0a");
    var output = "";
    for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
            output += String.fromCharCode(c);
        }
        else if ((c > 127) && (c < 2048)) {
            output += String.fromCharCode((c >> 6) | 192);
            output += String.fromCharCode((c & 63) | 128);
        }
        else {
            output += String.fromCharCode((c >> 12) | 224);
            output += String.fromCharCode(((c >> 6) & 63) | 128);
            output += String.fromCharCode((c & 63) | 128);
        }
    }
    return output;
}
function md5(string) {
    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
    string = uTF8Encode(string);
    x = convertToWordArray(string);
    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;
    for (k = 0; k < x.length; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = addUnsigned(a, AA);
        b = addUnsigned(b, BB);
        c = addUnsigned(c, CC);
        d = addUnsigned(d, DD);
    }
    var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
    return tempValue.toLowerCase();
}

var WEB_SERVICE_URL = DEBUG ? 'https://localhost:3000' : '';
var WebService = (function () {
    function WebService() {
    }
    WebService.prototype.callApi = function (uri, params, method, responseType) {
        if (params === void 0) { params = null; }
        if (method === void 0) { method = 'post'; }
        if (responseType === void 0) { responseType = 'json'; }
        if (!params) {
            params = {};
        }
        var url = WEB_SERVICE_URL + uri;
        var m = method == 'post' ? POST : GET;
        return m.call(Ajax, url, params).then(function (response) {
            var data;
            switch (responseType) {
                case 'json':
                    try {
                        data = JSON.parse(response);
                    }
                    catch (e) {
                        if (DEBUG)
                            console.log('decode json failed: ' + url);
                        return Promise.reject(e);
                    }
                    if (data.success) {
                        return data.data || data;
                    }
                    else {
                        return Promise.reject(data.message || data.desc);
                    }
                default:
                    return response;
            }
        }, function (error) {
            if (DEBUG) {
                console.log(error);
            }
            return Promise.reject(error);
        });
    };
    WebService.prototype.polling = function (successFunc, uri, params, maxTimes, delay, method, responseType) {
        if (maxTimes === void 0) { maxTimes = 5; }
        if (delay === void 0) { delay = 400; }
        if (method === void 0) { method = 'POST'; }
        if (responseType === void 0) { responseType = 'json'; }
        var p = Promise.resolve();
        for (var i = 0; i < maxTimes; i++) {
            p = p.then(func);
            p = p.then(function () {
                return waitPromise(delay);
            });
        }
        var callApi = this.callApi;
        var lastData;
        return p.then(function () {
            return Promise.reject(null);
        }, function (e) {
            if (e === 'success') {
                return Promise.resolve(lastData);
            }
            return Promise.reject(e);
        });
        function func() {
            return callApi(uri, params, method, responseType).then(function (data) {
                if (successFunc(data)) {
                    lastData = data;
                    return Promise.reject('success');
                }
            }, function (e) {
                return Promise.reject(e);
            });
        }
    };
    return WebService;
}());
var webService = new WebService();

var GameInfo = (function () {
    function GameInfo() {
    }
    GameInfo.prototype.update = function (data) {
        this.data = data;
        this.data.oldMaxScore = this.data ? this.maxScore : 0;
    };
    Object.defineProperty(GameInfo.prototype, "statusCode", {
        get: function () {
            return this.data.status.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameInfo.prototype, "maxScore", {
        get: function () {
            return this.data.maxScore || 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameInfo.prototype, "percentage", {
        get: function () {
            return this.data.percentage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameInfo.prototype, "credits", {
        get: function () {
            return this.data.credits;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameInfo.prototype, "status", {
        get: function () {
            return this.data.status;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameInfo.prototype, "gameId", {
        get: function () {
            return this.data.gameId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameInfo.prototype, "consumerId", {
        get: function () {
            return this.data.consumerId;
        },
        enumerable: true,
        configurable: true
    });
    return GameInfo;
}());

var gameInfo = new GameInfo();
var authData = {};

function getToken() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, new Promise(function (resolve, reject) {
                    if (window['getDuibaToken']) {
                        getDuibaToken(function (_a) {
                            var token = _a.token;
                            resolve(token);
                        }, function (key, msg) {
                            reject(msg);
                        });
                    }
                    else {
                        resolve();
                    }
                })];
        });
    });
}
function getInfo() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = gameInfo).update;
                    return [4, webService.callApi('/ngame/new/getInfo', { id: GameConfig.gameConfig.gameId }, 'get')];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [2];
            }
        });
    });
}
function getRule() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, webService.callApi('/ngapi/getRule', { id: GameConfig.gameConfig.gameId }, 'post', 'html')];
                case 1: return [2, _a.sent()];
            }
        });
    });
}
function doStart(credits, customizedType) {
    if (credits === void 0) { credits = null; }
    if (customizedType === void 0) { customizedType = null; }
    return __awaiter(this, void 0, void 0, function () {
        var _a, gameId, oaId, params, _b, _c, token, submitToken, ticketId;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = GameConfig.gameConfig, gameId = _a.gameId, oaId = _a.oaId;
                    params = {
                        id: gameId,
                        oaId: oaId
                    };
                    if (credits) {
                        params.credits = credits;
                    }
                    if (customizedType) {
                        params.customizedType = customizedType;
                    }
                    _b = params;
                    return [4, getToken()];
                case 1:
                    _b.token = _d.sent();
                    return [4, webService.callApi('/ngapi/dostart', params)];
                case 2:
                    _c = _d.sent(), token = _c.token, submitToken = _c.submitToken, ticketId = _c.ticketId;
                    injectProp(authData, {
                        token: devil(token),
                        submitToken: devil(submitToken),
                        ticketId: ticketId
                    });
                    return [2];
            }
        });
    });
}
function getStartStatus(ticketId, customizedType) {
    if (customizedType === void 0) { customizedType = null; }
    return __awaiter(this, void 0, void 0, function () {
        var params;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        ticketId: ticketId
                    };
                    if (customizedType) {
                        params.customizedType = customizedType;
                    }
                    return [4, webService.polling(function (data) {
                            return data.code === 1;
                        }, '/ngapi/getStartStatus', params)];
                case 1: return [2, _a.sent()];
            }
        });
    });
}
function datapash(collection) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, webService.callApi('/ngame/new/datapash', {
                        gameId: GameConfig.gameConfig.id,
                        ticketId: authData.ticketId,
                        dynamicData: JSON.stringify(collection),
                    })];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    });
}
function gameSubmit(score, gameData, dynamicData) {
    if (gameData === void 0) { gameData = []; }
    if (dynamicData === void 0) { dynamicData = [[]]; }
    return __awaiter(this, void 0, void 0, function () {
        var submitToken, ticketId, gameDataStr, dynamicDataStr, sign, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    submitToken = authData.submitToken, ticketId = authData.ticketId;
                    gameDataStr = JSON.stringify(gameData);
                    dynamicDataStr = JSON.stringify(dynamicData);
                    sign = md5(ticketId + '' + score + '' + gameDataStr + '' + submitToken);
                    return [4, webService.callApi('/ngame/new/submit', {
                            ticketId: ticketId,
                            score: score,
                            gameData: gameDataStr,
                            sgin: sign,
                            dynamicData: dynamicDataStr
                        })];
                case 1:
                    data = _a.sent();
                    gameInfo.update(data.rsp);
                    return [2, data];
            }
        });
    });
}
function getSubmitResult(orderId) {
    return __awaiter(this, void 0, void 0, function () {
        var params;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        orderId: orderId
                    };
                    return [4, webService.polling(function (data) {
                            return !data.flag;
                        }, '/ngame/new/getSubmitResult', params)];
                case 1: return [2, _a.sent()];
            }
        });
    });
}

var SCENE_MENU = 'scene_menu';
var SCENE_PLAY = 'scene_play';
var SCENE_FINAL_REWARD = 'scene_final_reward';
var PANEL_ALERT = 'panel_alert';
var PANEL_RULE = 'panel_rule';
var PANEL_RESULT = 'panel_result';

var MainService = (function (_super) {
    __extends(MainService, _super);
    function MainService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainService.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        GameConfig.parseConfig();
                        return [4, _super.prototype.start.call(this)];
                    case 1:
                        _a.sent();
                        return [4, Promise.all([
                                getInfo(),
                            ])];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    MainService.prototype.afterStart = function () {
        var code = gameInfo.statusCode;
        var sceneName = code == 4 || code == 5 ? SCENE_FINAL_REWARD :
            SCENE_MENU;
        removeAllPupUp();
        SceneController.popAll(sceneName);
    };
    MainService.prototype.tryStartGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ticketId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.playing) {
                            return [2];
                        }
                        return [4, doStart()];
                    case 1:
                        _a.sent();
                        ticketId = authData.ticketId;
                        return [4, getStartStatus(ticketId)];
                    case 2:
                        _a.sent();
                        this.playing = true;
                        return [2];
                }
            });
        });
    };
    MainService.prototype.trySubmit = function (score, collection, strategyCollection) {
        return __awaiter(this, void 0, void 0, function () {
            var orderId, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, gameSubmit(score, strategyCollection, collection)];
                    case 1:
                        orderId = (_a.sent()).orderId;
                        result = getSubmitResult(orderId);
                        this.playing = false;
                        return [2, result];
                }
            });
        });
    };
    return MainService;
}(Service));
var mainService = new MainService();

var DefenseService = (function (_super) {
    __extends(DefenseService, _super);
    function DefenseService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.collection = [];
        _this.strategyCollection = [];
        return _this;
    }
    DefenseService.prototype.setView = function (view) {
        this.registerEvent(view, egret.TouchEvent.TOUCH_BEGIN, this.onTouch.bind(this, 'md'), this);
    };
    DefenseService.prototype.reset = function () {
        this.collection.splice(0);
        this.strategyCollection.splice(0);
        this.pashCount = 0;
    };
    DefenseService.prototype.onTouch = function (type, e) {
        var data = { a: type, t: Date.now(), x: e.stageX, y: e.stageY };
        this.strategyCollection.push(data);
    };
    DefenseService.prototype.scoreChanged = function (score) {
        var _a = GameConfig.defenseConfig, interfaceLimit = _a.interfaceLimit, scoreUnit = _a.scoreUnit;
        var nextDatapashScore = score - this.pashCount * scoreUnit;
        if (scoreUnit == 0 || nextDatapashScore < scoreUnit || this.pashCount > interfaceLimit) {
            return;
        }
        this.collection.push(this.strategyCollection.concat());
        datapash(this.strategyCollection);
        this.strategyCollection.splice(0);
        this.pashCount++;
    };
    DefenseService.prototype.close = function () {
        this.collection.push(this.strategyCollection.concat());
        return {
            strategyCollection: this.strategyCollection,
            collection: this.collection,
        };
    };
    return DefenseService;
}(Service));
var defenseService = new DefenseService();

var BuriedPoint = (function () {
    function BuriedPoint(dpm, dcm, env) {
        this.dpm = this.fill(dpm, env);
        this.dcm = this.fill(dcm, env);
    }
    BuriedPoint.prototype.fill = function (src, env) {
        var result = src;
        for (var key in env) {
            result = result.replace(key, env[key]);
        }
        return result;
    };
    return BuriedPoint;
}());

var BuriedPointService = (function (_super) {
    __extends(BuriedPointService, _super);
    function BuriedPointService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._buriedPoints = {};
        return _this;
    }
    BuriedPointService.prototype.start = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, _super.prototype.start.call(this)];
                    case 1:
                        _a.sent();
                        this.initEnv();
                        return [2];
                }
            });
        });
    };
    BuriedPointService.prototype.initEnv = function () {
        this.env = {
            app_id: GameConfig.appConfig.appId,
            oaid: GameConfig.gameConfig.oaId,
        };
    };
    BuriedPointService.prototype.addBuriedPoints = function (buriedPoints) {
        for (var name in buriedPoints) {
            this._buriedPoints[name] = buriedPoints[name];
        }
    };
    BuriedPointService.prototype.addBuriedPointConfig = function (name, config) {
        var dpm = config.dpm, dcm = config.dcm;
        this._buriedPoints[name] = new BuriedPoint(dpm, dcm, this.env);
    };
    BuriedPointService.prototype.addBuriedPointConfigs = function (configs) {
        for (var name in configs) {
            this.addBuriedPointConfig(name, configs[name]);
        }
    };
    BuriedPointService.prototype.logExposure = function (name) {
        return this.log(name, 'exposure');
    };
    BuriedPointService.prototype.logClick = function (name) {
        return this.log(name, 'click');
    };
    BuriedPointService.prototype.log = function (name, type) {
        var logPoint = this._buriedPoints[name];
        var consumerId = gameInfo.consumerId;
        var appId = GameConfig.appConfig.appId;
        var dpm = logPoint.dpm, dcm = logPoint.dcm;
        if (type == 'exposure') {
            return JSONP('//embedlog.duiba.com.cn/exposure/standard', {
                dpm: dpm, dcm: dcm, consumerId: consumerId, appId: appId,
            }, 'get').catch(function (e) {
            });
        }
        else {
            return webService.callApi('/log/click', {
                dpm: dpm, dcm: dcm, consumerId: consumerId, appId: appId
            }, 'get').catch(function (e) {
            });
        }
    };
    return BuriedPointService;
}(Service));
var buriedPointService = new BuriedPointService();

var BadgeService = (function (_super) {
    __extends(BadgeService, _super);
    function BadgeService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BadgeService.prototype.start = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, _super.prototype.start.call(this)];
                    case 1:
                        _a.sent();
                        this.items = {};
                        return [2];
                }
            });
        });
    };
    BadgeService.prototype.getItem = function (name) {
        var item = this.items[name];
        if (!item) {
            item = this.items[name] = {
                number: 0,
            };
        }
        return item;
    };
    BadgeService.prototype.updateItem = function (name, item, number) {
        item.number = number;
        this.dispatchEventWith(BADGE_CHANGED, false, { name: name, number: number });
    };
    BadgeService.prototype.update = function (name, number) {
        var item = this.getItem(name);
        this.updateItem(name, item, number);
    };
    BadgeService.prototype.change = function (name, number) {
        var item = this.getItem(name);
        this.updateItem(name, item, item.number + number);
    };
    BadgeService.prototype.getNumber = function (name) {
        var item = this.getItem(name);
        return item.number;
    };
    return BadgeService;
}(Service));
var badgeService = new BadgeService();

var CurseComponent = (function (_super) {
    __extends(CurseComponent, _super);
    function CurseComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CurseComponent.prototype, "eventGroupName", {
        get: function () {
            return this['__class__'] + '_' + this.hashCode;
        },
        enumerable: true,
        configurable: true
    });
    CurseComponent.prototype.registerEvent = function (target, eventName, callback, thisObj, priority) {
        if (priority === void 0) { priority = 0; }
        eventManager.register(this.eventGroupName, target, eventName, callback, thisObj, priority);
    };
    CurseComponent.prototype.enableEvents = function () {
        eventManager.enable(this.eventGroupName);
    };
    CurseComponent.prototype.disableEvents = function () {
        eventManager.disable(this.eventGroupName);
    };
    CurseComponent.prototype.onCreate = function () {
    };
    CurseComponent.prototype.awake = function () {
        this.enableEvents();
    };
    CurseComponent.prototype.sleep = function () {
        this.disableEvents();
    };
    CurseComponent.prototype.destroy = function () {
    };
    return CurseComponent;
}(egret.HashObject));

function sin(h, t) {
    h = h || 1;
    return { x: 0, y: Math.sin(t) * h };
}
function breath(scale, t) {
    if (scale === void 0) { scale = 0.1; }
    return { sx: Math.sin(t) * scale + 1, sy: -Math.sin(t + Math.PI / 4) * scale + 1 };
}
var Wave = (function () {
    function Wave(target, duration, calProps, loop, autoPlay, reverse, delay, offset) {
        if (calProps === void 0) { calProps = null; }
        if (loop === void 0) { loop = 0; }
        if (autoPlay === void 0) { autoPlay = true; }
        if (reverse === void 0) { reverse = false; }
        if (delay === void 0) { delay = 0; }
        if (offset === void 0) { offset = 0; }
        this._oldProperties = {};
        this._t = 0;
        this.target = target;
        this._calProps = calProps ? calProps : Wave.round;
        this.duration = duration;
        this.loop = loop;
        this.reverse = reverse;
        this.delay = delay;
        this.offset = offset;
        this.updateRegisterPos();
        if (autoPlay) {
            this.play();
        }
    }
    Wave.prototype.updateRegisterPos = function () {
        this._oldProperties.x = this.target.x;
        this._oldProperties.y = this.target.y;
        this._oldProperties.scaleX = this.target.scaleX;
        this._oldProperties.scaleY = this.target.scaleY;
        this._oldProperties.skewX = this.target.skewX;
        this._oldProperties.skewY = this.target.skewY;
        this._oldProperties.rotation = this.target.rotation;
        this._oldProperties.alpha = this.target.alpha;
    };
    Wave.prototype.play = function () {
        if (this._tween) {
            return this._tween;
        }
        this._count = 0;
        return this._playStep();
    };
    Wave.prototype._playStep = function () {
        if (this.loop > 0 && this._count >= this.loop) {
            this.stop();
            return;
        }
        this._count++;
        this.t = this.reverse ? Math.PI * 2 : 0;
        this._tween = egret.Tween.get(this);
        this._tween.wait(this.delay).to({ t: this.reverse ? 0 : Math.PI * 2 }, this.duration).call(this._playStep, this);
        return this._tween;
    };
    Object.defineProperty(Wave.prototype, "t", {
        get: function () {
            return this._t;
        },
        set: function (value) {
            if (!this.target.stage) {
                return;
            }
            this._t = value;
            var props = this._calProps.call(this, this._t + this.offset);
            if (props.hasOwnProperty('x')) {
                this.target.x = (props.x || 0) + this._oldProperties.x;
            }
            if (props.hasOwnProperty('y')) {
                this.target.y = (props.y || 0) + this._oldProperties.y;
            }
            if (props.hasOwnProperty('sx')) {
                this.target.scaleX = props.sx;
            }
            if (props.hasOwnProperty('sy')) {
                this.target.scaleY = props.sy;
            }
            if (props.hasOwnProperty('skewX')) {
                this.target.skewX = props.skewX;
            }
            if (props.hasOwnProperty('skewY')) {
                this.target.skewY = props.skewY;
            }
            if (props.hasOwnProperty('r')) {
                this.target.rotation = props.r;
            }
            if (props.hasOwnProperty('alpha')) {
                this.target.alpha = props.alpha;
            }
        },
        enumerable: true,
        configurable: true
    });
    Wave.prototype.stop = function (recovery, animation, duration) {
        if (recovery === void 0) { recovery = false; }
        if (animation === void 0) { animation = false; }
        if (duration === void 0) { duration = 1000; }
        if (!this._tween) {
            return;
        }
        egret.Tween.removeTweens(this);
        if (recovery) {
            egret.Tween.get(this.target).to(this._oldProperties, duration);
        }
        this._tween = null;
    };
    Object.defineProperty(Wave.prototype, "playing", {
        get: function () {
            return this._tween != null;
        },
        enumerable: true,
        configurable: true
    });
    return Wave;
}());

var SceneMenu = (function (_super) {
    __extends(SceneMenu, _super);
    function SceneMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lab = null;
        return _this;
    }
    SceneMenu.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        this.wave = new Wave(this.lab, 2000, sin.bind(null, 20), 0, false);
    };
    SceneMenu.prototype.awake = function () {
        _super.prototype.awake.call(this);
        this.wave.play();
    };
    SceneMenu.prototype.sleep = function () {
        _super.prototype.sleep.call(this);
        this.wave.stop(true);
    };
    SceneMenu.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    return SceneMenu;
}(CurseComponent));

var Badge = (function (_super) {
    __extends(Badge, _super);
    function Badge() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = '';
        _this.lab = null;
        return _this;
    }
    Badge.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        this.registerEvent(badgeService, BADGE_CHANGED, this.onBadgeChange, this);
        this.registerEvent(this.host, egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
    };
    Badge.prototype.awake = function () {
        _super.prototype.awake.call(this);
        this.update();
    };
    Badge.prototype.sleep = function () {
        _super.prototype.sleep.call(this);
    };
    Badge.prototype.onBadgeChange = function (event) {
        var _a = event.data, name = _a.name, number = _a.number;
        if (name == this.name) {
            this.setNum(number);
        }
    };
    Badge.prototype.update = function () {
        this.setNum(badgeService.getNumber(this.name));
    };
    Badge.prototype.setNum = function (value) {
        this.lab.text = value + '';
    };
    Badge.prototype.onAddedToStage = function (event) {
        this.update();
    };
    return Badge;
}(CurseComponent));

var ButtonStart = (function (_super) {
    __extends(ButtonStart, _super);
    function ButtonStart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonStart.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        this.registerEvent(this.host, egret.TouchEvent.TOUCH_TAP, this.onHostTap, this);
    };
    ButtonStart.prototype.onHostTap = function (event) {
        catchError(this.tryStart());
    };
    ButtonStart.prototype.tryStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, mainService.tryStartGame()];
                    case 1:
                        _a.sent();
                        SceneController.goto(SCENE_PLAY);
                        return [2];
                }
            });
        });
    };
    return ButtonStart;
}(CurseComponent));

var BuriedPointButton = (function (_super) {
    __extends(BuriedPointButton, _super);
    function BuriedPointButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BuriedPointButton.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        this.buriedPointName = 'buried-point-' + Date.now();
        buriedPointService.addBuriedPointConfig(this.buriedPointName, { dpm: this.dpm, dcm: this.dcm });
        this.registerEvent(this.host, egret.TouchEvent.TOUCH_TAP, this.onHostTap, this);
    };
    BuriedPointButton.prototype.awake = function () {
        _super.prototype.awake.call(this);
        buriedPointService.logExposure(this.buriedPointName);
    };
    BuriedPointButton.prototype.sleep = function () {
        _super.prototype.sleep.call(this);
    };
    BuriedPointButton.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    BuriedPointButton.prototype.onHostTap = function (event) {
        buriedPointService.logClick(this.buriedPointName);
    };
    return BuriedPointButton;
}(CurseComponent));

var Breath = (function (_super) {
    __extends(Breath, _super);
    function Breath() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.duration = 2000;
        _this.scaleOffset = 0.1;
        return _this;
    }
    Breath.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        anchorCenter(this.host);
        this.wave = new Wave(this.host, this.duration, breath.bind(null, this.scaleOffset), 0, false);
    };
    Breath.prototype.awake = function () {
        _super.prototype.awake.call(this);
        this.wave.play();
    };
    Breath.prototype.sleep = function () {
        _super.prototype.sleep.call(this);
        this.wave.stop(true);
    };
    Breath.prototype.say = function () {
        console.log('hello');
    };
    return Breath;
}(CurseComponent));

var ButtonRule = (function (_super) {
    __extends(ButtonRule, _super);
    function ButtonRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonRule.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        this.registerEvent(this.host, egret.TouchEvent.TOUCH_TAP, this.onHostTap, this);
    };
    ButtonRule.prototype.onHostTap = function (event) {
        PanelController.instance.show(PANEL_RULE);
    };
    return ButtonRule;
}(CurseComponent));

var ScenePlay = (function (_super) {
    __extends(ScenePlay, _super);
    function ScenePlay() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.btnAdjust = null;
        _this.grpAdjust = null;
        _this.onPanelResult = function (action) {
            if (action == 'retry') {
                catchError(_this.tryStart());
            }
            else {
                SceneController.back();
            }
        };
        return _this;
    }
    ScenePlay.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        defenseService.setView(this.host);
        this.registerEvent(this.btnAdjust, egret.TouchEvent.TOUCH_TAP, this.onBtnAdjustTap, this);
    };
    ScenePlay.prototype.awake = function () {
        _super.prototype.awake.call(this);
        broadcast('reset');
        this.showAdjust();
    };
    ScenePlay.prototype.sleep = function () {
        _super.prototype.sleep.call(this);
        broadcast('stopGame');
    };
    ScenePlay.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    ScenePlay.prototype.onBtnAdjustTap = function (event) {
        this.grpAdjust.visible = false;
        broadcast('resetOffset');
        catchError(this.tryStart());
    };
    ScenePlay.prototype.tryStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, mainService.tryStartGame()];
                    case 1:
                        _a.sent();
                        PanelController.instance.close(PANEL_RESULT);
                        this._startGame();
                        return [2];
                }
            });
        });
    };
    ScenePlay.prototype._startGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        broadcast('readyGo');
                        return [4, waitPromise(3000)];
                    case 1:
                        _a.sent();
                        broadcast('startGame');
                        return [2];
                }
            });
        });
    };
    ScenePlay.prototype.endGame = function (score) {
        mainService.trySubmit(score);
        PanelController.instance.show(PANEL_RESULT, { score: score }, this.onPanelResult);
    };
    ScenePlay.prototype.showAdjust = function () {
        this.grpAdjust.visible = true;
    };
    return ScenePlay;
}(CurseComponent));

var ButtonBack = (function (_super) {
    __extends(ButtonBack, _super);
    function ButtonBack() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonBack.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        this.registerEvent(this.host, egret.TouchEvent.TOUCH_TAP, this.onHostTap, this);
    };
    ButtonBack.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    ButtonBack.prototype.onHostTap = function (event) {
        SceneController.back();
    };
    return ButtonBack;
}(CurseComponent));

var Vector2D = (function () {
    function Vector2D(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.setXY(x, y);
    }
    Vector2D.prototype.setXY = function (x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    };
    Vector2D.prototype.copyFrom = function (v2) {
        this.x = v2.x;
        this.y = v2.y;
        return this;
    };
    Vector2D.prototype.clone = function () {
        return new Vector2D(this.x, this.y);
    };
    Vector2D.prototype.zero = function () {
        this.x = 0;
        this.y = 0;
        return this;
    };
    Object.defineProperty(Vector2D.prototype, "isZero", {
        get: function () {
            return this.x == 0 && this.y == 0;
        },
        enumerable: true,
        configurable: true
    });
    Vector2D.prototype.normalize = function () {
        var len = this.length;
        if (len == 0) {
            this.x = 1;
            return this;
        }
        this.x /= len;
        this.y /= len;
        return this;
    };
    Object.defineProperty(Vector2D.prototype, "isNormalized", {
        get: function () {
            return this.length == 1.0;
        },
        enumerable: true,
        configurable: true
    });
    Vector2D.prototype.truncate = function (max) {
        this.length = Math.min(max, this.length);
        return this;
    };
    Vector2D.prototype.reverse = function () {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    };
    Vector2D.prototype.dotProd = function (v2) {
        return this.x * v2.x + this.y * v2.y;
    };
    Vector2D.prototype.crossProd = function (v2) {
        return this.x * v2.y - this.y * v2.x;
    };
    Vector2D.prototype.distSQ = function (v2) {
        var dx = v2.x - this.x;
        var dy = v2.y - this.y;
        return dx * dx + dy * dy;
    };
    Vector2D.prototype.distance = function (v2) {
        return Math.sqrt(this.distSQ(v2));
    };
    Vector2D.prototype.add = function (v2) {
        this.x += v2.x;
        this.y += v2.y;
        return this;
    };
    Vector2D.prototype.subtract = function (v2) {
        this.x -= v2.x;
        this.y -= v2.y;
        return this;
    };
    Vector2D.prototype.multiply = function (value) {
        this.x *= value;
        this.y *= value;
        return this;
    };
    Vector2D.prototype.divide = function (value) {
        this.x /= value;
        this.y /= value;
        return this;
    };
    Object.defineProperty(Vector2D.prototype, "angle", {
        get: function () {
            return this.radian * 180 / Math.PI;
        },
        set: function (value) {
            this.radian = value * Math.PI / 180;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2D.prototype, "radian", {
        get: function () {
            return Math.atan2(this.y, this.x);
        },
        set: function (value) {
            var len = this.length;
            this.setXY(Math.cos(value) * len, Math.sin(value) * len);
        },
        enumerable: true,
        configurable: true
    });
    Vector2D.prototype.equals = function (v2) {
        return this.x == v2.x && this.y == v2.y;
    };
    Object.defineProperty(Vector2D.prototype, "length", {
        get: function () {
            return Math.sqrt(this.lengthSQ);
        },
        set: function (value) {
            var a = this.radian;
            this.setXY(Math.cos(a) * value, Math.sin(a) * value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2D.prototype, "lengthSQ", {
        get: function () {
            return this.x * this.x + this.y * this.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2D.prototype, "slope", {
        get: function () {
            return this.y / this.x;
        },
        enumerable: true,
        configurable: true
    });
    Vector2D.prototype.toString = function () {
        return "[Vector2D (x:" + this.x + ", y:" + this.y + ")]";
    };
    Vector2D.corner = function (v1, v2) {
        return Math.acos(v1.dotProd(v2) / (v1.length * v2.length));
    };
    return Vector2D;
}());

var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.factor = 0.005;
        _this.maxSpeed = 10;
        _this.offset = {
            alpha: 0,
            beta: 0,
            gamma: 0,
        };
        _this.onDevicerorientation = function (event) {
            var alpha = event.alpha, beta = event.beta, gamma = event.gamma;
            if (_this.resetWhenNextFrame) {
                _this.resetWhenNextFrame = false;
                _this.offset.alpha = alpha * _this.factor;
                _this.offset.beta = beta * _this.factor;
                _this.offset.gamma = gamma * _this.factor;
                _this.velocity.zero();
            }
            var _a = _this.offset, alphaOff = _a.alpha, betaOff = _a.beta, gammaOff = _a.gamma;
            _this.force.x = gamma * _this.factor - gammaOff;
            _this.force.y = beta * _this.factor - betaOff;
        };
        return _this;
    }
    Ball.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        this.force = new Vector2D();
        this.position = new Vector2D();
        this.velocity = new Vector2D();
        window.addEventListener("deviceorientation", this.onDevicerorientation, true);
        this.registerEvent(this.host, egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    Ball.prototype.awake = function () {
        _super.prototype.awake.call(this);
    };
    Ball.prototype.sleep = function () {
        _super.prototype.sleep.call(this);
    };
    Ball.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    Ball.prototype.readyGo = function () {
        var _a = this.host.parent, width = _a.width, height = _a.height;
        this.velocity.zero();
        this.force.zero();
        this.position.setXY(width / 2, height / 2);
        this.updatePosition();
    };
    Ball.prototype.start = function () {
        this.playing = true;
    };
    Ball.prototype.stop = function () {
        this.playing = false;
    };
    Ball.prototype.stopGame = function () {
        this.playing = false;
    };
    Ball.prototype.resetOffset = function () {
        this.resetWhenNextFrame = true;
    };
    Ball.prototype.updatePosition = function () {
        var ball = this.host;
        ball.x = this.position.x;
        ball.y = this.position.y;
    };
    Ball.prototype.onEnterFrame = function (event) {
        if (!this.playing) {
            return;
        }
        this.velocity.add(this.force);
        this.velocity.truncate(this.maxSpeed);
        this.position.add(this.velocity);
        var _a = this.position, x = _a.x, y = _a.y;
        var _b = this.host.parent, width = _b.width, height = _b.height;
        this.position.x = x < 0 ? 0 : (x > width ? width : x);
        this.position.y = y < 0 ? 0 : (y > height ? height : y);
        this.updatePosition();
        if (x < 0 || x > width) {
            this.velocity.x = 0;
        }
        if (y < 0 || y > height) {
            this.velocity.y = 0;
        }
        var _c = this.position, px = _c.x, py = _c.y;
        var hitBorders = [];
        if (px == 0) {
            hitBorders.push(0);
        }
        else if (px == width) {
            hitBorders.push(2);
        }
        if (py == 0) {
            hitBorders.push(1);
        }
        else if (py == height) {
            hitBorders.push(3);
        }
        if (hitBorders.length > 0) {
            broadcast('onBallHitBorder', null, hitBorders);
        }
    };
    return Ball;
}(CurseComponent));

var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.container = null;
        _this.labCD = null;
        _this.labScore = null;
        _this.onMainTimer = function () {
            _this.updateSecond(_this.seconds + 1);
            var loopSeconds = _this.seconds % 6;
            switch (loopSeconds) {
                case 0:
                    _this.makeTarget();
                    break;
                case 4:
                    _this.dealResult();
                    break;
            }
        };
        return _this;
    }
    GameView.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
    };
    GameView.prototype.awake = function () {
        _super.prototype.awake.call(this);
        this.ball = getComponent(this.host.ball, Ball);
    };
    GameView.prototype.sleep = function () {
        _super.prototype.sleep.call(this);
    };
    GameView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    GameView.prototype.readyGo = function () {
        this.updateSecond(0);
        this.increaseCounting(0);
    };
    GameView.prototype.startGame = function () {
        this.targetPos = null;
        this.timerMain = setInterval(this.onMainTimer, 1000);
        broadcast('start');
    };
    GameView.prototype.stopGame = function () {
        clearInterval(this.timerMain);
    };
    GameView.prototype.dealResult = function () {
        var _this = this;
        if (!this.targetPos) {
            return;
        }
        var _a = this.ball.position, x = _a.x, y = _a.y;
        var _b = this.targetPos, tx = _b.x, ty = _b.y;
        var success = distance(x, y, tx, ty) <= this.targetRadius;
        broadcast('playResult', null, success ? 1 : 2);
        if (success) {
            this.increaseCounting();
        }
        else {
            clearInterval(this.timerMain);
            broadcast('stop');
            setTimeout(function () {
                broadcast('endGame', null, _this.counting);
            }, 500);
        }
    };
    GameView.prototype.makeTarget = function () {
        if (!this.containerSize) {
            var _a = this.container, width_1 = _a.width, height_1 = _a.height;
            this.containerSize = { width: width_1, height: height_1 };
        }
        var _b = this.containerSize, width = _b.width, height = _b.height;
        var pos = this.targetPos = {
            x: Math.random() * width,
            y: Math.random() * height,
        };
        this.targetRadius = Math.max((10 - this.counting) * 10, 50);
        broadcast('showTarget', null, pos, 4000, this.targetRadius);
    };
    GameView.prototype.updateSecond = function (seconds) {
        this.seconds = seconds;
        this.labCD.text = seconds.toString();
    };
    GameView.prototype.increaseCounting = function (t) {
        if (t !== undefined) {
            this.counting = t;
        }
        else {
            this.counting++;
        }
        this.labScore.text = this.counting.toString();
    };
    GameView.prototype.onBallHitBorder = function (hitBorders) {
    };
    return GameView;
}(CurseComponent));

var ReadyGo = (function (_super) {
    __extends(ReadyGo, _super);
    function ReadyGo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReadyGo.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
    };
    ReadyGo.prototype.awake = function () {
        _super.prototype.awake.call(this);
    };
    ReadyGo.prototype.sleep = function () {
        _super.prototype.sleep.call(this);
    };
    ReadyGo.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    ReadyGo.prototype.reset = function () {
        this.host.visible = false;
    };
    ReadyGo.prototype.readyGo = function (p) {
        var sw = getWidth();
        var _a = this.host, lab = _a.lab, bg = _a.bg;
        lab.text = 'Ready';
        lab.horizontalCenter = -sw;
        this.host.visible = true;
        egret.Tween.get(bg, null, null, true)
            .set({ visible: true })
            .to({ scaleY: 1 }, 200, egret.Ease.cubicOut)
            .wait(2000)
            .to({ scaleY: 0 }, 200, egret.Ease.cubicIn);
        egret.Tween.get(lab, null, null, true)
            .wait(200)
            .to({ horizontalCenter: 0 }, 200, egret.Ease.cubicOut)
            .wait(600)
            .to({ horizontalCenter: sw }, 200, egret.Ease.cubicIn)
            .set({
            text: 'Go',
            horizontalCenter: -sw,
        })
            .to({ horizontalCenter: 0 }, 200, egret.Ease.cubicOut)
            .wait(600)
            .to({ horizontalCenter: sw }, 200, egret.Ease.cubicIn);
    };
    return ReadyGo;
}(CurseComponent));

var Target = (function (_super) {
    __extends(Target, _super);
    function Target() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.target = null;
        _this.avatar = null;
        _this.colors = [
            0x0091FF,
            0x8FFF00,
            0xFF0000,
        ];
        return _this;
    }
    Target.prototype.stopGame = function () {
        egret.Tween.removeTweens(this.avatar);
    };
    Target.prototype.reset = function () {
        this.avatar.strokeColor = this.colors[0];
        return 100;
    };
    Target.prototype.readyGo = function () {
        this.host.visible = false;
    };
    Target.prototype.showTarget = function (pos, duration, toRadius) {
        var _a = this, avatar = _a.avatar, target = _a.target;
        var fromRadius = toRadius + 200;
        this.host.visible = true;
        injectProp(this.host, {
            x: pos.x,
            y: pos.y,
        });
        injectProp(avatar, {
            width: fromRadius * 2,
            height: fromRadius * 2,
            anchorOffsetX: fromRadius,
            anchorOffsetY: fromRadius,
            strokeColor: this.colors[0],
        });
        injectProp(target, {
            width: toRadius * 2,
            height: toRadius * 2,
            anchorOffsetX: toRadius,
            anchorOffsetY: toRadius,
        });
        egret.Tween.get(avatar, null, null, true)
            .to({
            width: toRadius * 2,
            height: toRadius * 2,
            anchorOffsetX: toRadius,
            anchorOffsetY: toRadius,
        }, duration, egret.Ease.cubicInOut);
    };
    Target.prototype.playResult = function (result, count) {
        if (count === void 0) { count = 2; }
        var tween = egret.Tween.get(this.avatar, null, null, true);
        for (var i = 0; i < count; i++) {
            tween
                .to({ strokeColor: this.colors[result] })
                .wait(100)
                .to({ strokeColor: this.colors[0] })
                .wait(100);
        }
        tween
            .set({ strokeColor: this.colors[result] });
    };
    return Target;
}(CurseComponent));

var PanelRule = (function (_super) {
    __extends(PanelRule, _super);
    function PanelRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PanelRule.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        var _a = this.host, labContent = _a.labContent, btnConfirm = _a.btnConfirm;
        labContent.text = '';
        btnConfirm.label = this.button;
        this.readyRule();
        this.registerEvent(btnConfirm, egret.TouchEvent.TOUCH_TAP, this.onBtnConfirmTap, this);
    };
    PanelRule.prototype.readyRule = function () {
        return __awaiter(this, void 0, void 0, function () {
            var labContent, content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        labContent = this.host.labContent;
                        return [4, getRule()];
                    case 1:
                        content = _a.sent();
                        labContent.textFlow = parseHtmlText(content);
                        return [2];
                }
            });
        });
    };
    PanelRule.prototype.onBtnConfirmTap = function (event) {
        PanelController.instance.dealAction(PANEL_RULE);
    };
    return PanelRule;
}(CurseComponent));

var PanelResult = (function (_super) {
    __extends(PanelResult, _super);
    function PanelResult() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.btnRetry = null;
        _this.btnClose = null;
        return _this;
    }
    PanelResult.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        this.host.addExcludeForClose(['retry']);
        this.registerEvent(this.btnRetry, egret.TouchEvent.TOUCH_TAP, this.onBtnRetryTap, this);
        this.registerEvent(this.btnClose, egret.TouchEvent.TOUCH_TAP, this.onBtnCloseTap, this);
    };
    PanelResult.prototype.onBtnRetryTap = function (event) {
        PanelController.instance.dealAction(PANEL_RESULT, 'retry');
    };
    PanelResult.prototype.onBtnCloseTap = function (event) {
        PanelController.instance.dealAction(PANEL_RESULT);
    };
    PanelResult.prototype.awake = function () {
        _super.prototype.awake.call(this);
        var labContent = this.host.labContent;
        var score = this.host.data.score;
        labContent.text = lang.format(lang.result_text, score);
    };
    return PanelResult;
}(CurseComponent));

var PanelAlert = (function (_super) {
    __extends(PanelAlert, _super);
    function PanelAlert() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PanelAlert.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        var btnConfirm = this.host.btnConfirm;
        this.registerEvent(btnConfirm, egret.TouchEvent.TOUCH_TAP, this.onBtnConfirmTap, this);
    };
    PanelAlert.prototype.awake = function () {
        _super.prototype.awake.call(this);
        var _a = this.host, labContent = _a.labContent, btnConfirm = _a.btnConfirm;
        var _b = this.host.data, content = _b.content, _c = _b.button, button = _c === void 0 ? 'Confirm' : _c;
        labContent.text = content;
        btnConfirm.label = button;
    };
    PanelAlert.prototype.onBtnConfirmTap = function (event) {
        PanelController.instance.dealAction(PANEL_ALERT);
    };
    return PanelAlert;
}(CurseComponent));

var MainBase = (function (_super) {
    __extends(MainBase, _super);
    function MainBase() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddedToStage, _this);
        return _this;
    }
    MainBase.prototype.onAddedToStage = function () {
        Dispatcher.init();
        init$1(this.stage, this);
        this.stage.scaleMode = egret.Capabilities.isMobile ? egret.StageScaleMode.FIXED_WIDTH : egret.StageScaleMode.SHOW_ALL;
        this.stage.orientation = egret.Capabilities.isMobile ? egret.OrientationMode.PORTRAIT : egret.OrientationMode.AUTO;
    };
    MainBase.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    MainBase.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [2];
                }
            });
        });
    };
    MainBase.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resBasePath, loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        egret.ImageLoader.crossOrigin = "anonymous";
                        resBasePath = window['resPath'] || '';
                        return [4, RES.loadConfig("default.res.json", resBasePath + "resource/")];
                    case 1:
                        _a.sent();
                        return [4, this.loadTheme()];
                    case 2:
                        _a.sent();
                        loadingView = LoadingView.instance;
                        this.addChild(loadingView);
                        return [4, RES.loadGroup("common", 0, loadingView)];
                    case 3:
                        _a.sent();
                        return [3, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3, 5];
                    case 5: return [2];
                }
            });
        });
    };
    MainBase.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    MainBase.prototype.createGameScene = function () {
        var mainStage = MainStage.instance;
        this.addChildAt(mainStage, 0);
    };
    return MainBase;
}(eui.UILayer));

var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.onAddedToStage = function () {
        _super.prototype.onAddedToStage.call(this);
        init(GameConfig.gameName);
    };
    return Main;
}(MainBase));
//# sourceMappingURL=bundle.js.map
