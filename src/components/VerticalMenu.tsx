import { useState, useEffect } from 'react';
import { Box, Text, Newline, useInput } from 'ink';
import { Select } from '@inkjs/ui'
import type { VerticalMenuProps, MenuOption } from '../types/index.js';

export function VerticalMenu(props: VerticalMenuProps) {
  const {
    title,
    titleColor = 'magenta',
    menuOptions,
    onSelect,
    onCancel,
  } = props;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<MenuOption | null>(
    menuOptions[0] ?? null
  );

  useEffect(() => {
    setSelectedOption(menuOptions[selectedIndex] ?? null);
  }, [selectedIndex, menuOptions]);

  useInput((_, key) => {
    if (key.escape || key.backspace) {
      onCancel?.();
    }

    if (key.return && selectedOption) {
      onSelect?.(selectedOption);
    }

    if (key.upArrow) {
      setSelectedIndex(i => Math.max(0, i - 1));
    }

    if (key.downArrow) {
      setSelectedIndex(i => Math.min(menuOptions.length - 1, i + 1));
    }
  });

  return (
    <Box flexDirection="column" padding={2} borderStyle="round" borderColor="cyan">
      <Text bold color={titleColor}>
        {title.toUpperCase()}
      </Text>

      <Newline />
      <Text dimColor>↑ ↓ Enter | ESC</Text>
      <Newline count={2} />

      <Select 
        options={menuOptions.map(option => ({
          label: option.title,
          value: option.id
      }))}
      />

      {selectedOption?.description && (
        <>
          <Newline/>
          <Text dimColor italic>  {selectedOption.description}</Text>
        </>
      )}
    </Box>
  );
}