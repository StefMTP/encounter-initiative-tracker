import React from "react";
import { Zoom, Tooltip, Fab } from "@mui/material";

const FloatingAction = ({
  isFabExpanded,
  bgColor,
  tooltip,
  bottom,
  transitionDelay,
  actionHandler,
  children,
}: {
  isFabExpanded: boolean;
  bgColor: {
    [key: string | number]: string;
  };
  tooltip: string;
  bottom: number;
  transitionDelay: number;
  actionHandler: React.MouseEventHandler<HTMLButtonElement> | undefined;
  children: React.ReactNode;
}) => {
  return (
    <Zoom
      in={isFabExpanded}
      style={{
        transitionDelay: isFabExpanded ? `${transitionDelay}ms` : "0ms",
      }}
    >
      <Tooltip title={tooltip} placement="right">
        <Fab
          sx={{
            color: "common.white",
            bgcolor: bgColor[500],
            "&:hover": {
              bgcolor: bgColor[600],
            },
            position: "fixed",
            bottom: bottom,
            right: 30,
          }}
          onClick={actionHandler}
        >
          {children}
        </Fab>
      </Tooltip>
    </Zoom>
  );
};

export default FloatingAction;
