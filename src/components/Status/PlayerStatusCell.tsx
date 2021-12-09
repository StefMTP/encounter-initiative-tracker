import { TableCell, TextField, IconButton, Autocomplete } from "@mui/material";
import { useContext } from "react";
import { CombatActorsContext } from "../../contexts/CombatActorsContext";

const PlayerStatusCell = ({
  fieldFill,
  fieldInput,
  playerStatusId,
  playerStatusField,
  playerStatusFieldEditHandler,
  setFieldFillHandler,
  setFieldInputHandler,
  icon,
  type,
}: {
  fieldFill: boolean;
  fieldInput: string;
  playerStatusId: string;
  playerStatusField: string;
  playerStatusFieldEditHandler: (
    playerStatusId: string,
    fieldInput: string
  ) => void;
  setFieldFillHandler: React.Dispatch<React.SetStateAction<boolean>>;
  setFieldInputHandler: React.Dispatch<React.SetStateAction<string>>;
  icon: React.ReactNode;
  type: "autocomplete" | "text" | "number" | undefined;
}) => {
  const { combatActors } = useContext(CombatActorsContext);
  return (
    <TableCell>
      {fieldFill ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            playerStatusFieldEditHandler(playerStatusId, fieldInput);
            setFieldFillHandler(false);
          }}
        >
          {type === "autocomplete" ? (
            <Autocomplete
              disablePortal
              options={combatActors.map((combatActor) => combatActor.name)}
              value={fieldInput}
              onChange={(e: any, newValue: string | null) => {
                if (newValue) {
                  setFieldInputHandler(newValue);
                }
              }}
              renderInput={(params) => <TextField {...params} label="Name" />}
            />
          ) : type === "text" ? (
            <TextField
              type="text"
              variant="standard"
              size="small"
              onChange={(e) => {
                setFieldInputHandler(e.target.value);
              }}
            />
          ) : (
            <TextField
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              onInvalid={(e: any) => {
                if (e.target.validity.patternMismatch) {
                  e.target.setCustomValidity("Type a number!");
                }
              }}
              variant="standard"
              size="small"
              onChange={(e) => {
                e.target.setCustomValidity("");
                setFieldInputHandler(e.target.value);
              }}
            />
          )}
        </form>
      ) : (
        <>
          {playerStatusField}
          <IconButton
            size="small"
            onClick={() => setFieldFillHandler(!fieldFill)}
          >
            {icon}
          </IconButton>
        </>
      )}
    </TableCell>
  );
};

export default PlayerStatusCell;
