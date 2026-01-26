import { useEffect, useState } from 'react';
import { Box, Text, Newline, useInput } from 'ink';
import { Select } from '@inkjs/ui';
import type { InventoryFilter, InventoryProps, FilterConfig, InventoryItem } from '../types/index.js';
import { ItemType } from '../types/index.js';
import { player } from "../launcher.js";
import { itemRegistry } from '../data/items.js';

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
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<InventoryFilter>('Consumables');

  const filterConfig = FILTERS[selectedFilter];
  const filteredItems = items.filter(
    item => item.item.type === filterConfig.type
  );

  const selectedItem = filteredItems[selectedIndex];

  useInput((_, key) => {
    if (key.return && selectedItemId) {
      onUseItem(selectedItemId);
    }

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

  useEffect(() => {
    const entry = filteredItems[selectedIndex];
    setSelectedItemId(entry ? entry.item.id : null);
  }, [selectedIndex, filteredItems]);
  
  return(
    <Box flexDirection="column" padding={2} borderStyle="round" borderColor="cyan">
      <Text bold color={titleColor}>
        {title} - {filterConfig.label} [{filterConfig.index} / 4]
      </Text>

      <Newline />
      <Text dimColor>← → to switch | ↑ ↓ to navigate | ESC to close | Enter to use</Text>
      <Newline />


      {selectedItem && (
        <>
          <Text>Item Description</Text>
          <Text dimColor>▶ {selectedItem.item.description}</Text>

          {(selectedItem.item.type === ItemType.Consumable && selectedItem.item.effect === 'heal') && (
            <Text dimColor color="blue">▶ Heal: {selectedItem.item.value} {selectedItem.item.statAffected}</Text>
          )}

          {selectedItem.item.type === ItemType.Armor && (
            <Text dimColor color="blue">▶ Defense: {selectedItem.item.defense}</Text>
          )}

          {selectedItem.item.type === ItemType.Weapon && (
            <Text dimColor color="red">▶ Damage: {selectedItem.item.damage}</Text>
          )}

          <Newline />
        </>
      )}


      {filteredItems.length === 0 ? (
        <Text color="red">No items available.</Text>
      ) : (
        <Select 
          options={filteredItems.map(item => ({
            label: `${item.item.name} (x${item.quantity})`,
            value: item.item.id
        }))}
          onChange={setSelectedItemId}
        />
      )}
    </Box>
  ) 
}

export function getPlayerItems(): InventoryItem[] {
  return Object.entries(player.inventory)
    .map(([id, quantity]) => {
      const item = itemRegistry[id];
      if (!item) return null;

      return { item, quantity };
    })
    .filter(Boolean) as InventoryItem[];  
}