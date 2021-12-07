import { useContext } from "react";
import { Timeline } from "@mui/lab";
import { Typography } from "@mui/material";
import RoundTimelineItem from "./RoundTimelineItem";
import { CombatActorsContext } from "../../contexts/CombatActorsContext";
import { TurnContext } from "../../contexts/TurnContext";

const RoundTimeline = () => {
  const { combatActors } = useContext(CombatActorsContext);
  const { turn } = useContext(TurnContext);

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
