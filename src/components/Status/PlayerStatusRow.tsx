import React, { useState } from "react";
import {
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { combatant, playerStatus } from "../../types";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayerStatusCell from "./PlayerStatusCell";

const PlayerStatusRow = ({
  playerStatus,
  combatActor,
  playerStatusRemoveHandler,
  playerStatusNameEditHandler,
  playerStatusStatusEditHandler,
  playerStatusDurationEditHandler,
}: {
  playerStatus: playerStatus;
  combatActor?: combatant;
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
    playerStatusDurationSubmit: string
  ) => void;
}) => {
  const [nameFill, setNameFill] = useState<boolean>(false);
  const [statusFill, setStatusFill] = useState<boolean>(false);
  const [durationFill, setDurationFill] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState<string>("");
  const [statusInput, setStatusInput] = useState<string>("");
  const [durationInput, setDurationInput] = useState<string>("");
  return (
    <TableRow
      sx={{
        bgcolor: combatActor?.color?.primary,
      }}
    >
      <PlayerStatusCell
        fieldFill={nameFill}
        fieldInput={nameInput}
        playerStatusId={playerStatus.id}
        playerStatusField={playerStatus.name}
        playerStatusFieldEditHandler={playerStatusNameEditHandler}
        setFieldFillHandler={setNameFill}
        setFieldInputHandler={setNameInput}
        icon={<EditIcon />}
      />
      <PlayerStatusCell
        fieldFill={statusFill}
        fieldInput={statusInput}
        playerStatusId={playerStatus.id}
        playerStatusField={playerStatus.status}
        playerStatusFieldEditHandler={playerStatusStatusEditHandler}
        setFieldFillHandler={setStatusFill}
        setFieldInputHandler={setStatusInput}
        icon={<EditIcon />}
      />
      <PlayerStatusCell
        fieldFill={durationFill}
        fieldInput={durationInput}
        playerStatusId={playerStatus.id}
        playerStatusField={`${playerStatus.duration}`}
        playerStatusFieldEditHandler={playerStatusDurationEditHandler}
        setFieldFillHandler={setDurationFill}
        setFieldInputHandler={setDurationInput}
        icon={<EditIcon />}
      />
      <TableCell align="center">
        <Button
          size="small"
          variant="contained"
          color="error"
          onClick={() => playerStatusRemoveHandler(playerStatus.id)}
          endIcon={<DeleteIcon />}
        >
          Remove
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default PlayerStatusRow;
