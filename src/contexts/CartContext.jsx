import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { id } = action.payload;
      const next = { ...state };
      next[id] = (next[id] || 0) + 1;
      return next;
    }
    case "REMOVE": {
      const { id } = action.payload;
      const next = { ...state };
      delete next[id];
      return next;
    }
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(reducer, null, () => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const value = {
    cart,
    count: Object.values(cart).reduce((s, n) => s + n, 0),
    dispatch,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
