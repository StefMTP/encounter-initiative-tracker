import { useContext, useState } from "react";
import { Button, Grid, Snackbar, Typography } from "@mui/material";
import Alert from "./Alerts/Alert";
import BulkRemoveDialog from "./Dialogs/BulkRemoveDialog";
import SavedCombatDrawer from "./Drawers/SavedCombats/SavedCombatDrawer";
import PlayerStatusesTable from "../Status/PlayerStatusesTable";
import CombatantFormDialog from "../Combatants/CombatantFormDialog";
import { AlertContext } from "../../contexts/AlertContext";
import { PlayerStatusesContext } from "../../contexts/PlayerStatusesContext";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [addIsOpen, setAddIsOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);

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

  const toggleDrawer =
    () => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (event.type === "keydown") {
        return;
      }

      setDrawer(!drawer);
    };

  return (
    <>
      <Grid
        item
        xs={6}
        display="flex"
        gap={2}
        flexDirection="column"
        justifyItems="center"
        alignItems="center"
        padding={4}
      >
        <Button
          sx={{ maxHeight: "45px" }}
          size="large"
          variant="outlined"
          color="success"
          onClick={() => setAddIsOpen(true)}
        >
          Insert new character
        </Button>
        <Button
          sx={{ maxHeight: "45px" }}
          size="large"
          variant="outlined"
          color="secondary"
          onClick={toggleDrawer()}
        >
          Saved Combats
        </Button>
        <Grid container justifyContent="center">
          <Typography textAlign="center" variant="h6" color="primary">
            Keep track of spells, effects and conditions
          </Typography>
          <PlayerStatusesTable />
          {playerStatuses.length > 0 && (
            <Grid item my={2}>
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
      <SavedCombatDrawer isOpen={drawer} drawerToggler={toggleDrawer} />
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
