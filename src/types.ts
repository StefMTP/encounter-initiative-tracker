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
