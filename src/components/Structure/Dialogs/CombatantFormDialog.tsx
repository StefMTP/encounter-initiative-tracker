import { Dialog, DialogTitle, Box } from "@mui/material";
import CombatantForm from "../../Combatants/CombatantForm";

const CombatantFormDialog = ({
  open,
  openSetter,
  closeHandler,
}: {
  open: boolean;
  openSetter: React.Dispatch<React.SetStateAction<boolean>>;
  closeHandler: () => void;
}) => {
  return (
    <Dialog open={open} onClose={closeHandler} fullWidth>
      <DialogTitle>Add new character</DialogTitle>
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 3,
        }}
      >
        <CombatantForm openSetter={openSetter} />
      </Box>
    </Dialog>
  );
};

export default CombatantFormDialog;
