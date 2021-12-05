import { Badge, Grid, Typography } from "@mui/material";
import ConditionDialog from "./ConditionDialog";
import { combatant } from "../../types";
import { useState } from "react";

const RoundTimelineLabel = ({
  combatActor,
  turnNumber,
  index,
  color,
}: {
  combatActor: combatant;
  turnNumber: number;
  index: number;
  color: (
    index: number,
    turnNumber: number,
    combatActor: combatant,
    value: string,
    isText?: boolean | undefined
  ) => string;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleConditionDialogClose = () => {
    setIsDialogOpen(!isDialogOpen);
  };
  return (
    <>
      <Badge
        invisible={
          !combatActor.conditions || combatActor.conditions.length <= 0
        }
        badgeContent={
          combatActor.conditions
            ? combatActor.conditions.length > 1
              ? combatActor.conditions[0] + "..."
              : combatActor.conditions[0]
            : null
        }
        color="info"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: combatActor.alignment === "PARTY" ? "left" : "right",
        }}
        onClick={handleConditionDialogClose}
      >
        <Grid
          item
          sx={{
            border:
              !combatActor.conditions || combatActor.conditions.length <= 0
                ? 0
                : 1,
            borderColor: color(index, turnNumber, combatActor, "#c4c4c4", true),
            padding: "3px 15px",
            borderRadius: "7px",
          }}
        >
          <Typography
            variant="h6"
            color={color(index, turnNumber, combatActor, "text.primary", true)}
          >
            {combatActor.name}
          </Typography>
          <Typography
            color={color(
              index,
              turnNumber,
              combatActor,
              "text.secondary",
              true
            )}
          >
            {combatActor.class}
          </Typography>
        </Grid>
      </Badge>
      <ConditionDialog
        open={isDialogOpen}
        closeHandler={handleConditionDialogClose}
        conditions={combatActor.conditions}
      />
    </>
  );
};

export default RoundTimelineLabel;
