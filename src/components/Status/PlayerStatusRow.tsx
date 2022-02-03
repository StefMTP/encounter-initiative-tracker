import React, { useContext, useState } from "react";
import { TableRow, TableCell, Button } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import PlayerStatusCell from "./PlayerStatusCell";
import { PlayerStatusesContext } from "../../contexts/PlayerStatusesContext";
import { combatant, playerStatus } from "../../types";
import { AlertContext } from "../../contexts/AlertContext";

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
  const [nameInput, setNameInput] = useState<string>(playerStatus.name);
  const [statusInput, setStatusInput] = useState<string>(playerStatus.status);
  const [durationInput, setDurationInput] = useState<string>(
    playerStatus.duration.toString()
  );

  const { playerStatuses, setPlayerStatuses } = useContext(
    PlayerStatusesContext
  );
  const { setStatusRemoveAlertMessage, setStatusRemoveAlertOpen } =
    useContext(AlertContext);

  const removePlayerStatus = (playerStatusId: string) => {
    const tmpPlayerStatuses = playerStatuses.filter((tmpPlayerStatus) => {
      if (tmpPlayerStatus.id !== playerStatusId) {
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
    setPlayerStatuses(tmpPlayerStatuses);
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
        "&:last-child td, &:last-child th": { border: 0 },
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
        icon={<Edit />}
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
        icon={<Edit />}
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
        icon={<Edit />}
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
            endIcon={<Delete />}
          >
            Remove
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default PlayerStatusRow;
