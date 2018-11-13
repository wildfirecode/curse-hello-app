import MainBase from './core/MainBase'
import GameConfig from "./game/model/GameConfig";
import {init as initLocalStorage} from "@alienlib/support/LocalStorage";

class Main extends MainBase {

	protected onAddedToStage(): void {
		super.onAddedToStage();

		initLocalStorage(GameConfig.gameName);
	}
}
