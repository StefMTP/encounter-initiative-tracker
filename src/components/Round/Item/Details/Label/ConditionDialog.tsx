import { useContext, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Close, Delete, Edit } from "@mui/icons-material";
import ConditionDialogDescription from "./ConditionDialogDescription";
import { CombatActorsContext } from "../../../../../contexts/CombatActorsContext";
import { conditionsTable } from "../../../../../data/conditions";
import { sortPlayerActors } from "../../../../../helpers";

const ConditionDialog = ({
  open,
  combatActorId,
  combatActorName,
  closeHandler,
  conditions,
  concentration,
}: {
  open: boolean;
  combatActorId: string;
  combatActorName: string;
  closeHandler: () => void;
  conditions: string[] | undefined;
  concentration: string | undefined;
}) => {
  const { combatActors, setCombatActors } = useContext(CombatActorsContext);

  const [concentrationFill, setConcentrationFill] = useState(false);
  const [concentrationInput, setConcentrationInput] = useState("");

  const addConcentrationToCombatActor = (
    combatActorId: string,
    concentrationInput: string
  ) => {
    const combatActorToEdit = combatActors.find(
      (combatActor) => combatActorId === combatActor.id
    );
    if (combatActorToEdit) {
      combatActorToEdit.concentration = concentrationInput;
      const tmpActors = combatActors.filter(
        (combatActor) => combatActor.id !== combatActorId
      );
      tmpActors.push(combatActorToEdit);
      setCombatActors(sortPlayerActors(tmpActors));
    }
  };

  const removeConcentrationFromCombatActor = (combatActorId: string) => {
    const combatActorToEdit = combatActors.find(
      (combatActor) => combatActorId === combatActor.id
    );
    if (combatActorToEdit) {
      combatActorToEdit.concentration = undefined;
      const tmpActors = combatActors.filter(
        (combatActor) => combatActor.id !== combatActorId
      );
      tmpActors.push(combatActorToEdit);
      setCombatActors(sortPlayerActors(tmpActors));
    }
  };

  const addConditionToCombatActor = (
    combatActorId: string,
    conditionName: string
  ) => {
    const combatActorToEdit = combatActors.find(
      (combatActor) => combatActorId === combatActor.id
    );
    if (combatActorToEdit) {
      if (!combatActorToEdit.conditions) {
        combatActorToEdit["conditions"] = [];
      }
      if (!combatActorToEdit.conditions.includes(conditionName)) {
        combatActorToEdit.conditions.push(conditionName);
        const tmpActors = combatActors.filter(
          (combatActor) => combatActor.id !== combatActorId
        );
        tmpActors.push(combatActorToEdit);
        setCombatActors(sortPlayerActors(tmpActors));
      }
    }
  };

  return (
    <Dialog open={open} onClose={closeHandler}>
      <DialogTitle
        sx={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Typography variant="h5">{combatActorName}</Typography>
        <FormControl sx={{ width: "80px" }}>
          <InputLabel>Add</InputLabel>
          <Select>
            {Object.keys(conditionsTable).map((condition) => (
              <MenuItem
                key={condition}
                onClick={() =>
                  addConditionToCombatActor(combatActorId, condition)
                }
              >
                {condition}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <IconButton onClick={closeHandler}>
          <Close />
        </IconButton>
      </DialogTitle>
      <Box
        sx={{
          width: "100%",
          minWidth: 450,
          padding: "10px 0",
          bgcolor: "background.paper",
        }}
      >
        <List>
          <ListSubheader component="div">Conditions</ListSubheader>
          {!!conditions && conditions.length > 0 ? (
            conditions.map((condition) => (
              <ConditionDialogDescription
                key={condition}
                condition={condition}
                combatActorId={combatActorId}
              />
            ))
          ) : (
            <Typography variant="h6" textAlign="center">
              No conditions.
            </Typography>
          )}
          <Divider light />
          <ListSubheader component="div">Concentration</ListSubheader>
          {concentrationFill ? (
            <form
              onSubmit={() => {
                addConcentrationToCombatActor(
                  combatActorId,
                  concentrationInput
                );
                setConcentrationFill(false);
                setConcentrationInput("");
              }}
            >
              <Grid container justifyContent="space-evenly" alignItems="center">
                <Grid item>
                  <TextField
                    label="Concentrating on..."
                    value={concentrationInput}
                    onChange={(e) => setConcentrationInput(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" color="success" type="submit">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          ) : !!concentration && concentration.trim().length !== 0 ? (
            <Grid container alignItems="center">
              <Grid item xs={8}>
                <Typography variant="h5" textAlign="center">
                  {concentration}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  color="info"
                  onClick={() => {
                    setConcentrationInput(concentration);
                    setConcentrationFill(true);
                  }}
                >
                  <Edit />
                </IconButton>
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  color="error"
                  onClick={() => {
                    removeConcentrationFromCombatActor(combatActorId);
                  }}
                >
                  <Delete />
                </IconButton>
              </Grid>
            </Grid>
          ) : (
            <Grid container alignItems="center">
              <Grid item xs={8}>
                <Typography variant="h6" textAlign="center">
                  No concentration.
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  color="success"
                  endIcon={<Add />}
                  onClick={() => setConcentrationFill(true)}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          )}
        </List>
      </Box>
    </Dialog>
  );
};

export default ConditionDialog;
