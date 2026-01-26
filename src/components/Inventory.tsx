import { useState, type JSX } from 'react';
import { Box, Text, Newline, useInput } from 'ink';
import { Select } from '@inkjs/ui';
import type { Item, Weapon, Armor, Consumable, Material, InventoryFilter, InventoryProps } from '../types/index.js';
import { ItemType } from '../types/index.js';
import { player } from "../launcher.js";
import { itemRegistry } from '../data/items.js';

type FilterConfig = {
  label: string;
  index: number;
  type: ItemType;
};

const FILTERS: Record<InventoryFilter, FilterConfig> = {
  Consumables: { label: 'Consumables', index: 1, type: ItemType.Consumable },
  Armors:      { label: 'Armors',      index: 2, type: ItemType.Armor },
  Weapons:     { label: 'Weapons',     index: 3, type: ItemType.Weapon },
  Materials:   { label: 'Materials',   index: 4, type: ItemType.Material },
};


const leftMove: Record<InventoryFilter, InventoryFilter> = {
  Consumables: 'Materials',
  Materials: 'Weapons',
  Weapons: 'Armors',
  Armors: 'Consumables',
};

const rightMove: Record<InventoryFilter, InventoryFilter> = {
  Consumables: 'Armors',
  Armors: 'Weapons',
  Weapons: 'Materials',
  Materials: 'Consumables',
};

export function Inventory(props: InventoryProps) {
  const {
    title = 'Inventory',
    titleColor = 'yellow',
    items,
    onUseItem,
    onClose,
  } = props;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<InventoryFilter>('Consumables');

  const filterConfig = FILTERS[selectedFilter];
  const filteredItems = items.filter(
    item => item.type === filterConfig.type
  );

  const selectedItem = filteredItems[selectedIndex];

  useInput((_, key) => {
    if (key.upArrow) {
      setSelectedIndex(i => Math.max(0, i - 1));
    }

    if (key.downArrow) {
      setSelectedIndex(i => Math.min(filteredItems.length - 1, i + 1));
    }

    if (key.leftArrow) {
      setSelectedIndex(0);
      setSelectedFilter(leftMove[selectedFilter]);
    }

    if (key.rightArrow) {
      setSelectedIndex(0);
      setSelectedFilter(rightMove[selectedFilter]);
    }

    if (key.escape) onClose();
  });
  
  return(
    <Box flexDirection="column" padding={2} borderStyle="round" borderColor="cyan">
      <Text bold color={titleColor}>
        {title} - {filterConfig.label} [{filterConfig.index} / 4]
      </Text>

      <Newline />
      <Text dimColor>← → to switch | ↑ ↓ to navigate | ESC to close</Text>
      <Newline />


      {selectedItem && (
        <>
          <Text>Item Description</Text>
          <Text dimColor>▶ {selectedItem.description}</Text>

          {selectedItem.type === ItemType.Armor && (
            <Text dimColor color="blue">▶ Defense: {selectedItem.defense}</Text>
          )}

          {selectedItem.type === ItemType.Weapon && (
            <Text dimColor color="red">▶ Damage: {selectedItem.damage}</Text>
          )}

          <Newline />
        </>
      )}


      {filteredItems.length === 0 ? (
        <Text color="red">No items available.</Text>
      ) : (
        <Select options={filteredItems.map(item => ({
          label: item.name,
          value: item.id
        }))} />
      )}
    </Box>
  ) 
}

function isItem(item: Item | undefined): item is Item {
  return item !== undefined;
}

export function getPlayerItems(): Item[] {
  return Object.keys(player.inventory)
    .map(id => itemRegistry[id])
    .filter(isItem);
}