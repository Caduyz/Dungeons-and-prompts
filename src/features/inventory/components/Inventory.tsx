import { useEffect, useState } from 'react';
import { Box, Text, Newline, useInput } from 'ink';
import { Select } from '@inkjs/ui';

import { type InventoryFilter, type FilterConfig, type InventoryProps } from '../index.js'
import { ItemType } from '../../items/index.js';
import { itemRegistry } from '../../../data/itemLoader.js';
import { game } from '../../../main.js';

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
    title = 'INVENTORY',
    titleColor = 'yellow',
    items,
    onUseItem,
    onClose,
  } = props;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<InventoryFilter>('Consumables');
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const filterConfig = FILTERS[selectedFilter];
  const filteredItems = items.filter(
    item => item.item.type === filterConfig.type
  );

  const selectedItem = filteredItems[selectedIndex];

  const validateItemUse = (itemId: string | null): boolean => {
    if (!itemId) return false;

    const item = itemRegistry[itemId];

    if (!item) return false;

    if (item.type === ItemType.Armor) {
      if (!item.availableClasses.includes(game.player.class.id)) {
        setErrorMessage("Your class can't equip this armor!");
        return false;
      }
      if (game.player.armory[item.equippableSlot] === item) {
        setErrorMessage("This armor is already equipped!");
        return false;
      }
    }

    setErrorMessage(null);
    return true;
  };

  useInput((_, key) => {
    if (key.return && selectedItemId) {
      if (!validateItemUse(selectedItemId)) {
        return;
      }
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

    if (key.escape || key.backspace) {
      onClose()
    };
  });

  useEffect(() => {
    const entry = filteredItems[selectedIndex];
    const id = entry ? entry.item.id : null;

    setSelectedItemId(id);
    validateItemUse(id);
  }, [selectedIndex, filteredItems]);
  
  return(
    <Box flexDirection='row'>
      <Box flexDirection="column" padding={2} borderStyle="round" borderColor="cyan" flexGrow={1}>
        <Text bold color={titleColor}>
          {title.toUpperCase()} - {filterConfig.label.toUpperCase()} [{filterConfig.index} / 4]
        </Text>

        <Newline />
        <Text dimColor>← → to switch | ↑ ↓ to navigate | ESC to close | Enter to use</Text>
        <Newline />

        {filteredItems.length === 0 ? (
          <Text dimColor color="red">No items available.</Text>
        ) : (
          <Select 
            options={filteredItems.map(item => ({
              label: `${item.item.name} (x${item.quantity})`,
              value: item.item.id
          }))}
          />
        )}
      </Box>

      {selectedItem && (
      <Box flexDirection='column' flexGrow={1} borderColor={'cyan'} borderStyle={'round'} padding={2}>
        <Text bold>ITEM DESCRIPTION</Text>
        <Text dimColor>{selectedItem?.item.description}</Text>
        <Text dimColor>Amount: {selectedItem?.quantity}</Text>
        {(selectedItem.item.type === ItemType.Consumable && selectedItem.item.effect === 'heal') && (
          <Text dimColor color="blue">Heal: {selectedItem.item.value} {selectedItem.item.statAffected}</Text>
        )}

        {selectedItem.item.type === ItemType.Armor && (
          <Text dimColor color="blue">Defense: {selectedItem.item.defense}</Text>
        )}

        {selectedItem.item.type === ItemType.Weapon && (
          <Text dimColor color="red">Damage: {selectedItem.item.damage}</Text>
        )}
    
        {errorMessage && (
          <>
            <Newline/>
            <Text color={'red'}>{errorMessage}</Text>
          </>
        )}
      </Box>
      )}

    </Box>
  ) 
}