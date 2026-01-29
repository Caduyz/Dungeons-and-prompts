import type { InventoryItem } from "../types/index.js";

export type ScreenId =
  | 'mainMenu'
  | 'charMenu'
  | 'inventory'
  | 'battle'
  | 'dialog'
  | 'pause'
  | 'nameSelection'
  | 'classSelection'
  | 'charProfile'
  | 'setAttributes';

// Inventory Only
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