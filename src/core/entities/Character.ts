import { type Attributes, type Entity, type Vitals, type Class, type Progression, ItemType, BodySlot, type Armory } from '../../types/index.js';
import { itemRegistry } from '../../data/items.js';
import { Classes } from './classes.js';

export class Character implements Entity {
  name: string;
  progression: Progression;
  attributes: Attributes;
  vital: Vitals;
  class: Class;
  coins: number = 0;

  inventory: { [itemId: string]: number } = {}; // itemId -> quantity 
  armory: Armory = {
    [BodySlot.Head]: null,
    [BodySlot.Chest]: null,
    [BodySlot.Legs]: null,
    [BodySlot.Hands]: null,
    [BodySlot.Feet]: null,
  };

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

  checkItemByInventory() { // Debugging only
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

  useItem(itemId: string) {
    if (!this.inventory[itemId]) return

    this.inventory[itemId]--
    if (this.inventory[itemId] === 0) {
      delete this.inventory[itemId]
    }
  }

  equipArmor(itemId: string) {
    const armor = this.getItemById(itemId)
    if (armor.type !== ItemType.Armor) {
      console.log("This item can't be equipped!");
      return;
    }
    if (!(armor.availableClasses.includes(this.class.id)) && !(armor.availableClasses.includes(Classes.ALL))) {
      console.log("Your class can't equip this armor!")
    }
    
    const slot = armor.equippableSlot;
    
    if (this.armory[slot] === armor) {
      console.log('Armor already equipped!')
      return;
    }

    else {
      this.armory[slot] = armor;
      console.log(this.armory)
    }
  }

  getItemById(itemId: string) {
    if (!itemRegistry[itemId]) {
      throw new Error("Item not found.") 
    }
    return itemRegistry[itemId];
  }
}