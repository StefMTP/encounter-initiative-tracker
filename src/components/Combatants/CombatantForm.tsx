import React, { useState } from "react";
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
  combatants,
  combatantType,
} from "../../dummy/data";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const CombatantForm = ({
  submitNewCombatant,
}: {
  submitNewCombatant: (combatActor: combatant) => void;
}) => {
  const [inputName, setInputName] = useState<string>("");
  const [inputInitiative, setInputInitiative] = useState<number>();
  const [inputAlignment, setInputAlignment] =
    useState<combatantAlignment>("PARTY");
  const [inputType, setInputType] = useState<combatantType>("PC");
  const [inputClass, setInputClass] = useState<string>("");
  const [inputHp, setInputHp] = useState<number>();
  const [inputColor, setInputColor] = useState<string>("Magenta");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const combatActorSubmit: combatant = {
          id: combatants.length + 1,
          name: inputName,
          initiative: inputInitiative || 0,
          alignment: inputAlignment,
          type: inputType,
          class: inputClass,
          color: colorTable[inputColor],
          currentHp: inputHp,
          maxHp: inputHp,
        };
        submitNewCombatant(combatActorSubmit);
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
            type="number"
            required
            value={inputInitiative}
            onChange={(e) => setInputInitiative(+e.target.value)}
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
            type="number"
            variant="standard"
            label="Health Points"
            color="secondary"
            value={inputHp}
            onChange={(e) => setInputHp(+e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl sx={{ minWidth: "80px" }}>
            <InputLabel>Color</InputLabel>
            <Select
              value={inputColor}
              onChange={(e) => setInputColor(e.target.value)}
            >
              {Object.keys(colorTable).map((color) => (
                <MenuItem value={color}>
                  <Grid container alignContent="center">
                  <span>{color}{" "}</span>
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
