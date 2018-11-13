/**
 * Created by rockyl on 2018/10/10.
 */

import {injectProp} from "@alienlib/tools/Utils";

const componentDefinitions = {};
const components = [];
const bindingsMap = {};

let currentGroup;

let bindingConfig: {
	name: string,
	skin: string,
	resGroups?: string[],
	bindings: {
		target: string,
		components: {
			script: string,
			enabled?: boolean,
			injection?: any,
		}
	}
}[];

function getDefName(str){
	return str.substr(str.lastIndexOf('/') + 1);
}

export function ready(config) {
	bindingConfig = config;
	for (let scene of config) {
		for (let binding of scene.bindings) {
			for (let component of binding.components) {
				const name = getDefName(component.script);
				componentDefinitions[name] = window[name];
			}
		}
	}
}

function newComponent(name) {
	const def = componentDefinitions[name];
	if (!def) {
		return null;
	}

	const ins = new def();
	components.push(ins);

	return ins;
}

function getHostKey(host) {
	return host['__class__'] + '_' + host.hashCode;
}

function getBindingByName(name){
	return bindingConfig.find(item=>item.name == name);
}

export function getComponents(host, createWhenNotExist = false) {
	let group = bindingsMap[currentGroup];
	if(!group){
		group = bindingsMap[currentGroup] = {};
	}

	const key = getHostKey(host);
	let bindings = group[key];
	if (!bindings && createWhenNotExist) {
		bindings = group[key] = [];
	}

	return bindings;
}

export function getComponent(host, nameOrDef){
	let target;
	const components = getComponents(host);
	if(components){
		for(let component of components){
			if(components['__class__'] == nameOrDef || component instanceof nameOrDef){
				target = component;
				break;
			}
		}
	}

	return target;
}

function transData(data){
	for(let key in data){
		let child = data[key];
		const type = typeof child;
		if(type == 'object'){
			transData(child);
		}else if(type == 'string'){
			child = child.replace(/\\n/g, '\n');
			if(child.indexOf('${') >= 0){
				const result = child.match(/\${[.|\w]+}/g);
				if(result){
					for(let item of result){
						const code = item.substr(2, item.length - 3);
						const ret = devil(code);
						child = child.replace(item, ret);
					}
				}
			}
			data[key] = child;
		}
	}
}

function bindComponent(host, component, injection) {
	let components = getComponents(host, true);
	components.push(component);

	transData(injection);
	injectProp(component, injection);
	component['host'] = host;

	//inject view parts
	if(host.skin){
		host.skin.skinParts.forEach(part=>{
			if(component.hasOwnProperty(part)){
				component[part] = host[part];
			}
		});
	}
}

function unbindComponents(host, ...componentArr) {
	let components = getComponents(host);
	if (!components) {
		return;
	}

	if (componentArr.length > 0) {
		for (let component of componentArr) {
			component.destroy();

			const index = components.indexOf(component);
			if (index >= 0) {
				components.splice(index, 1);
			}
		}
	} else {
		for (let component of components) {
			component.destroy();
		}
		components.splice(0);
	}

}

function findTargetInObject(object, targetName){
	let target = null;
	if(!targetName || targetName == 'this'){
		target = object;
	}else{
		try {
			const arr = targetName.split('.');
			target = arr.reduce((a, b)=>{
				if(a[b]){
					return a[b];
				}
			}, object);
		}catch (e) {}
	}
	return target;
}

function forEachBindings(sceneView, name, func) {
	const item = getBindingByName(name);
	for (let binding of item.bindings) {
		const {target} = binding;
		const targetView = findTargetInObject(sceneView, target);
		if (targetView) {
			func(targetView, binding);
		} else {
			console.warn(`target ${target} is not exist`)
		}
	}
}

export function setCurrentGroup(name){
	currentGroup = name;
}

export function mountView(sceneView, name) {
	forEachBindings(sceneView, name, function (targetView, binding) {
		for (let component of binding.components) {
			const {script, injection, enabled} = component;
			if(!enabled){
				continue;
			}
			const name = getDefName(script);
			const instance = newComponent(name);

			if (instance) {
				bindComponent(targetView, instance, injection);
				instance.onCreate();
			} else {
				console.warn('script is not exist:', name);
			}
		}
	});
}

export function unMountView(view, name) {
	forEachBindings(view, name, function (targetView) {
		unbindComponents(targetView);
	});
}

export function awakeView(view, name) {
	forEachBindings(view, name, function (targetView) {
		const components = getComponents(targetView);
		if (components) {
			for (let component of components) {
				component.awake();
			}
		}
	});
}

export function sleepView(view, name) {
	forEachBindings(view, name, function (targetView) {
		const components = getComponents(targetView);
		if (components) {
			for (let component of components) {
				component.sleep();
			}
		}
	});
}

export function broadcast(method, targetComponent = null, ...params){
	let group = bindingsMap[currentGroup];
	if(!group){
		return;
	}

	const result = [];
	for(let key in group){
		const bindings = group[key];
		for(let binding of bindings){
			const m: any = binding[method];
			if(m && !(targetComponent && typeof targetComponent === 'function' && binding instanceof targetComponent)){
				result.push({
					component: binding,
					result: m.apply(binding, params),
				});
			}
		}
	}

	return result;
}
