import { Typography, Grid } from "@mui/material";
import { useContext } from "react";
import { CombatActorsContext } from "../../contexts/CombatActorsContext";
import { PlayerStatusesContext } from "../../contexts/PlayerStatusesContext";
import { TurnContext } from "../../contexts/TurnContext";
import TurnButton from "../TurnButton";

const Header = () => {
  const { turn, setTurn, round, setRound } = useContext(TurnContext);
  const { combatActors } = useContext(CombatActorsContext);
  const { playerStatuses, setPlayerStatuses } = useContext(
    PlayerStatusesContext
  );

  const changeTurn = (turnButtonType: "next" | "previous") => {
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
    <>
      <Typography variant="h3" color="white" textAlign="center">
        Round {round}
      </Typography>
      <Grid container justifyContent="space-evenly">
        <Grid item>
          <TurnButton
            label="Previous turn"
            color="error"
            variant="outlined"
            turnChangeHandler={() => changeTurn("previous")}
          />
        </Grid>
        <Grid item>
          <TurnButton
            label="Next turn"
            color="primary"
            variant="contained"
            turnChangeHandler={() => changeTurn("next")}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
