import fs from 'fs'
import type { Item } from "../types/index.js"
import path from 'path'

const itemsPath = path.resolve('src/data/items.json');

const raw = fs.readFileSync(itemsPath, 'utf-8');
const parsed = JSON.parse(raw) as Record<string, Item>;

export const itemRegistry: Record<string, Item> = {};

for (const [id, item] of Object.entries(parsed)) {
  if (itemRegistry[id]) {
    throw new Error(`Duplicate item id: ${id}`);
  }

  itemRegistry[id] = item;
}

console.log(itemRegistry);
