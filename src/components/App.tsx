import { render, useApp } from 'ink';
import { useState } from 'react';
import { MainMenu } from '../screens/MainMenu.js';
import { SCREEN_FPS } from '../controllers/GameState.js';
import { ScreenController } from '../controllers/ScreenController.js';
import { getPlayerItems, Inventory } from './Inventory.js';
import { ItemType, type ScreenId } from '../types/index.js';
import { itemRegistry } from '../data/items.js';
import { NameSelection } from './NameSelection.js';
import { VerticalMenu } from './VerticalMenu.js';
import { classSelectionMenu } from '../menus/classMenu.js'
import { Character } from '../core/entities/Character.js';
import { getClassById } from '../core/entities/classes.js';

let playerName: string;

export let player: Character;

function App() {
  const [screenController] = useState(() => new ScreenController());
  const [, forceUpdate] = useState(0);
  const { exit } = useApp();

  const rerender = () => forceUpdate(n => n + 1);

  const goTo = (screen: ScreenId) => {
    screenController.push(screen);
    rerender();
  };

  const goBack = (times: number) => {
    for  (let i = 0; i < times; i++) {
      screenController.pop();
      rerender();
    }
  };

  switch (screenController.current()) {
    case 'mainMenu':
      return <MainMenu 
                goTo={goTo} 
                exit={exit}
                />;

    case 'nameSelection':
      return <NameSelection 
        onSubmit={(name) => {
          playerName = name;
          console.log(playerName);
          goTo('classSelection')
        }}
        onCancel={() => goBack(1)}/>

    case 'classSelection':
        return <VerticalMenu
                {...classSelectionMenu}
                onSelect={(option) => { 
                  console.log('Name:', playerName);     // For debugging
                  console.log('Class:', option.title);  // For debugging
                  player = new Character(playerName, getClassById(option.title))
                  goBack(2);
                }}
                onCancel={() => goBack(1)}
              />

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
                onClose={() => goBack(1)} 
                />;

    default:
      return null;
  }
}


export function renderApp() {
  render(<App/>, {maxFps: SCREEN_FPS})
}