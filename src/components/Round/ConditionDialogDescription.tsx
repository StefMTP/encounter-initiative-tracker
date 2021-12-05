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

const ConditionDialogDescription = ({
  condition,
  combatActorId,
  combatActorConditionRemoveHandler,
}: {
  condition: string;
  combatActorId: string;
  combatActorConditionRemoveHandler: (
    combatActorId: string,
    conditionName: string
  ) => void;
}) => {
  const [infoOpen, setInfoOpen] = useState<boolean>(false);

  return (
    <>
      <ListItem key={condition}>
        <ListItemButton onClick={() => setInfoOpen(!infoOpen)}>
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary={condition} />
        </ListItemButton>
        <ListItemButton
          onClick={() =>
            combatActorConditionRemoveHandler(combatActorId, condition)
          }
        >
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
      <Collapse in={infoOpen} timeout="auto" unmountOnExit>
        <List component="div">
          <ListItemText>
            <p
              dangerouslySetInnerHTML={{ __html: conditionsTable[condition] }}
            ></p>
          </ListItemText>
        </List>
      </Collapse>
    </>
  );
};

export default ConditionDialogDescription;
