// src/pages/FavoritesPage.jsx
import React, { useEffect, useState } from "react";
import { useFavorites } from "../contexts/FavoritesContext";
import { getProducts } from "../api/getProducts";
import ProductList from "../components/ProductList/ProductList";

export default function FavoritesPage() {
  const { items: favIds } = useFavorites();
  const [all, setAll] = useState([]);

  useEffect(() => {
    getProducts().then(setAll).catch(console.error);
  }, []);

  const favProducts = all.filter((p) => favIds.includes(p.id));

  return favProducts.length ? (
    <ProductList items={favProducts} actions={{ showAdd: true }} />
  ) : (
    <p className="text-center py-12 text-gray-500">Нічого не вибрано</p>
  );
}
