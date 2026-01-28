import type { MenuOption, VerticalMenuProps } from "../types/index.js";

const mainMenuOptions: MenuOption[] = [
  { id: 'newGame', title: 'New Game', description: 'Creates a new character.' },
  { id: 'inventory', title: 'Inventory', description: 'Open the inventory.' },
  { id: 'exit', title: 'Exit', description: 'Save and close the game.' },
]

export const mainMenu: VerticalMenuProps = {
  title: 'MAIN MENU',
  menuOptions: mainMenuOptions,
}