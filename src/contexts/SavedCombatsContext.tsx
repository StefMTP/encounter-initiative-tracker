import React, { createContext, useState, useEffect } from "react";
import { savedCombat, dummyCombatants, dummyPlayerStatuses } from "../types";

type SavedCombatsContextProviderProps = {
  children: React.ReactNode;
};

type SavedCombatsContextType = {
  savedCombats: savedCombat[];
  setSavedCombats: React.Dispatch<React.SetStateAction<savedCombat[]>>;
};

export const SavedCombatsContext = createContext<SavedCombatsContextType>(
  {} as SavedCombatsContextType
);

const SavedCombatsProvider = ({
  children,
}: SavedCombatsContextProviderProps) => {
  const [savedCombats, setSavedCombats] = useState<savedCombat[]>([]);

  useEffect(() => {
    // dummy data for saved combats
    // setSavedCombats([
    //   {
    //     savedActors: dummyCombatants,
    //     savedRound: 1,
    //     savedPlayerStatuses: dummyPlayerStatuses,
    //     savedTurn: { number: 0, actorPlaying: dummyCombatants[0] },
    //   },
    // ]);
    const localData = localStorage.getItem("savedCombats");
    if (localData) {
      try {
        const parsedLocalData = JSON.parse(localData);
        setSavedCombats(parsedLocalData);
      } catch (e) {
        setSavedCombats([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("savedCombats", JSON.stringify(savedCombats));
  }, [savedCombats]);

  return (
    <SavedCombatsContext.Provider value={{ savedCombats, setSavedCombats }}>
      {children}
    </SavedCombatsContext.Provider>
  );
};

export default SavedCombatsProvider;
