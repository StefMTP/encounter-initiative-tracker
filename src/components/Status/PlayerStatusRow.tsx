import React, { useContext, useState } from "react";
import { TableRow, TableCell, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { combatant, playerStatus } from "../../types";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayerStatusCell from "./PlayerStatusCell";
import { PlayerStatusesContext } from "../../contexts/PlayerStatusesContext";
import { Add } from "@mui/icons-material";

const PlayerStatusRow = ({
  playerStatus,
  combatActor,
}: {
  playerStatus: playerStatus;
  combatActor?: combatant;
}) => {
  const [nameFill, setNameFill] = useState<boolean>(false);
  const [statusFill, setStatusFill] = useState<boolean>(false);
  const [durationFill, setDurationFill] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState<string>("");
  const [statusInput, setStatusInput] = useState<string>("");
  const [durationInput, setDurationInput] = useState<string>("");

  const { playerStatuses, setPlayerStatuses } = useContext(
    PlayerStatusesContext
  );

  const removePlayerStatus = (playerStatusId: string) => {
    setPlayerStatuses(
      playerStatuses.filter(
        (playerStatus) => playerStatusId !== playerStatus.id
      )
    );
  };

  const editPlayerStatusName = (
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

  const editPlayerStatusDuration = (
    playerStatusId: string,
    playerStatusDurationSubmit: string
  ) => {
    const playerStatusToEdit = playerStatuses.find(
      (playerStatus) => playerStatus.id === playerStatusId
    );
    if (playerStatusToEdit) {
      playerStatusToEdit.duration = +playerStatusDurationSubmit;
      const tmpPlayerStatuses = playerStatuses.filter(
        (playerStatus) => playerStatus.id !== playerStatusId
      );
      tmpPlayerStatuses.push(playerStatusToEdit);
      setPlayerStatuses(tmpPlayerStatuses);
    }
  };

  const editPlayerStatusStatus = (
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
        playerStatusFieldEditHandler={editPlayerStatusName}
        setFieldFillHandler={setNameFill}
        setFieldInputHandler={setNameInput}
        icon={<EditIcon />}
        type="autocomplete"
      />
      <PlayerStatusCell
        fieldFill={statusFill}
        fieldInput={statusInput}
        playerStatusId={playerStatus.id}
        playerStatusField={playerStatus.status}
        playerStatusFieldEditHandler={editPlayerStatusStatus}
        setFieldFillHandler={setStatusFill}
        setFieldInputHandler={setStatusInput}
        icon={<EditIcon />}
        type="text"
      />
      <PlayerStatusCell
        fieldFill={durationFill}
        fieldInput={durationInput}
        playerStatusId={playerStatus.id}
        playerStatusField={`${playerStatus.duration}`}
        playerStatusFieldEditHandler={editPlayerStatusDuration}
        setFieldFillHandler={setDurationFill}
        setFieldInputHandler={setDurationInput}
        icon={<EditIcon />}
        type="number"
      />
      <TableCell align="right">
        {nameFill || statusFill || durationFill ? (
          <Button
            size="small"
            variant="contained"
            color="success"
            onClick={() => {
              editPlayerStatusName(playerStatus.id, nameInput);
              editPlayerStatusStatus(playerStatus.id, statusInput);
              editPlayerStatusDuration(playerStatus.id, durationInput);
              setNameFill(false);
              setDurationFill(false);
              setStatusFill(false);
            }}
            endIcon={<Add />}
          >
            Enter
          </Button>
        ) : (
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={() => removePlayerStatus(playerStatus.id)}
            endIcon={<DeleteIcon />}
          >
            Remove
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default PlayerStatusRow;
