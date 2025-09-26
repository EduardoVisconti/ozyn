// src/components/CartDrawer.jsx
import { useContext, useMemo } from "react";
import { CartContext } from "../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8787";

function formatUSD(v) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);
}

export default function CartDrawer({ userEmail }) {
  const { items = [], inc, dec, removeItem, clear, isOpen, closeCart, subtotal } =
    useContext(CartContext) || {};

  const enabled = isOpen ? "translate-x-0" : "translate-x-full";
  const shippingNote = "Shipping calculated at checkout.";

  const canCheckout = items.length > 0;

  const totalItems = useMemo(() => items.reduce((s, it) => s + it.qty, 0), [items]);

  async function startCheckout() {
    const stripe = await stripePromise;
    const resp = await fetch(`${API}/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((it) => ({
          slug: it.slug,
          qty: it.qty,
          size: it.size,
          color: it.color,
        })),
        customerEmail: userEmail || undefined,
        successUrl: window.location.origin + "/success",
        cancelUrl: window.location.origin + "/cart",
      }),
    });
    const data = await resp.json();
    if (!resp.ok) {
      alert(data.error || "Failed to start checkout");
      return;
    }
    const { error } = await stripe.redirectToCheckout({ sessionId: data.id });
    if (error) alert(error.message);
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-[70] bg-black/40 transition-opacity ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-[80] h-full w-full max-w-[420px] transform border-l border-neutral-200 bg-white shadow-2xl transition-transform dark:border-neutral-800 dark:bg-black ${enabled}`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-200 p-4 dark:border-neutral-800">
            <div className="text-sm font-semibold uppercase tracking-wide">Your Cart ({totalItems})</div>
            <button onClick={closeCart} aria-label="Close cart" className="text-sm opacity-70 hover:opacity-100">
              Close
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-auto p-4">
            {!items.length ? (
              <div className="py-16 text-center text-sm text-neutral-500">Your cart is empty.</div>
            ) : (
              <div className="space-y-4">
                {items.map((it) => (
                  <div
                    key={`${it.id}-${it.size || ""}-${it.color || ""}`}
                    className="flex gap-3 rounded-xl border border-neutral-200 p-3 dark:border-neutral-800"
                  >
                    <div className="h-20 w-16 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
                      {it.image ? (
                        <img src={it.image} alt={it.title} className="h-full w-full object-cover" />
                      ) : (
                        <div className="grid h-full w-full place-items-center text-[10px] text-neutral-500">No image</div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="truncate text-sm font-medium">{it.title}</div>
                          <div className="mt-0.5 text-[11px] text-neutral-500">
                            {it.color ? `Color: ${it.color}` : ""} {it.size ? `• Size: ${it.size}` : ""}
                          </div>
                        </div>
                        <div className="shrink-0 text-sm font-semibold">{formatUSD(it.price)}</div>
                      </div>

                      <div className="mt-2 flex items-center justify-between gap-2">
                        <div className="inline-flex items-center rounded-md border border-neutral-300 dark:border-neutral-700">
                          <button className="px-2 py-1" onClick={() => dec(it)} aria-label="Decrease">−</button>
                          <div className="px-2 py-1 text-sm">{it.qty}</div>
                          <button className="px-2 py-1" onClick={() => inc(it)} aria-label="Increase">+</button>
                        </div>
                        <button className="text-[11px] underline opacity-80 hover:opacity-100" onClick={() => removeItem(it)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="border-t border-neutral-200 p-4 dark:border-neutral-800">
            <div className="flex items-center justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-semibold">{formatUSD(subtotal)}</span>
            </div>
            <div className="mt-1 text-[11px] text-neutral-500">{shippingNote}</div>

            <div className="mt-3 flex gap-2">
              <button
                onClick={startCheckout}
                disabled={!canCheckout}
                className="flex-1 rounded-xl border border-neutral-900 px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-neutral-900 hover:opacity-90 disabled:opacity-50 dark:border-neutral-100 dark:text-neutral-100"
              >
                Checkout
              </button>
              <button
                onClick={clear}
                disabled={!canCheckout}
                className="rounded-xl border border-neutral-300 px-4 py-2.5 text-xs uppercase tracking-wide text-neutral-700 hover:opacity-90 disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-300"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
