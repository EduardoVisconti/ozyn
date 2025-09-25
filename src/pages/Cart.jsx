// src/pages/Cart.jsx
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { items, inc, dec, removeIndex, subtotal, isEmpty, clear } =
    useContext(CartContext);

  return (
    <div className="page-x py-12 md:py-16">
      <h1 className="mb-6 text-2xl font-semibold">Cart</h1>

      {isEmpty ? (
        <div className="rounded-2xl border border-neutral-200 p-8 text-center dark:border-neutral-800">
          <p className="text-neutral-600 dark:text-neutral-300">Your cart is empty.</p>
          <Link
            to="/shop"
            className="mt-4 inline-block rounded-xl border border-neutral-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-900 hover:opacity-90 dark:border-neutral-100 dark:text-neutral-100"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-3">
          {/* items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((it, idx) => (
              <div
                key={idx}
                className="grid grid-cols-[96px_1fr_auto] items-center gap-4 rounded-2xl border border-neutral-200 p-3 dark:border-neutral-800"
              >
                <div className="relative h-24 w-24 overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
                  {it.image ? (
                    <img src={it.image} alt={it.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full bg-neutral-200 dark:bg-neutral-800" />
                  )}
                </div>

                <div className="text-sm">
                  <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {it.title}
                  </div>
                  <div className="mt-1 text-neutral-600 dark:text-neutral-300">
                    {it.color && <span className="mr-3">Color: {it.color}</span>}
                    {it.size && <span>Size: {it.size}</span>}
                  </div>
                  <div className="mt-2 inline-flex items-center rounded-md border border-neutral-300 dark:border-neutral-700">
                    <button className="px-3 py-1" onClick={() => dec(idx)}>
                      −
                    </button>
                    <div className="px-3 py-1">{it.qty}</div>
                    <button className="px-3 py-1" onClick={() => inc(idx)}>
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="text-sm font-semibold">${(it.price * it.qty).toFixed(2)}</div>
                  <button
                    onClick={() => removeIndex(idx)}
                    className="text-xs text-neutral-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* summary */}
          <div className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <p className="mt-2 text-xs text-neutral-500">
              Taxes & shipping calculated at checkout.
            </p>

            <button
              onClick={() => alert("Checkout: integrar Stripe depois.")}
              className="mt-5 w-full rounded-xl border border-neutral-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-900 hover:opacity-90 dark:border-neutral-100 dark:text-neutral-100"
            >
              Checkout
            </button>

            <button
              onClick={clear}
              className="mt-3 w-full rounded-xl border border-neutral-300 px-6 py-3 text-xs uppercase tracking-wide text-neutral-700 hover:opacity-90 dark:border-neutral-700 dark:text-neutral-300"
            >
              Clear cart
            </button>
            <Link to="/shop" className="mt-3 block text-center text-xs underline">
              Continue shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
