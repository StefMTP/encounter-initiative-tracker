import React, { useContext } from "react";
import { Drawer, Box, List, Button, Grid } from "@mui/material";
import SavedCombatItem from "./SavedCombatItem";
import { SavedCombatsContext } from "../../contexts/SavedCombatsContext";
import { Add } from "@mui/icons-material";
import { CombatActorsContext } from "../../contexts/CombatActorsContext";
import { TurnContext } from "../../contexts/TurnContext";
import { PlayerStatusesContext } from "../../contexts/PlayerStatusesContext";

const SavedCombatDrawer = ({
  isOpen,
  drawerToggler,
}: {
  isOpen: boolean;
  drawerToggler: () => (event: React.KeyboardEvent | React.MouseEvent) => void;
}) => {
  const { savedCombats, setSavedCombats } = useContext(SavedCombatsContext);
  const { combatActors } = useContext(CombatActorsContext);
  const { turn, round } = useContext(TurnContext);
  const { playerStatuses } = useContext(PlayerStatusesContext);

  const saveCombat = () => {
    setSavedCombats([
      ...savedCombats,
      {
        name: "New Combat",
        savedActors: combatActors,
        savedTurn: turn,
        savedRound: round,
        savedPlayerStatuses: playerStatuses,
      },
    ]);
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={drawerToggler()}>
      <Box role="presentation" sx={{ width: 300 }} onKeyDown={drawerToggler()}>
        <Grid my={2} container justifyContent="center">
          <Button
            onClick={saveCombat}
            variant="contained"
            size="small"
            endIcon={<Add />}
          >
            Save current Combat
          </Button>
        </Grid>
        <List>
          {savedCombats.map((combat) => (
            <SavedCombatItem combat={combat} />
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SavedCombatDrawer;
