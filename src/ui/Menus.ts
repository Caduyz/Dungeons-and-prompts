import { GameController } from "../controllers/GameController";
import { Navigator, KeyCodes, type InputEvent } from "../controllers/NavigationController";
import { game } from "../launcher";

type Option = {
  label: string;
  id: string;
  index: number;
}

const mainMenuOptions: Option[] = [
  { label: "New Game", id: "new_game", index: 0 },
  { label: "Load Game", id: "load_game", index: 1 },
  { label: "Settings", id: "settings", index: 2 },
  { label: "Exit", id: "exit", index: 3 }
];

export interface Menu {
  render(): void;
  handleInput(event: InputEvent): void;
}

export class MainMenu implements Menu {
  private options = mainMenuOptions;
  private selectedIndex: number = 0;
  private navigator = new Navigator();

  handleInput(event: InputEvent): void {
    const key = event.command;

    const newIndex = this.navigator.calculateNewPosition(
      key,
      this.selectedIndex,
      0,                        // minPos
      this.options.length - 1,  // maxPos
      true                      // wrap = true (loop on menu)
    );

    if (newIndex !== null) {
      this.selectedIndex = newIndex;
      this.render();
      return;
    }

    switch (key) {
      case KeyCodes.ENTER:
        this.activateSelected();
        break;

      case KeyCodes.ESC:
        this.handleEscape();
        break;
    }
  }

  private activateSelected() {
    const selected = this.options[this.selectedIndex];
    if (!selected) return;

    console.log(`Selected: ${selected.label} (${selected.id})`);

    if (selected.id === "new_game") {
      game.createNewSave();
    } else if (selected.id === "exit") {
      process.exit(0);
    }
  }

  private handleEscape() {
    process.exit(0);
  }

  render() {
    console.clear();
    console.log(">>========> Main Menu <========<<\n");

    this.options.forEach((option, i) => {
      const prefix = i === this.selectedIndex ? "> " : "  ";
      console.log(`${prefix}${option.label}`);
    });

    console.log("\nUse ↑↓ / Enter / ESC");
  }
}