import React, { createContext, useState, useEffect } from "react";
// import { dummyPlayerStatuses } from "../data/dummy";
import { playerStatus } from "../types";

type PlayerStatusesContextProviderProps = {
  children: React.ReactNode;
};

type PlayerStatusesContextType = {
  playerStatuses: playerStatus[];
  setPlayerStatuses: React.Dispatch<React.SetStateAction<playerStatus[]>>;
};

export const PlayerStatusesContext = createContext<PlayerStatusesContextType>(
  {} as PlayerStatusesContextType
);

const PlayerStatusesProvider = ({
  children,
}: PlayerStatusesContextProviderProps) => {
  const [playerStatuses, setPlayerStatuses] = useState<playerStatus[]>([]);

  useEffect(() => {
    // dummy data for the player statuses
    // setPlayerStatuses(dummyPlayerStatuses);
    const localData = localStorage.getItem("playerStatuses");
    if (localData) {
      try {
        const parsedLocalData = JSON.parse(localData);
        setPlayerStatuses(parsedLocalData);
      } catch (e) {
        setPlayerStatuses([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("playerStatuses", JSON.stringify(playerStatuses));
  }, [playerStatuses]);

  return (
    <PlayerStatusesContext.Provider
      value={{ playerStatuses, setPlayerStatuses }}
    >
      {children}
    </PlayerStatusesContext.Provider>
  );
};
export default PlayerStatusesProvider;
