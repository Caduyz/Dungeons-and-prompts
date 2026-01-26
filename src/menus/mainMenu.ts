import type { MenuOption, VerticalMenuProps } from "../types/index.js";

const mainMenuOptions: MenuOption[] = [
  { id: 'newGame', title: 'New Game' },
  { id: 'inventory', title: 'Inventory' },
  { id: 'exit', title: 'Exit' },
]

export const mainMenu: VerticalMenuProps = {
  title: 'Main Menu',
  options: mainMenuOptions,
}