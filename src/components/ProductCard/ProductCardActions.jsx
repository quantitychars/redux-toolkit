// src/components/ProductCard/ProductCardActions.jsx
import React from "react";
import { Heart, X, ShoppingCart } from "lucide-react";
import PropTypes from "prop-types";
import Toast from "../Toast/Toast";
import { useFavorites } from "../../contexts/FavoritesContext";
import { useCart } from "../../contexts/CartContext";
import { useProduct } from "./ProductCard";
import { useModal } from "../../hooks/useModal";
export default function ProductCardActions({
  showRemove = false,
  onRemove,
  showAdd = false, // ← НОВЕ: показувати кнопку кошика?
}) {
  const product = useProduct(); // { id, ... }

  /* ⭐ */
  const { toggle, isFavorite } = useFavorites();
  const fav = isFavorite(product.id);

  /* 🛒 */
  const { add } = useCart(); // add(id) з CartContext
  const { open, close } = useModal();
  return (
    <div className="flex items-center justify-between p-4">
      {/* Зірочка */}
      <button
        aria-label="toggle favorite"
        onClick={() => toggle(product.id)}
        className="p-1"
      >
        <Heart size={20} fill={fav ? "#e63946" : "none"} />
      </button>

      {/* Додати в кошик */}
      {showAdd && (
        <button
          aria-label="add to cart"
          onClick={() => {
            add(product.id);
            open(<Toast message="Додано у кошик" onClose={close} />);
          }}
          className="p-1 ml-auto"
        >
          <ShoppingCart size={20} />
        </button>
      )}

      {/* Хрестик (лише для CartPage) */}
      {showRemove && (
        <button
          aria-label="remove from cart"
          onClick={() => onRemove?.(product.id)}
          className="p-1 ml-auto"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}

ProductCardActions.propTypes = {
  showRemove: PropTypes.bool,
  onRemove: PropTypes.func,
  showAdd: PropTypes.bool,
};
