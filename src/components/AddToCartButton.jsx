// src/components/AddToCartButton.jsx
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function AddToCartButton({ product, qty = 1, onAdded }) {
  const { add } = useContext(CartContext) || {};

  return (
    <button
      className="rounded-xl border border-neutral-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-900 hover:opacity-90 dark:border-neutral-100 dark:text-neutral-100"
      onClick={() => {
        add(
          {
            id: product.id,
            title: product.title,
            price: product.price,
            qty,
            color: product.color || null,
            size: product.size || null,
            image: product.image,
            slug: product.slug, // DEVE bater com server/priceMap.js
          },
          { open: true } // abre o drawer ao adicionar
        );
        onAdded?.();
      }}
    >
      Add to cart
    </button>
  );
}
