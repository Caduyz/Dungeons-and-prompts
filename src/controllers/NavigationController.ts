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

  // Método chamado toda vez que chega dado no stdin
  private handleData = (data: string) => {
    const buffer = Buffer.from(data, 'utf8');

    // Tenta mapear a string recebida para um KeyCodes conhecido
    const command = KEY_MAP[data] || null;

    // Se não encontrou mapeamento → ignora silenciosamente (ou loga para debug)
    if (!command) {
      // console.log('[InputHandler] Tecla não mapeada:', data, buffer.toString('hex'));
      return;
    }

    const event: InputEvent = { command, raw: buffer };

    // Dispara todos os listeners registrados
    for (const listener of this.listeners) {
      listener(event);
    }

    // Tratamento especial para Ctrl+C (pode ser movido para fora se preferir)
    if (command === KeyCodes.CTRL_C) {
      console.log('\nSaindo...');
      this.stop();
      process.exit(0);
    }
  };

  // Registra um novo listener
  addListener(callback: (event: InputEvent) => void) {
    this.listeners.add(callback);
  }

  // Remove um listener específico
  removeListener(callback: (event: InputEvent) => void) {
    this.listeners.delete(callback);
  }

  // Opcional: remove todos os listeners (útil em cenários raros)
  clearListeners() {
    this.listeners.clear();
  }
}

export class Navigator {
  // Retorna o novo currentPos ou null (se não mudou ou comando irrelevante)
  calculateNewPosition(
    command: KeyCodes | null,
    currentPos: number,
    minPos: number,
    maxPos: number,
    wrap: boolean = true
  ): number | null {

    if (!command) return null;

    let newPos = currentPos;

    switch (command) {
      case KeyCodes.UP:
      case KeyCodes.LEFT:   // opcional: tratar left como up em menus lineares
        newPos--;
        break;

      case KeyCodes.DOWN:
      case KeyCodes.RIGHT:
        newPos++;
        break;

      default:
        return null; // enter, esc, space... não afetam posição
    }

    // Aplicar wrap-around (loop)
    if (wrap) {
      if (newPos < minPos) newPos = maxPos;
      if (newPos > maxPos) newPos = minPos;
    }
    // Sem wrap → clamp (não sai dos limites)
    else {
      newPos = Math.max(minPos, Math.min(maxPos, newPos));
    }

    // Só retorna se realmente mudou
    return newPos !== currentPos ? newPos : null;
  }

  // Método auxiliar para converter InputEvent → KeyCodes (pode mover para InputHandler se preferir)
  getKeyCodeFromEvent(event: InputEvent): KeyCodes | null {
    return event.command; // já está no seu InputEvent
  }
}