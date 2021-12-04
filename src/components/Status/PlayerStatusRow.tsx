import React, { useState } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { combatant, playerStatus } from "../../dummy/data";
import DeleteIcon from "@mui/icons-material/Delete";

const PlayerStatusRow = ({
  playerStatus,
  combatActor,
  combatActors,
  playerStatusRemoveHandler,
  playerStatusNameEditHandler,
  playerStatusStatusEditHandler,
  playerStatusDurationEditHandler,
}: {
  playerStatus: playerStatus;
  combatActor?: combatant;
  combatActors: combatant[];
  playerStatusRemoveHandler: (playerStatusRemoveId: number) => void;
  playerStatusNameEditHandler: (
    playerStatusId: number,
    playerStatusNameSubmit: string
  ) => void;
  playerStatusStatusEditHandler: (
    playerStatusId: number,
    playerStatusStatusSubmit: string
  ) => void;
  playerStatusDurationEditHandler: (
    playerStatusId: number,
    playerStatusDurationSubmit: number
  ) => void;
}) => {
  const [nameFill, setNameFill] = useState<boolean>(false);
  const [statusFill, setStatusFill] = useState<boolean>(false);
  const [durationFill, setDurationFill] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState<string>("");
  const [statusInput, setStatusInput] = useState<string>("");
  const [durationInput, setDurationInput] = useState<number>(0);
  return (
    <TableRow
      key={playerStatus.name}
      sx={{
        bgcolor: combatActor?.color?.primary,
      }}
    >
      <TableCell>
        {nameFill ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              playerStatusNameEditHandler(playerStatus.id, nameInput);
              setNameFill(false);
            }}
          >
            <TextField
              type="text"
              variant="standard"
              size="small"
              onChange={(e) => {
                setNameInput(e.target.value);
              }}
            />
          </form>
        ) : (
          <>
            {playerStatus.name}
            <IconButton size="small" onClick={() => setNameFill(!nameFill)}>
              <EditIcon />
            </IconButton>
          </>
        )}
      </TableCell>
      <TableCell>
        {statusFill ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              playerStatusStatusEditHandler(playerStatus.id, statusInput);
              setStatusFill(false);
            }}
          >
            <TextField
              type="text"
              variant="standard"
              size="small"
              onChange={(e) => {
                setStatusInput(e.target.value);
              }}
            />
          </form>
        ) : (
          <>
            {playerStatus.status}
            <IconButton size="small" onClick={() => setStatusFill(!statusFill)}>
              <EditIcon />
            </IconButton>
          </>
        )}
      </TableCell>
      <TableCell>
        {durationFill ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              playerStatusDurationEditHandler(playerStatus.id, durationInput);
              setDurationFill(false);
            }}
          >
            <TextField
              type="number"
              variant="standard"
              size="small"
              onChange={(e) => {
                setDurationInput(+e.target.value);
              }}
            />
          </form>
        ) : (
          <>
            {playerStatus.duration}
            <IconButton
              size="small"
              onClick={() => setDurationFill(!durationFill)}
            >
              <EditIcon />
            </IconButton>
          </>
        )}
      </TableCell>
      <TableCell>
        <IconButton
          size="small"
          onClick={() => playerStatusRemoveHandler(playerStatus.id)}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default PlayerStatusRow;
