import { ExpandLess, ExpandMore, MoodBad } from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
  Grid,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import PersonIcon from "@mui/icons-material/Person";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import { savedCombat } from "../../types";
import { useContext, useState } from "react";
import { SavedCombatsContext } from "../../contexts/SavedCombatsContext";

const SavedCombatItem = ({
  combat,
  index,
}: {
  combat: savedCombat;
  index: number;
}) => {
  const [infoOpen, setInfoOpen] = useState(false);
  const [changeName, setChangeName] = useState(false);
  const { savedCombats, setSavedCombats } = useContext(SavedCombatsContext);

  const [nameInput, setNameInput] = useState(combat.name);

  return (
    <>
      <ListItem>
        <Grid container>
          <Grid container item xs={2} alignItems="center">
            <ListItemIcon>
              <SportsKabaddiIcon />
            </ListItemIcon>
          </Grid>
          <Grid
            container
            item
            xs={6}
            alignItems="center"
            justifyContent="center"
          >
            {changeName ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const combatEdit = combat;
                  const tmpCombats = savedCombats.filter(
                    (savedCombat) => combat.id !== savedCombat.id
                  );
                  combatEdit.name = nameInput;
                  setSavedCombats([...tmpCombats, combatEdit]);
                  setChangeName(false);
                }}
              >
                <TextField
                  type="text"
                  variant="standard"
                  size="small"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  autoFocus
                />
              </form>
            ) : (
              <ListItemText
                primary={combat.name}
                onClick={() => setChangeName(true)}
              />
            )}
          </Grid>
          <Grid container item xs={2} justifyContent="center">
            <ListItemButton
              onClick={() => setInfoOpen(!infoOpen)}
              alignItems="center"
            >
              {infoOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </Grid>
          <Grid container item xs={2} justifyContent="center">
            <ListItemButton
              onClick={() => {
                setSavedCombats(
                  savedCombats.filter(
                    (savedCombat) => savedCombat.id !== combat.id
                  )
                );
              }}
            >
              <DeleteIcon
                color="error"
                fontSize="small"
                sx={{ border: "1px solid #f44336", borderRadius: "50%" }}
              />
            </ListItemButton>
          </Grid>
        </Grid>
      </ListItem>
      <Collapse in={infoOpen} timeout="auto" unmountOnExit>
        <List component="div">
          {combat.savedActors.map((actor) => (
            <ListItem alignItems="center">
              <ListItemIcon>
                {actor.type === "PC" ? (
                  <PersonIcon
                    color="action"
                    fontSize="small"
                    sx={{ border: "1px solid white", borderRadius: "50%" }}
                  />
                ) : actor.type === "NPC" ? (
                  <AccessibilityNewIcon
                    color="action"
                    fontSize="small"
                    sx={{ border: "1px solid white", borderRadius: "50%" }}
                  />
                ) : (
                  <MoodBad
                    color="action"
                    fontSize="small"
                    sx={{ border: "1px solid white", borderRadius: "50%" }}
                  />
                )}
              </ListItemIcon>
              <ListItemText primary={actor.name} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default SavedCombatItem;
