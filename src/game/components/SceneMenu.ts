/**
 * Created by rockyl on 2018/10/10.
 */

import CurseComponent from "@core/curse/CurseComponent";
import {sin, Wave} from "@alienlib/animation/wave";
import {delayLoad} from "../Utils";

export default class SceneMenu extends CurseComponent{
	lab: eui.Label = null;

	wave: Wave;

	protected onCreate() {
		super.onCreate();

		this.wave = new Wave(this.lab, 2000, sin.bind(null, 20), 0, false);

		delayLoad();
	}

	protected awake() {
		super.awake();

		this.wave.play();
	}

	protected sleep() {
		super.sleep();

		this.wave.stop(true);
	}

	protected destroy() {
		super.destroy();
	}
}
