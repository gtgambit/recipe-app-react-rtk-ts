import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import App from "./App";
import { store, persistor } from "./store/store";

import { darkTheme } from "./theme/theme";
import "./index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
