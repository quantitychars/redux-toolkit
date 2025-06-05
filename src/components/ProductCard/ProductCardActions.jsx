// src/components/ProductCard/ProductCardActions.jsx
import React from "react";
import { Heart, ShoppingCart, X } from "lucide-react";
import PropTypes from "prop-types";

import Toast from "../Toast/Toast";
import { useFavorites } from "../../contexts/FavoritesContext";
import { useCart } from "../../contexts/CartContext";
import { useProduct } from "./ProductCard";
import { useModal } from "../../hooks/useModal";

export default function ProductCardActions({
  showAdd = false, // показувати кнопку «додати у кошик»
  showRemove = false, // показувати хрестик «видалити з кошика»
  onRemove, // колбек для видалення
}) {
  const product = useProduct(); // { id, ... }

  /* ⭐  — улюблене */
  const { toggle, isFavorite } = useFavorites();
  const fav = isFavorite(product.id);

  /* 🛒  — кошик */
  const { add } = useCart();
  const { open, close } = useModal(); // для тосту

  /* ────────────── UI ────────────── */
  return (
    <div className="flex items-center p-4 gap-2">
      {/* Зірочка */}
      <button
        onClick={() => toggle(product.id)}
        aria-label="toggle favorite"
        className="p-1"
      >
        <Heart size={20} fill={fav ? "#e63946" : "none"} />
      </button>

      {/* Кнопка «додати у кошик» */}
      {showAdd && (
        <button
          onClick={() => {
            add(product.id);
            open(<Toast message="Додано у кошик" onClose={close} />);
          }}
          aria-label="add to cart"
          /* Якщо хрестика не буде – ця кнопка прилипає вправо */
          className={`p-1 ${showRemove ? "" : "ml-auto"}`}
        >
          <ShoppingCart size={20} />
        </button>
      )}

      {/* Хрестик «видалити з кошика» */}
      {showRemove && (
        <button
          onClick={() => onRemove?.(product.id)}
          aria-label="remove from cart"
          className="p-1 ml-auto"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}

ProductCardActions.propTypes = {
  showAdd: PropTypes.bool,
  showRemove: PropTypes.bool,
  onRemove: PropTypes.func,
};
