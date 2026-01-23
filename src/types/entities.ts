// Common for all entities in the game
export type Attributes = {
  STR: number;
  DEX: number;
  INT: number;
  VIT: number;
  WIS: number;
  DEF: number;
}

export type Vitals = {
  currentHP: number;
  maxHP: number;
  currentMP: number;
  maxMP: number;
}

export interface Entity {
  name: string;
  attributes: Attributes;
  vital: Vitals;
  race?: null; // Placeholder for future expansion
  armory?: null; // Placeholder for future expansion

  heal(amount: number): void;
  takeDamage(amount: number, damageType: string): void;
}

// Character only
export type Progression = {
  level: number;
  experience: number;
}

export type Class = {
  name: string;
  id: string;
  description: string;
  baseAttributes: Attributes;
  classPassive?: null; // Placeholder for future expansion
  classSkills?: null; // Placeholder for future expansion
}