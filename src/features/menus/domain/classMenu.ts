import { CLASSES } from "../../entities/index.js";
import { type VerticalMenuProps } from "../index.js";

const classOptions = CLASSES.map((charClass) => ({
  title: charClass.name,
  id: charClass.id,
  description: charClass.description,
}));

export const classSelectionMenu: VerticalMenuProps = {
  title: 'CLASS SELECTION',
  titleColor: 'magenta',
  menuOptions: classOptions,
};