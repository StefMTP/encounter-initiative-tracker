import { Grid } from "@mui/material";
import RoundTimeline from "../Round/RoundTimeline";

const MainBar = () => {
  return (
    <Grid item xs={6} display="grid">
      <RoundTimeline />
    </Grid>
  );
};

export default MainBar;
