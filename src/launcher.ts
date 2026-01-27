import { GameController } from "./controllers/GameController.js";
import { Character } from "./core/entities/Character.js";
import { MAGE, WARRIOR, ARCHER } from "./core/entities/classes.js";

export const game = new GameController();
game.startGame();