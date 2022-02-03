import { useContext } from "react";
import { Timeline } from "@mui/lab";
import { Slide, Typography } from "@mui/material";
import { v4 as uuid } from "uuid";
import RoundTimelineItem from "./Item/RoundTimelineItem";
import { CombatActorsContext } from "../../contexts/CombatActorsContext";
import { combatant } from "../../types";
import { sortPlayerActors } from "../../helpers";

const RoundTimeline = () => {
  const { combatActors } = useContext(CombatActorsContext);

  const timelineItems: combatant[] = sortPlayerActors([
    ...combatActors,
    {
      id: uuid(),
      name: "Initiative Mark: 25",
      initiative: 25,
      alignment: "FOE",
      type: "INITIATIVE_MARK",
      color: {
        primary: "info.main",
        secondary: "info.light",
      },
    },
    {
      id: uuid(),
      name: "Initiative Mark: 20",
      initiative: 20,
      alignment: "PARTY",
      type: "INITIATIVE_MARK",
      color: {
        primary: "info.main",
        secondary: "info.light",
      },
    },
    {
      id: uuid(),
      name: "Initiative Mark: 15",
      initiative: 15,
      alignment: "FOE",
      type: "INITIATIVE_MARK",
      color: {
        primary: "info.main",
        secondary: "info.light",
      },
    },
    {
      id: uuid(),
      name: "Initiative Mark: 10",
      initiative: 10,
      alignment: "PARTY",
      type: "INITIATIVE_MARK",
      color: {
        primary: "info.main",
        secondary: "info.light",
      },
    },
    {
      id: uuid(),
      name: "Initiative Mark: 5",
      initiative: 5,
      alignment: "FOE",
      type: "INITIATIVE_MARK",
      color: {
        primary: "info.main",
        secondary: "info.light",
      },
    },
  ]);

  return (
    <Slide in timeout={1000} direction="right">
      <Timeline>
        {combatActors.length <= 0 ? (
          <Typography textAlign="center" color="white" variant="h6">
            You might wanna add some characters...
          </Typography>
        ) : (
          timelineItems.map((combatActor, index, array) => (
            <RoundTimelineItem
              key={combatActor.id}
              combatActor={combatActor}
              index={index}
              array={array}
            />
          ))
        )}
      </Timeline>
    </Slide>
  );
};

export default RoundTimeline;
