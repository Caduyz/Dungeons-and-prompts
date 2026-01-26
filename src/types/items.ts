import type { Class } from "./entities.js";

export enum ItemType {
  Consumable,
  Armor,
  Weapon,
  Material
}

export enum BodySlot {
  Head,
  Chest,
  Legs,
  Feet,
  Hands
}

export interface ItemBase {
  id: string;
  type: ItemType;
  name: string;
  description: string;
}

export interface Armor extends ItemBase {
  type: ItemType.Armor;
  defense: number;
  equippableSlot: BodySlot;
  availableClasses: Class[];
  recipe?: { itemId: string; quantity: number }[];
  price?: number;
}

export interface Weapon extends ItemBase {
  type: ItemType.Weapon;
  damage: number;
  mainAttribute: 'strength' | 'dexterity' | 'intelligence';
  availableClasses: Class[];
  recipe?: { itemId: string; quantity: number }[];
  price?: number;
}

export interface Material extends ItemBase {
  type: ItemType.Material;
  recipe?: { itemId: string; quantity: number }[];
  price?: number;
}

export interface Consumable extends ItemBase {
  type: ItemType.Consumable;
  effect: string;
  duration?: number; // in turns
  price?: number;
}

export type Item =
  | Weapon
  | Armor
  | Consumable
  | Material;