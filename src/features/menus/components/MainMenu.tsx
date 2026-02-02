import { VerticalMenu } from "../../../ui/common/VerticalMenu.js";
import { mainMenu } from "../index.js";
import { type MainMenuProps } from "../index.js";

export function MainMenu({ goTo, exit }: MainMenuProps) {
  return (
    <VerticalMenu
      {...mainMenu}
      onSelect={(option) => {
        if (option.id === 'newGame') {
          goTo('nameSelection');
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
