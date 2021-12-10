import { Button, Grid, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { PlayerStatusesContext } from "../../contexts/PlayerStatusesContext";
import CombatantForm from "../Combatants/CombatantForm";
import PlayerStatusesTable from "../Status/PlayerStatusesTable";
import BulkRemoveDialog from "./BulkRemoveDialog";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { playerStatuses, setPlayerStatuses } = useContext(
    PlayerStatusesContext
  );

  const handleClose = () => {
    setIsOpen(!isOpen);
  };
  const clearStatuses = () => {
    setPlayerStatuses([]);
    setIsOpen(false);
  };

  return (
    <>
      <Grid item xs={6} display="grid" justifyContent="center" padding={4}>
        <Grid item>
          <Typography variant="h4" color="secondary" textAlign="center">
            Insert characters into the battle:
          </Typography>
          <CombatantForm />
        </Grid>
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
        closeHandler={handleClose}
        openSetter={setIsOpen}
        contextClearer={clearStatuses}
        dialogMessage={`By pressing "Yes" all current statuses will be lost. Are you sure
        you want to go on?`}
      />
    </>
  );
};

export default SideBar;
