import { useState } from "react";
import { Badge, Grid, Tooltip, Typography } from "@mui/material";
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
      >
        <Badge
          invisible={
            !combatActor.concentration ||
            combatActor.concentration.trim().length <= 0
          }
          badgeContent={
            combatActor.concentration && combatActor.concentration.length >= 15
              ? combatActor.concentration.substring(0, 15) + "..."
              : combatActor.concentration
          }
          color="secondary"
          anchorOrigin={{
            vertical: "top",
            horizontal: combatActor.alignment === "PARTY" ? "left" : "right",
          }}
        >
          <Grid
            item
            sx={{
              border:
                !combatActor.conditions || combatActor.conditions.length <= 0
                  ? 0
                  : 2,
              borderStyle: "double",
              borderColor: color(
                index,
                turnNumber,
                combatActor,
                "#c4c4c4",
                true
              ),
              borderRadius: 4,
              padding: "3px 15px",
            }}
          >
            <Tooltip
              arrow
              title="Conditions & Concentration"
              placement={combatActor.alignment === "PARTY" ? "left" : "right"}
            >
              <Typography
                variant="h6"
                color={color(
                  index,
                  turnNumber,
                  combatActor,
                  "text.primary",
                  true
                )}
                sx={{
                  "&:hover": {
                    filter: "brightness(75%)",
                    cursor: "pointer",
                  },
                }}
                onClick={handleConditionDialogClose}
              >
                {combatActor.name}
              </Typography>
            </Tooltip>
            {combatActor.race && (
              <Typography
                color={color(
                  index,
                  turnNumber,
                  combatActor,
                  "text.secondary",
                  true
                )}
              >
                {combatActor.alignment === "PARTY" ? "Race" : "Creature Type"}:{" "}
                {combatActor.race}
              </Typography>
            )}
            {combatActor.class && (
              <Typography
                color={color(
                  index,
                  turnNumber,
                  combatActor,
                  "text.secondary",
                  true
                )}
              >
                Class: {combatActor.class}
              </Typography>
            )}
          </Grid>
        </Badge>
      </Badge>
      <ConditionDialog
        open={isDialogOpen}
        combatActorId={combatActor.id}
        combatActorName={combatActor.name}
        closeHandler={handleConditionDialogClose}
        conditions={combatActor.conditions}
        concentration={combatActor.concentration}
      />
    </>
  );
};

export default RoundTimelineLabel;
