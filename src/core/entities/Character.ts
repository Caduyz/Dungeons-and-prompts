import type { Attributes, Entity, Vitals } from './Entity';

type Progression = {
  level: number;
  experience: number;
}

export type Class = {
  name: string;
  description: string;
  baseAttributes: Attributes;
  classPassive?: null; // Placeholder for future expansion
  classSkills?: null; // Placeholder for future expansion
}

const WARRIOR: Class = {
  name: "Warrior",
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

const MAGE: Class = {
  name: "Mage",
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

const ARCHER: Class = {
  name: "Archer",
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

export class Character implements Entity {
  name: string;
  progression: Progression;
  attributes: Attributes;
  vital: Vitals;
  class: Class;

  constructor(name: string, characterClass: Class) {
    this.name = name;
    this.class = characterClass;
    this.progression = {
      level: 1,
      experience: 0
    };

    this.attributes = {
      STR: 1 + characterClass.baseAttributes.STR,
      DEX: 1 + characterClass.baseAttributes.DEX,
      INT: 1 + characterClass.baseAttributes.INT,
      VIT: 1 + characterClass.baseAttributes.VIT,
      WIS: 1 + characterClass.baseAttributes.WIS,
      DEF: 1 + characterClass.baseAttributes.DEF
    };

    this.vital = {
      maxHP: 50 + this.getVitalByAttribute(this.attributes.VIT),
      maxMP: 50 + this.getVitalByAttribute(this.attributes.WIS),
      currentHP: 50 + this.getVitalByAttribute(this.attributes.VIT),
      currentMP: 50 + this.getVitalByAttribute(this.attributes.WIS),
    };
  }

  heal(amount: number): void {
    this.vital.currentHP = Math.min(this.vital.maxHP, this.vital.currentHP + amount);
  }

  takeDamage(amount: number, damageType: string): void { // Damage Type is currently unused
    this.vital.currentHP = Math.max(0, this.vital.currentHP - amount);
  }

  getVitalByAttribute(attribute: number): number { // Vital = Mana or Health derived from attributes
    return attribute * 5;
  }
}