import { configureStore } from "@reduxjs/toolkit";

import cartReducer, { loadState as loadCartState } from "./cartSlice";

// 1. Створюємо Middleware для збереження в localStorage
const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action); // Спочатку нехай reducer оновить стан

  // Перевіряємо, чи дія стосується кошика
  if (action.type?.startsWith("cart/")) {
    // Зберігаємо тільки частину стану, що стосується кошика
    const cartState = store.getState().cart.items;
    localStorage.setItem("cart", JSON.stringify(cartState));
  }

  return result;
};

// 2. Завантажуємо початковий стан для кошика
const preloadedState = {
  cart: loadCartState(),
  // favorites: loadFavoritesState(),
};

export const store = configureStore({
  reducer: {
    products: productsReducer,
    modal: modalReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
  },
  preloadedState,
  // 4. Додаємо наш middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});
