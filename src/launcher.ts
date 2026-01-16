import { InputHandler, Navigator, KeyCodes } from './input/NavigationController'
import { Menu } from './input/Menus'

const input = new InputHandler();

const menu = new Menu('Start Menu', [
  { id: 1, label: 'New Game' },
  { id: 2, label: 'Load Game' },
  { id: 3, label: 'Exit' }
]);

const navigator = new Navigator(menu.length);

menu.render(navigator.getIndex());

input.addListener((event) => {
  switch (event.command) {
    case KeyCodes.UP:
      navigator.moveUp();
      break;

    case KeyCodes.DOWN:
      navigator.moveDown();
      break;

    case KeyCodes.ENTER:
      const selected = menu.getOptionByIndex(navigator.getIndex());
      if (!selected) return;
      
      console.clear();
      console.log(`Você escolheu: ${selected.label}`);
      input.stop();
      process.exit();
  }

  menu.render(navigator.getIndex());
});

input.start();