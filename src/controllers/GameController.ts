import { WARRIOR } from "../features/entities/base/Classes.js";
import { Character } from "../features/entities/character/domain/Character.js";
import { renderApp } from "../ui/App.js"

export class GameController {
  private gameIsRunning: boolean = false;
  player: Character = new Character('Dummy', WARRIOR);

  startGame() {
    this.gameIsRunning = true;
    console.clear()
    this.openMainMenu()
  }

  openMainMenu() {
    renderApp();
  }

  setPlayer(character: Character) {
    this.player = character;
  }
}