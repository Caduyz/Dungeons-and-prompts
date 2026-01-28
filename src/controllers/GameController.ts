import { renderApp } from "../components/App.js"

export class GameController {
  private gameIsRunning: boolean = false;

  startGame() {
    this.gameIsRunning = true;
    console.clear()
    this.openMainMenu()
  }

  openMainMenu() {
    renderApp();
  }
}