import type { ReactNode } from "react";

export type Screen = {
  id: string;
  render: () => ReactNode;
};

export type Navigator = {
  current: Screen;
  push: (screen: Screen) => void;
  pop: () => void;
};