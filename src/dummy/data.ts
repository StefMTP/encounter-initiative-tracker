export type combatantAlignment = "PARTY" | "FOE";
export type combatantType = "PC" | "NPC" | "ENEMY";

export type combatant = {
  id: number;
  name: string;
  currentHp?: number;
  maxHp?: number;
  class?: string;
  alignment: combatantAlignment;
  color?: color;
  type: combatantType;
  initiative: number;
};

export type turn = {
  number: number;
  actorPlaying: combatant;
};

export type color = {
  primary: string;
  secondary: string;
};

export type colors = {
  [label: string]: color;
};

export const colorTable: colors = {
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

export const combatants: combatant[] = [
  {
    id: 1,
    name: "Talion",
    currentHp: 40,
    maxHp: 40,
    class: "Rogue",
    alignment: "PARTY",
    color: colorTable["Magenta"],
    type: "PC",
    initiative: 15,
  },
  {
    id: 2,
    name: "Violetta",
    currentHp: 22,
    maxHp: 34,
    class: "Wizard",
    alignment: "PARTY",
    color: colorTable["Lemon"],
    type: "PC",
    initiative: 12,
  },
  {
    id: 3,
    name: "Ludwic",
    class: "Barbarian",
    color: colorTable["Crimson"],
    alignment: "PARTY",
    type: "PC",
    initiative: 22,
  },
  {
    id: 4,
    name: "Zoren",
    class: "Cleric",
    color: colorTable["Maple"],
    alignment: "PARTY",
    type: "PC",
    initiative: 2,
  },
  {
    id: 5,
    name: "Black Wolf",
    class: "Creature: Animal",
    alignment: "FOE",
    type: "ENEMY",
    initiative: 10,
  },
  {
    id: 6,
    name: "Black Direwolf",
    class: "Creature: Animal",
    alignment: "FOE",
    type: "ENEMY",
    initiative: 29,
  },
  {
    id: 7,
    name: "Black Wolf",
    class: "Creature: Animal",
    alignment: "FOE",
    type: "ENEMY",
    initiative: 15,
  },
  {
    id: 8,
    name: "Goblin Warchief",
    class: "Creature: Goblinoid",
    alignment: "FOE",
    type: "ENEMY",
    initiative: 23,
  },
];

export const sortCombatants = (combatants: combatant[]) => {
  return combatants.sort((a, b) =>
    b.initiative - a.initiative === 0
      ? b.alignment === "PARTY"
        ? +1
        : -1
      : b.initiative - a.initiative
  );
};
