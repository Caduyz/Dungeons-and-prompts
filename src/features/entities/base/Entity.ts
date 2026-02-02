import { type Attributes, type Vitals } from "../index.js";

export interface Entity {
  name: string;
  attributes: Attributes;
  vital: Vitals;
  race?: null; // Placeholder for future expansion

  recover(type: 'health' | 'mana', amount: number): void;
  takeDamage(amount: number, damageType: string): void;
}