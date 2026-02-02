import { type Armor, type Weapon } from "./index.js";

export enum ItemType {
  Consumable = 'consumable',
  Armor = 'armor',
  Weapon = 'weapon',
  Material = 'material'
}

export enum Attribute {
  STR = 'STR',
  INT = 'INT',
  DEX = 'DEX',

  MP = 'MP',
  HP = 'HP'
}

export interface ItemBase {
  id: string;
  type: ItemType;
  name: string;
  description: string;
}

export interface Material extends ItemBase {
  type: ItemType.Material;
  recipe?: { itemId: string; quantity: number }[];
  price?: number;
}

export interface Consumable extends ItemBase {
  type: ItemType.Consumable;
  effect: string;
  statAffected: Attribute;
  value?: number;
  price?: number;
}

export type Item =
  | Weapon
  | Armor
  | Consumable
  | Material;