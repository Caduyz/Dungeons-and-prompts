import { useState } from 'react';
import { Box, Text, Newline, useInput, Static } from 'ink';
import type { VerticalMenuProps } from '../types/index.js';
import { showAlert, changeAlertState } from '../controllers/GameState.js';
import { Alert } from '@inkjs/ui';

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
  const [state, setState] = useState<boolean>(false);
  
  useInput((_, key) => {
    if (key.upArrow) {
      setSelectedIndex(prev =>
        loop ? (prev === 0 ? options.length - 1 : prev - 1)
             : Math.max(0, prev - 1)
      );
    }

    if (key.downArrow) {
      setSelectedIndex(prev =>
        loop ? (prev === options.length - 1 ? 0 : prev + 1)
             : Math.min(options.length - 1, prev + 1)
      );
    }

    if (key.return) {
      const option = options[selectedIndex];
      option && onSelect?.(option);
    }

    if (key.escape) {
      onCancel?.();
    }
  });

  return (
    <Box flexDirection="column" padding={2} borderStyle="round" borderColor="cyan">
      <Text bold color={titleColor}>{title}</Text>
      <Newline />
      <Text dimColor>↑ ↓ Enter | ESC</Text>
      <Newline count={2} />

      {options.map((option, index) => (
        <Text
          key={option.id}
          bold={index === selectedIndex}
          color={index === selectedIndex ? highlightColor : 'white'}
        >
          {index === selectedIndex ? `${indicator} ` : '  '}
          {option.title}
        </Text> 
      ))}

      {showAlert && (
        <Alert variant='success' title='Character Created'>
          <Text>Character created successfully!</Text>
        </Alert>
      )}
    </Box>
  );
}
