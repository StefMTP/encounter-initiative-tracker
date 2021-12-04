import React, { useState } from "react";
import {
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@mui/lab";
import { Grid, IconButton, TextField, Typography } from "@mui/material";
import { colorTable, combatant, turn } from "../../types";
import CombatantIcon from "../Combatants/CombatantIcon";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

const RoundTimelineItem = ({
  turn,
  combatActor,
  combatActorHpEditHandler,
  combatActorRemoveHandler,
  index,
  array,
}: {
  turn: turn;
  combatActor: combatant;
  combatActorHpEditHandler: (combatActorId: string, hpInput: number) => void;
  combatActorRemoveHandler: (combatActorId: string) => void;
  index: number;
  array: combatant[];
}) => {
  const color = (
    index: number,
    turnNumber: number,
    combatActor: combatant,
    value: string,
    isText?: boolean
  ) => {
    return index === turnNumber
      ? combatActor.color && colorTable["Default"] !== combatActor.color
        ? !!isText
          ? combatActor.color.secondary
          : combatActor.color.primary
        : combatActor.alignment === "PARTY"
        ? "success.main"
        : "error.main"
      : value;
  };
  const [hpFill, setHpFill] = useState<boolean>(false);
  const [hpInput, setHpInput] = useState<number>(0);
  return (
    <TimelineItem
      position={combatActor.alignment === "PARTY" ? "left" : "right"}
    >
      <TimelineOppositeContent
        sx={{ m: "auto 0" }}
        align="center"
        variant="body2"
      >
        <Typography
          color={color(index, turn.number, combatActor, "text.secondary", true)}
        >
          Initiative: {combatActor.initiative}
        </Typography>
        {combatActor.currentHp && combatActor.maxHp && (
          <Typography
            color={color(
              index,
              turn.number,
              combatActor,
              "text.secondary",
              true
            )}
          >
            HP:{" "}
            {hpFill ? (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  combatActorHpEditHandler(combatActor.id, hpInput);
                  setHpFill(false);
                }}
              >
                <TextField
                  type="number"
                  variant="standard"
                  size="small"
                  onChange={(e) => {
                    setHpInput(+e.target.value);
                  }}
                />
              </form>
            ) : (
              combatActor.currentHp
            )}
            /{combatActor.maxHp}
          </Typography>
        )}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot
          sx={{
            bgcolor: color(index, turn.number, combatActor, ""),
          }}
          variant={index === turn.number ? "filled" : "outlined"}
          onClick={() => setHpFill((prevHpFill) => !prevHpFill)}
        >
          <CombatantIcon
            size={index === turn.number ? "large" : "medium"}
            combatActorType={combatActor.type}
          />
        </TimelineDot>
        {index < array.length - 1 ? (
          <TimelineConnector
            sx={{
              height:
                turn.number === index + 1 || turn.number === index
                  ? "1.5em"
                  : "1em",
            }}
          />
        ) : null}
      </TimelineSeparator>
      <TimelineContent>
        <Grid
          container
          justifyContent={
            combatActor.alignment === "PARTY" ? "flex-end" : "flex-start"
          }
          alignItems="center"
        >
          {combatActor.alignment === "PARTY" && (
            <Grid item>
              <IconButton
                color="error"
                onClick={() => combatActorRemoveHandler(combatActor.id)}
              >
                <PersonRemoveIcon />
              </IconButton>
            </Grid>
          )}
          <Grid item>
            <Typography
              variant="h6"
              color={color(
                index,
                turn.number,
                combatActor,
                "text.primary",
                true
              )}
            >
              {combatActor.name}
            </Typography>
            <Typography
              color={color(
                index,
                turn.number,
                combatActor,
                "text.secondary",
                true
              )}
            >
              {combatActor.class}
            </Typography>
          </Grid>
          {combatActor.alignment === "FOE" && (
            <Grid item>
              <IconButton
                color="error"
                onClick={() => combatActorRemoveHandler(combatActor.id)}
              >
                <PersonRemoveIcon />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </TimelineContent>
    </TimelineItem>
  );
};

export default RoundTimelineItem;
