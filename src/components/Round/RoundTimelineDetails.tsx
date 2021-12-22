import { useContext } from "react";
import { Grid, IconButton, Tooltip } from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import RoundTimelineLabel from "./RoundTimelineLabel";
import { TurnContext } from "../../contexts/TurnContext";
import { AlertContext } from "../../contexts/AlertContext";
import { CombatActorsContext } from "../../contexts/CombatActorsContext";
import { combatant } from "../../types";

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
  const {
    setActorRemoveAlertOpen,
    setActorRemoveAlertMessage,
    setActorRemoveAlertObject,
  } = useContext(AlertContext);

  const removeCombatActor = (combatActorId: string) => {
    const combatActorRemove = combatActors.find(
      (combatActor) => combatActor.id === combatActorId
    );
    if (combatActorRemove) {
      if (combatActors.length === 1 || !turn.actorPlaying) {
        setTurn({
          number: 0,
          actorPlaying: {
            id: "123",
            name: "",
            alignment: "PARTY",
            initiative: 0,
            type: "PC",
          },
        });
      } else if (
        turn.actorPlaying.initiative < combatActorRemove.initiative ||
        turn.number === combatActors.length - 1
      ) {
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
      setActorRemoveAlertObject(combatActorRemove);
      setActorRemoveAlertMessage(`${combatActorRemove.name} removed...`);
      setActorRemoveAlertOpen(true);
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
        <Tooltip
          title="Remove character"
          placement={combatActor.alignment === "PARTY" ? "left" : "right"}
        >
          <IconButton
            color="error"
            onClick={() => removeCombatActor(combatActor.id)}
          >
            <PersonRemoveIcon />
          </IconButton>
        </Tooltip>
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
