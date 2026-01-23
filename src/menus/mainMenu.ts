import type { MenuOption, VerticalMenuProps } from "../types/index.js";

const mainMenuOptions: MenuOption[] = [
  { id: 'new', title: 'New Game' },
  { id: 'exit', title: 'Exit' },
]

export const mainMenu: VerticalMenuProps = {
  title: 'Main Menu',
  options: mainMenuOptions,
}