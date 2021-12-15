import React from "react";
import { createTheme, ThemeProvider, Box, Grid } from "@mui/material";
import "./global.css";
import Header from "./components/Structure/Header";
import MainBar from "./components/Structure/MainBar";
import SideBar from "./components/Structure/SideBar";

import CombatActorsContextProvider from "./contexts/CombatActorsContext";
import PlayerStatusesProvider from "./contexts/PlayerStatusesContext";
import TurnContextProvider from "./contexts/TurnContext";
import AlertContextProvider from "./contexts/AlertContext";

const darkTheme = createTheme({ palette: { mode: "dark" } });

const App = () => {
  return (
    <AlertContextProvider>
      <CombatActorsContextProvider>
        <PlayerStatusesProvider>
          <TurnContextProvider>
            <ThemeProvider theme={darkTheme}>
              <Box
                sx={{
                  bgcolor: "background.default",
                  width: 1,
                  height: 1,
                  padding: "50px 0",
                }}
              >
                <Header />
                <Grid container>
                  <MainBar />
                  <SideBar />
                </Grid>
              </Box>
            </ThemeProvider>
          </TurnContextProvider>
        </PlayerStatusesProvider>
      </CombatActorsContextProvider>
    </AlertContextProvider>
  );
};

export default App;
