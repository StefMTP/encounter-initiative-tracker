import { useContext, useState } from "react";
import {
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@mui/lab";
import { Tooltip } from "@mui/material";
import RoundTimelineTrack from "./StatTrack/RoundTimelineTrack";
import CombatantIcon from "../../Combatants/CombatantIcon";
import RoundTimelineDetails from "./Details/RoundTimelineDetails";
import { TurnContext } from "../../../contexts/TurnContext";
import { combatant } from "../../../types";
import { color } from "../../../helpers";

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
        justifyContent="center"
        justifyItems="center"
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
            onClick={() => {
              setTurn({ number: index, actorPlaying: combatActor });
              setOpen(false);
            }}
          >
            {combatActor.type !== "INITIATIVE_MARK" && (
              <CombatantIcon
                size={index === turn.number ? "large" : "medium"}
                combatActorType={combatActor.type}
                icon={combatActor.icon}
              />
            )}
          </TimelineDot>
        </Tooltip>
        {index < array.length - 1 ? (
          <TimelineConnector
            sx={{
              height:
                turn.number === index + 1 || turn.number === index
                  ? "2.2em"
                  : "1.7em",
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
