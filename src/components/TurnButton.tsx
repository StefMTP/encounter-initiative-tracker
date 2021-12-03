import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Button } from "@mui/material";

const TurnButton = ({
  label,
  variant,
  color,
  turnChangeHandler,
}: {
  label: string;
  variant: "outlined" | "text" | "contained";
  color:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  turnChangeHandler: () => void;
}) => {
  return (
    <Button
      startIcon={label === "Previous turn" ? <ArrowBack /> : null}
      endIcon={label === "Next turn" ? <ArrowForward /> : null}
      variant={variant}
      color={color}
      onClick={turnChangeHandler}
    >
      {label}
    </Button>
  );
};

export default TurnButton;
