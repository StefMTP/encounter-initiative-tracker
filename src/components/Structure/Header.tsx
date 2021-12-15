import { Typography, Grid, Button } from "@mui/material";
import { useContext, useState } from "react";
import { CombatActorsContext } from "../../contexts/CombatActorsContext";
import { PlayerStatusesContext } from "../../contexts/PlayerStatusesContext";
import { TurnContext } from "../../contexts/TurnContext";
import TurnButton from "../TurnButton";
import BulkRemoveDialog from "./BulkRemoveDialog";

const Header = () => {
  const { turn, setTurn, round, setRound } = useContext(TurnContext);
  const { combatActors, setCombatActors } = useContext(CombatActorsContext);
  const { playerStatuses, setPlayerStatuses } = useContext(
    PlayerStatusesContext
  );

  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  const resetRounds = () => {
    setRound(1);
    setTurn({ number: 0, actorPlaying: combatActors[0] });
  };

  const clearAll = () => {
    setCombatActors([]);
    setPlayerStatuses([]);
    resetRounds();
    setIsOpen(false);
  };

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
            color="warning"
            onClick={() => resetRounds()}
          >
            Reset Rounds
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => setIsOpen(true)}
          >
            Clear all
          </Button>
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
      <BulkRemoveDialog
        open={isOpen}
        closeHandler={handleClose}
        openSetter={setIsOpen}
        contextClearer={clearAll}
        dialogMessage={`By pressing "Yes" all current data (characters and statuses) will be lost. Are you sure
        you want to do this?`}
      />
    </>
  );
};

export default Header;
