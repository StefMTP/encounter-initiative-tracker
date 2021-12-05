import { Dialog, DialogTitle, List } from "@mui/material";
import ConditionDialogDescription from "./ConditionDialogDescription";

const ConditionDialog = ({
  open,
  closeHandler,
  conditions,
}: {
  open: boolean;
  closeHandler: () => void;
  conditions: string[] | undefined;
}) => {
  return (
    <Dialog open={open} onClose={closeHandler}>
      <DialogTitle>Character conditions</DialogTitle>
      <List>
        {conditions?.map((condition) => (
          <ConditionDialogDescription condition={condition} />
        ))}
      </List>
    </Dialog>
  );
};

export default ConditionDialog;
