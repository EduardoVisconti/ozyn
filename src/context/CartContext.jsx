// src/context/CartContext.jsx
import { createContext, useCallback, useEffect, useMemo, useState } from "react";

export const CartContext = createContext(null);

const LS_KEY = "ozyn_cart_v1";

export function CartProvider({ children }) {
  // itens
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  // drawer aberto/fechado
  const [isOpen, setIsOpen] = useState(false);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((v) => !v), []);

  // ações
  const add = useCallback((entry, { open = true } = {}) => {
    // entry: {id, title, price, qty, color, size, image, slug}
    setItems((prev) => {
      const key = `${entry.id}-${entry.size || ""}-${entry.color || ""}`;
      const idx = prev.findIndex(
        (x) => `${x.id}-${x.size || ""}-${x.color || ""}` === key
      );
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + (entry.qty || 1) };
        return copy;
      }
      return [...prev, { ...entry, qty: entry.qty || 1 }];
    });
    if (open) setIsOpen(true); // abre o drawer ao adicionar
  }, []);

  const inc = useCallback((item) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === item.id && it.size === item.size && it.color === item.color
          ? { ...it, qty: it.qty + 1 }
          : it
      )
    );
  }, []);

  const dec = useCallback((item) => {
    setItems((prev) =>
      prev
        .map((it) =>
          it.id === item.id && it.size === item.size && it.color === item.color
            ? { ...it, qty: Math.max(0, it.qty - 1) }
            : it
        )
        .filter((it) => it.qty > 0)
    );
  }, []);

  const removeItem = useCallback((item) => {
    setItems((prev) =>
      prev.filter(
        (it) =>
          !(
            it.id === item.id &&
            it.size === item.size &&
            it.color === item.color
          )
      )
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(() => items.reduce((s, it) => s + it.qty, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((s, it) => s + (it.price ?? 0) * it.qty, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      add,
      inc,
      dec,
      removeItem,
      clear,
      count,
      subtotal,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
    }),
    [items, add, inc, dec, removeItem, clear, count, subtotal, isOpen, openCart, closeCart, toggleCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
