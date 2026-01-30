import { player } from '../components/App.js'
import { Box, Text, Newline, useInput } from 'ink';

type CharProfileProps = {
  onSubmit: () => void;
  onCancel: () => void;
};

const renderSlot = (item: { name: string; defense: number } | null) =>
  item ? `${item.name} [+${item.defense} DEF]` : 'None';

const formatNumber = (value: number) =>
  new Intl.NumberFormat('en-US').format(value);

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
        <Text bold color={'red'}>Health: [{formatNumber(player.vital.currentHP)} / {formatNumber(player.vital.maxHP)}]</Text>
        <Text bold color={'blue'}>Mana: [{formatNumber(player.vital.currentMP)} / {formatNumber(player.vital.maxMP)}]</Text>
        
        <Newline />
        <Text color={'yellow'}>Class: {player.class.name}</Text>
        <Text color={'yellow'}>Level: {player.levelInfo.level} ({formatNumber(player.levelInfo.experience)} / {formatNumber(player.levelInfo.requiredExperience)})</Text>
        <Text color={'yellow'}>Coins: {formatNumber(player.coins)}</Text>
        <Newline />
        <Text color={'red'}>Mobs Killed: Undone</Text>
        <Text color={'red'}>Deaths: Undone</Text>
        <Text color={'red'}>Total Exp Gained: Undone</Text>
        <Text color={'red'}>Total Coins Gained: Undone</Text>


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
        <Newline />
        <Text dimColor color={'yellow'}>Unused Points: {player.statPoints}</Text>

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
