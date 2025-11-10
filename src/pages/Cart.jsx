// src/pages/Cart.jsx
import { useContext, useMemo } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8787";

function formatUSD(v) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);
}

export default function Cart() {
  const { items = [], removeItem, clear, inc, dec } = useContext(CartContext) || {};
  const { user } = useContext(AuthContext) || {};

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + (it.price ?? 0) * it.qty, 0),
    [items]
  );

  async function startCheckout(cartItems) {
    if (import.meta.env.PROD && !import.meta.env.VITE_API_URL?.includes("https://")) {
      alert("Demo only: Stripe Checkout is configured in test mode for portfolio purposes. No real payment will be processed.");
      return;
    }
    
    const stripe = await stripePromise;

    const resp = await fetch(`${API}/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartItems.map(it => ({
          slug: it.slug,
          qty: it.qty,
          size: it.size,
          color: it.color,
        })),
        customerEmail: user?.email || undefined,
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

  if (!items.length) {
    return (
      <div className="page-x py-16">
        <h1 className="text-2xl font-semibold">Your Cart</h1>
        <p className="mt-4 text-neutral-700 dark:text-neutral-300">Your cart is empty.</p>
        <Link to="/shop" className="mt-4 inline-block underline">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="page-x py-12 md:py-16">
      <h1 className="text-2xl font-semibold">Your Cart</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr,360px]">
        {/* Items */}
        <div className="space-y-4">
          {items.map((it) => (
            <div
              key={`${it.id}-${it.size || ""}-${it.color || ""}`}
              className="flex gap-4 rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800"
            >
              <div className="h-24 w-20 overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
                {it.image ? (
                  <img src={it.image} alt={it.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full w-full place-items-center text-xs text-neutral-500">No image</div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{it.title}</div>
                    <div className="mt-1 text-xs text-neutral-500">
                      {it.color ? `Color: ${it.color}` : ""} {it.size ? ` • Size: ${it.size}` : ""}
                    </div>
                  </div>
                  <div className="shrink-0 text-sm font-medium">{formatUSD(it.price)}</div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="inline-flex items-center rounded-md border border-neutral-300 dark:border-neutral-700">
                    <button className="px-3 py-1" onClick={() => dec(it)} aria-label="Decrease">−</button>
                    <div className="px-3 py-1 text-sm">{it.qty}</div>
                    <button className="px-3 py-1" onClick={() => inc(it)} aria-label="Increase">+</button>
                  </div>

                  <button
                    className="text-xs underline"
                    onClick={() => removeItem(it)}
                    aria-label="Remove item"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <aside className="h-max rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800">
          <div className="flex items-center justify-between text-sm">
            <span>Subtotal</span>
            <span className="font-medium">{formatUSD(subtotal)}</span>
          </div>
          <div className="mt-1 text-xs text-neutral-500">Shipping calculated at checkout.</div>

          <button
            className="mt-4 w-full rounded-xl border border-neutral-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-900 hover:opacity-90 dark:border-neutral-100 dark:text-neutral-100 disabled:opacity-50"
            onClick={() => startCheckout(items)}
          >
            Checkout
          </button>

          <button
            className="mt-3 w-full rounded-xl border border-neutral-300 px-6 py-2 text-xs uppercase tracking-wide text-neutral-700 hover:opacity-90 dark:border-neutral-700 dark:text-neutral-300"
            onClick={clear}
          >
            Clear cart
          </button>
        </aside>
      </div>
    </div>
  );
}
