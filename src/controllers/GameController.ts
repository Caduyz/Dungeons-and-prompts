import { Navigator, InputHandler, KeyCodes, type InputEvent } from './NavigationController';
import { type Menu, MainMenu } from '../ui/Menus';
import { CharacterCreation } from '../ui/CharacterCreation';
import type { Character } from '../core/entities/Character';

export class GameController {
  input = new InputHandler();
  navigator = new Navigator();
  private currentMenu: Menu | null = null;
  player: Character | null = null;

  startGame() {
    this.input.start();

    this.input.addListener(this.handleGlobalInput.bind(this));

    this.openMainMenu();
  }

  createNewSave() {
    this.openCharacterCreation();
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

  openCharacterCreation() {
    this.currentMenu = new CharacterCreation();
    (this.currentMenu as CharacterCreation).start();
}
}