import React, { useState } from "react";
import { ClickAwayListener, Tooltip, Fab } from "@mui/material";
import {
  Clear,
  MoreVert,
  Add,
  SportsKabaddi,
  GroupRemove,
  DeleteSweep,
  DeleteForever,
} from "@mui/icons-material";
import { green, pink, red, orange, deepOrange } from "@mui/material/colors";
import FloatingAction from "./FloatingAction";

const FloatingActionsButton = ({
  toggleAddHandler,
  toggleDrawerHandler,
  removeCharactersHandler,
  removeStatusesHandler,
  removeAllDataHandler,
}: {
  toggleAddHandler: () => void;
  toggleDrawerHandler: () => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => void;
  removeCharactersHandler: () => void;
  removeStatusesHandler: () => void;
  removeAllDataHandler: () => void;
}) => {
  const [isFabExpanded, setIsFabExpanded] = useState(false);

  const floatingActions = [
    {
      bgColor: green,
      tooltip: "Insert Character",
      actionHandler: toggleAddHandler,
      icon: <Add />,
    },
    {
      bgColor: pink,
      tooltip: "Saved Combats",
      actionHandler: toggleDrawerHandler(),
      icon: <SportsKabaddi />,
    },
    {
      bgColor: deepOrange,
      tooltip: "Remove all Characters",
      actionHandler: removeCharactersHandler,
      icon: <GroupRemove />,
    },
    {
      bgColor: orange,
      tooltip: "Remove all Statuses",
      actionHandler: removeStatusesHandler,
      icon: <DeleteSweep />,
    },
    {
      bgColor: red,
      tooltip: "Clear all Data",
      actionHandler: removeAllDataHandler,
      icon: <DeleteForever />,
    },
  ];

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
      {floatingActions.map((action, index) => (
        <FloatingAction
          key={index}
          isFabExpanded={isFabExpanded}
          bgColor={action.bgColor}
          tooltip={action.tooltip}
          bottom={index * 70 + 100}
          transitionDelay={50 * index}
          actionHandler={action.actionHandler}
        >
          {action.icon}
        </FloatingAction>
      ))}
    </>
  );
};

export default FloatingActionsButton;
