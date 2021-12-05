import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Collapse,
  List,
} from "@mui/material";
import { conditionsTable } from "../../types";
import HelpIcon from "@mui/icons-material/Help";
import DeleteIcon from "@mui/icons-material/Delete";

const ConditionDialogDescription = ({ condition }: { condition: string }) => {
  const [infoOpen, setInfoOpen] = useState<boolean>(false);

  return (
    <>
      <ListItem key={condition}>
        <ListItemText>{condition}</ListItemText>
        <ListItemButton onClick={() => setInfoOpen(!infoOpen)}>
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
      <Collapse in={infoOpen} timeout="auto" unmountOnExit>
        <List component="div">
          <ListItemText primary={conditionsTable[condition]} />
        </List>
      </Collapse>
    </>
  );
};

export default ConditionDialogDescription;
