import type { ScreenId } from "../../ui/index.js";

export type MenuOption = {
  title: string;
  id: string;
  description?: string;
};

export type MainMenuProps = {
  goTo: (screen: ScreenId) => void;
  exit: () => void;
};

export type VerticalMenuProps = {
  title: string;
  titleColor?: string; // Is magenta by default
  menuOptions: MenuOption[];
  onSelect?: (option: MenuOption) => void;
  onCancel?: () => void;
}

export type NameSelectionProps = {
  onSubmit: (name: string) => void;
  onCancel: () => void;
};

export type CharProfileProps = {
  onSubmit: () => void;
  onCancel: () => void;
};