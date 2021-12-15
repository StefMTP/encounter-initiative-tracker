import React, { useContext, useState } from "react";
import { Grid, Button, Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { AlertContext } from "../../contexts/AlertContext";
import { CombatActorsContext } from "../../contexts/CombatActorsContext";
import RoundTimeline from "../Round/RoundTimeline";
import BulkRemoveDialog from "./BulkRemoveDialog";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MainBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { combatActors, setCombatActors } = useContext(CombatActorsContext);
  const { actorSubmitAlertOpen, setActorSubmitAlertOpen } =
    useContext(AlertContext);

  const handleSubmitAlertClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setActorSubmitAlertOpen(false);
  };

  const handleDialogRemoveClose = () => {
    setIsOpen(!isOpen);
  };

  const clearActors = () => {
    setCombatActors([]);
    setIsOpen(false);
  };

  return (
    <>
      <Grid item xs={6} display="grid">
        <RoundTimeline />
        {combatActors.length > 0 && (
          <Grid item justifySelf="center">
            <Button
              variant="contained"
              color="error"
              onClick={() => setIsOpen(true)}
            >
              Remove all Characters
            </Button>
          </Grid>
        )}
      </Grid>
      <BulkRemoveDialog
        open={isOpen}
        closeHandler={handleDialogRemoveClose}
        openSetter={setIsOpen}
        contextClearer={clearActors}
        dialogMessage={`By pressing "Yes" all current characters will be lost. Are you sure
        you want to do this?`}
      />
      <Snackbar
        open={actorSubmitAlertOpen}
        onClose={handleSubmitAlertClose}
        autoHideDuration={6000}
      >
        <Alert
          onClose={handleSubmitAlertClose}
          sx={{ width: "100%" }}
          severity="success"
        >
          Character added successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default MainBar;
