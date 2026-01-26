import { Classes } from '../core/entities/classes.js'

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

export enum BodySlot {
  Head = 'head',
  Chest = 'chest',
  Legs = 'legs',
  Feet = 'feet',
  Hands = 'hands'
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