import React, { createContext, useContext, useEffect, useState } from "react";
import { sortPlayerActors } from "../helpers";
import { turn } from "../types";
import { CombatActorsContext } from "./CombatActorsContext";

type TurnContextProviderProps = {
  children: React.ReactNode;
};

type TurnContextType = {
  turn: turn;
  setTurn: React.Dispatch<React.SetStateAction<turn>>;
  round: number;
  setRound: React.Dispatch<React.SetStateAction<number>>;
};

export const TurnContext = createContext<TurnContextType>(
  {} as TurnContextType
);

const TurnContextProvider = ({ children }: TurnContextProviderProps) => {
  const [round, setRound] = useState<number>(1);
  const [turn, setTurn] = useState<turn>({
    number: 0,
    actorPlaying: {
      id: "",
      name: "",
      type: "PC",
      alignment: "PARTY",
      initiative: 0,
    },
  });

  const { combatActors } = useContext(CombatActorsContext);

  useEffect(() => {
    const localDataRound = localStorage.getItem("round");
    const localDataTurn = localStorage.getItem("turn");
    const localDataCombatActors = localStorage.getItem("combatActors");
    if (localDataRound && localDataTurn) {
      try {
        if (localDataCombatActors && localDataCombatActors.length <= 0) {
          throw new Error();
        }
        const parsedLocalDataRound = JSON.parse(localDataRound);
        const parsedLocalDataTurn = JSON.parse(localDataTurn);
        setRound(parsedLocalDataRound);
        setTurn(parsedLocalDataTurn);
      } catch (e) {
        setRound(1);
        setTurn({
          number: 0,
          actorPlaying: sortPlayerActors(combatActors)[0],
        });
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("round", JSON.stringify(round));
  }, [round]);

  useEffect(() => {
    localStorage.setItem("turn", JSON.stringify(turn));
  }, [turn]);

  return (
    <TurnContext.Provider value={{ turn, setTurn, round, setRound }}>
      {children}
    </TurnContext.Provider>
  );
};

export default TurnContextProvider;
