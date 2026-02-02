import { itemRegistry } from "../data/itemLoader.js";
import { type InventoryItem } from "../features/inventory/index.js";
import { type Item } from "../features/items/items.js";
import { game } from "../main.js";

export function titleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getPlayerItems(): InventoryItem[] {
  return Object.entries(game.player!.inventory)
    .map(([id, quantity]) => {
      const item = itemRegistry[id];
      if (!item) return null;

      return { item, quantity };
    })
    .filter(Boolean) as InventoryItem[];  
}

export function getItemById(itemId: string): Item {
  if (!itemRegistry[itemId]) {
    throw new Error("Item not found.") 
  }
  return itemRegistry[itemId];
}