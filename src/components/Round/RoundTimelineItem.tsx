import React, { useState } from "react";
import {
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@mui/lab";
import { TextField, Typography } from "@mui/material";
import { combatant, turn } from "../../dummy/data";
import CombatantIcon from "../Combatants/CombatantIcon";

const RoundTimelineItem = ({
  turn,
  combatActor,
  combatActorsHandler,
  index,
  array,
}: {
  turn: turn;
  combatActor: combatant;
  combatActorsHandler: (combatActorId: number, hpInput: number) => void;
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
      ? combatActor.color
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
                  combatActorsHandler(combatActor.id, hpInput);
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
        <Typography
          variant="h6"
          color={color(index, turn.number, combatActor, "text.primary", true)}
        >
          {combatActor.name}
        </Typography>
        <Typography
          color={color(index, turn.number, combatActor, "text.secondary", true)}
        >
          {combatActor.class}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
};

export default RoundTimelineItem;
