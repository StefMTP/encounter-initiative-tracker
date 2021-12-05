import { Close } from "@mui/icons-material";
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
import ConditionDialogDescription from "./ConditionDialogDescription";
import { conditionsTable } from "../../types";

const ConditionDialog = ({
  open,
  combatActorId,
  closeHandler,
  combatActorConditionAddHandler,
  combatActorConditionRemoveHandler,
  conditions,
}: {
  open: boolean;
  combatActorId: string;
  closeHandler: () => void;
  combatActorConditionAddHandler: (
    combatActorId: string,
    conditionName: string
  ) => void;
  combatActorConditionRemoveHandler: (
    combatActorId: string,
    conditionName: string
  ) => void;
  conditions: string[] | undefined;
}) => {
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
                  combatActorConditionAddHandler(combatActorId, condition)
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
      <Box sx={{ width: "100%", maxWidth: 400, bgcolor: "background.paper" }}>
        {!!conditions && conditions.length > 0 ? (
          <List>
            {conditions?.map((condition) => (
              <ConditionDialogDescription
                key={condition}
                condition={condition}
                combatActorId={combatActorId}
                combatActorConditionRemoveHandler={
                  combatActorConditionRemoveHandler
                }
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
