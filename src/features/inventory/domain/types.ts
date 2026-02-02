import { type Item, type ItemType } from "../../items/index.js";

export type FilterConfig = {
  label: string;
  index: number;
  type: ItemType;
};

export type InventoryItem = {
  item: Item;
  quantity: number;
};

export type InventoryProps = {
  title: string;
  titleColor?: string; // default: 'yellow'
  items: InventoryItem[];
  onUseItem: (itemId: string) => void;
  onClose: () => void;
};

export type InventoryFilter =
  | 'Consumables'
  | 'Materials'
  | 'Weapons'
  | 'Armors';