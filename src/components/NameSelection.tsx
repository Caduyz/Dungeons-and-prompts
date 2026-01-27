import { useState } from 'react';
import { Box, Text, Newline, useInput } from 'ink';
import { TextInput } from '@inkjs/ui';

type NameSelectionProps = {
  onSubmit: (name: string) => void;
  onCancel: () => void;
};

export const NameSelection = ({ onSubmit, onCancel }: NameSelectionProps) => {
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastSubmittedValue, setLastSubmittedValue] = useState<string | null>(null);

  const validateName = (input: string): string | null => {
    const normalized = input
      .trim()
      .replace(/\s+/g, ' ');

    if (!/^[a-zA-Z ]+$/.test(normalized)) {
      return "This is a name, not a password.";
    }

    if (normalized === '') {
      return 'An empty name? Bold choice. Also… invalid.';
    }

    if (!/[a-zA-Z]{2}/.test(normalized)) {
      return 'Those letters seem… socially distant.';
    }

    const lettersOnly = normalized.replace(/\s+/g, '');

    if (lettersOnly.length > 14) {
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
    if (key.escape) {
      onCancel?.();
    }
  });


  return (
    <Box flexDirection="column" padding={2} borderStyle="round" borderColor="cyan">
      <Text bold color="magenta">
        Name Selection
      </Text>

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

          onSubmit(name.trim());
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