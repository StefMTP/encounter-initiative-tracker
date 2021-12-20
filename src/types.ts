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

export const isColor = (item: any): boolean => {
  return (
    typeof item === "object" &&
    "primary" in item &&
    typeof item.primary === "string" &&
    primaryColors.includes(item.primary) &&
    "secondary" in item &&
    typeof item.secondary === "string" &&
    secondaryColors.includes(item.secondary)
  );
};

export const isCombatant = (item: any): boolean => {
  if ("maxHp" in item && !("currentHp" in item)) {
    return false;
  }
  if ("currentHp" in item && !("maxHp" in item)) {
    return false;
  }
  if (
    ("maxHp" in item && typeof item.maxHp !== "number") ||
    ("currentHp" in item && typeof item.currentHp !== "number") ||
    item.currentHp > item.maxHp ||
    ("class" in item && typeof item.class !== "string") ||
    ("color" in item && !isColor(item.color))
  ) {
    return false;
  }
  return (
    "id" in item &&
    typeof item.id === "string" &&
    "name" in item &&
    typeof item.name === "string" &&
    "alignment" in item &&
    (item.alignment === "PARTY" || item.alignment === "FOE") &&
    "initiative" in item &&
    typeof item.initiative === "number"
  );
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

export const primaryColors: string[] = Object.values(colorTable).map(
  (color) => color.primary
);
export const secondaryColors: string[] = Object.values(colorTable).map(
  (color) => color.secondary
);

export const conditionsTable: { [condition: string]: string } = {
  Blinded: `
    <p>A blinded creature can’t see and automatically fails any ability check that requires sight.</p>
    <p>Attack rolls against the creature have advantage, and the creature’s Attack rolls have disadvantage.</p>
  `,
  Deafened: `A deafened creature can’t hear and automatically fails any ability check that requires hearing.`,
  Charmed: `<p>A charmed creature can’t Attack the charmer or target the charmer with harmful Abilities or magical Effects.</p>
  <p>The charmer has advantage on any ability check to interact socially with the creature.</p>`,
  Frightened: `
    <p>A frightened creature has disadvantage on Ability Checks and Attack rolls while the source of its fear is within Line of Sight.</p>
    <p>The creature can’t willingly move closer to the source of its fear.</p>
  `,
  Grappled: `
    <p>A grappled creature’s speed becomes 0, and it can’t benefit from any bonus to its speed.</p>
    <p>The condition ends if the Grappler is incapacitated (see the condition).</p>
    <p>The condition also ends if an Effect removes the grappled creature from the reach of the Grappler or Grappling Effect, such as when a creature is hurled away by the Thunderwave spell.</p>
  `,
  Incapacitated: `An incapacitated creature can’t take Actions or Reactions.`,
  Invisible: `
    <p>An invisible creature is impossible to see without the aid of magic or a Special sense. For the Purpose of Hiding, the creature is heavily obscured. The creature’s Location can be detected by any noise it makes or any tracks it leaves.</p>
    <p>Attack rolls against the creature have disadvantage, and the creature’s Attack rolls have advantage.</p>
  `,
  Paralyzed: `
    <p>A paralyzed creature is incapacitated (see the condition) and can’t move or speak.</p>
    <p>The creature automatically fails Strength and Dexterity Saving Throws.</p>
    <p>Attack rolls against the creature have advantage.</p>
   <p>Any Attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature.</p>
  `,
  Petrified: `
    <p>A petrified creature is transformed, along with any nonmagical object it is wearing or carrying, into a solid inanimate substance (usually stone). Its weight increases by a factor of ten, and it ceases aging.</p>
    <p>The creature is incapacitated (see the condition), can’t move or speak, and is unaware of its surroundings.</p>
    <p>Attack rolls against the creature have advantage.</p>
    <p>The creature automatically fails Strength and Dexterity Saving Throws.</p>
    <p>The creature has Resistance to all damage.</p>
    <p>The creature is immune to poison and disease, although a poison or disease already in its system is suspended, not neutralized.</p>
  `,
  Poisoned:
    "A poisoned creature has disadvantage on Attack rolls and Ability Checks.",
  Prone: `
    <p>A prone creature’s only Movement option is to crawl, unless it stands up and thereby ends the condition.
    The creature has disadvantage on Attack rolls.</p>
    <p>An Attack roll against the creature has advantage if the attacker is within 5 feet of the creature. Otherwise, the Attack roll has disadvantage.</p>
  `,
  Restrained: `
    <p>A restrained creature’s speed becomes 0, and it can’t benefit from any bonus to its speed.</p>
    <p>Attack rolls against the creature have advantage, and the creature’s Attack rolls have disadvantage.</p>
    <p>The creature has disadvantage on Dexterity Saving Throws.</p>
  `,
  Stunned: `
    <p>A stunned creature is incapacitated (see the condition), can’t move, and can speak only falteringly.</p>
    <p>The creature automatically fails Strength and Dexterity Saving Throws.</p>
    <p>Attack rolls against the creature have advantage.</p>
  `,
  Unconscious: `
    <p>An unconscious creature is incapacitated (see the condition), can’t move or speak, and is unaware of its surroundings.</p>
    <p>The creature drops whatever it’s holding and falls prone.</p>
    <p>The creature automatically fails Strength and Dexterity Saving Throws.</p>
    <p>Attack rolls against the creature have advantage.</p>
    <p>Any Attack that hits the creature is a critical hit if the attacker is within 5 feet of the creature.</p>
  `,
  Exhaustion: `
    <p>Some Special Abilities and environmental Hazards, such as starvation and the long-­term Effects of freezing or scorching temperatures, can lead to a Special condition called exhaustion. Exhaustion is measured in six levels. An Effect can give a creature one or more levels of exhaustion, as specified in the effect’s description.</p>
    
    <ul>
      <li>Level 1: Disadvantage on Ability Checks</li>
      <li>Level 2: Speed halved</li>
      <li>Level 3: Disadvantage on Attack rolls and Saving Throws</li>
      <li>Level 4: Hit point maximum halved</li>
      <li>Level 5: Speed reduced to 0</li>
      <li>Level 6: Death</li>
    </ul>
    
    <p>If an already exhausted creature suffers another Effect that causes exhaustion, its current level of exhaustion increases by the amount specified in the effect’s description.</p>
    
    <p>A creature suffers the Effect of its current level of exhaustion as well as all lower levels. For example, a creature suffering level 2 exhaustion has its speed halved and has disadvantage on Ability Checks.</p>
    
    <p>An Effect that removes exhaustion reduces its level as specified in the effect’s description, with all exhaustion Effects Ending if a creature’s exhaustion level is reduced below 1.</p>
    
    <p>Finishing a Long Rest reduces a creature’s exhaustion level by 1, provided that the creature has also ingested some food and drink.</p>
  `,
};

export type savedCombat = {
  name: string;
  savedRound: number;
  savedActors: combatant[];
  savedTurn: turn;
  savedPlayerStatuses: playerStatus[];
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
