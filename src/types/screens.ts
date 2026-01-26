import type { Item } from "./items.js";

export type ScreenId =
  | 'mainMenu'
  | 'inventory'
  | 'battle'
  | 'dialog'
  | 'pause'
  | 'charCreation';

// Inventory Only
export type InventoryProps = {
  title: string;
  titleColor?: string; // default: 'yellow'
  items: Item[];
  onUseItem: (itemId: string) => void;
  onClose: () => void;
};

export type InventoryFilter =
  | 'Consumables'
  | 'Materials'
  | 'Weapons'
  | 'Armors';