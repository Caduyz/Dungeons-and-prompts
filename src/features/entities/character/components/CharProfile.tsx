import { Box, Text, Newline, useInput } from 'ink';
import { game } from '../../../../main.js';
import type { CharProfileProps } from '../../../menus/index.js';

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
        <Text bold>{game.player.name}</Text>
        <Text bold color={'red'}>Health: [{formatNumber(game.player.vital.currentHP)} / {formatNumber(game.player.vital.maxHP)}]</Text>
        <Text bold color={'blue'}>Mana: [{formatNumber(game.player.vital.currentMP)} / {formatNumber(game.player.vital.maxMP)}]</Text>
        
        <Newline />
        <Text color={'yellow'}>Class: {game.player.class.name}</Text>
        <Text color={'yellow'}>Level: {game.player.levelInfo.level} ({formatNumber(game.player.levelInfo.experience)} / {formatNumber(game.player.levelInfo.requiredExperience)})</Text>
        <Text color={'yellow'}>Coins: {formatNumber(game.player.coins)}</Text>
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
        <Text>STR: {game.player.attributes.STR}</Text>
        <Text>INT: {game.player.attributes.INT}</Text>
        <Text>DEX: {game.player.attributes.DEX}</Text>
        <Text>WIS: {game.player.attributes.WIS}</Text>
        <Text>VIT: {game.player.attributes.VIT}</Text>
        <Newline />
        <Text dimColor color={'yellow'}>Unused Points: {game.player.statPoints}</Text>

      </Box>

      <Box 
        flexDirection="column"
        flexGrow={1}
        borderStyle="round"
        borderColor="yellow"
        padding={2}
      >
        <Text bold color={'cyan'}>EQUIPMENT</Text>
        <Text>Head: {renderSlot(game.player.armory.head)}</Text>
        <Text>Chest: {renderSlot(game.player.armory.chest)}</Text>
        <Text>Legs: {renderSlot(game.player.armory.legs)}</Text>
        <Text>Hands: {renderSlot(game.player.armory.hands)}</Text>
        <Text>Feet: {renderSlot(game.player.armory.feet)}</Text>

      </Box>
    </Box>
  );
}
