import type { Class } from "../../types/index.js";

export enum Classes {
  WARRIOR = 'warrior',
  ARCHER = 'archer',
  MAGE = 'mage',
  ALL = 'all'
}

export const WARRIOR: Class = {
  name: "Warrior",
  id: Classes.WARRIOR,
  description: "A strong melee fighter with high vitality.",
  baseAttributes: {
    STR: 3,
    DEX: 1,
    INT: 0,
    VIT: 3,
    WIS: 0,
    DEF: 0
  }
};

export const MAGE: Class = {
  name: "Mage",
  id: Classes.MAGE,
  description: "A spellcaster with high intelligence and low defense.",
  baseAttributes: {
    STR: 0,
    DEX: 1,
    INT: 3,
    VIT: 0,
    WIS: 3,
    DEF: 0
  }
};

export const ARCHER: Class = {
  name: "Archer",
  id: Classes.ARCHER,
  description: "A ranged fighter with high dexterity.",
  baseAttributes: {
    STR: 1,
    DEX: 4,
    INT: 1,
    VIT: 0,
    WIS: 1,
    DEF: 0
  }
};

export const CLASSES: Class[] = [WARRIOR, MAGE, ARCHER];