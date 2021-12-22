import React from "react";
import ReactDOM from "react-dom";
import { StyledEngineProvider } from "@mui/styled-engine";
import App from "./App";

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <App />
  </StyledEngineProvider>,
  document.getElementById("root")
);
