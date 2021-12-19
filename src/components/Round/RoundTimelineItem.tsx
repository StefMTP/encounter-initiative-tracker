import {
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@mui/lab";
import { combatant } from "../../types";
import { color } from "../../helpers";
import CombatantIcon from "../Combatants/CombatantIcon";
import RoundTimelineTrack from "./RoundTimelineTrack";
import RoundTimelineDetails from "./RoundTimelineDetails";
import { TurnContext } from "../../contexts/TurnContext";
import { useContext, useState } from "react";
import { Tooltip } from "@mui/material";

const RoundTimelineItem = ({
  combatActor,
  index,
  array,
}: {
  combatActor: combatant;
  index: number;
  array: combatant[];
}) => {
  const { turn, setTurn } = useContext(TurnContext);
  const [open, setOpen] = useState(false);

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
        />
      </TimelineOppositeContent>
      <TimelineSeparator>
        <Tooltip
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => {
            if (combatActor.name !== turn.actorPlaying.name) {
              setOpen(true);
            }
          }}
          title="Click to change turn"
          arrow
        >
          <TimelineDot
            sx={{
              bgcolor: color(index, turn.number, combatActor, ""),
              "&:hover": {
                cursor: "pointer",
              },
            }}
            variant={index === turn.number ? "filled" : "outlined"}
            onClick={() =>
              setTurn({ number: index, actorPlaying: combatActor })
            }
          >
            <CombatantIcon
              size={index === turn.number ? "large" : "medium"}
              combatActorType={combatActor.type}
            />
          </TimelineDot>
        </Tooltip>
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
        />
      </TimelineContent>
    </TimelineItem>
  );
};

export default RoundTimelineItem;
