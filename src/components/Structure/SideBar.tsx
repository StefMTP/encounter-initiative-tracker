import { Grid, Typography } from "@mui/material";
import CombatantForm from "../Combatants/CombatantForm";
import PlayerStatusesTable from "../Status/PlayerStatusesTable";

const SideBar = () => {
  return (
    <Grid item xs={6} display="grid" justifyContent="center" padding={4}>
      <Grid item>
        <Typography variant="h4" color="secondary" textAlign="center">
          Insert characters into the battle:
        </Typography>
        <CombatantForm />
      </Grid>
      <Grid item>
        <Typography textAlign="center" variant="h5" color="secondary">
          Keep track of spells, effects and conditions:
        </Typography>
        <PlayerStatusesTable />
      </Grid>
    </Grid>
  );
};

export default SideBar;
