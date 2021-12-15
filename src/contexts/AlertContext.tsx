import React, { createContext, useState } from "react";

type AlertContextProviderProps = {
  children: React.ReactNode;
};

type AlertContextType = {
  actorSubmitAlertOpen: boolean;
  setActorSubmitAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AlertContext = createContext<AlertContextType>(
  {} as AlertContextType
);

const AlertContextProvider = ({ children }: AlertContextProviderProps) => {
  const [actorSubmitAlertOpen, setActorSubmitAlertOpen] =
    useState<boolean>(false);

  return (
    <AlertContext.Provider
      value={{ actorSubmitAlertOpen, setActorSubmitAlertOpen }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;
