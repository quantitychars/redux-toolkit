import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";

import { ModalProvider } from "./hooks/useModal.jsx";
import { FavoritesProvider } from "./contexts/FavoritesContext.jsx";
import { Provider } from "react-redux";
import { store } from "./store/index.js";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
