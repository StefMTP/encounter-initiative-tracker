export type combatantAlignment = "PARTY" | "FOE";
export type combatantType = "PC" | "NPC" | "ENEMY";

export type combatant = {
  id: string;
  name: string;
  currentHp?: number;
  maxHp?: number;
  class?: string;
  alignment: combatantAlignment;
  color?: color;
  type: combatantType;
  initiative: number;
  conditions?: string[];
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

export type playerStatus = {
  id: string;
  name: string;
  status: string;
  duration: number;
};

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

export const conditionsTable: { [condition: string]: string } = {
  Blinded: "",
  Deafened: "",
  Poisoned: "32egw234f42",
  Grappled: "",
  Prone: "fsgswerq3f",
  Invisible: "",
  Frightened: "",
  Charmed: "",
  Incapacitated: "",
  Restrained: "",
  Stunned: "",
  Paralyzed: "",
  Petrified: "",
  Exhaustion: "1232141",
  Unconscious: "",
};

export const dummyCombatants: combatant[] = [
  {
    id: "abc",
    name: "Talion",
    currentHp: 40,
    maxHp: 40,
    class: "Rogue",
    alignment: "PARTY",
    color: colorTable["Magenta"],
    type: "PC",
    initiative: 15,
    conditions: ["Poisoned"],
  },
  {
    id: "def",
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
    id: "ghi",
    name: "Ludwic",
    class: "Barbarian",
    color: colorTable["Crimson"],
    alignment: "PARTY",
    type: "PC",
    initiative: 22,
    conditions: ["Exhaustion", "Prone"],
  },
  {
    id: "jkl",
    name: "Zoren",
    class: "Cleric",
    color: colorTable["Maple"],
    alignment: "PARTY",
    type: "PC",
    initiative: 2,
  },
  {
    id: "mno",
    name: "Black Wolf",
    class: "Creature: Animal",
    alignment: "FOE",
    type: "ENEMY",
    initiative: 10,
  },
  {
    id: "pqr",
    name: "Black Direwolf",
    class: "Creature: Animal",
    alignment: "FOE",
    type: "ENEMY",
    initiative: 29,
  },
  {
    id: "stu",
    name: "Black Wolf",
    class: "Creature: Animal",
    alignment: "FOE",
    type: "ENEMY",
    initiative: 15,
  },
  {
    id: "vwx",
    name: "Goblin Warchief",
    class: "Creature: Goblinoid",
    alignment: "FOE",
    type: "ENEMY",
    initiative: 23,
  },
];

export const dummyPlayerStatuses: playerStatus[] = [
  {
    id: "agl",
    name: "Talion",
    status: "Haste",
    duration: 10,
  },
  {
    id: "qtp",
    name: "Ludwic",
    status: "Rage",
    duration: 6,
  },
  {
    id: "zcm",
    name: "Zoren",
    status: "Bless",
    duration: 8,
  },
];
