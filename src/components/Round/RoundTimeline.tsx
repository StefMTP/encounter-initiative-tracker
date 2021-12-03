import { Timeline } from "@mui/lab";
import { combatant, turn } from "../../dummy/data";
import RoundTimelineItem from "./RoundTimelineItem";
const RoundTimeline = ({
  combatActors,
  combatActorsHandler,
  turn,
}: {
  combatActors: combatant[];
  combatActorsHandler: (combatActorId: number, hpInput: number) => void;
  turn: turn;
}) => {
  return (
    <Timeline>
      {combatActors.map((combatActor, index, array) => (
        <RoundTimelineItem
          key={combatActor.id}
          turn={turn}
          combatActorsHandler={combatActorsHandler}
          combatActor={combatActor}
          index={index}
          array={array}
        />
      ))}
    </Timeline>
  );
};

export default RoundTimeline;
