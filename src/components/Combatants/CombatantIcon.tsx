import { AccessibilityNew } from "@mui/icons-material";
import DefaultEnemy from "../Structure/Icons/CombatantIcons/DefaultEnemy";
import DefaultParty from "../Structure/Icons/CombatantIcons/DefaultParty";

const CombatantIcon = ({
  size,
  combatActorType,
}: {
  size: "small" | "inherit" | "large" | "medium" | undefined;
  combatActorType: string;
}) => {
  return combatActorType === "PC" ? (
    <DefaultParty size={size} />
  ) : combatActorType === "NPC" ? (
    <AccessibilityNew color="action" fontSize={size} />
  ) : (
    <DefaultEnemy size={size} />
  );
};

export default CombatantIcon;
