import { AccessibilityNew } from "@mui/icons-material";
import DefaultEnemy from "../Structure/Icons/CombatantIcons/DefaultEnemy";
import DefaultParty from "../Structure/Icons/CombatantIcons/DefaultParty";
import SelectedIcon from "../Structure/Icons/CombatantIcons/SelectedIcon";

const CombatantIcon = ({
  combatActorType,
  size,
  icon,
}: {
  combatActorType: string;
  size: "small" | "inherit" | "large" | "medium" | undefined;
  icon?: string;
}) => {
  return icon ? (
    <SelectedIcon combatantIconName={icon} color="action" size={size} />
  ) : combatActorType === "PC" ? (
    <DefaultParty color="action" size={size} />
  ) : combatActorType === "NPC" ? (
    <AccessibilityNew color="action" fontSize={size} />
  ) : (
    <DefaultEnemy color="action" size={size} />
  );
};

export default CombatantIcon;
