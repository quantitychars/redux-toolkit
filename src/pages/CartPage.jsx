// src/pages/CartPage.jsx
import { useCart } from "../contexts/CartContext";
import { useModal } from "../hooks/useModal";
import ProductCard from "../components/ProductCard/ProductCard";
import ConfirmModal from "../components/ConfirmModal/ConfirmModal";

export default function CartPage() {
  const { items, remove } = useCart(); // items = [Product, …]
  const { open } = useModal();

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

  return (
    <section className="grid gap-6 p-8 sm:grid-cols-2 md:grid-cols-3">
      {items.map((p) => (
        <ProductList
          items={cartProducts} // [{... , qty }]
          actions={{
            showRemove: true,
            onRemove: confirmRemove,
          }}
        />
      ))}

      {items.length === 0 && <p>Кошик порожній</p>}
    </section>
  );
}
