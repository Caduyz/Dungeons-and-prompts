import { useState } from 'react';
import { render, Box, Text, Newline, useInput, useApp } from 'ink';
import type { VerticalMenuProps } from '../types/menus.js';

export function VerticalMenu(props: VerticalMenuProps) {
  const {
    title,
    titleColor = 'magenta',
    options,
    initialIndex = 0,
    indicator = '➤',
    highlightColor = 'yellow',
    loop = false,
    onSelect,
    onCancel,
  } = props;

  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const { exit } = useApp();

  useInput((input, key) => {
    if (key.upArrow) {
      if (loop) {
        setSelectedIndex((prev) => (prev === 0 ? options.length - 1 : prev - 1));
      }
      else {
        setSelectedIndex((prev) => Math.max(0, prev - 1));
      }
    }

    if (key.downArrow) {
      if (loop) {
        setSelectedIndex((prev) => (prev === options.length - 1 ? 0 : prev + 1));
      }
      else {
        setSelectedIndex((prev) => Math.min(options.length - 1, prev + 1));
      }
    }

    if (key.return) {
      if (!options[selectedIndex]) return;
      console.log(`Selected: ${options[selectedIndex].title}`);

      if (options[selectedIndex].id === 'exit') {
        exit();
      }
    }

    if (key.escape) {
      exit();
    }
  });

  return (
    <Box flexDirection="column" padding={2} borderStyle="round" borderColor="cyan">
      <Text bold color={titleColor}>
        {title}
      </Text>
      
      <Newline />
      
      <Text dimColor>Use ↑ ↓ to navigate | Enter to select | ESC to exit</Text>
      
      <Newline count={2} />

      {options.map((option, index) => (
        <Text
          key={option.id}
          color={index === selectedIndex ? highlightColor : 'white'}
          bold={index === selectedIndex}
        >
          {index === selectedIndex ? `${indicator} ` : '  '}{option.title}
        </Text>
      ))}

      <Newline count={2} />
    </Box>
  );
}

export function renderMenu(menu: VerticalMenuProps) {
  const chosenMenu = menu;

  render(
    <VerticalMenu {...chosenMenu} />
  );
}