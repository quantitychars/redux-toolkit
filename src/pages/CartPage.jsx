// src/pages/CartPage.jsx
import React, { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useModal } from "../hooks/useModal";
import { getProducts } from "../api/getProducts"; // /products.json
import ConfirmModal from "../components/ConfirmModal/ConfirmModal";
import ProductList from "../components/ProductList/ProductList";

export default function CartPage() {
  const { items: cartIds, remove } = useCart(); // [{ id, qty }]
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
          remove(id);
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
