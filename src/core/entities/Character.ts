import type { Attributes, Entity, Vitals, Class, Progression } from '../../types/index.js';
import { itemRegistry } from '../../data/items.js';

export class Character implements Entity {
  name: string;
  progression: Progression;
  attributes: Attributes;
  vital: Vitals;
  class: Class;
  coins: number = 0;

  inventory: { [itemId: string]: number } = {}; // itemId -> quantity 

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

  addItemToInventory(itemId: string, quantity: number = 1): void {
    if (this.inventory[itemId]) {
      this.inventory[itemId] += quantity;
    } else {
      this.inventory[itemId] = quantity;
    }
  }

  removeItemFromInventory(itemId: string, quantity: number = 1): boolean {
    if (this.inventory[itemId] && this.inventory[itemId] >= quantity) {
      this.inventory[itemId] -= quantity;
      if (this.inventory[itemId] === 0) {
        delete this.inventory[itemId];
      }
      return true;
    }
    return false;
  }

  checkItemByInventory() {
    const tableData = [];

    for (const itemId in this.inventory) {
      const quantity = this.inventory[itemId];
      const item = itemRegistry[itemId];

      if (!item) {
        tableData.push({
          id: itemId,
          error: 'Item not found in registry',
          quantity,
        });
        continue;
      }

      tableData.push({
        id: item.id,
        name: item.name,
        type: item.type,
        quantity,
        description: item.description,
      });
    }

    console.table(tableData);
  }
}