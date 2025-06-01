import React, { useContext } from "react";
import { ProductContext } from "./ProductCard";

export default function ProductCardInfo() {
  const product = useContext(ProductContext);
  const { title } = product;

  return (
    <div className="p-4 flex flex-col gap-2">
      <h3 className="text-base font-semibold line-clamp-2 h-10">{title}</h3>
      <span className="text-primary text-sm font-medium">
        {product.getFormattedPrice()}
      </span>
    </div>
  );
}
