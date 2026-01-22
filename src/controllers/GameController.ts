import { mainMenu } from "../menus/mainMenu.js";
import { renderMenu } from "../components/VerticalMenu.js";

export class GameController {
  private gameIsRunning: boolean = false;

  startGame() {
    this.gameIsRunning = true;

    this.openMainMenu();
  }

  openMainMenu() {
    renderMenu(mainMenu);
  }
}