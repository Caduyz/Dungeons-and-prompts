import type { InventoryItem } from "../components/Inventory.js";

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
  items: InventoryItem[];
  onUseItem: (itemId: string) => void;
  onClose: () => void;
};

export type InventoryFilter =
  | 'Consumables'
  | 'Materials'
  | 'Weapons'
  | 'Armors';