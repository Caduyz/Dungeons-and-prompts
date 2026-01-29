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
import { CharProfile } from '../components/CharProfile.js';
import { characterMenu } from '../menus/charMenu.js';
import { AttributesMenu } from './SetAttributes.js';

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
          goTo('classSelection')
        }}
        onCancel={() => goBack(1)}
        />;

    case 'classSelection':
        return <VerticalMenu
                {...classSelectionMenu}
                onSelect={(option) => { 
                  player = new Character(playerName, getClassById(option.title));
                  screenController.reset
                  goTo('charMenu');
                }}
                onCancel={() => goBack(1)}
                />;

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

    case 'charProfile':
      return <CharProfile 
              onSubmit={() => goBack(1)}
              onCancel={() => goBack(1)}
              />;

    case 'charMenu':
      return <VerticalMenu
                {...characterMenu}
                onSelect={(option) => {
                  if (option.id === 'charProfile') {
                    goTo('charProfile');
                  }
                  if (option.id === 'inventory') {
                    goTo('inventory');
                  }
                  if (option.id === 'setAttributes') {
                    goTo('setAttributes');
                  }
                  if (option.id === 'return') {
                    screenController.reset
                    goTo('mainMenu');
                  }
                }}
              />;

    case 'setAttributes':
      return <AttributesMenu
              onSubmit={() => {console.log('success')}}
              onCancel={() => {
                goBack(1);
              }}
              attributes = {player.attributes}
              />;

    default:
      return null;
  }
}


export function renderApp() {
  render(<App/>, {maxFps: SCREEN_FPS})
}