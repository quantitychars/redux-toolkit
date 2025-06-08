import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../store/cartSlice";
import { useProduct } from "../../components/ProductCard/ProductCard";
import { useModal } from "../../hooks/useModal.jsx";
import AddToCartModal from "../Modal/AddToCartModal.jsx";

export default function AddBtn({ className = "" }) {
  const dispatch = useDispatch();
  const { open, close } = useModal();
  const product = useProduct();

  const handleClick = () => {
    dispatch(addItem({ id: product.id }));
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
