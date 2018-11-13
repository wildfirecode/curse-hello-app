const notifier = require('node-notifier');

export class ResultNotificationPlugin implements plugins.Command {
	operate;
	version;

	constructor(operate, version = '') {
		this.operate = operate;
		this.version = version;
	}

	async onFile(file: plugins.File) {
		return file;
	}

	async onFinish(commandContext: plugins.CommandContext) {
		notifier.notify({
			title: 'Egret',
			message: this.operate + ' complete!'
		});

		if(this.version){
			console.log('version:', this.version)
		}
	}
}
