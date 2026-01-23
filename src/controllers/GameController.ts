import { renderer } from "../components/renderer.js";

export class GameController {
  private gameIsRunning: boolean = false;

  startGame() {
    this.gameIsRunning = true;

    this.openMainMenu();
  }

  openMainMenu() {
    renderer();
  }
}