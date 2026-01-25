import type { ItemBase, Armor, Weapon, Material, Consumable, ItemType } from "../types/index.js";

export const itemRegistry: Record<string, ItemBase> = {};

export function createItem(item: ItemBase | Armor | Weapon | Material | Consumable) {
  if (itemRegistry[item.id]) {
    throw new Error(`Item ${item.id} already exists`);
  }

  itemRegistry[item.id] = item;
}