import React, { useState } from "react";
import { Typography, TextField } from "@mui/material";
import { combatant } from "../../types";
import { color, sortPlayerActors } from "../../helpers";
import { useContext } from "react";
import { CombatActorsContext } from "../../contexts/CombatActorsContext";

const RoundTimelineTrack = ({
  combatActor,
  index,
  turnNumber,
}: {
  combatActor: combatant;
  index: number;
  turnNumber: number;
}) => {
  const { combatActors, setCombatActors } = useContext(CombatActorsContext);

  const [hpFill, setHpFill] = useState<boolean>(false);
  const [initiativeFill, setInitiativeFill] = useState<boolean>(false);
  const [hpInput, setHpInput] = useState<number>(0);
  const [initiativeInput, setInitiativeInput] = useState<number>(0);

  const editCombatActorsHp = (combatActorId: string, hpInput: number) => {
    const combatActorToEdit = combatActors.find(
      (combatActor) => combatActorId === combatActor.id
    );
    if (
      combatActorToEdit &&
      combatActorToEdit["currentHp"] &&
      combatActorToEdit["maxHp"]
    ) {
      combatActorToEdit.currentHp =
        hpInput > combatActorToEdit.maxHp ? combatActorToEdit.maxHp : hpInput;
      const tmpActors = combatActors.filter(
        (combatActor) => combatActor.id !== combatActorId
      );
      tmpActors.push(combatActorToEdit);
      setCombatActors(sortPlayerActors(tmpActors));
    }
  };
  const editCombatActorsInitiative = (
    combatActorId: string,
    initiativeInput: number
  ) => {
    const combatActorToEdit = combatActors.find(
      (combatActor) => combatActorId === combatActor.id
    );
    if (combatActorToEdit && combatActorToEdit["initiative"]) {
      combatActorToEdit.initiative = initiativeInput;
      const tmpActors = combatActors.filter(
        (combatActor) => combatActor.id !== combatActorId
      );
      tmpActors.push(combatActorToEdit);
      setCombatActors(sortPlayerActors(tmpActors));
    }
  };
  return (
    <>
      <Typography
        color={color(index, turnNumber, combatActor, "text.secondary", true)}
      >
        <Typography
          sx={{
            display: "inline",
            fontWeight: 600,
            "&:hover": {
              filter: "brightness(75%)",
              cursor: "pointer",
            },
          }}
          onClick={() => setInitiativeFill(!initiativeFill)}
        >
          Initiative:{" "}
        </Typography>
        {initiativeFill ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (initiativeInput) {
                editCombatActorsInitiative(combatActor.id, initiativeInput);
              }
              setInitiativeFill(false);
            }}
          >
            <TextField
              type="number"
              variant="standard"
              size="small"
              onChange={(e) => {
                setInitiativeInput(+e.target.value);
              }}
            />
          </form>
        ) : (
          combatActor.initiative
        )}
      </Typography>
      {combatActor.currentHp && combatActor.maxHp && (
        <Typography
          color={color(index, turnNumber, combatActor, "text.secondary", true)}
        >
          <Typography
            sx={{
              display: "inline",
              fontWeight: 600,
              "&:hover": {
                filter: "brightness(75%)",
                cursor: "pointer",
              },
            }}
            onClick={() => setHpFill(!hpFill)}
          >
            HP:{" "}
          </Typography>
          {hpFill ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (hpInput) {
                  editCombatActorsHp(combatActor.id, hpInput);
                }
                setHpFill(false);
              }}
            >
              <TextField
                type="number"
                variant="standard"
                size="small"
                onChange={(e) => {
                  setHpInput(+e.target.value);
                }}
              />
            </form>
          ) : (
            combatActor.currentHp
          )}
          /{combatActor.maxHp}
        </Typography>
      )}
    </>
  );
};

export default RoundTimelineTrack;
