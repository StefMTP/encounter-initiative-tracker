import { Grid, IconButton } from "@mui/material";
import { combatant } from "../../types";
import RoundTimelineLabel from "./RoundTimelineLabel";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useContext } from "react";
import { CombatActorsContext } from "../../contexts/CombatActorsContext";
import { TurnContext } from "../../contexts/TurnContext";

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
  const { turn, setTurn } = useContext(TurnContext);

  const removeCombatActor = (combatActorId: string) => {
    const combatActorRemove = combatActors.find(
      (combatActor) => combatActor.id === combatActorId
    );
    if (combatActorRemove) {
      if (turn.actorPlaying.initiative < combatActorRemove.initiative) {
        setTurn((prevTurn) => {
          return {
            number: prevTurn.number - 1,
            actorPlaying: prevTurn.actorPlaying,
          };
        });
      }
      setCombatActors(
        combatActors.filter((combatActor) => combatActorId !== combatActor.id)
      );
    }
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
