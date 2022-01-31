import React, { useContext, useState } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
} from "@mui/material";
import {
  AddReaction,
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { v4 as uuid } from "uuid";
import { TurnContext } from "../../contexts/TurnContext";
import { AlertContext } from "../../contexts/AlertContext";
import { CombatActorsContext } from "../../contexts/CombatActorsContext";
import { combatant, combatantAlignment, combatantType } from "../../types";
import { sortPlayerActors } from "../../helpers";
import { colorTable } from "../../data/colors";

const CombatantForm = ({
  openSetter,
}: {
  openSetter: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [inputName, setInputName] = useState<string>("");
  const [inputInitiative, setInputInitiative] = useState<string>("");
  const [inputAlignment, setInputAlignment] =
    useState<combatantAlignment>("PARTY");
  const [inputType, setInputType] = useState<combatantType>("PC");
  const [inputRace, setInputRace] = useState<string>("");
  const [inputClass, setInputClass] = useState<string>("");
  const [inputHp, setInputHp] = useState<string>("");
  const [inputColor, setInputColor] = useState<string>("Default");
  const [inputMovementSpd, setInputMovementSpd] = useState<string>("");

  const { setActorSubmitAlertOpen, setActorSubmitAlertMessage } =
    useContext(AlertContext);
  const { combatActors, setCombatActors } = useContext(CombatActorsContext);
  const { turn, setTurn } = useContext(TurnContext);

  const submitCombatActor = (combatActorSubmit: combatant) => {
    if (combatActors.length === 0 || !turn.actorPlaying) {
      setTurn({ number: 0, actorPlaying: combatActorSubmit });
    } else if (turn.actorPlaying.initiative < combatActorSubmit.initiative) {
      setTurn((prevTurn) => {
        return {
          number: prevTurn.number + 1,
          actorPlaying: prevTurn.actorPlaying,
        };
      });
    }
    openSetter(false);
    setCombatActors(sortPlayerActors([...combatActors, combatActorSubmit]));
    setActorSubmitAlertMessage(
      `${combatActorSubmit.name} added succcessfully!`
    );
    setActorSubmitAlertOpen(true);
  };

  const clearInputs = () => {
    setInputName("");
    setInputInitiative("");
    setInputAlignment("PARTY");
    setInputType("PC");
    setInputHp("");
    setInputColor("Default");
  };

  return (
    <Grid display="grid">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const combatActorSubmit: combatant = {
            id: uuid(),
            name: inputName,
            initiative: +inputInitiative || 0,
            alignment: inputAlignment,
            type: inputType,
            class: inputClass,
            color:
              inputColor === "Default" ? undefined : colorTable[inputColor],
            currentHp: +inputHp || 0,
            maxHp: +inputHp || 0,
          };
          submitCombatActor(combatActorSubmit);
          clearInputs();
        }}
      >
        <Grid container my={4} justifyContent="space-evenly">
          <Grid item>
            <TextField
              variant="standard"
              label="Name"
              color="secondary"
              type="text"
              required
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="standard"
              label="Initiative"
              color="secondary"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              onInvalid={(e: any) => {
                if (e.target.validity.patternMismatch) {
                  e.target.setCustomValidity("Type a number!");
                }
              }}
              required
              value={inputInitiative}
              onChange={(e) => {
                if (!isNaN(+e.target.value.substr(-1))) {
                  setInputInitiative(e.target.value);
                }
                e.target.setCustomValidity("");
              }}
            />
          </Grid>
        </Grid>
        <Grid container my={4} justifyContent="space-evenly">
          <Grid item>
            <FormControl sx={{ minWidth: "162px" }} required>
              <InputLabel>Alignment</InputLabel>
              <Select
                value={inputAlignment}
                onChange={(e) =>
                  setInputAlignment(e.target.value as combatantAlignment)
                }
              >
                <MenuItem value="PARTY">Party</MenuItem>
                <MenuItem value="FOE">Foe</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl sx={{ minWidth: "162px" }} required>
              <InputLabel>Type</InputLabel>
              <Select
                value={inputType}
                onChange={(e) => setInputType(e.target.value as combatantType)}
              >
                <MenuItem value="PC">PC</MenuItem>
                <MenuItem value="NPC">NPC</MenuItem>
                <MenuItem value="Enemy">Enemy</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container my={4} justifyContent="space-evenly">
          <Grid item>
            <TextField
              type="text"
              variant="standard"
              label="Class"
              color="secondary"
              value={inputClass}
              onChange={(e) => setInputClass(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              type="text"
              variant="standard"
              label="Race"
              color="secondary"
              value={inputRace}
              onChange={(e) => setInputRace(e.target.value)}
            />
          </Grid>
          <Grid item>
            <FormControl sx={{ minWidth: "80px" }}>
              <InputLabel>Color</InputLabel>
              <Select
                value={inputColor}
                onChange={(e) => setInputColor(e.target.value)}
                variant="standard"
              >
                {Object.keys(colorTable).map((color) => (
                  <MenuItem value={color} key={color}>
                    <Grid container alignContent="center">
                      <span>{color} </span>
                      <FiberManualRecordIcon
                        sx={{ color: colorTable[color]["primary"] }}
                        fontSize="small"
                      />
                    </Grid>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container my={4} justifyContent="space-evenly">
          <Grid item>
            <TextField
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              onInvalid={(e: any) => {
                if (e.target.validity.patternMismatch) {
                  e.target.setCustomValidity("Type a number!");
                }
              }}
              variant="standard"
              label="Health Points"
              color="secondary"
              value={inputHp}
              onChange={(e) => {
                if (!isNaN(+e.target.value.substr(-1))) {
                  setInputHp(e.target.value);
                }
                e.target.setCustomValidity("");
              }}
            />
          </Grid>
          <Grid item display="flex">
            <TextField
              label="Movement Speed"
              value={inputMovementSpd}
              variant="standard"
            />
            <Grid display="grid">
              <IconButton
                size="small"
                onClick={() => setInputMovementSpd(`${+inputMovementSpd + 5}`)}
              >
                <KeyboardArrowUp />
              </IconButton>
              <IconButton
                disabled={+inputMovementSpd === 0}
                size="small"
                onClick={() => {
                  if (+inputMovementSpd !== 0) {
                    setInputMovementSpd(`${+inputMovementSpd - 5}`);
                  }
                }}
              >
                <KeyboardArrowDown />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid m={2} display="grid">
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            endIcon={<AddReaction />}
          >
            Add Character
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default CombatantForm;
