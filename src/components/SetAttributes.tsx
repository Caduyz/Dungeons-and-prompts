import { useState, useEffect } from 'react';
import { Box, Text, Newline, useInput } from 'ink';
import type { Attributes } from '../types/index.js';

type AttributesMenuProps = {
  onSubmit: () => void,
  onCancel: () => void,
  attributes: Attributes
}

export function AttributesMenu({ onSubmit, onCancel, attributes }: AttributesMenuProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [localAttributes, setLocalAttributes] = useState<Attributes>({ ...attributes });

  const entries = Object.entries(localAttributes) as [keyof Attributes, number][];

  useInput((_, key) => {
    if (key.escape || key.backspace) {
      onCancel?.();
    }

    if (key.return) {
      onSubmit();
    }

    if (key.upArrow) {
      setSelectedIndex(i => Math.max(0, i - 1));
    }

    if (key.downArrow) {
      setSelectedIndex(i => Math.min(entries.length - 1, i + 1));
    }

    if (key.rightArrow) {
      const entry = entries[selectedIndex];
      if (!entry) return;

      const [attr] = entry;
      setLocalAttributes(prev => ({
        ...prev,
        [attr]: prev[attr] + 1
      }));
    }

    if (key.leftArrow) {
      const entry = entries[selectedIndex];
      if (!entry) return;

      const [attr] = entry;

      const baseValue = attributes[attr];
      const currentValue = localAttributes[attr];

      if (currentValue > baseValue) {
        setLocalAttributes(prev => ({
          ...prev,
          [attr]: prev[attr] - 1
        }));
      }
    }
  });

  return (
    <Box flexDirection="column" padding={2} borderStyle="round" borderColor="cyan">
      <Text bold color={'red'}>ATTRIBUTES</Text>
      <Newline />
      <Text dimColor>⮃ | ⮂ | Enter | ESC</Text>
      <Newline count={2} />

      {entries.map(([key, value], index) => {
        const isSelected = index === selectedIndex;

        const baseValue = attributes[key];
        const diff = value - baseValue;

        return (
          <Text key={key} color={isSelected ? 'cyan' : 'white'}>
            {isSelected ? '❯ ' : '  '}
            {key}: {value}
            {diff > 0 && (
              <Text color="green"> (+{diff})</Text>
            )}
          </Text>
        );
      })}
    </Box>
  );
}