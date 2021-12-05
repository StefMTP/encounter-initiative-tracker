import React, { useState } from "react";
import {
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@mui/lab";
import { colorTable, combatant, turn } from "../../types";
import CombatantIcon from "../Combatants/CombatantIcon";
import RoundTimelineTrack from "./RoundTimelineTrack";
import RoundTimelineDetails from "./RoundTimelineDetails";

const RoundTimelineItem = ({
  turn,
  combatActor,
  combatActorHpEditHandler,
  combatActorRemoveHandler,
  combatActorConditionAddHandler,
  combatActorConditionRemoveHandler,
  index,
  array,
}: {
  turn: turn;
  combatActor: combatant;
  combatActorHpEditHandler: (combatActorId: string, hpInput: number) => void;
  combatActorRemoveHandler: (combatActorId: string) => void;
  combatActorConditionAddHandler: (
    combatActorId: string,
    conditionName: string
  ) => void;
  combatActorConditionRemoveHandler: (
    combatActorId: string,
    conditionName: string
  ) => void;
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
        <RoundTimelineTrack
          combatActor={combatActor}
          index={index}
          turnNumber={turn.number}
          hpFill={hpFill}
          hpInput={hpInput}
          hpFillToggler={setHpFill}
          hpInputEditHandler={setHpInput}
          combatActorHpEditHandler={combatActorHpEditHandler}
          color={color}
        />
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
        <RoundTimelineDetails
          combatActor={combatActor}
          index={index}
          turnNumber={turn.number}
          combatActorRemoveHandler={combatActorRemoveHandler}
          combatActorConditionAddHandler={combatActorConditionAddHandler}
          combatActorConditionRemoveHandler={combatActorConditionRemoveHandler}
          color={color}
        />
      </TimelineContent>
    </TimelineItem>
  );
};

export default RoundTimelineItem;
