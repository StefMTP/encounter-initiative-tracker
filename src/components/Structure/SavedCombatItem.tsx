import { useContext, useState } from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
  Grid,
  TextField,
  Typography,
  Tooltip,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  MoodBad,
  Delete,
  AccessibilityNew,
  Person,
  SportsKabaddi,
  Edit,
} from "@mui/icons-material";
import { TurnContext } from "../../contexts/TurnContext";
import { SavedCombatsContext } from "../../contexts/SavedCombatsContext";
import { CombatActorsContext } from "../../contexts/CombatActorsContext";
import { PlayerStatusesContext } from "../../contexts/PlayerStatusesContext";
import { savedCombat } from "../../types";

const SavedCombatItem = ({ combat }: { combat: savedCombat }) => {
  const [infoOpen, setInfoOpen] = useState(false);
  const [changeName, setChangeName] = useState(false);
  const [nameInput, setNameInput] = useState(combat.name);

  const { savedCombats, setSavedCombats } = useContext(SavedCombatsContext);
  const { setPlayerStatuses } = useContext(PlayerStatusesContext);
  const { setCombatActors } = useContext(CombatActorsContext);
  const { setRound, setTurn } = useContext(TurnContext);

  return (
    <>
      <ListItem>
        <Grid container>
          <Grid container item xs={2} alignItems="center">
            <Tooltip title="Restore" placement="left">
              <ListItemButton
                onClick={() => {
                  setCombatActors(combat.savedActors);
                  setPlayerStatuses(combat.savedPlayerStatuses);
                  setRound(combat.savedRound);
                  setTurn(combat.savedTurn);
                }}
              >
                <SportsKabaddi />
              </ListItemButton>
            </Tooltip>
          </Grid>
          <Grid
            container
            item
            xs={4}
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
              <Typography textAlign="center">{combat.name}</Typography>
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
            <Tooltip title="Edit name" placement="bottom">
              <ListItemButton onClick={() => setChangeName(true)}>
                <Edit />
              </ListItemButton>
            </Tooltip>
          </Grid>
          <Grid container item xs={2} justifyContent="center">
            <Tooltip title="Delete" placement="bottom">
              <ListItemButton
                onClick={() => {
                  setSavedCombats(
                    savedCombats.filter(
                      (savedCombat) => savedCombat.id !== combat.id
                    )
                  );
                }}
              >
                <Delete
                  color="error"
                  fontSize="small"
                  sx={{ border: "1px solid #f44336", borderRadius: "50%" }}
                />
              </ListItemButton>
            </Tooltip>
          </Grid>
        </Grid>
      </ListItem>
      <Collapse in={infoOpen} timeout="auto" unmountOnExit>
        <List component="div">
          {combat.savedActors.map((actor) => (
            <ListItem alignItems="center">
              <ListItemIcon>
                {actor.type === "PC" ? (
                  <Person
                    color="action"
                    fontSize="small"
                    sx={{
                      border: "1px solid white",
                      borderRadius: "50%",
                      padding: "2px",
                    }}
                  />
                ) : actor.type === "NPC" ? (
                  <AccessibilityNew
                    color="action"
                    fontSize="small"
                    sx={{
                      border: "1px solid white",
                      borderRadius: "50%",
                      padding: "2px",
                    }}
                  />
                ) : (
                  <MoodBad
                    color="action"
                    fontSize="small"
                    sx={{
                      border: "1px solid white",
                      borderRadius: "50%",
                      padding: "2px",
                    }}
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
