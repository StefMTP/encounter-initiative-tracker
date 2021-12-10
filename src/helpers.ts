import { colorTable, combatant } from "./types";

export const sortPlayerActors = (combatants: combatant[]) => {
  return combatants.sort((a, b) =>
    b.initiative - a.initiative === 0
      ? b.alignment === "PARTY"
        ? +1
        : -1
      : b.initiative - a.initiative
  );
};

export const color = (
  index: number,
  turnNumber: number,
  combatActor: combatant,
  value: string,
  isText?: boolean
) => {
  return index === turnNumber
    ? combatActor.color
      ? !!isText
        ? combatActor.color.secondary
        : combatActor.color.primary
      : combatActor.alignment === "PARTY"
      ? "success.main"
      : "error.main"
    : value;
};
