// src/components/CartButton.jsx
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartButton() {
  const { count, toggleCart } = useContext(CartContext) || {};

  return (
    <button
      onClick={toggleCart}
      className="relative inline-flex items-center"
      aria-label="Open cart"
      type="button"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" className="opacity-90">
        <path fill="currentColor" d="M7 7V6a5 5 0 0 1 10 0v1h2a1 1 0 0 1 .99 1.141l-1.5 12A2 2 0 0 1 16.5 22h-9a2 2 0 0 1-1.99-1.859l-1.5-12A1 1 0 0 1 5 7zm2 0h6V6a3 3 0 0 0-6 0z"/>
      </svg>
      {count > 0 && (
        <span className="absolute -right-2 -top-2 min-w-[18px] rounded-full bg-neutral-900 px-1 text-center text-[11px] font-semibold leading-[18px] text-white dark:bg-white dark:text-black">
          {count}
        </span>
      )}
    </button>
  );
}
