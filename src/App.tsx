import React, { useState, useEffect } from "react";
import {
  turn,
  combatant,
  dummyCombatants,
  dummyPlayerStatuses,
  sortCombatants,
  playerStatus,
} from "./dummy/data";
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
import PlayerStatusesTable from "./components/Status/PlayerStatusesTable";

const darkTheme = createTheme({ palette: { mode: "dark" } });

const App = () => {
  const [round, setRound] = useState<number>(1);
  const [turn, setTurn] = useState<turn>({
    number: 0,
    actorPlaying: {
      id: "",
      name: "",
      type: "PC",
      alignment: "PARTY",
      initiative: 0,
    },
  });
  const [combatActors, setCombatActors] = useState<combatant[]>([]);
  const [playerStatuses, setPlayerStatuses] = useState<playerStatus[]>([]);

  useEffect(() => {
    // dummy data for the round timeline
    setCombatActors(sortCombatants(dummyCombatants));
    // dummy data for the player statuses
    setPlayerStatuses(dummyPlayerStatuses);
    setRound(1);
    setTurn({ number: round - 1, actorPlaying: combatActors[0] });
  }, []);

  const handleCombatActorSubmit = (combatActorSubmit: combatant) => {
    setCombatActors(sortCombatants([...combatActors, combatActorSubmit]));
  };

  const handleCombatActorRemove = (combatActorId: string) => {
    setCombatActors(
      combatActors.filter((combatActor) => combatActorId !== combatActor.id)
    );
  };

  const handlePlayerStatusSubmit = (playerStatusSubmit: playerStatus) => {
    setPlayerStatuses([...playerStatuses, playerStatusSubmit]);
  };

  const handlePlayerStatusRemove = (playerStatusId: string) => {
    setPlayerStatuses(
      playerStatuses.filter(
        (playerStatus) => playerStatusId !== playerStatus.id
      )
    );
  };

  const handlePlayerStatusNameEdit = (
    playerStatusId: string,
    playerStatusNameSubmit: string
  ) => {
    const playerStatusToEdit = playerStatuses.find(
      (playerStatus) => playerStatus.id === playerStatusId
    );
    if (playerStatusToEdit) {
      playerStatusToEdit.name = playerStatusNameSubmit;
      const tmpPlayerStatuses = playerStatuses.filter(
        (playerStatus) => playerStatus.id !== playerStatusId
      );
      tmpPlayerStatuses.push(playerStatusToEdit);
      setPlayerStatuses(tmpPlayerStatuses);
    }
  };

  const handlePlayerStatusDurationEdit = (
    playerStatusId: string,
    playerStatusDurationSubmit: number
  ) => {
    const playerStatusToEdit = playerStatuses.find(
      (playerStatus) => playerStatus.id === playerStatusId
    );
    if (playerStatusToEdit) {
      playerStatusToEdit.duration = playerStatusDurationSubmit;
      const tmpPlayerStatuses = playerStatuses.filter(
        (playerStatus) => playerStatus.id !== playerStatusId
      );
      tmpPlayerStatuses.push(playerStatusToEdit);
      setPlayerStatuses(tmpPlayerStatuses);
    }
  };

  const handlePlayerStatusStatusEdit = (
    playerStatusId: string,
    playerStatusStatusSubmit: string
  ) => {
    const playerStatusToEdit = playerStatuses.find(
      (playerStatus) => playerStatus.id === playerStatusId
    );
    if (playerStatusToEdit) {
      playerStatusToEdit.status = playerStatusStatusSubmit;
      const tmpPlayerStatuses = playerStatuses.filter(
        (playerStatus) => playerStatus.id !== playerStatusId
      );
      tmpPlayerStatuses.push(playerStatusToEdit);
      setPlayerStatuses(tmpPlayerStatuses);
    }
  };

  const handleCombatActorsHpEdit = (combatActorId: string, hpInput: number) => {
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
      if (
        turn.number === combatActors.length - 1 ||
        combatActors.length === 0
      ) {
        setRound((prevRound) => {
          const tmpPlayerStatuses = playerStatuses.filter(
            (tmpPlayerStatus) => tmpPlayerStatus.duration !== 0
          );
          tmpPlayerStatuses.forEach((tmpPlayerStatus) => {
            tmpPlayerStatus.duration--;
          });
          setPlayerStatuses(tmpPlayerStatuses);
          return prevRound + 1;
        });
      }
      setTurn((prevTurn) => ({
        number:
          prevTurn.number + 1 < combatActors.length ? prevTurn.number + 1 : 0,
        actorPlaying:
          combatActors[
            combatActors.indexOf(prevTurn.actorPlaying) + 1 <
            combatActors.length
              ? combatActors.indexOf(prevTurn.actorPlaying) + 1
              : 0
          ],
      }));
    } else if (turnButtonType === "previous") {
      if (round !== 1) {
        if (turn.number === 0 || combatActors.length === 0) {
          setRound((prevRound) => {
            const tmpPlayerStatuses = playerStatuses;
            tmpPlayerStatuses.forEach((tmpPlayerStatus) => {
              tmpPlayerStatus.duration++;
            });
            setPlayerStatuses(tmpPlayerStatuses);
            return prevRound - 1;
          });
        }
      }
      setTurn((prevTurn) => ({
        number:
          prevTurn.number - 1 < 0
            ? combatActors.length - 1
            : prevTurn.number - 1,
        actorPlaying:
          combatActors[
            combatActors.indexOf(prevTurn.actorPlaying) > 0
              ? combatActors.indexOf(prevTurn.actorPlaying) - 1
              : combatActors.length - 1
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
                combatActorsHpEditHandler={handleCombatActorsHpEdit}
                combatActorsRemoveHandler={handleCombatActorRemove}
                turn={turn}
              />
            </Grid>
            <Grid container justifyContent="center" display="grid">
              <Grid item>
                <Typography variant="h4" color="secondary">
                  Insert characters into the battle:
                </Typography>
              </Grid>
              <Grid item>
                <CombatantForm
                  combatantsNumber={combatActors.length}
                  combatActorSubmitHandler={handleCombatActorSubmit}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container display="grid" justifyContent="center">
            <PlayerStatusesTable
              combatActors={combatActors}
              playerStatuses={playerStatuses}
              playerStatusSubmitHandler={handlePlayerStatusSubmit}
              playerStatusRemoveHandler={handlePlayerStatusRemove}
              playerStatusDurationEditHandler={handlePlayerStatusDurationEdit}
              playerStatusNameEditHandler={handlePlayerStatusNameEdit}
              playerStatusStatusEditHandler={handlePlayerStatusStatusEdit}
            />
          </Grid>
        </Box>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
