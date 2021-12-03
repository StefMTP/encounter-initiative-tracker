import React, { useState, useEffect } from "react";

import { turn, combatant, combatants, sortCombatants } from "./dummy/data";
import {
  Typography,
  createTheme,
  ThemeProvider,
  Box,
  Grid,
} from "@mui/material";
import TurnButton from "./components/TurnButton";
import RoundTimeline from "./components/Round/RoundTimeline";
import CombatantForm from "./components/Combatants/CombatantForm";

const darkTheme = createTheme({ palette: { mode: "dark" } });
const lightTheme = createTheme({ palette: { mode: "light" } });

const App = () => {
  const [round, setRound] = useState<number>(1);
  const [turn, setTurn] = useState<turn>({
    number: 0,
    actorPlaying: {
      id: 0,
      name: "",
      type: "PC",
      alignment: "PARTY",
      initiative: 0,
    },
  });
  const [combatActors, setCombatActors] = useState<combatant[]>([]);

  useEffect(() => {
    setCombatActors(sortCombatants(combatants));
    setRound(1);
    setTurn({ number: round - 1, actorPlaying: combatActors[0] });
  }, []);

  const combatActorSubmitHandler = (combatActorSubmit: combatant) => {
    setCombatActors(sortCombatants([...combatants, combatActorSubmit]));
  };

  const handleCombatActors = (combatActorId: number, hpInput: number) => {
    const combatActorToEdit = combatActors.find(
      (combatActor) => combatActorId === combatActor.id
    );
    if (
      combatActorToEdit &&
      combatActorToEdit["currentHp"] &&
      combatActorToEdit["maxHp"]
    ) {
      combatActorToEdit.currentHp =
        hpInput > combatActorToEdit.maxHp ? combatActorToEdit.maxHp : hpInput;
      const tmpActors = combatActors.filter(
        (combatActor) => combatActor.id !== combatActorId
      );
      tmpActors.push(combatActorToEdit);
      setCombatActors(sortCombatants(tmpActors));
    }
  };

  const handleTurnChange = (turnButtonType: "next" | "previous") => {
    if (turnButtonType === "next") {
      if (turn.number === combatants.length - 1) {
        setRound((prevRound) => prevRound + 1);
      }
      setTurn((prevTurn) => ({
        number:
          prevTurn.number + 1 < combatants.length ? prevTurn.number + 1 : 0,
        actorPlaying:
          combatants[
            combatants.indexOf(prevTurn.actorPlaying) + 1 < combatants.length
              ? combatants.indexOf(prevTurn.actorPlaying) + 1
              : 0
          ],
      }));
    } else if (turnButtonType === "previous") {
      if (turn.number === 0 && round !== 1) {
        setRound((prevRound) => prevRound - 1);
      }
      setTurn((prevTurn) => ({
        number:
          prevTurn.number - 1 < 0 ? combatants.length - 1 : prevTurn.number - 1,
        actorPlaying:
          combatants[
            combatants.indexOf(prevTurn.actorPlaying) > 0
              ? combatants.indexOf(prevTurn.actorPlaying) - 1
              : combatants.length - 1
          ],
      }));
    }
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={darkTheme}>
        <Box sx={{ bgcolor: "background.default", width: 1, height: 1 }}>
          <Typography variant="h3" color="white" textAlign="center">
            Round {round}
          </Typography>
          <Grid container justifyContent="space-evenly">
            <Grid item>
              <TurnButton
                label="Previous turn"
                color="error"
                variant="outlined"
                turnChangeHandler={() => handleTurnChange("previous")}
              />
            </Grid>
            <Grid item>
              <TurnButton
                label="Next turn"
                color="primary"
                variant="outlined"
                turnChangeHandler={() => handleTurnChange("next")}
              />
            </Grid>
          </Grid>
          <Grid container direction="column">
            <Grid item>
              <RoundTimeline
                combatActors={combatActors}
                combatActorsHandler={handleCombatActors}
                turn={turn}
              />
            </Grid>
            <Grid container justifyContent="center" display="grid">
              <Grid item>
                <Typography variant="h4" color="secondary">
                  Insert characters into the fray:
                </Typography>
              </Grid>
              <Grid item>
                <CombatantForm submitNewCombatant={combatActorSubmitHandler} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
