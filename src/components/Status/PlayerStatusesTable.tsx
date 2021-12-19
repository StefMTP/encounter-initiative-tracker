import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { playerStatus } from "../../types";
import PlayerStatusRow from "./PlayerStatusRow";
import { v4 as uuid } from "uuid";
import { useContext } from "react";
import { CombatActorsContext } from "../../contexts/CombatActorsContext";
import { PlayerStatusesContext } from "../../contexts/PlayerStatusesContext";

const PlayerStatusesTable = () => {
  const { combatActors } = useContext(CombatActorsContext);
  const { playerStatuses, setPlayerStatuses } = useContext(
    PlayerStatusesContext
  );

  const submitPlayerStatus = (playerStatusSubmit: playerStatus) => {
    setPlayerStatuses([...playerStatuses, playerStatusSubmit]);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 450, tableLayout: "fixed" }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Character</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Duration (rounds)</TableCell>
            <TableCell align="right">
              <Button
                variant="outlined"
                endIcon={<AddIcon />}
                onClick={() =>
                  submitPlayerStatus({
                    id: uuid(),
                    name: "",
                    status: "",
                    duration: 0,
                  })
                }
              >
                Add Status
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {playerStatuses.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4}>
                <Typography textAlign="center">
                  No status effects added.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            playerStatuses.map((playerStatus) => (
              <PlayerStatusRow
                key={playerStatus.id}
                combatActor={combatActors.find(
                  (actor) => actor.name === playerStatus.name
                )}
                playerStatus={playerStatus}
              />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlayerStatusesTable;
