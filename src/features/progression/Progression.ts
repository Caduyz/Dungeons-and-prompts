import { PROGRESSION_CONFIGS } from "../../config/game.config.js";

export class Progression {
  getRequiredExp(level: number) { // Current level
    const multiplier = 10 * PROGRESSION_CONFIGS.EXP_NEEDED_MULTIPLIER;
    return Math.floor(50 + (level**2 * multiplier))
  }

  addExp(amount: number, currentExp: number, currentLevel: number) {
    const previousLevel = currentLevel;
    let statPoints = 0;
    currentExp += (amount * PROGRESSION_CONFIGS.EXP_GAIN_MULTIPLIER);
    while (currentExp >= this.getRequiredExp(currentLevel)) {
      currentExp -= this.getRequiredExp(currentLevel)
      currentLevel++
    }

    if (currentLevel - previousLevel !== 0) {
      statPoints = this.getPoints(currentLevel - previousLevel);
    }

    return {
      newExp: currentExp,
      newLevel: currentLevel,
      statPoints: statPoints,
    }
  }

  getPoints(levels: number) {
    return levels * 3;
  }
}