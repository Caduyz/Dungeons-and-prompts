import { useState } from 'react';
import { Box, Text, Newline, useInput, Static, render } from 'ink';
import type { VerticalMenuProps } from '../types/index.js';
import { Alert, Select } from '@inkjs/ui';

enum ItemType {
  Consumable = 'Consumable',
  Equipment = 'Equipment',
}

type Item = {
  id: string;
  type: ItemType;
  name: string;
  description: string;
}

const GameItems: Item[] = [ // Only for testing purposes
  {id: 'health-potion', type: ItemType.Consumable, name: 'Health Potion', description: 'A simple health potion.'},
  {id: 'mana-potion', type: ItemType.Consumable, name: 'Mana Potion', description: 'A simple mana potion.'},
  {id: 'fallen-star', type: ItemType.Consumable, name: 'Fallen Star', description: 'A fallen star from the sky.'},
  {id: 'long-sword', type: ItemType.Equipment, name: 'Long Sword', description: 'A sturdy long sword.'},
  {id: 'iron-helmet', type: ItemType.Equipment, name: 'Iron Helmet', description: 'A basic iron helmet.'}
]

type InventoyProps = {
  title: string;
  titleColor?: string; // default: 'yellow'
  items: Item[];
  onUseItem: (itemId: string) => void;
  onClose: () => void;
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
  const [selectedFilter, setSelectedFilter] = useState<'Consumables' | 'Equipment'>('Consumables');

  // Don't worry, this isn't definitive, I'll polish it later.
  let filteredItems: Item[] = [];

  if (selectedFilter === 'Consumables') {
    filteredItems = items.filter(item => item.type === ItemType.Consumable);
  }

  else if (selectedFilter === 'Equipment') {
    filteredItems = items.filter(item => item.type === ItemType.Equipment);
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
      if (selectedFilter === 'Equipment') {
        setSelectedFilter('Consumables');
        setSelectedIndex(0);
      }
      else {
        return;
      }
    }
    if (key.rightArrow) {
      if (selectedFilter === 'Consumables') {
        setSelectedFilter('Equipment');
        setSelectedIndex(0);
      }
      else {
        return;
      }    
    }
  });

  if (selectedFilter === 'Consumables') {
    const selectedItem = filteredItems.find(item => item.id === selectedOptions[selectedIndex]?.value);

    return (
      <Box flexDirection="column" padding={2} borderStyle="round" borderColor="cyan">
        <Text bold color={titleColor}>{title} - Consumables</Text>
        <Newline />
        <Text dimColor>← → to switch | ↑ ↓ to navigate | Enter to use | ESC to close</Text>
        <Newline />
        <Text>Item Description</Text>
        <Text dimColor>▶ {selectedItem!.description}</Text>
        <Newline />

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
  } else {
    const filteredItems = items.filter(item => item.type === ItemType.Equipment);
    
    const selectedOptions = filteredItems.map(item => ({
      label: item.name,
      value: item.id,
    }));

    const selectedItem = filteredItems.find(item => item.id === selectedOptions[selectedIndex]?.value);
    return (
      <Box flexDirection="column" padding={2} borderStyle="round" borderColor="cyan">
        <Text bold color={titleColor}>{title} - Equipment</Text>
        <Newline />
        <Text dimColor>← → to switch | ↑ ↓ to navigate | Enter to use | ESC to close</Text>
        <Newline />
        <Text>Item Description</Text>
        <Text dimColor>▶ {selectedItem!.description}</Text>
        <Newline />

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
}

render(
  <Inventory 
    title="Inventory"
    items={GameItems}
    onUseItem={(itemId) => {
      console.log(`Used item: ${itemId}`);
    }}
    onClose={() => {
      console.log('Inventory closed');
    }}
  />
);