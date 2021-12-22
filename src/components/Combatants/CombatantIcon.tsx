import { MoodBad, Person, AccessibilityNew } from "@mui/icons-material";

const CombatantIcon = ({
  size,
  combatActorType,
}: {
  size: "small" | "inherit" | "large" | "medium" | undefined;
  combatActorType: string;
}) => {
  return combatActorType === "PC" ? (
    <Person color="action" fontSize={size} />
  ) : combatActorType === "NPC" ? (
    <AccessibilityNew color="action" fontSize={size} />
  ) : (
    <MoodBad color="action" fontSize={size} />
  );
};

export default CombatantIcon;
