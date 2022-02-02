import React from "react";
import { SvgIcon } from "@mui/material";

const CustomSvgIcon = ({
  d,
  color,
  size,
}: {
  d: string;
  color?:
    | "inherit"
    | "disabled"
    | "action"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | undefined;
  size?: "small" | "inherit" | "large" | "medium" | undefined;
}) => {
  return (
    <SvgIcon color={color} fontSize={size}>
      <path fill="currentColor" d={d} />
    </SvgIcon>
  );
};

export default CustomSvgIcon;
