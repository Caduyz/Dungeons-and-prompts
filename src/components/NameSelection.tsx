import { useState } from 'react';
import { Box, Text, Newline } from 'ink';
import { TextInput } from '@inkjs/ui';

export const NameSelection = ({ onSubmit }: { onSubmit: (name: string) => void }) => {
  const [name, setName] = useState('');

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
