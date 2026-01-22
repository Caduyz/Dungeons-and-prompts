import type { Attributes, Entity, Vitals, Class, Progression } from '../../types/index.js';

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