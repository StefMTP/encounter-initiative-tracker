import { Grid, Button } from "@mui/material";
import { useContext, useState } from "react";
import { CombatActorsContext } from "../../contexts/CombatActorsContext";
import RoundTimeline from "../Round/RoundTimeline";
import BulkRemoveDialog from "./BulkRemoveDialog";

const MainBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { combatActors, setCombatActors } = useContext(CombatActorsContext);

  const handleClose = () => {
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
        closeHandler={handleClose}
        openSetter={setIsOpen}
        contextClearer={clearActors}
        dialogMessage={`By pressing "Yes" all current characters will be lost. Are you sure
        you want to do this?`}
      />
    </>
  );
};

export default MainBar;
