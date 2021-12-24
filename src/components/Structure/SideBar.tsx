import { useContext, useState } from "react";
import {
  Button,
  ClickAwayListener,
  Fab,
  Grid,
  Snackbar,
  Typography,
  Zoom,
} from "@mui/material";
import { Add, Clear, MoreVert, SportsKabaddi } from "@mui/icons-material";
import { green } from "@mui/material/colors";
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
  const [isFabExpanded, setIsFabExpanded] = useState(false);

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
      <ClickAwayListener onClickAway={() => setIsFabExpanded(false)}>
        <Fab
          color="primary"
          sx={{ position: "fixed", bottom: 30, right: 30 }}
          onClick={() => setIsFabExpanded(!isFabExpanded)}
        >
          {isFabExpanded ? <Clear /> : <MoreVert />}
        </Fab>
      </ClickAwayListener>
      <Zoom
        in={isFabExpanded}
        style={{ transitionDelay: isFabExpanded ? "50ms" : "0ms" }}
      >
        <Fab
          sx={{
            color: "common.white",
            bgcolor: green[500],
            "&:hover": {
              bgcolor: green[600],
            },
            position: "fixed",
            bottom: 100,
            right: 30,
          }}
          onClick={() => setAddIsOpen(true)}
        >
          <Add />
        </Fab>
      </Zoom>
      <Zoom
        in={isFabExpanded}
        style={{ transitionDelay: isFabExpanded ? "100ms" : "0ms" }}
      >
        <Fab
          sx={{
            color: "common.white",
            bgcolor: "secondary.main",
            "&:hover": {
              bgcolor: "secondary.dark",
            },
            position: "fixed",
            bottom: 170,
            right: 30,
          }}
          onClick={toggleDrawer()}
        >
          <SportsKabaddi />
        </Fab>
      </Zoom>
    </>
  );
};

export default SideBar;
