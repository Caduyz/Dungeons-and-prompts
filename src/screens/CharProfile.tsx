import { player } from '../components/App.js'
import { Box, Text, Newline, useInput } from 'ink';

type CharProfileProps = {
  onSubmit: () => void;
  onCancel: () => void;
};

const renderSlot = (item: { name: string; defense: number } | null) =>
  item ? `${item.name} [+${item.defense} DEF]` : 'None';

export function CharProfile({ onSubmit, onCancel }: CharProfileProps) {
  useInput((_, key) => {
    if (key.return) {
      onSubmit?.();
    }

    if (key.escape) {
      onCancel?.();
    }
  });

  return (
    <Box flexDirection="row">
      <Box 
        flexDirection="column"
        flexGrow={1}
        borderStyle="round"
        borderColor="cyan"
        padding={2}>

        <Text bold color={'cyan'}>STATISTICS</Text>
        <Text bold>{player.name}</Text>
        <Newline />
        <Text>Class: {player.class.name}</Text>
        <Text>Level: {player.progression.level} ({player.progression.experience}/{player.progression.requiredExperience})</Text>
        <Text>Coins: {player.coins}</Text>
        <Newline />
        <Text>Mobs Killed: Undone</Text>
        <Text>Deaths: Undone</Text>
        <Text>Total Exp Gained: Undone</Text>
        <Text>Total Coins Gained: Undone</Text>


      </Box>

      <Box 
        flexDirection="column"
        flexGrow={1}
        borderStyle="round"
        borderColor="red"
        padding={2}
      >
        <Text bold color={'cyan'}>ATTRIBUTES</Text>
        <Text>STR: {player.attributes.STR}</Text>
        <Text>INT: {player.attributes.INT}</Text>
        <Text>DEX: {player.attributes.DEX}</Text>
        <Text>WIS: {player.attributes.WIS}</Text>
        <Text>VIT: {player.attributes.VIT}</Text>
        <Text>DEF: {player.attributes.DEF}</Text>

      </Box>

      <Box 
        flexDirection="column"
        flexGrow={1}
        borderStyle="round"
        borderColor="yellow"
        padding={2}
      >
        <Text bold color={'cyan'}>EQUIPMENT</Text>
        <Text>Head: {renderSlot(player.armory.head)}</Text>
        <Text>Chest: {renderSlot(player.armory.chest)}</Text>
        <Text>Legs: {renderSlot(player.armory.legs)}</Text>
        <Text>Hands: {renderSlot(player.armory.hands)}</Text>
        <Text>Feet: {renderSlot(player.armory.feet)}</Text>

      </Box>
    </Box>
  );
}
