import { Button, Grid, Snackbar, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { PlayerStatusesContext } from "../../contexts/PlayerStatusesContext";
import PlayerStatusesTable from "../Status/PlayerStatusesTable";
import BulkRemoveDialog from "./BulkRemoveDialog";
import CombatantFormDialog from "../Combatants/CombatantFormDialog";
import Alert from "../Alert";
import { AlertContext } from "../../contexts/AlertContext";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [addIsOpen, setAddIsOpen] = useState(false);

  const { playerStatuses, setPlayerStatuses } = useContext(
    PlayerStatusesContext
  );
  const {
    statusRemoveAlertOpen,
    setStatusRemoveAlertOpen,
    statusRemoveAlertMessage,
  } = useContext(AlertContext);

  const handleCloseRemove = () => {
    setIsOpen(!isOpen);
  };
  const handleCloseAdd = () => {
    setAddIsOpen(!addIsOpen);
  };
  const clearStatuses = () => {
    setPlayerStatuses([]);
    setIsOpen(false);
  };

  const handleRemoveAlertClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setStatusRemoveAlertOpen(false);
  };

  return (
    <>
      <Grid item xs={6} display="grid" justifyItems="center" padding={4}>
        <Button
          sx={{ margin: "30px 0" }}
          size="large"
          variant="outlined"
          color="success"
          onClick={() => setAddIsOpen(true)}
        >
          Insert characters into the battle
        </Button>
        <Grid container justifyContent="center">
          <Typography textAlign="center" variant="h5" color="secondary">
            Keep track of spells, effects and conditions:
          </Typography>
          <PlayerStatusesTable />
          {playerStatuses.length > 0 && (
            <Grid item>
              <Button
                variant="contained"
                color="error"
                onClick={() => setIsOpen(true)}
              >
                Remove all statuses
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
      <BulkRemoveDialog
        open={isOpen}
        closeHandler={handleCloseRemove}
        openSetter={setIsOpen}
        contextClearer={clearStatuses}
        dialogMessage={`By pressing "Yes" all current statuses will be lost. Are you sure
        you want to go on?`}
      />
      <CombatantFormDialog
        open={addIsOpen}
        closeHandler={handleCloseAdd}
        openSetter={setAddIsOpen}
      />
      <Snackbar
        open={statusRemoveAlertOpen}
        onClose={handleRemoveAlertClose}
        autoHideDuration={6000}
      >
        <Alert
          onClose={handleRemoveAlertClose}
          sx={{ width: "100%" }}
          severity="error"
        >
          {statusRemoveAlertMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SideBar;
