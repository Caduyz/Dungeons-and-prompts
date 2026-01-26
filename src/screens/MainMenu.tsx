import { VerticalMenu } from '../components/VerticalMenu.js';
import { mainMenu } from '../menus/index.js';
import type { ScreenId } from '../types/index.js';

type MainMenuProps = {
  goTo: (screen: ScreenId) => void;
  exit: () => void;
};

export function MainMenu({ goTo, exit }: MainMenuProps) {
  return (
    <VerticalMenu
      {...mainMenu}
      loop
      onSelect={(option) => {
        console.log('MainMenu:', option.id);

        if (option.id === 'new') {
          goTo('charCreation');
        }

        if (option.id === 'inventory') {
          goTo('inventory');
        }

        if (option.id === 'exit') {
          exit();
        }
      }}
    />
  );
}
