import { useState } from 'react';
import { Box, Text, Newline } from 'ink';
import { TextInput } from '@inkjs/ui';

export const NameSelection = ({ onSubmit }: { onSubmit: (name: string) => void }) => {
  const [name, setName] = useState('');

  const validateName = (input: string) => {
    if (input.length < 2) {
      return 'Too short';
    }

    if (!/^[a-zA-Z]+$/.test(input)) {
      return 'Invalid characters';
    }

    if (input.length > 14) {
      return 'Too long';
    }

    return null;
  };

  return (
    <Box flexDirection="column" padding={2} borderStyle="round" borderColor="cyan">
      <Text bold color="magenta">
        Name Selection
      </Text>

      <Newline />

      <TextInput
        placeholder="Type here"
        onChange={setName}
        onSubmit={() => onSubmit(name)}
      />
    </Box>
  );
};
