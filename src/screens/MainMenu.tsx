import { VerticalMenu } from '../components/VerticalMenu.js';
import { CreateCharacterScreen } from './CreateCharacter.js';
import type { Navigator } from '../types/index.js';
import { mainMenu } from '../menus/index.js';

export const MainMenuScreen = (navigator: Navigator, exit: () => void) => ({
  id: 'main-menu',
  render: () => (
    <VerticalMenu {...mainMenu}
      onSelect={(option) => {
      console.log('MainMenu:', option.id); // For debugging
      if (option.id === 'new') {
        navigator.push(CreateCharacterScreen(navigator));
      }

      if (option.id === 'exit') {
        exit();
      }
    }}
    loop={true}
  />
  )
});
