// src/context/CartContext.jsx
import { createContext, useEffect, useMemo, useState } from "react";

export const CartContext = createContext(null);

const LS_KEY = "ozyn_cart_v1";

export default function CartProvider({ children }) {
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

  const add = (entry) => {
    // entry: {id, title, price, qty, color, size, image, slug}
    setItems((prev) => {
      const i = prev.findIndex(
        (x) =>
          x.id === entry.id &&
          x.color === entry.color &&
          x.size === entry.size
      );
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], qty: copy[i].qty + (entry.qty || 1) };
        return copy;
      }
      return [...prev, { ...entry, qty: entry.qty || 1 }];
    });
  };

  const removeIndex = (idx) =>
    setItems((prev) => prev.filter((_, i) => i !== idx));

  const inc = (idx) =>
    setItems((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
      return copy;
    });

  const dec = (idx) =>
    setItems((prev) => {
      const copy = [...prev];
      const nextQty = copy[idx].qty - 1;
      if (nextQty <= 0) copy.splice(idx, 1);
      else copy[idx] = { ...copy[idx], qty: nextQty };
      return copy;
    });

  const clear = () => setItems([]);

  const count = useMemo(() => items.reduce((s, it) => s + it.qty, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((s, it) => s + it.price * it.qty, 0),
    [items]
  );

  const value = {
    items,
    add,
    removeIndex,
    inc,
    dec,
    clear,
    count,
    subtotal,
    isEmpty: items.length === 0,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
