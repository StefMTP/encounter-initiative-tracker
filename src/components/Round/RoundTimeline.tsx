import { Timeline } from "@mui/lab";
import { Typography } from "@mui/material";
import { combatant, turn } from "../../types";
import RoundTimelineItem from "./RoundTimelineItem";
const RoundTimeline = ({
  turn,
  combatActors,
  combatActorsHpEditHandler,
  combatActorsRemoveHandler,
  combatActorsConditionAddHandler,
  combatActorsConditionRemoveHandler,
}: {
  turn: turn;
  combatActors: combatant[];
  combatActorsHpEditHandler: (combatActorId: string, hpInput: number) => void;
  combatActorsConditionAddHandler: (
    combatActorId: string,
    conditionName: string
  ) => void;
  combatActorsConditionRemoveHandler: (
    combatActorId: string,
    conditionName: string
  ) => void;
  combatActorsRemoveHandler: (combatActorId: string) => void;
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
            combatActorConditionAddHandler={combatActorsConditionAddHandler}
            combatActorConditionRemoveHandler={
              combatActorsConditionRemoveHandler
            }
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
