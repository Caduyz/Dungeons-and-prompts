import { render, useApp } from 'ink';
import { MainMenu } from '../screens/MainMenu.js';
import { SCREEN_FPS } from '../controllers/GameState.js';
import { useState } from 'react';
import { ScreenController } from '../controllers/ScreenController.js';
import { getPlayerItems, Inventory } from './Inventory.js';
import { ItemType, type ScreenId } from '../types/index.js';
import { player } from '../launcher.js';
import { itemRegistry } from '../data/items.js';

function App() {
  const [screenController] = useState(() => new ScreenController());
  const [, forceUpdate] = useState(0);
  const { exit } = useApp();

  const rerender = () => forceUpdate(n => n + 1);

  const goTo = (screen: ScreenId) => {
    screenController.push(screen);
    rerender();
  };

  const goBack = () => {
    screenController.pop();
    rerender();
  };

  switch (screenController.current()) {
    case 'mainMenu':
      return <MainMenu 
                goTo={goTo} 
                exit={exit}
                />;

    case 'charCreation':
      return; // Needs some corrections*

    case 'inventory':
      return <Inventory
                title="Inventory"
                items={getPlayerItems()}
                onUseItem={(itemId) => {
                  if (itemRegistry[itemId]?.type === ItemType.Armor) {
                    player.equipArmor(itemId);
                  }

                  if (itemRegistry[itemId]?.type === ItemType.Consumable) {
                    player.useItem(itemId);
                    rerender()
                  }
                }}
                onClose={goBack} 
                />;

    default:
      return null;
  }
}


export function renderApp() {
  render(<App/>, {maxFps: SCREEN_FPS})
}