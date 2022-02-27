import { useContext, useEffect } from "react";
import {
  TableCell,
  TextField,
  IconButton,
  Autocomplete,
  Typography,
  Grid,
  Tooltip,
} from "@mui/material";
import { CombatActorsContext } from "../../contexts/CombatActorsContext";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";

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

  useEffect(() => {
    if (type === "number") {
      setFieldInputHandler(playerStatusField);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerStatusField]);

  return (
    <TableCell>
      <Grid container alignItems="center">
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
                value={fieldInput}
                onChange={(e) => {
                  setFieldInputHandler(e.target.value);
                }}
              />
            ) : (
              <Grid alignItems="center" display="flex">
                <TextField
                  disabled
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  value={fieldInput}
                  variant="standard"
                  size="small"
                />
                <Grid display="grid">
                  <IconButton
                    size="small"
                    onClick={() => setFieldInputHandler(`${+fieldInput + 1}`)}
                  >
                    <KeyboardArrowUp />
                  </IconButton>
                  <IconButton
                    disabled={+fieldInput === 0}
                    size="small"
                    onClick={() => {
                      if (+fieldInput !== 0) {
                        setFieldInputHandler(`${+fieldInput - 1}`);
                      }
                    }}
                  >
                    <KeyboardArrowDown />
                  </IconButton>
                </Grid>
              </Grid>
            )}
          </form>
        ) : (
          <>
            <Typography
              sx={{
                textShadow:
                  "-1px -1px 1px rgba(255,255,255,.1), 1px 1px 1px rgba(0,0,0,.9)",
              }}
            >
              {playerStatusField}
            </Typography>
            <Tooltip title="Edit" placement="right">
              <IconButton
                size="small"
                onClick={() => setFieldFillHandler(!fieldFill)}
              >
                {icon}
              </IconButton>
            </Tooltip>
          </>
        )}
      </Grid>
    </TableCell>
  );
};

export default PlayerStatusCell;
