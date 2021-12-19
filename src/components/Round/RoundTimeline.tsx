import { useContext } from "react";
import { Timeline } from "@mui/lab";
import { Typography } from "@mui/material";
import RoundTimelineItem from "./RoundTimelineItem";
import { CombatActorsContext } from "../../contexts/CombatActorsContext";

const RoundTimeline = () => {
  const { combatActors } = useContext(CombatActorsContext);

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
