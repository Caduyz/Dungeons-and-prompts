import type { VerticalMenuProps } from '../types/index.js';

export const mainMenu: VerticalMenuProps = {
  title: 'Main Menu',
  titleColor: 'cyan',
  options: 
  [
  { title: 'New Game', id: 'new_game' },
  { title: 'Load Game', id: 'load_game' },
  { title: 'Settings', id: 'settings' },
  { title: 'Exit Game', id: 'exit' },
  ],
  loop: true,
};