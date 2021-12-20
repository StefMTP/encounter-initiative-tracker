import { ExpandLess, ExpandMore, MoodBad } from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
  Grid,
  Typography,
} from "@mui/material";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import PersonIcon from "@mui/icons-material/Person";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import { savedCombat } from "../../types";
import { useState } from "react";

const SavedCombatItem = ({ combat }: { combat: savedCombat }) => {
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <Grid>
      <ListItemButton onClick={() => setInfoOpen(!infoOpen)}>
        <ListItemIcon>
          <SportsKabaddiIcon />
        </ListItemIcon>
        <ListItemText primary={combat.name} />
        {infoOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={infoOpen} timeout="auto" unmountOnExit>
        <List component="div">
          {combat.savedActors.map((actor) => (
            <ListItem>
              <ListItemIcon>
                {actor.type === "PC" ? (
                  <PersonIcon color="action" fontSize="small" />
                ) : actor.type === "NPC" ? (
                  <AccessibilityNewIcon color="action" fontSize="small" />
                ) : (
                  <MoodBad color="action" fontSize="small" />
                )}
              </ListItemIcon>
              <Typography>{actor.name}</Typography>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Grid>
  );
};

export default SavedCombatItem;
