import { Navigator, InputHandler, KeyCodes, type InputEvent } from './NavigationController';
import { type Menu, MainMenu } from '../ui/Menus';

export class GameController {
  input = new InputHandler();
  navigator = new Navigator();
  private currentMenu: Menu | null = null;

  startGame() {
    this.input.start();

    this.input.addListener(this.handleGlobalInput.bind(this));

    this.openMainMenu();
  }

  createNewSave() {
    console.log("Creating a new save (debug only)...");
    this.input.stop();
    process.exit(0);
  }

  private handleGlobalInput(event: InputEvent) {
    if (event.command === KeyCodes.CTRL_C) {
      this.input.stop();
      process.exit(0);
    }

    this.currentMenu?.handleInput(event);
  }

  openMainMenu() {
    this.currentMenu = new MainMenu();
    this.currentMenu.render();
  }
}