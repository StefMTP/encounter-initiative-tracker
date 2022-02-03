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
  Switch,
  Stack,
  Typography,
} from "@mui/material";
import {
  AddReaction,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { v4 as uuid } from "uuid";
import { TurnContext } from "../../contexts/TurnContext";
import { AlertContext } from "../../contexts/AlertContext";
import { CombatActorsContext } from "../../contexts/CombatActorsContext";
import { combatant, combatantType } from "../../types";
import { sortPlayerActors } from "../../helpers";
import { colorTable } from "../../data/colors";
import { iconsTable } from "../../data/icons";
import CustomSvgIcon from "../Structure/Icons/CustomSvgIcon";

const CombatantForm = ({
  openSetter,
}: {
  openSetter: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [inputName, setInputName] = useState<string>("");
  const [inputInitiative, setInputInitiative] = useState<string>("");
  const [inputIsParty, setInputIsParty] = useState<boolean>(true);
  const [inputType, setInputType] = useState<combatantType>("PC");
  const [inputRace, setInputRace] = useState<string>("");
  const [inputClass, setInputClass] = useState<string>("");
  const [inputHp, setInputHp] = useState<string>("");
  const [inputColor, setInputColor] = useState<string>("Default");
  const [inputIcon, setInputIcon] = useState<string>("");
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
    setInputMovementSpd("");
    setInputIsParty(false);
    setInputType("PC");
    setInputHp("");
    setInputClass("");
    setInputRace("");
    setInputColor("Default");
    setInputIcon("");
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
            alignment: inputIsParty ? "PARTY" : "FOE",
            type: inputType,
            race: inputRace,
            class: inputClass,
            color:
              inputColor === "Default" ? undefined : colorTable[inputColor],
            currentHp: +inputHp || 0,
            maxHp: +inputHp || 0,
            movementSpd: +inputMovementSpd || 0,
            icon: inputIcon,
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
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>Party</Typography>
              <Switch
                sx={{ height: "40px" }}
                color="error"
                checked={!inputIsParty}
                checkedIcon={
                  <CustomSvgIcon
                    d={
                      "M12,2A9,9 0 0,0 3,11C3,14.03 4.53,16.82 7,18.47V22H9V19H11V22H13V19H15V22H17V18.46C19.47,16.81 21,14 21,11A9,9 0 0,0 12,2M8,11A2,2 0 0,1 10,13A2,2 0 0,1 8,15A2,2 0 0,1 6,13A2,2 0 0,1 8,11M16,11A2,2 0 0,1 18,13A2,2 0 0,1 16,15A2,2 0 0,1 14,13A2,2 0 0,1 16,11M12,14L13.5,17H10.5L12,14Z"
                    }
                  />
                }
                icon={
                  <CustomSvgIcon
                    d={
                      "M11 6H14L17.29 2.7A1 1 0 0 1 18.71 2.7L21.29 5.29A1 1 0 0 1 21.29 6.7L19 9H11V11A1 1 0 0 1 10 12A1 1 0 0 1 9 11V8A2 2 0 0 1 11 6M5 11V15L2.71 17.29A1 1 0 0 0 2.71 18.7L5.29 21.29A1 1 0 0 0 6.71 21.29L11 17H15A1 1 0 0 0 16 16V15H17A1 1 0 0 0 18 14V13H19A1 1 0 0 0 20 12V11H13V12A2 2 0 0 1 11 14H9A2 2 0 0 1 7 12V9Z"
                    }
                  />
                }
                onClick={() => setInputIsParty(!inputIsParty)}
              />
              <Typography>Foe</Typography>
            </Stack>
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
          <Grid item>
            <FormControl sx={{ minWidth: "80px" }}>
              <InputLabel>Icon</InputLabel>
              <Select
                value={inputIcon}
                onChange={(e) => setInputIcon(e.target.value)}
                variant="standard"
              >
                {iconsTable.map((icon) => (
                  <MenuItem key={icon.name} value={icon.name}>
                    <Grid
                      container
                      alignContent="center"
                      justifyContent="space-between"
                    >
                      <span>{icon.name}</span>
                      {icon.icon}
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
              type="text"
              variant="standard"
              label={inputIsParty ? "Race" : "Creature Type"}
              color="secondary"
              value={inputRace}
              onChange={(e) => setInputRace(e.target.value)}
            />
          </Grid>
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
                        sx={{
                          color: colorTable[color]["primary"],
                        }}
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
