import {
  AcUnit,
  Bedtime,
  Bolt,
  Casino,
  Colorize,
  Diamond,
  Favorite,
  LightMode,
  LocalFireDepartment,
  SelfImprovement,
  Shield,
  SportsMartialArts,
  Star,
  Visibility,
} from "@mui/icons-material";

const SelectedIcon = ({
  combatantIconName,
  size,
  color,
}: {
  combatantIconName: string;
  size: "small" | "inherit" | "large" | "medium" | undefined;
  color:
    | "inherit"
    | "disabled"
    | "action"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | undefined;
}) => {
  switch (combatantIconName) {
    case "Dice":
      return <Casino fontSize={size} color={color} />;
    case "Shield":
      return <Shield fontSize={size} color={color} />;
    case "Sword":
      return <Colorize fontSize={size} color={color} />;
    case "Sun":
      return <LightMode fontSize={size} color={color} />;
    case "Moon":
      return <Bedtime fontSize={size} color={color} />;
    case "Star":
      return <Star fontSize={size} color={color} />;
    case "Fire":
      return <LocalFireDepartment fontSize={size} color={color} />;
    case "Thunder":
      return <Bolt fontSize={size} color={color} />;
    case "Ice":
      return <AcUnit fontSize={size} color={color} />;
    case "Heart":
      return <Favorite fontSize={size} color={color} />;
    case "Diamond":
      return <Diamond fontSize={size} color={color} />;
    case "Eye":
      return <Visibility fontSize={size} color={color} />;
    case "Meditation":
      return <SelfImprovement fontSize={size} color={color} />;
    case "Martial":
      return <SportsMartialArts fontSize={size} color={color} />;
    default:
      return null;
  }
};

export default SelectedIcon;
