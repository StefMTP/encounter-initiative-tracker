import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  Box,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { CombatActorsContext } from "../../contexts/CombatActorsContext";
import RoundTimeline from "../Round/RoundTimeline";

const MainBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { combatActors, setCombatActors } = useContext(CombatActorsContext);

  const handleClose = () => {
    setIsOpen(!isOpen);
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
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>WARNING!</DialogTitle>
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            bgcolor: "background.paper",
            p: 3,
          }}
        >
          <Typography variant="h6" textAlign="center">
            By pressing "Yes" all current characters will be lost. Are you sure
            you want to go on?
          </Typography>
          <Grid container sx={{ mt: 3 }} justifyContent="space-evenly">
            <Grid item>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  setCombatActors([]);
                  setIsOpen(false);
                }}
              >
                Yes
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="warning"
                onClick={() => setIsOpen(false)}
              >
                No
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </>
  );
};

export default MainBar;
