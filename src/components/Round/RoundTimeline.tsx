import { Timeline } from "@mui/lab";
import { Typography } from "@mui/material";
import { combatant, turn } from "../../dummy/data";
import RoundTimelineItem from "./RoundTimelineItem";
const RoundTimeline = ({
  combatActors,
  combatActorsHpEditHandler,
  combatActorsRemoveHandler,
  turn,
}: {
  combatActors: combatant[];
  combatActorsHpEditHandler: (combatActorId: string, hpInput: number) => void;
  combatActorsRemoveHandler: (combatActorId: string) => void;
  turn: turn;
}) => {
  return (
    <Timeline>
      {combatActors.length <= 0 ? (
        <Typography textAlign="center" color="white" variant="h6">
          You might wanna add some characters...
        </Typography>
      ) : (
        combatActors.map((combatActor, index, array) => (
          <RoundTimelineItem
            key={combatActor.id}
            turn={turn}
            combatActorHpEditHandler={combatActorsHpEditHandler}
            combatActorRemoveHandler={combatActorsRemoveHandler}
            combatActor={combatActor}
            index={index}
            array={array}
          />
        ))
      )}
    </Timeline>
  );
};

export default RoundTimeline;
