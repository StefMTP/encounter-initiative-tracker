import { colors } from "../types";

export const colorTable: colors = {
  Default: {
    primary: "",
    secondary: "",
  },
  Magenta: {
    primary: "#C20BC2",
    secondary: "#da6cda",
  },
  Maple: {
    primary: "#BD852B",
    secondary: "#d7b57f",
  },
  Lime: {
    primary: "#00ff00",
    secondary: "#99ff99",
  },
  Crimson: {
    primary: "#9a0e2a",
    secondary: "#e65a76",
  },
  Sea: {
    primary: "#0048ba",
    secondary: "#4c7ece",
  },
  Lemon: {
    primary: "#ffff00",
    secondary: "#ffff7f",
  },
};

export const primaryColors: string[] = Object.values(colorTable).map(
  (color) => color.primary
);
export const secondaryColors: string[] = Object.values(colorTable).map(
  (color) => color.secondary
);
