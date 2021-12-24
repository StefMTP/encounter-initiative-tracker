import { useContext } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  List,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import ConditionDialogDescription from "./ConditionDialogDescription";
import { CombatActorsContext } from "../../../../../contexts/CombatActorsContext";
import { conditionsTable } from "../../../../../data/conditions";
import { sortPlayerActors } from "../../../../../helpers";

const ConditionDialog = ({
  open,
  combatActorId,
  closeHandler,
  conditions,
}: {
  open: boolean;
  combatActorId: string;
  closeHandler: () => void;
  conditions: string[] | undefined;
}) => {
  const { combatActors, setCombatActors } = useContext(CombatActorsContext);

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
      <DialogTitle sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
        Character conditions
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
          maxWidth: 400,
          padding: "10px 0",
          bgcolor: "background.paper",
        }}
      >
        {!!conditions && conditions.length > 0 ? (
          <List>
            {conditions.map((condition) => (
              <ConditionDialogDescription
                key={condition}
                condition={condition}
                combatActorId={combatActorId}
              />
            ))}
          </List>
        ) : (
          <Typography variant="h6" textAlign="center">
            Character has no conditions...
          </Typography>
        )}
      </Box>
    </Dialog>
  );
};

export default ConditionDialog;
