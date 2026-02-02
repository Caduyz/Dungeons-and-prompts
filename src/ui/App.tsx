import { render, useApp } from 'ink';
import { useState } from 'react';

import { ScreenController } from '../controllers/ScreenController.js';
import { itemRegistry } from '../data/itemLoader.js';
import { classSelectionMenu } from '../features/menus/domain/classMenu.js'
import { Character } from '../features/entities/character/domain/Character.js';
import { characterMenu } from '../features/menus/domain/charMenu.js';
import { AttributesMenu } from '../features/entities/character/components/SetAttributes.js';
import { UI_CONFIGS } from '../config/game.config.js';
import { type ScreenId } from './types.js';
import { game } from '../main.js';
import { VerticalMenu } from './index.js';
import { Inventory } from '../features/inventory/index.js';
import { getPlayerItems } from '../config/globalFunctions.js';
import { ItemType } from '../features/items/index.js';
import { CharProfile, getClassById } from '../features/entities/index.js';
import { MainMenu, NameSelection } from '../features/menus/index.js';

let playerName: string;

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
                  game.setPlayer(new Character(playerName, getClassById(option.title)));

                  // Debugging
                  const expAddDebugValuesProMax2011 = game.player.progression.addExp(50000, game.player.levelInfo.experience, game.player.levelInfo.level);
                  game.player.levelInfo.experience = expAddDebugValuesProMax2011.newExp;
                  game.player.levelInfo.level = expAddDebugValuesProMax2011.newLevel;
                  game.player.levelInfo.requiredExperience = game.player.progression.getRequiredExp(game.player.levelInfo.level);
                  game.player.statPoints = expAddDebugValuesProMax2011.statPoints;

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
                    game.player.equipArmor(itemId);
                  }

                  if (itemRegistry[itemId]?.type === ItemType.Consumable) {
                    game.player.useItem(itemId);
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
              onSubmit={(newAttributes) => {
                game.player.setAttributes(newAttributes);
                goBack(1);
              }}
              onCancel={() => {
                goBack(1);
              }}
              attributes = {game.player.attributes}
              statPoints={game.player.statPoints}
              />;

    default:
      return null;
  }
}


export function renderApp() {
  render(<App/>, {maxFps: UI_CONFIGS.FRAME_RATE})
}