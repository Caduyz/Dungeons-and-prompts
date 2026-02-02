import type { Classes } from "../entities/base/Classes.js";
import type { ItemBase, ItemType } from "./index.js";

export enum BodySlot {
  Head = 'head',
  Chest = 'chest',
  Legs = 'legs',
  Feet = 'feet',
  Hands = 'hands'
}

export interface Armor extends ItemBase {
  type: ItemType.Armor;
  defense: number;
  equippableSlot: BodySlot;
  availableClasses: Classes[];
  recipe?: { itemId: string; quantity: number }[];
  price?: number;
}

export interface Weapon extends ItemBase {
  type: ItemType.Weapon;
  damage: number;
  mainAttribute: 'strength' | 'dexterity' | 'intelligence';
  availableClasses: Classes[];
  recipe?: { itemId: string; quantity: number }[];
  price?: number;
}

export type Armory = Record<BodySlot, Armor | null>;