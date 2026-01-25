import { NameSelection } from '../components/NameSelection.js';
import { VerticalMenu } from '../components/VerticalMenu.js';
import { classSelectionMenu } from '../menus/index.js';
import type { Navigator } from '../types/index.js';
import { changeAlertState } from '../controllers/GameState.js';

export const CreateCharacterScreen = (navigator: Navigator) => {
  let playerName = '';

  return {
    id: 'create-character',
    render: () => (
      <NameSelection
        onSubmit={(name) => {
          playerName = name;

          navigator.push({
            id: 'class-selection',
            render: () => (
              <VerticalMenu
                {...classSelectionMenu}
                onSelect={(option) => { 
                  console.log('Name:', playerName);     // For debugging
                  console.log('Class:', option.title);  // For debugging
                  changeAlertState(true);
                  //navigator.pop();
                }}
                onCancel={() => navigator.pop()}
              />
            )
          });
        }}
      />
    )
  };
};