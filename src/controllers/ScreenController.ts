import { useState } from 'react';
import type { Navigator, Screen } from '../types/index.js';

export function useNavigator(initial: Screen): Navigator {
  const [stack, setStack] = useState<Screen[]>([initial]);

  const push = (screen: Screen) => {
    setStack(prev => [...prev, screen]);
  };

  const pop = () => {
    setStack(prev =>
      prev.length > 1 ? prev.slice(0, -1) : prev
    );
  };

  return {
    current: stack[stack.length - 1]!,
    push,
    pop,
  };
}