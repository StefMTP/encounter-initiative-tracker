import React, { createContext, useState } from "react";
import { combatant } from "../types";

type AlertContextProviderProps = {
  children: React.ReactNode;
};

type AlertContextType = {
  actorSubmitAlertOpen: boolean;
  actorSubmitAlertMessage: string;
  setActorSubmitAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setActorSubmitAlertMessage: React.Dispatch<React.SetStateAction<string>>;
  actorRemoveAlertOpen: boolean;
  actorRemoveAlertMessage: string;
  setActorRemoveAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setActorRemoveAlertMessage: React.Dispatch<React.SetStateAction<string>>;
  actorRemoveAlertObject: combatant;
  setActorRemoveAlertObject: React.Dispatch<React.SetStateAction<combatant>>;
  statusRemoveAlertOpen: boolean;
  statusRemoveAlertMessage: string;
  setStatusRemoveAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setStatusRemoveAlertMessage: React.Dispatch<React.SetStateAction<string>>;
};

export const AlertContext = createContext<AlertContextType>(
  {} as AlertContextType
);

const AlertContextProvider = ({ children }: AlertContextProviderProps) => {
  const [actorSubmitAlertOpen, setActorSubmitAlertOpen] =
    useState<boolean>(false);
  const [actorSubmitAlertMessage, setActorSubmitAlertMessage] =
    useState<string>("");
  const [actorRemoveAlertOpen, setActorRemoveAlertOpen] =
    useState<boolean>(false);
  const [actorRemoveAlertMessage, setActorRemoveAlertMessage] =
    useState<string>("");
  const [actorRemoveAlertObject, setActorRemoveAlertObject] =
    useState<combatant>({} as combatant);
  const [statusRemoveAlertOpen, setStatusRemoveAlertOpen] =
    useState<boolean>(false);
  const [statusRemoveAlertMessage, setStatusRemoveAlertMessage] =
    useState<string>("");

  return (
    <AlertContext.Provider
      value={{
        actorSubmitAlertOpen,
        actorSubmitAlertMessage,
        setActorSubmitAlertOpen,
        setActorSubmitAlertMessage,
        actorRemoveAlertOpen,
        actorRemoveAlertMessage,
        setActorRemoveAlertOpen,
        setActorRemoveAlertMessage,
        actorRemoveAlertObject,
        setActorRemoveAlertObject,
        statusRemoveAlertOpen,
        statusRemoveAlertMessage,
        setStatusRemoveAlertOpen,
        setStatusRemoveAlertMessage,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;
