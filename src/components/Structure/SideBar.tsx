import {
  Box,
  Button,
  Drawer,
  Grid,
  List,
  Snackbar,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { PlayerStatusesContext } from "../../contexts/PlayerStatusesContext";
import PlayerStatusesTable from "../Status/PlayerStatusesTable";
import BulkRemoveDialog from "./BulkRemoveDialog";
import CombatantFormDialog from "../Combatants/CombatantFormDialog";
import Alert from "../Alert";
import { AlertContext } from "../../contexts/AlertContext";
import { SavedCombatsContext } from "../../contexts/SavedCombatsContext";
import SavedCombatItem from "./SavedCombatItem";

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
  const { savedCombats } = useContext(SavedCombatsContext);

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
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setDrawer(open);
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
          onClick={toggleDrawer(true)}
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
      <Drawer anchor="right" open={drawer} onClose={toggleDrawer(false)}>
        <Box
          role="presentation"
          sx={{ width: 300 }}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {savedCombats.map((combat) => (
              <SavedCombatItem combat={combat} />
            ))}
          </List>
        </Box>
      </Drawer>
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
