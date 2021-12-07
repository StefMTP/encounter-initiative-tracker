import { Typography, TextField } from "@mui/material";
import { combatant } from "../../types";
import { color, sortPlayerActors } from "../../helpers";
import { useContext } from "react";
import { CombatActorsContext } from "../../contexts/CombatActorsContext";

const RoundTimelineTrack = ({
  combatActor,
  index,
  turnNumber,
  hpFill,
  hpInput,
  hpFillToggler,
  hpInputEditHandler,
}: {
  combatActor: combatant;
  index: number;
  turnNumber: number;
  hpFill: boolean;
  hpInput: number;
  hpFillToggler: React.Dispatch<React.SetStateAction<boolean>>;
  hpInputEditHandler: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { combatActors, setCombatActors } = useContext(CombatActorsContext);

  const editCombatActorsHp = (combatActorId: string, hpInput: number) => {
    const combatActorToEdit = combatActors.find(
      (combatActor) => combatActorId === combatActor.id
    );
    if (
      combatActorToEdit &&
      combatActorToEdit["currentHp"] &&
      combatActorToEdit["maxHp"]
    ) {
      combatActorToEdit.currentHp =
        hpInput > combatActorToEdit.maxHp ? combatActorToEdit.maxHp : hpInput;
      const tmpActors = combatActors.filter(
        (combatActor) => combatActor.id !== combatActorId
      );
      tmpActors.push(combatActorToEdit);
      setCombatActors(sortPlayerActors(tmpActors));
    }
  };
  return (
    <>
      <Typography
        color={color(index, turnNumber, combatActor, "text.secondary", true)}
      >
        Initiative: {combatActor.initiative}
      </Typography>
      {combatActor.currentHp && combatActor.maxHp && (
        <Typography
          color={color(index, turnNumber, combatActor, "text.secondary", true)}
        >
          HP:{" "}
          {hpFill ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                editCombatActorsHp(combatActor.id, hpInput);
                hpFillToggler(false);
              }}
            >
              <TextField
                type="number"
                variant="standard"
                size="small"
                onChange={(e) => {
                  hpInputEditHandler(+e.target.value);
                }}
              />
            </form>
          ) : (
            combatActor.currentHp
          )}
          /{combatActor.maxHp}
        </Typography>
      )}
    </>
  );
};

export default RoundTimelineTrack;
