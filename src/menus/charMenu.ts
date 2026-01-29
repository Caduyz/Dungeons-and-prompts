import type { MenuOption, VerticalMenuProps } from "../types/index.js";

const characterMenuOptions: MenuOption[] = [
  { id: 'charProfile', title: 'Player Profile', description: 'Open your statistics.' },
  { id: 'inventory', title: 'Inventory', description: 'Open the inventory.' },
  { id: 'setAttributes', title: 'Attributes', description: 'Increment your attributes (debugging).' },
  { id: 'return', title: 'Return', description: 'Return to main menu.' },
]

export const characterMenu: VerticalMenuProps = {
  title: 'ACTIONS',
  menuOptions: characterMenuOptions,
}