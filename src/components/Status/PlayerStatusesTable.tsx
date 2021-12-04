import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { combatant, playerStatus } from "../../dummy/data";
import PlayerStatusRow from "./PlayerStatusRow";
import {v4 as uuid} from "uuid";

const PlayerStatusesTable = ({
  playerStatuses,
  combatActors,
  playerStatusSubmitHandler,
  playerStatusRemoveHandler,
  playerStatusNameEditHandler,
  playerStatusStatusEditHandler,
  playerStatusDurationEditHandler,
}: {
  playerStatuses: playerStatus[];
  combatActors: combatant[];
  playerStatusSubmitHandler: (playerStatusSubmit: playerStatus) => void;
  playerStatusRemoveHandler: (playerStatusRemoveId: string) => void;
  playerStatusNameEditHandler: (
    playerStatusId: string,
    playerStatusNameSubmit: string
  ) => void;
  playerStatusStatusEditHandler: (
    playerStatusId: string,
    playerStatusStatusSubmit: string
  ) => void;
  playerStatusDurationEditHandler: (
    playerStatusId: string,
    playerStatusDurationSubmit: number
  ) => void;
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Character</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Duration (rounds)</TableCell>
            <TableCell>
              <Button
                variant="outlined"
                endIcon={<AddIcon />}
                onClick={() =>
                  playerStatusSubmitHandler({
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
          {playerStatuses.map((playerStatus) => (
            <PlayerStatusRow
              combatActors={combatActors}
              combatActor={combatActors.find(
                (actor) => actor.name === playerStatus.name
              )}
              playerStatus={playerStatus}
              playerStatusRemoveHandler={playerStatusRemoveHandler}
              playerStatusNameEditHandler={playerStatusNameEditHandler}
              playerStatusStatusEditHandler={playerStatusStatusEditHandler}
              playerStatusDurationEditHandler={playerStatusDurationEditHandler}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlayerStatusesTable;
