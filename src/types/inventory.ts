import type { Item, ItemType } from "./items.js";

export type FilterConfig = {
  label: string;
  index: number;
  type: ItemType;
};

export type InventoryItem = {
  item: Item;
  quantity: number;
};