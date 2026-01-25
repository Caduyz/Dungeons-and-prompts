import { render, useApp } from 'ink';
import { useNavigator } from '../controllers/ScreenController.js';
import { MainMenuScreen } from '../screens/MainMenu.js';
import { SCREEN_FPS } from '../controllers/GameState.js';

const App = () => {
  const { exit } = useApp();

  const navigator = useNavigator({
    id: 'bootstrap',
    render: () => null
  });

  if (navigator.current.id === 'bootstrap') {
    navigator.push(MainMenuScreen(navigator, exit));
    return null;
  }

  return navigator.current.render();
};

export function renderer() {
  render(<App />, { maxFps: SCREEN_FPS });
}
