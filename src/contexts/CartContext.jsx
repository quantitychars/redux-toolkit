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

  const add = (id) => dispatch({ type: "ADD", payload: { id } });
  const remove = (id) => dispatch({ type: "REMOVE", payload: { id } });

  const items = Object.entries(cart).map(([id, qty]) => ({ id, qty }));

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const value = {
    items,
    count: items.reduce((s, i) => s + i.qty, 0),
    add,
    remove,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
