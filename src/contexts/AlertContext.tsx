import React, { createContext, useState } from "react";

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
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;
