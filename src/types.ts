export type combatantAlignment = "PARTY" | "FOE";
export type combatantType = "PC" | "NPC" | "ENEMY";

export type color = {
  primary: string;
  secondary: string;
};
export type colors = {
  [label: string]: color;
};

export type combatant = {
  id: string;
  name: string;
  initiative: number;
  alignment: combatantAlignment;
  type: combatantType;
  race?: string;
  class?: string;
  color?: color;
  currentHp?: number;
  maxHp?: number;
  movementSpd?: number;
  conditions?: string[];
  concentration?: string;
  icon?: string;
};

export type turn = {
  number: number;
  actorPlaying: combatant;
};

export type playerStatus = {
  id: string;
  name: string;
  status: string;
  duration: number;
};

export type savedCombat = {
  id: string;
  name: string;
  savedRound: number;
  savedActors: combatant[];
  savedTurn: turn;
  savedPlayerStatuses: playerStatus[];
};
