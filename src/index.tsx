import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StyledEngineProvider } from "@mui/styled-engine";

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <App />
  </StyledEngineProvider>,
  document.getElementById("root")
);
