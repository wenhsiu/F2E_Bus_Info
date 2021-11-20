import React from "react";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { HashRouter } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { theme } from "./style/createTheme";

const BusInfo = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContext.Provider value={{}}>
        <HashRouter></HashRouter>
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default BusInfo;
