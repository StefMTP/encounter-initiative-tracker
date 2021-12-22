import React, { useContext, useState } from "react";
import { Grid, Button, Snackbar } from "@mui/material";
import Alert from "../Alert";
import BulkRemoveDialog from "./BulkRemoveDialog";
import RoundTimeline from "../Round/RoundTimeline";
import { TurnContext } from "../../contexts/TurnContext";
import { AlertContext } from "../../contexts/AlertContext";
import { CombatActorsContext } from "../../contexts/CombatActorsContext";
import { isEmpty, sortPlayerActors } from "../../helpers";

const MainBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { combatActors, setCombatActors } = useContext(CombatActorsContext);
  const {
    actorSubmitAlertOpen,
    setActorSubmitAlertOpen,
    actorSubmitAlertMessage,
    setActorRemoveAlertOpen,
    actorRemoveAlertOpen,
    actorRemoveAlertMessage,
    actorRemoveAlertObject,
  } = useContext(AlertContext);
  const { turn, setTurn } = useContext(TurnContext);

  const undoActorRemoval = () => {
    if (
      !isEmpty(actorRemoveAlertObject) &&
      !combatActors.includes(actorRemoveAlertObject)
    ) {
      setCombatActors(
        sortPlayerActors([...combatActors, actorRemoveAlertObject])
      );
      if (turn.actorPlaying.name === actorRemoveAlertObject.name) {
        // if it is the player at the bottom that gets removed and it is their turn, fix????
        setTurn({
          number: turn.number,
          actorPlaying: actorRemoveAlertObject,
        });
      } else {
        if (actorRemoveAlertObject.initiative > turn.actorPlaying.initiative) {
          setTurn({ number: turn.number + 1, actorPlaying: turn.actorPlaying });
        } else {
          setTurn(turn);
        }
      }
    }
    setActorRemoveAlertOpen(false);
  };

  const handleSubmitAlertClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setActorSubmitAlertOpen(false);
  };

  const handleRemoveAlertClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setActorRemoveAlertOpen(false);
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
          {actorSubmitAlertMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={actorRemoveAlertOpen}
        onClose={handleRemoveAlertClose}
        autoHideDuration={6000}
      >
        <Alert
          onClose={handleRemoveAlertClose}
          sx={{ width: "100%" }}
          severity="error"
          action={
            <>
              <Button
                color="warning"
                size="small"
                sx={{ fontWeight: 600 }}
                onClick={() => undoActorRemoval()}
              >
                UNDO
              </Button>
            </>
          }
        >
          {actorRemoveAlertMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default MainBar;
