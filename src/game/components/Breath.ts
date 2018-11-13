/**
 * Created by rockyl on 2018/10/10.
 */

import CurseComponent from "@core/curse/CurseComponent";
import {breath, Wave} from "@alienlib/animation/wave";
import {anchorCenter} from "@alienlib/tools/Utils";

export default class Breath extends CurseComponent{
	duration: number = 2000;
	scaleOffset: number = 0.1;

	wave: Wave;

	protected onCreate() {
		super.onCreate();

		anchorCenter(this.host);
		this.wave = new Wave(this.host, this.duration, breath.bind(null, this.scaleOffset), 0, false);
	}

	protected awake() {
		super.awake();

		this.wave.play();
	}

	protected sleep() {
		super.sleep();

		this.wave.stop(true);
	}

	say(){
		console.log('hello')
	}
}
