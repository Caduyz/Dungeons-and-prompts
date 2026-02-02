import { useState } from 'react';
import { Box, Text, Newline, useInput } from 'ink';
import { game } from '../../../../main.js';
import { type Attributes } from '../../index.js';

type AttributesMenuProps = {
  onSubmit: (newAttributes: Attributes) => void,
  onCancel: () => void,
  attributes: Attributes,
  statPoints: number
}

export function AttributesMenu({ onSubmit, onCancel, attributes, statPoints }: AttributesMenuProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [localAttributes, setLocalAttributes] = useState<Attributes>({ ...attributes });
  const [remainingPoints, setRemainingPoints] = useState(statPoints);

  const entries = Object.entries(localAttributes) as [keyof Attributes, number][];

  useInput((_, key) => {
    if (key.escape || key.backspace) {
      onCancel?.();
    }

    if (key.return) {
      onSubmit(localAttributes);
      game.player.statPoints = remainingPoints;
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
      if (remainingPoints <= 0) return;

      const [attr] = entry;
      setLocalAttributes(prev => ({
        ...prev,
        [attr]: prev[attr] + 1
      }));
      setRemainingPoints(prev => prev - 1);
    }

    if (key.leftArrow) {
      const entry = entries[selectedIndex];
      if (!entry) return;
      if (remainingPoints >= statPoints) return;

      const [attr] = entry;

      const baseValue = attributes[attr];
      const currentValue = localAttributes[attr];

      if (currentValue > baseValue) {
        setLocalAttributes(prev => ({
          ...prev,
          [attr]: prev[attr] - 1
        }));
        setRemainingPoints(prev => prev + 1);
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

      <Newline />
      <Text dimColor>Remaining Points: {remainingPoints}</Text>
    </Box>
  );
}