import * as path from 'path'
import * as fs from 'fs'

const templateHeader = `/**
 * THIS FILE WAS GENERATE BY COMPILER
 * DO NOT MODIFY THIS FILE
 */
 
`;

export class GenerateDependencePlugin implements plugins.Command {
	async onFile(file: plugins.File) {
		return file;
	}

	async onFinish(commandContext: plugins.CommandContext) {
		const projectConfig = require(path.resolve('resource/configs/project.json'));

		let content = templateHeader;
		for(let name of projectConfig.settings.services){
			const serviceName = (name.charAt(0).toUpperCase() + name.substr(1)) + 'Service';
			content += `import '../game/services/${serviceName}'\n`;
		}

		content += '\n';

		for (let scene:any of projectConfig.bindings) {
			for (let binding of scene.bindings) {
				for (let component of binding.components) {
					const name = component.script;

					content += `import '../${name}'\n`;
				}
			}
		}

		fs.writeFileSync('src/generated/MustCompile.ts', content);
	}

	[options: string]: any;
}
