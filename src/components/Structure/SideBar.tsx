import { useContext, useState } from "react";
import { Grid, Snackbar, Typography } from "@mui/material";
import Alert from "./Alerts/Alert";
import BulkRemoveDialog from "./Dialogs/BulkRemoveDialog";
import SavedCombatDrawer from "./Drawers/SavedCombats/SavedCombatDrawer";
import PlayerStatusesTable from "../Status/PlayerStatusesTable";
import CombatantFormDialog from "./Dialogs/CombatantFormDialog";
import FloatingActionsButton from "./Buttons/FloatingActionsButton";
import { AlertContext } from "../../contexts/AlertContext";
import { PlayerStatusesContext } from "../../contexts/PlayerStatusesContext";
import { CombatActorsContext } from "../../contexts/CombatActorsContext";
import { TurnContext } from "../../contexts/TurnContext";

const SideBar = () => {
  const [isActorsDialogOpen, setIsActorsDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [isDataDialogOpen, setIsDataDialogOpen] = useState(false);
  const [addIsOpen, setAddIsOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);

  const { setPlayerStatuses } = useContext(PlayerStatusesContext);
  const { setCombatActors, combatActors } = useContext(CombatActorsContext);
  const { setRound, setTurn } = useContext(TurnContext);
  const {
    statusRemoveAlertOpen,
    setStatusRemoveAlertOpen,
    statusRemoveAlertMessage,
  } = useContext(AlertContext);

  const handleCloseAddCharacter = () => {
    setAddIsOpen(!addIsOpen);
  };
  const handleCloseRemoveStatuses = () => {
    setIsStatusDialogOpen(!isStatusDialogOpen);
  };
  const clearStatuses = () => {
    setPlayerStatuses([]);
    setIsStatusDialogOpen(false);
  };

  const handleCloseRemoveActors = () => {
    setIsActorsDialogOpen(!isActorsDialogOpen);
  };

  const clearActors = () => {
    setCombatActors([]);
    setIsActorsDialogOpen(false);
  };

  const handleCloseRemoveData = () => {
    setIsDataDialogOpen(!isDataDialogOpen);
  };

  const resetRounds = () => {
    setRound(1);
    setTurn({ number: 0, actorPlaying: combatActors[0] });
  };

  const clearAllData = () => {
    setCombatActors([]);
    setPlayerStatuses([]);
    resetRounds();
    setIsDataDialogOpen(false);
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
        <Grid item justifyContent="center">
          <Typography textAlign="center" variant="h6" color="primary">
            Keep track of spells, effects and conditions
          </Typography>
          <PlayerStatusesTable />
        </Grid>
      </Grid>
      <SavedCombatDrawer isOpen={drawer} drawerToggler={toggleDrawer} />
      <BulkRemoveDialog
        open={isStatusDialogOpen}
        closeHandler={handleCloseRemoveStatuses}
        openSetter={setIsStatusDialogOpen}
        contextClearer={clearStatuses}
        dialogMessage={`By pressing "Yes", all current statuses will be lost. Are you sure
        you want to go on?`}
      />
      <BulkRemoveDialog
        open={isActorsDialogOpen}
        closeHandler={handleCloseRemoveActors}
        openSetter={setIsActorsDialogOpen}
        contextClearer={clearActors}
        dialogMessage={`By pressing "Yes", all current characters will be lost. Are you sure
        you want to do this?`}
      />
      <BulkRemoveDialog
        open={isDataDialogOpen}
        closeHandler={handleCloseRemoveData}
        openSetter={setIsDataDialogOpen}
        contextClearer={clearAllData}
        dialogMessage={`By pressing "Yes", all current data (characters and statuses) will be lost. Are you sure
        you want to do this?`}
      />
      <CombatantFormDialog
        open={addIsOpen}
        closeHandler={handleCloseAddCharacter}
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
      <FloatingActionsButton
        toggleAddHandler={handleCloseAddCharacter}
        toggleDrawerHandler={toggleDrawer}
        removeCharactersHandler={handleCloseRemoveActors}
        removeStatusesHandler={handleCloseRemoveStatuses}
        removeAllDataHandler={handleCloseRemoveData}
      />
    </>
  );
};

export default SideBar;
