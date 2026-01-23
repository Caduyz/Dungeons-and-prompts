import type { VerticalMenuProps } from '../types/index.js';
import { CLASSES } from '../core/entities/classes.js';

const classOptions = CLASSES.map((charClass) => ({
  title: charClass.name,
  id: charClass.id,
  description: charClass.description,
}));

export const classSelectionMenu: VerticalMenuProps = {
  title: 'Class Selection',
  titleColor: 'magenta',
  options: classOptions,
  loop: true,
};