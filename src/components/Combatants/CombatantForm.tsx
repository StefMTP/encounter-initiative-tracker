import React, { useContext, useState } from "react";
import { AddReaction } from "@mui/icons-material";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import {
  colorTable,
  combatant,
  combatantAlignment,
  combatantType,
} from "../../types";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { v4 as uuid } from "uuid";
import { sortPlayerActors } from "../../helpers";
import { CombatActorsContext } from "../../contexts/CombatActorsContext";
import { TurnContext } from "../../contexts/TurnContext";

const CombatantForm = () => {
  const [inputName, setInputName] = useState<string>("");
  const [inputInitiative, setInputInitiative] = useState<string>("");
  const [inputAlignment, setInputAlignment] =
    useState<combatantAlignment>("PARTY");
  const [inputType, setInputType] = useState<combatantType>("PC");
  const [inputClass, setInputClass] = useState<string>("");
  const [inputHp, setInputHp] = useState<string>("");
  const [inputColor, setInputColor] = useState<string>("Default");

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
    setCombatActors(sortPlayerActors([...combatActors, combatActorSubmit]));
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
          color: inputColor === "Default" ? undefined : colorTable[inputColor],
          currentHp: +inputHp || 0,
          maxHp: +inputHp || 0,
        };
        submitCombatActor(combatActorSubmit);
        clearInputs();
      }}
    >
      <Grid container spacing={2} m={2}>
        <Grid item xs={6}>
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
        <Grid item xs={6}>
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
              e.target.setCustomValidity("");
              setInputInitiative(e.target.value);
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} m={2}>
        <Grid item xs={6}>
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
        <Grid item xs={6}>
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
      <Grid container spacing={1} m={1}>
        <Grid item xs={4}>
          <TextField
            type="text"
            variant="standard"
            label="Class"
            color="secondary"
            value={inputClass}
            onChange={(e) => setInputClass(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
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
              e.target.setCustomValidity("");
              setInputHp(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={4}>
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
  );
};

export default CombatantForm;
