export type MenuOption = {
  id: number;
  label: string;
};

export class Menu {
  constructor(
    private title: string,
    private options: MenuOption[]
  ) {}

  render(selectedIndex: number) {
    console.clear();
    console.log(`======= ${this.title} =======\n`);

    this.options.forEach((option, index) => {
      const prefix = index === selectedIndex ? '> ' : '  ';
      console.log(`${prefix}${option.label}`);
    });
  }

  getOptionByIndex(index: number) {
    return this.options[index];
  }

  get length() {
    return this.options.length;
  }
}

// Menus List
export const mainMenu = new Menu('Start Menu', [
  { id: 1, label: 'New Game' },
  { id: 2, label: 'Load Game' },
  { id: 3, label: 'Exit' }
]);