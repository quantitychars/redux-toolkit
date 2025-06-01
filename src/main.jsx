import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { CartProvider } from "./contexts/CartContext.jsx";
import { FavoritesProvider } from "./contexts/FavoritesContext.jsx";
import { ModalProvider } from "./hooks/useModal.jsx";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ModalProvider>
      <CartProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </CartProvider>
    </ModalProvider>
  </StrictMode>
);
