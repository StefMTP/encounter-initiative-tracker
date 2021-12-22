import React, { useContext, useState } from "react";
import {
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Collapse,
  List,
} from "@mui/material";
import { Help, Delete } from "@mui/icons-material";
import { CombatActorsContext } from "../../contexts/CombatActorsContext";
import { sortPlayerActors } from "../../helpers";
import { conditionsTable } from "../../types";

const ConditionDialogDescription = ({
  condition,
  combatActorId,
}: {
  condition: string;
  combatActorId: string;
}) => {
  const [infoOpen, setInfoOpen] = useState<boolean>(false);
  const { combatActors, setCombatActors } = useContext(CombatActorsContext);

  const removeConditionFromCombatActor = (
    combatActorId: string,
    conditionName: string
  ) => {
    const combatActorToEdit = combatActors.find(
      (combatActor) => combatActorId === combatActor.id
    );
    if (combatActorToEdit && combatActorToEdit["conditions"]) {
      combatActorToEdit.conditions = combatActorToEdit.conditions.filter(
        (condition) => condition !== conditionName
      );
      const tmpActors = combatActors.filter(
        (combatActor) => combatActor.id !== combatActorId
      );
      tmpActors.push(combatActorToEdit);
      setCombatActors(sortPlayerActors(tmpActors));
    }
  };
  return (
    <>
      <ListItem key={condition}>
        <ListItemButton onClick={() => setInfoOpen(!infoOpen)}>
          <ListItemIcon>
            <Help />
          </ListItemIcon>
          <ListItemText primary={condition} />
        </ListItemButton>
        <ListItemButton
          onClick={() =>
            removeConditionFromCombatActor(combatActorId, condition)
          }
        >
          <ListItemIcon>
            <Delete />
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
