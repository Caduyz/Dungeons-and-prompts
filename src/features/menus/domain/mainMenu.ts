import { type MenuOption, type VerticalMenuProps } from "../index.js";

const mainMenuOptions: MenuOption[] = [
  { id: 'newGame', title: 'New Game', description: 'Creates a new character.' },
  { id: 'exit', title: 'Exit', description: 'Save and close the game.' },
]

export const mainMenu: VerticalMenuProps = {
  title: 'MAIN MENU',
  menuOptions: mainMenuOptions,
}