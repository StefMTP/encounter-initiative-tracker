import { Grid, IconButton } from "@mui/material";
import { combatant } from "../../types";
import RoundTimelineLabel from "./RoundTimelineLabel";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

const RoundTimelineDetails = ({
  combatActor,
  index,
  turnNumber,
  combatActorRemoveHandler,
  combatActorConditionAddHandler,
  combatActorConditionRemoveHandler,
  color,
}: {
  combatActor: combatant;
  index: number;
  turnNumber: number;
  combatActorRemoveHandler: (combatActorId: string) => void;
  combatActorConditionAddHandler: (
    combatActorId: string,
    conditionName: string
  ) => void;
  combatActorConditionRemoveHandler: (
    combatActorId: string,
    conditionName: string
  ) => void;
  color: (
    index: number,
    turnNumber: number,
    combatActor: combatant,
    value: string,
    isText?: boolean | undefined
  ) => string;
}) => {
  return (
    <Grid
      container
      justifyContent="flex-end"
      alignItems="center"
      flexDirection={combatActor.alignment === "PARTY" ? "row" : "row-reverse"}
    >
      <Grid item>
        <IconButton
          color="error"
          onClick={() => combatActorRemoveHandler(combatActor.id)}
        >
          <PersonRemoveIcon />
        </IconButton>
      </Grid>
      <Grid item>
        <RoundTimelineLabel
          color={color}
          combatActor={combatActor}
          index={index}
          turnNumber={turnNumber}
          combatActorConditionAddHandler={combatActorConditionAddHandler}
          combatActorConditionRemoveHandler={combatActorConditionRemoveHandler}
        />
      </Grid>
    </Grid>
  );
};

export default RoundTimelineDetails;
