import { useState } from "react";
import { Badge, Grid, Typography } from "@mui/material";
import ConditionDialog from "./ConditionDialog";
import { combatant } from "../../../../../types";
import { color } from "../../../../../helpers";

const RoundTimelineLabel = ({
  combatActor,
  turnNumber,
  index,
}: {
  combatActor: combatant;
  turnNumber: number;
  index: number;
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
        combatActorId={combatActor.id}
        closeHandler={handleConditionDialogClose}
        conditions={combatActor.conditions}
      />
    </>
  );
};

export default RoundTimelineLabel;
