import { useState } from 'react';
import { Box, Text, Newline, useInput } from 'ink';
import type { NameSelectionProps } from '../index.js';
import { TextInput } from '@inkjs/ui';
import { titleCase } from '../../../config/globalFunctions.js';

export const NameSelection = ({ onSubmit, onCancel }: NameSelectionProps) => {
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastSubmittedValue, setLastSubmittedValue] = useState<string | null>(null);

  const validateName = (input: string): string | null => {
    const normalized = input
      .trim()
      .replace(/\s+/g, ' ');
    
    if (normalized === '') {
      return 'An empty name? Bold choice. Also… invalid.';
    }

    if (!/^[a-zA-Z ]+$/.test(normalized)) {
      return "This is a name, not a password.";
    }

    if (normalized.length < 2) {
      return 'Not even during the debugging did I see anyone so lazy.';
    }

    if (!/[a-zA-Z]{2}/.test(normalized)) {
      return 'Those letters seem… socially distant.';
    }

    const lettersOnly = normalized.replace(/\s+/g, '');

    if (lettersOnly.length > 17) {
      return 'That name needs its own scroll.';
    }

    if (
      normalized.toLowerCase() === 'narrator' ||
      normalized.toLowerCase() === 'story teller'
    ) {
      return "Nice try. I’m already doing that job.";
    }

    return null;
  };
  
  useInput((_, key) => {
    if (key.escape || key.backspace) {
      onCancel?.();
    }
  });


  return (
    <Box flexDirection="column" padding={2} borderStyle="round" borderColor="cyan">
      <Text bold color="magenta">NAME SELECTION</Text>

      <Newline />

      <TextInput
        placeholder="Type here"
        onChange={(value) => {
          setName(value);
          if (errorMessage && value !== lastSubmittedValue) {
            setErrorMessage(null);
          }
        }}
        onSubmit={() => {
          const error = validateName(name);

          if (error) {
            setLastSubmittedValue(name);
            setErrorMessage(error);
            return;
          }

          onSubmit(titleCase(name.trim()));
        }}
      />
      {errorMessage && (
        <>
          <Newline />
          <Text color={'red'}>{errorMessage}</Text>
        </>
      )}
    </Box>
  );
};

