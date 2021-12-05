import { Typography, TextField } from "@mui/material";
import { combatant } from "../../types";

const RoundTimelineTrack = ({
  combatActor,
  index,
  turnNumber,
  hpFill,
  hpInput,
  hpFillToggler,
  hpInputEditHandler,
  combatActorHpEditHandler,
  color,
}: {
  combatActor: combatant;
  index: number;
  turnNumber: number;
  hpFill: boolean;
  hpInput: number;
  hpFillToggler: React.Dispatch<React.SetStateAction<boolean>>;
  hpInputEditHandler: React.Dispatch<React.SetStateAction<number>>;
  combatActorHpEditHandler: (combatActorId: string, hpInput: number) => void;
  color: (
    index: number,
    turnNumber: number,
    combatActor: combatant,
    value: string,
    isText?: boolean
  ) => string;
}) => {
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
                combatActorHpEditHandler(combatActor.id, hpInput);
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
