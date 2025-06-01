import React from "react";
import { useCart } from "../../contexts/CartContext";
import { useProduct } from "../../components/ProductCard/ProductCard";
import { useModal } from "../../hooks/useModal.jsx";
import AddToCartModal from "../Modal/AddToCartModal.jsx";

export default function AddBtn({ className = "" }) {
  const { dispatch } = useCart();
  const { open, close } = useModal();
  const product = useProduct();

  const handleClick = () => {
    dispatch({ type: "ADD", payload: { id: product.id } });
    console.log("open");
    open(<AddToCartModal product={product} onClose={close} />);
  };

  return (
    <button
      className={`px-3 py-1 rounded-lg bg-primary text-white text-sm ${className}`}
      onClick={handleClick}
    >
      Add to cart
    </button>
  );
}
