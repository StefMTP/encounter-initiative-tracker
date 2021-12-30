import React, { useState } from "react";
import { ClickAwayListener, Tooltip, Fab, Zoom } from "@mui/material";
import {
  Clear,
  MoreVert,
  Add,
  SportsKabaddi,
  GroupRemove,
  DeleteSweep,
} from "@mui/icons-material";
import { green } from "@mui/material/colors";

const FloatingActionsButton = ({
  toggleAddHandler,
  toggleDrawerHandler,
  removeCharactersHandler,
  removeStatusesHandler,
}: {
  toggleAddHandler: () => void;
  toggleDrawerHandler: () => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => void;
  removeCharactersHandler: () => void;
  removeStatusesHandler: () => void;
}) => {
  const [isFabExpanded, setIsFabExpanded] = useState(false);

  return (
    <>
      <ClickAwayListener onClickAway={() => setIsFabExpanded(false)}>
        <Tooltip title="Actions" placement="left">
          <Fab
            color="primary"
            sx={{ position: "fixed", bottom: 30, right: 30 }}
            onClick={() => setIsFabExpanded(!isFabExpanded)}
          >
            {isFabExpanded ? <Clear /> : <MoreVert />}
          </Fab>
        </Tooltip>
      </ClickAwayListener>
      <Zoom
        in={isFabExpanded}
        style={{ transitionDelay: isFabExpanded ? "50ms" : "0ms" }}
      >
        <Tooltip title="Insert Character" placement="right">
          <Fab
            sx={{
              color: "common.white",
              bgcolor: green[500],
              "&:hover": {
                bgcolor: green[600],
              },
              position: "fixed",
              bottom: 100,
              right: 30,
            }}
            onClick={toggleAddHandler}
          >
            <Add />
          </Fab>
        </Tooltip>
      </Zoom>
      <Zoom
        in={isFabExpanded}
        style={{ transitionDelay: isFabExpanded ? "100ms" : "0ms" }}
      >
        <Tooltip title="Saved Combats" placement="right">
          <Fab
            sx={{
              color: "common.white",
              bgcolor: "secondary.main",
              "&:hover": {
                bgcolor: "secondary.dark",
              },
              position: "fixed",
              bottom: 170,
              right: 30,
            }}
            onClick={toggleDrawerHandler()}
          >
            <SportsKabaddi />
          </Fab>
        </Tooltip>
      </Zoom>
      <Zoom
        in={isFabExpanded}
        style={{ transitionDelay: isFabExpanded ? "150ms" : "0ms" }}
      >
        <Tooltip title="Remove all characters" placement="right">
          <Fab
            sx={{
              color: "common.white",
              bgcolor: "error.main",
              "&:hover": {
                bgcolor: "error.dark",
              },
              position: "fixed",
              bottom: 240,
              right: 30,
            }}
            onClick={removeCharactersHandler}
          >
            <GroupRemove />
          </Fab>
        </Tooltip>
      </Zoom>
      <Zoom
        in={isFabExpanded}
        style={{ transitionDelay: isFabExpanded ? "200ms" : "0ms" }}
      >
        <Tooltip title="Remove all statuses" placement="right">
          <Fab
            sx={{
              color: "common.white",
              bgcolor: "warning.main",
              "&:hover": {
                bgcolor: "warning.dark",
              },
              position: "fixed",
              bottom: 310,
              right: 30,
            }}
            onClick={removeStatusesHandler}
          >
            <DeleteSweep />
          </Fab>
        </Tooltip>
      </Zoom>
    </>
  );
};

export default FloatingActionsButton;
