export type MenuOption = {
  title: string;
  id: string;
  description?: string;
};

export type VerticalMenuProps = {
  title: string;
  titleColor?: string; // Is magenta by default
  menuOptions: MenuOption[];
  onSelect?: (option: MenuOption) => void;
  onCancel?: () => void;
}