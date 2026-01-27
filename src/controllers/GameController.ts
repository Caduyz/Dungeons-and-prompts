import { renderApp } from "../components/App.js"

export class GameController {
  private gameIsRunning: boolean = false;

  startGame() {
    this.gameIsRunning = true;
    console.clear()

    /*
    player.addItemToInventory('health-potion', 10)
    player.addItemToInventory('slime-ball', 10)
    player.addItemToInventory('iron-sword', 1)
    player.addItemToInventory('iron-helmet', 1)
    player.addItemToInventory('iron-chestplate', 1)
    player.addItemToInventory('iron-greaves', 1)
    player.addItemToInventory('iron-gauntlets', 1)
    player.addItemToInventory('iron-boots', 1)*/

    this.openMainMenu()
  }

  openMainMenu() {
    renderApp();
  }
}