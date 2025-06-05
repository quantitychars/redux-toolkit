import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
} from "react";

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

  /* ── helper-методи та похідні значення ─────────────────────────── */
  const items = fav; // для симетрії з CartContext
  const count = items.length;
  const toggle = (id) => dispatch({ type: "TOGGLE", payload: id });
  const isFavorite = (id) => items.includes(id);

  /* ── синхронізуємо з localStorage ──────────────────────────────── */
  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(fav));
  }, [fav]);

  /* ── value для провайдера ──────────────────────────────────────── */
  const value = useMemo(
    () => ({ items, count, toggle, isFavorite }),
    [items, count] // items — достатньо, але залишимо обидва для ясності
  );

  return <FavContext.Provider value={value}>{children}</FavContext.Provider>;
}

/* ── кастомний хук ───────────────────────────────────────────────── */
export function useFavorites() {
  const ctx = useContext(FavContext);
  if (ctx === null) {
    throw new Error("useFavorites() must be used inside <FavoritesProvider>");
  }
  return ctx;
}
