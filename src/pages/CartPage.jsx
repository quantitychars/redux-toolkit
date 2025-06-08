import React, { useEffect, useState } from "react";
import { useModal } from "../hooks/useModal";
import { getProducts } from "../api/getProducts";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, removeItem } from "../store/cartSlice";
import ConfirmModal from "../components/ConfirmModal/ConfirmModal";
import ProductList from "../components/ProductList/ProductList";

export default function CartPage() {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const { open, close } = useModal();

  /* 1. Тягнемо всі товари один раз */
  const [all, setAll] = useState([]);
  useEffect(() => {
    getProducts().then(setAll).catch(console.error);
  }, []);

  /* 2. Перетворюємо id → product + qty */
  const cartProducts = cartIds
    .map(({ id, qty }) => {
      const prod = all.find((p) => p.id === id);
      return prod ? { ...prod, qty } : null;
    })
    .filter(Boolean);

  /* 3. Модалка підтвердження */
  const confirmRemove = (id) =>
    open(
      <ConfirmModal
        title="Видалити товар?"
        onCancel={close}
        onConfirm={() => {
          dispatch(removeItem({ id }));
          close();
        }}
      />
    );

  /* 4. UI */
  if (!all.length) return null; // або <Loader/>

  return cartProducts.length ? (
    <ProductList
      items={cartProducts}
      showRemove // прапор для ×-кнопки
      onRemove={confirmRemove}
    />
  ) : (
    <p className="text-center py-12 text-gray-500">Кошик порожній</p>
  );
}
