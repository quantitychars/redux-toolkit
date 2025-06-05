// src/components/ProductList/ProductList.jsx
import React from "react";
import useProducts from "../../hooks/UseProducts";
import ProductCard from "../ProductCard/ProductCard";
import ProductCardImage from "../ProductCard/ProductCardImage";
import ProductCardInfo from "../ProductCard/ProductCardInfo";
import ProductCardActions from "../ProductCard/ProductCardActions";
import ProductSkeleton from "../ProductSkeleton/ProductSkeleton";

export default function ProductList({
  items = null, // ← НОВЕ
  actions = {}, // { showAdd, showRemove, onRemove }
}) {
  /* якщо items не передано – фетчимо всі товари, як раніше */
  const { data: products, loading, error } = useProducts({ enabled: !items });

  const list = items ?? products ?? [];

  if (loading)
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <ProductSkeleton key={idx} />
        ))}
      </div>
    );

  if (error) return <p className="text-red-600">🛑 {error.message}</p>;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {list.map((p) => (
        <ProductCard key={p.id} product={p}>
          <ProductCardImage />
          <ProductCardInfo />
          <ProductCardActions
            showAdd={actions.showAdd}
            showRemove={actions.showRemove}
            onRemove={actions.onRemove}
          />
        </ProductCard>
      ))}
    </div>
  );
}
