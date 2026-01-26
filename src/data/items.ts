import type { Item, Armor, Weapon, Material, Consumable, ItemType } from "../types/index.js";

export const itemRegistry: Record<string, Item> = {};

export function createItem(item: Item | Armor | Weapon | Material | Consumable) {
  if (itemRegistry[item.id]) {
    throw new Error(`Item ${item.id} already exists`);
  }

  itemRegistry[item.id] = item;
}