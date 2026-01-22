export type MenuOption = {
  title: string;
  id: string | number;
  description?: string;
}

export type VerticalMenuProps = {
  title: string;
  titleColor?: string; // Is magenta by default
  options: MenuOption[];
  initialIndex?: number;  // Starts at 0 if not provided
  indicator?: string; // Is ➤ by default
  highlightColor?: string; // Is yellow by default
  loop?: boolean; // If true, navigation loops around the menu (0 => last and last => 0)
  onSelect?: () => void; // Placeholder for future functionality
  onCancel?: () => void; // Placeholder for future functionality
}