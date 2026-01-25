import { GameController } from "./controllers/GameController.js";
import { Character } from "./core/entities/Character.js";
import { WARRIOR } from "./core/entities/classes.js";

export const game = new GameController();
export const player = new Character('Hero', WARRIOR)
game.startGame();