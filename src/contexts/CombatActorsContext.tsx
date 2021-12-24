import React, { createContext, useState, useEffect } from "react";
// import { dummyCombatants } from "../data/dummy";
import { combatant } from "../types";
import { sortPlayerActors } from "../helpers";

type CombatActorsContextProviderProps = {
  children: React.ReactNode;
};

type CombatActorsContextType = {
  combatActors: combatant[];
  setCombatActors: React.Dispatch<React.SetStateAction<combatant[]>>;
};

export const CombatActorsContext = createContext<CombatActorsContextType>(
  {} as CombatActorsContextType
);

const CombatActorsProvider = ({
  children,
}: CombatActorsContextProviderProps) => {
  const [combatActors, setCombatActors] = useState<combatant[]>([]);

  useEffect(() => {
    // dummy data for the round timeline
    // setCombatActors(sortPlayerActors(dummyCombatants));
    const localData = localStorage.getItem("combatActors");
    if (localData) {
      try {
        const parsedLocalData = JSON.parse(localData);
        setCombatActors(sortPlayerActors(parsedLocalData));
      } catch (e) {
        setCombatActors([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("combatActors", JSON.stringify(combatActors));
  }, [combatActors]);

  return (
    <CombatActorsContext.Provider value={{ combatActors, setCombatActors }}>
      {children}
    </CombatActorsContext.Provider>
  );
};

export default CombatActorsProvider;
