import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { Navigator, KeyCodes, type InputEvent } from '../controllers/NavigationController';
import { CLASSES, Character } from '../core/entities/Character';
import type { Menu } from './Menus';
import { game } from '../launcher';

export class CharacterCreation implements Menu {
  private navigator = new Navigator();
  private input = game.input;

  private phase: 'name' | 'class' | 'confirm' = 'name';
  private name: string = '';
  private selectedClassIndex: number = 0;

  async start(): Promise<void> {
    console.clear();

    this.input.stop();
    await this.askName();

    this.input.start();

    await this.askClass();

    await this.askConfirm();

    this.finish();
  }

  private async askName(): Promise<void> {
    this.phase = 'name';
    const rl = readline.createInterface({ input, output });

    this.name = await rl.question("What's your name, adventurer? ");

    rl.close();

    if (!this.name.trim()) {
      console.log("\nYou need a name to continue.\n");
      await this.askName();
      return;
    }

    console.log(`\nHello, ${this.name}!\n`);
  }

  private async askClass(): Promise<void> {
    this.phase = 'class';
    this.selectedClassIndex = 0;

    this.renderClassSelection();

    return new Promise((resolve) => {
      const listener = (event: InputEvent) => {
        const key = event.command;

        const newIndex = this.navigator.calculateNewPosition(
          key,
          this.selectedClassIndex,
          0,
          CLASSES.length - 1,
          true,           // wrap
          false           // To not allow LEFT/RIGHT
        );

        if (newIndex !== null) {
          this.selectedClassIndex = newIndex;
          this.renderClassSelection();
          return;
        }

        if (key === KeyCodes.ENTER) {
          this.input.removeListener(listener);
          resolve();
        }

        if (key === KeyCodes.ESC) {
          this.input.removeListener(listener);
          console.log("\nGoing back to name selection...");
          this.start();
        }
      };

      this.input.addListener(listener);
    });
  }

  private renderClassSelection(): void {
    console.clear();
    console.log(`Hello, ${this.name}! Choose your class:\n`);

    CLASSES.forEach((cls, i) => {
      const prefix = i === this.selectedClassIndex ? "> " : "  ";
      console.log(`${prefix}${cls.name} - ${cls.description}`);
    });

    console.log("\n↑ ↓ | Enter to confirm | ESC to go back");
  }

  private async askConfirm(): Promise<void> {
    const chosenClass = CLASSES[this.selectedClassIndex];

    if (!chosenClass) return;

    console.clear();
    console.log(">>=====< Confirmation >=====<<\n");
    console.log(`Name:   ${this.name}`);
    console.log(`Class: ${chosenClass.name}`);
    console.log(`\nBase attributes:`);
    console.table(chosenClass.baseAttributes);

    console.log("\nConfirm?   Enter = Yes  |  ESC = Redo");

    return new Promise((resolve) => {
      const listener = (event: InputEvent) => {
        if (event.command === KeyCodes.ENTER) {
          this.input.removeListener(listener);
          resolve();
        } else if (event.command === KeyCodes.ESC) {
          this.input.removeListener(listener);
          console.log("\nRestarting character creation...");
          this.start();
        }
      };

      this.input.addListener(listener);
    });
  }

  private finish(): void {
    const chosenClass = CLASSES[this.selectedClassIndex];

    if (!chosenClass) return;

    console.clear();
    console.log("Character created!\n");
    console.log(`Name:   ${this.name}`);
    console.log(`Class: ${chosenClass.name}`);
    console.log("\nPress enter to continue...");

    const finalListener = (event: InputEvent) => {
      if (event.command === KeyCodes.ENTER) {
        this.input.removeListener(finalListener);

        const character = new Character(this.name, chosenClass);
        game.player = character;
        console.table(character);

        // game.openMainMenu(); 
      }
    };

    this.input.addListener(finalListener);
  }

  render(): void { // Required by Menu interface
    if (this.phase === 'class') this.renderClassSelection();
  }

  handleInput(event: InputEvent): void {
    // Input handling is done in specific methods (for now)
  }
}