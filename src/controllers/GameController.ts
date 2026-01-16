import { KeyCodes, InputHandler, Navigator } from "./NavigationController";
import type { InputEvent } from "./NavigationController";
import { mainMenu, Menu } from "../ui/Menus";

export class GameController {
  private inputHandler = new InputHandler();

  private menu!: Menu;
  private navigator!: Navigator;

  start() {
    this.inputHandler.start();
    this.openMainMenu();
  }

  private handleMainMenuInput = (event: InputEvent) => {
    switch (event.command) {
      case KeyCodes.UP:
        this.navigator.moveUp();
        break;

      case KeyCodes.DOWN:
        this.navigator.moveDown();
        break;

      case KeyCodes.ENTER: {
        const selected = this.menu.getOptionByIndex(
          this.navigator.getIndex()
        );

        if (!selected) return;

        console.clear();
        console.log(`You chose: ${selected.label}`);

        this.exitGame();
        break;
      }

      case KeyCodes.CTRL_C:
        console.log('Closing the game...');
        this.exitGame();
        break;
    }

    this.menu.render(this.navigator.getIndex());
  };

  openMainMenu() {
    this.menu = mainMenu;
    this.navigator = new Navigator(this.menu.length);

    this.inputHandler.addListener(this.handleMainMenuInput);

    this.menu.render(this.navigator.getIndex());
  }

  exitGame() {
    this.inputHandler.removeListener(this.handleMainMenuInput);
    this.inputHandler.stop();
    process.exit();
  }
}