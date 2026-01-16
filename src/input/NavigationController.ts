// Stores the keys codes
export enum KeyCodes {
  UP = '\x1B[A',
  DOWN = '\x1B[B',
  ENTER = '\r',
  ESC = '\x1B', 
  CTRL_C = '\u0003',
  SPACE = ' '
}

const KEY_MAP: Record<string, KeyCodes> = {
  '\x1B[A': KeyCodes.UP,
  '\x1B[B': KeyCodes.DOWN,
  '\r': KeyCodes.ENTER,
  ' ': KeyCodes.SPACE,
  '\x1B': KeyCodes.ESC,
  '\u0003': KeyCodes.CTRL_C
};

type InputEvent = {
  command: KeyCodes;
  raw: Buffer;
};

export class InputHandler {
  private listeners = new Set<(event: InputEvent) => void>();
  private isRunning = false;

  private handleKeyPress = (buffer: Buffer) => {
    const key = buffer.toString();
    const command = KEY_MAP[key] ?? null;

    if (!command) return;

    const event: InputEvent = { command, raw: buffer };

    for (const listener of this.listeners) {
      listener(event);
    }

    if (command === KeyCodes.CTRL_C) {
      this.stop();
      process.exit();
    }
  };

  start() {
    if (this.isRunning) return;

    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
    }

    process.stdin.resume();
    process.stdin.on('data', this.handleKeyPress);
    this.isRunning = true;
  }

  stop() {
    if (!this.isRunning) return;

    process.stdin.off('data', this.handleKeyPress);
    process.stdin.pause();

    if (process.stdin.isTTY) {
      process.stdin.setRawMode(false);
    }

    this.isRunning = false;
  }

  addListener(listener: (event: InputEvent) => void) {
    this.listeners.add(listener);
  }

  removeListener(listener: (event: InputEvent) => void) {
    this.listeners.delete(listener);
  }
}

export class Navigator {
  private index = 0;

  constructor(private optionsLength: number) {}

  moveUp() {
    this.index = (this.index - 1 + this.optionsLength) % this.optionsLength;
  }

  moveDown() {
    this.index = (this.index + 1) % this.optionsLength;
  }

  getIndex() {
    return this.index;
  }
}