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