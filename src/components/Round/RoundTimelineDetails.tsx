import { Grid, IconButton } from "@mui/material";
import { combatant } from "../../types";
import RoundTimelineLabel from "./RoundTimelineLabel";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useContext } from "react";
import { CombatActorsContext } from "../../contexts/CombatActorsContext";

const RoundTimelineDetails = ({
  combatActor,
  index,
  turnNumber,
}: {
  combatActor: combatant;
  index: number;
  turnNumber: number;
}) => {
  const { combatActors, setCombatActors } = useContext(CombatActorsContext);

  const removeCombatActor = (combatActorId: string) => {
    setCombatActors(
      combatActors.filter((combatActor) => combatActorId !== combatActor.id)
    );
  };

  return (
    <Grid
      container
      justifyContent="flex-end"
      alignItems="center"
      flexDirection={combatActor.alignment === "PARTY" ? "row" : "row-reverse"}
    >
      <Grid item>
        <IconButton
          color="error"
          onClick={() => removeCombatActor(combatActor.id)}
        >
          <PersonRemoveIcon />
        </IconButton>
      </Grid>
      <Grid item>
        <RoundTimelineLabel
          combatActor={combatActor}
          index={index}
          turnNumber={turnNumber}
        />
      </Grid>
    </Grid>
  );
};

export default RoundTimelineDetails;
