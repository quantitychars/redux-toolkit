import React, { createContext, useContext, useReducer, useEffect } from "react";

const FavContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE": {
      const id = action.payload;
      return state.includes(id)
        ? state.filter((i) => i !== id)
        : [...state, id];
    }
    default:
      return state;
  }
}

export function FavoritesProvider({ children }) {
  const [fav, dispatch] = useReducer(reducer, null, () => {
    try {
      return JSON.parse(localStorage.getItem("fav")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(fav));
  }, [fav]);

  const value = { fav, dispatch };
  return <FavContext.Provider value={value}>{children}</FavContext.Provider>;
}

export const useFavorites = () => useContext(FavContext);
