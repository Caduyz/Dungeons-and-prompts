export enum KeyCodes {
  UP = '\x1B[A',
  DOWN = '\x1B[B',
  RIGHT = '\x1B[C',
  LEFT = '\x1B[D',

  ENTER = '\r',
  ESC = '\x1B',
  CTRL_C = '\u0003',
  SPACE = ' '
}

const KEY_MAP: Record<string, KeyCodes> = {
  '\x1B[A': KeyCodes.UP,
  '\x1B[B': KeyCodes.DOWN,
  '\x1B[C': KeyCodes.RIGHT,
  '\x1B[D': KeyCodes.LEFT,

  '\r': KeyCodes.ENTER,
  '\n': KeyCodes.ENTER,
  ' ': KeyCodes.SPACE,
  '\x1B': KeyCodes.ESC,
  '\u0003': KeyCodes.CTRL_C
};

export type InputEvent = {
  command: KeyCodes;
  raw: Buffer;
};

export class InputHandler {
  stdin = process.stdin;
  isRunning: boolean = false;

  private listeners = new Set<(event: InputEvent) => void>();

start() {
  if (!this.stdin.isTTY || this.isRunning) return;

  this.isRunning = true;
  this.stdin.setRawMode(true);
  this.stdin.resume();
  this.stdin.setEncoding('utf8');           // Only for string data

  this.stdin.on('data', this.handleData.bind(this));
}

  stop() {
    if (!this.isRunning) return;

    this.stdin.off('data', this.handleData.bind(this));
    this.stdin.setRawMode(false);
    this.stdin.pause();
    this.isRunning = false;
  }

  private handleData = (data: string) => {
    const buffer = Buffer.from(data, 'utf8');

    const command = KEY_MAP[data] || null;

    if (!command) return;

    const event: InputEvent = { command, raw: buffer };

    for (const listener of this.listeners) {
      listener(event);
    }

    if (command === KeyCodes.CTRL_C) {
      this.stop();
      process.exit(0);
    }
  };

  addListener(callback: (event: InputEvent) => void) {
    this.listeners.add(callback);
  }

  removeListener(callback: (event: InputEvent) => void) {
    this.listeners.delete(callback);
  }

  clearListeners() {
    this.listeners.clear();
  }
}

export class Navigator {
  calculateNewPosition(
    command: KeyCodes | null,
    currentPos: number,
    minPos: number,
    maxPos: number,
    wrap: boolean = true,
    allowHorizontal: boolean = false  // Parameter for security in horizontal moves
  ): number | null {

    if (!command) return null;

    let newPos = currentPos;

    switch (command) {
      case KeyCodes.UP:
        newPos--;
        break;

      case KeyCodes.DOWN:
        newPos++;
        break;

      case KeyCodes.LEFT:
        if (allowHorizontal) newPos--;
        else return null;
        break;

      case KeyCodes.RIGHT:
        if (allowHorizontal) newPos++;
        else return null;
        break;

      default:
        return null;
    }

    if (wrap) {
      if (newPos < minPos) newPos = maxPos;
      if (newPos > maxPos) newPos = minPos;
    } else {
      newPos = Math.max(minPos, Math.min(maxPos, newPos));
    }

    return newPos !== currentPos ? newPos : null;
  }
}