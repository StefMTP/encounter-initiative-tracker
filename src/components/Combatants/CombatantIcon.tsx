import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import { MoodBad } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";

const CombatantIcon = ({
  size,
  combatActorType,
}: {
  size: "small" | "inherit" | "large" | "medium" | undefined;
  combatActorType: string;
}) => {
  return combatActorType === "PC" ? (
    <PersonIcon color="action" fontSize={size} />
  ) : combatActorType === "NPC" ? (
    <AccessibilityNewIcon color="action" fontSize={size} />
  ) : (
    <MoodBad color="action" fontSize={size} />
  );
};

export default CombatantIcon;
