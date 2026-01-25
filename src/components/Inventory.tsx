import { useState } from 'react';
import { Box, Text, Newline, useInput, render } from 'ink';
import { Select } from '@inkjs/ui';
import type { ItemBase, Item, Weapon, Armor, Consumable, Material } from '../types/index.js';
import { ItemType } from '../types/index.js';
import { player } from "../launcher.js";
import { itemRegistry } from '../data/items.js';

type InventoyProps = {
  title: string;
  titleColor?: string; // default: 'yellow'
  items: ItemBase[];
  onUseItem: (itemId: string) => void;
  onClose: () => void;
};

type InventoryFilter =
  | 'Consumables'
  | 'Materials'
  | 'Weapons'
  | 'Armors';

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


export function Inventory(props: InventoyProps) {
  const {
    title = 'Inventory',
    titleColor = 'yellow',
    items,
    onUseItem,
    onClose,
  } = props;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<InventoryFilter>('Consumables');

  // Don't worry, this isn't definitive, I'll polish it later.
  let filteredItems: ItemBase[] = [];

  if (selectedFilter === 'Consumables') {
    filteredItems = items.filter(item => item.type === ItemType.Consumable);
  }

  else if (selectedFilter === 'Armors') {
    filteredItems = items.filter(item => item.type === ItemType.Armor);
  }

  else if (selectedFilter === 'Weapons') {
    filteredItems = items.filter(item => item.type === ItemType.Weapon);
  }

  else if (selectedFilter === 'Materials') {
    filteredItems = items.filter(item => item.type === ItemType.Material);
  }
    
  const selectedOptions = filteredItems.map(item => ({
    label: item.name,
    value: item.id,
  }));

  useInput((data, key) => {
    if (key.upArrow) {
      setSelectedIndex(prev =>
        Math.max(0, prev - 1)
      );
    }

    if (key.downArrow) {
      setSelectedIndex(prev =>
        Math.min(selectedOptions.length - 1, prev + 1)
      );
    }
    if (key.escape) {
      onClose();
    }
    if (key.leftArrow) {
      setSelectedIndex(0)
      setSelectedFilter(leftMove[selectedFilter]);
      }
    if (key.rightArrow) {
      setSelectedIndex(0)
      setSelectedFilter(rightMove[selectedFilter]);
    }
  });

  if (selectedFilter === 'Consumables') {
    const filteredItems = items.filter((item): item is Consumable => item.type === ItemType.Consumable);    

    const selectedOptions = filteredItems.map(item => ({
      label: item.name,
      value: item.id,
    }));

    const selectedItem = filteredItems.find(item => item.id === selectedOptions[selectedIndex]?.value);    

    return (
      <Box flexDirection="column" padding={2} borderStyle="round" borderColor="cyan">
        <Text bold color={titleColor}>{title} - Consumables</Text>
        <Newline />
        <Text dimColor>← → to switch | ↑ ↓ to navigate | Enter to use | ESC to close</Text>
        <Newline />
        {selectedItem && (
          <>
            <Text>Item Description</Text>
            <Text dimColor>▶ {selectedItem.description}</Text>
            <Newline />
          </>
        )}

        {filteredItems.length === 0 ? (
          <Text color="red">No consumable items available.</Text>
        ) : (
          <Select 
            options={selectedOptions}
            onChange={newValue => {
            }}
          />
        )}
      </Box>
    );
  } 
  else if (selectedFilter === 'Armors') {
    const filteredItems = items.filter((item): item is Armor => item.type === ItemType.Armor);    
    
    const selectedOptions = filteredItems.map(item => ({
      label: item.name,
      value: item.id,
    }));

    const selectedItem = filteredItems.find(item => item.id === selectedOptions[selectedIndex]?.value);    
    return (
      <Box flexDirection="column" padding={2} borderStyle="round" borderColor="cyan">
        <Text bold color={titleColor}>{title} - Armors</Text>
        <Newline />
        <Text dimColor>← → to switch | ↑ ↓ to navigate | Enter to use | ESC to close</Text>
        <Newline />
        {selectedItem && (
          <>
            <Text>Item Description</Text>
            <Text dimColor>▶ {selectedItem.description}</Text>
            <Text dimColor color={'blue'}>▶ Defense: {selectedItem.defense}</Text>
            <Newline />
          </>
        )}

        {filteredItems.length === 0 ? (
          <Text color="red">No equipment items available.</Text>
        ) : (
          <Select 
            options={selectedOptions}
            onChange={newValue => {
            }}
          />
        )}
      </Box>
    );
  }
  else if (selectedFilter === 'Weapons') {
    const filteredItems = items.filter((item): item is Weapon => item.type === ItemType.Weapon);

    const selectedOptions = filteredItems.map(item => ({
      label: item.name,
      value: item.id,
    }));

    const selectedItem = filteredItems.find(item => item.id === selectedOptions[selectedIndex]?.value);    
    
    return (
      <Box flexDirection="column" padding={2} borderStyle="round" borderColor="cyan">
        <Text bold color={titleColor}>{title} - Weapon</Text>
        <Newline />
        <Text dimColor>← → to switch | ↑ ↓ to navigate | Enter to use | ESC to close</Text>
        <Newline />
        {selectedItem && (
          <>
            <Text>Weapon Description</Text>
            <Text dimColor>▶ {selectedItem.description}</Text>
            <Text dimColor color={'red'}>▶ Damage: {selectedItem.damage}</Text>
            <Newline />
          </>
        )}

        {filteredItems.length === 0 ? (
          <Text color="red">No equipment items available.</Text>
        ) : (
          <Select 
            options={selectedOptions}
            onChange={newValue => {
            }}
          />
        )}
      </Box>
    );
  }
  else if (selectedFilter === 'Materials') {
    const filteredItems = items.filter((item): item is Material => item.type === ItemType.Material);
    
    const selectedOptions = filteredItems.map(item => ({
      label: item.name,
      value: item.id,
    }));

    const selectedItem = filteredItems.find(item => item.id === selectedOptions[selectedIndex]?.value);    
    return (
      <Box flexDirection="column" padding={2} borderStyle="round" borderColor="cyan">
        <Text bold color={titleColor}>{title} - Material</Text>
        <Newline />
        <Text dimColor>← → to switch | ↑ ↓ to navigate | Enter to use | ESC to close</Text>
        <Newline />
        {selectedItem && (
          <>
            <Text>Material Description</Text>
            <Text dimColor>▶ {selectedItem.description}</Text>
            <Newline />
          </>
        )}

        {filteredItems.length === 0 ? (
          <Text color="red">No material items available.</Text>
        ) : (
          <Select 
            options={selectedOptions}
            onChange={newValue => {
            }}
          />
        )}
      </Box>
    );
  }
}

export function renderInventory() {
  render(
    <Inventory 
      title="Inventory"
      items={getItemById()}
      onUseItem={(itemId) => {
        console.log(`Used item: ${itemId}`);
      }}
      onClose={() => {
        console.log('Inventory closed');
      }}
    />
  );
}

function getItemById() {
  let playerItems: ItemBase[] = []

  for (const itemId in player.inventory) {
    const item = itemRegistry[itemId]!;
    playerItems.push(item);
  }

  return playerItems;
}