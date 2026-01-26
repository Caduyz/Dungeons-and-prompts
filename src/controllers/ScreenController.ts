import type { ScreenId } from '../types/index.js';

export class ScreenController {
  private stack: ScreenId[] = ['mainMenu'];

  current(): ScreenId {
    return this.stack[this.stack.length - 1]!;
  }

  push(screen: ScreenId): void {
    this.stack.push(screen);
  }

  pop(): void {
    if (this.stack.length > 1) {
      this.stack.pop();
    }  
  }

  reset(screen: ScreenId) {
    this.stack = [screen]
  }
}