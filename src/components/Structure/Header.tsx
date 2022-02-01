import { useContext } from "react";
import { Typography, Grid, Button } from "@mui/material";
import TurnButton from "./Buttons/TurnButton";
import { TurnContext } from "../../contexts/TurnContext";
import { AlertContext } from "../../contexts/AlertContext";
import { CombatActorsContext } from "../../contexts/CombatActorsContext";
import { PlayerStatusesContext } from "../../contexts/PlayerStatusesContext";

const Header = () => {
  const { turn, setTurn, round, setRound } = useContext(TurnContext);
  const { combatActors } = useContext(CombatActorsContext);
  const { playerStatuses, setPlayerStatuses } = useContext(
    PlayerStatusesContext
  );
  const { setStatusRemoveAlertOpen, setStatusRemoveAlertMessage } =
    useContext(AlertContext);

  const resetRounds = () => {
    setRound(1);
    setTurn({ number: 0, actorPlaying: combatActors[0] });
  };

  const changeTurn = (turnButtonType: "next" | "previous") => {
    if (turnButtonType === "next") {
      if (
        turn.number === combatActors.length - 1 ||
        combatActors.length === 0
      ) {
        setRound((prevRound) => {
          const tmpPlayerStatuses = playerStatuses.filter((tmpPlayerStatus) => {
            if (tmpPlayerStatus.duration !== 0) {
              return true;
            }
            setStatusRemoveAlertMessage(
              `${
                tmpPlayerStatus.status.trim().length === 0
                  ? "Status"
                  : tmpPlayerStatus.status
              } was removed from ${
                tmpPlayerStatus.name.trim().length === 0
                  ? "character"
                  : tmpPlayerStatus.name
              }`
            );
            setStatusRemoveAlertOpen(true);
            return false;
          });
          tmpPlayerStatuses.forEach((tmpPlayerStatus) => {
            tmpPlayerStatus.duration--;
          });
          setPlayerStatuses(tmpPlayerStatuses);
          return prevRound + 1;
        });
      }
      setTurn({
        number: turn.number + 1 < combatActors.length ? turn.number + 1 : 0,
        actorPlaying:
          combatActors[
            combatActors.indexOf(turn.actorPlaying) + 1 < combatActors.length
              ? turn.number + 1
              : 0
          ],
      });
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
      if (round === 1 && turn.number === 0) {
        setTurn(turn);
      } else {
        setTurn({
          number:
            turn.number - 1 < 0 ? combatActors.length - 1 : turn.number - 1,
          actorPlaying:
            combatActors[
              combatActors.indexOf(turn.actorPlaying) > 0
                ? turn.number - 1
                : combatActors.length - 1
            ],
        });
      }
    }
  };
  return (
    <>
      <Typography variant="h3" color="white" textAlign="center">
        Round {round}
      </Typography>
      <Grid container justifyContent="space-evenly" alignItems="center">
        <Grid item>
          <TurnButton
            label="Previous turn"
            color="warning"
            variant="outlined"
            turnChangeHandler={() => changeTurn("previous")}
          />
        </Grid>
        <Grid item display="grid" justifyItems="center" gap={2}>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => resetRounds()}
          >
            Reset Rounds
          </Button>
        </Grid>
        <Grid item>
          <TurnButton
            label="Next turn"
            color="info"
            variant="contained"
            turnChangeHandler={() => changeTurn("next")}
          />
        </Grid>
      </Grid>
      {/* <BulkRemoveDialog
        open={isOpen}
        closeHandler={handleClose}
        openSetter={setIsOpen}
        contextClearer={clearAll}
        dialogMessage={`By pressing "Yes" all current data (characters and statuses) will be lost. Are you sure
        you want to do this?`}
      /> */}
    </>
  );
};

export default Header;
