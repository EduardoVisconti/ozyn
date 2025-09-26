export default function ShippingReturns() {
  return (
    <div className="page-x py-12 md:py-16">
      <h1 className="text-2xl font-semibold">Shipping & Returns</h1>

      <div className="mt-6 space-y-6 text-sm text-neutral-700 dark:text-neutral-300">
        <section>
          <h2 className="font-semibold text-neutral-900 dark:text-neutral-100">Shipping</h2>
          <p className="mt-1">Processing: 1–2 business days. Delivery: 3–7 business days (US only).</p>
        </section>

        <section>
          <h2 className="font-semibold text-neutral-900 dark:text-neutral-100">Returns</h2>
          <p className="mt-1">30-day returns on unworn items with tags in original packaging. Return shipping may apply.</p>
        </section>

        <section>
          <h2 className="font-semibold text-neutral-900 dark:text-neutral-100">Exchanges</h2>
          <p className="mt-1">If you need a different size or color, please place a new order and return the original item.</p>
        </section>

        <section>
          <h2 className="font-semibold text-neutral-900 dark:text-neutral-100">Questions</h2>
          <p className="mt-1">Reach out at <a className="underline" href="mailto:hello@ozyn.com">hello@ozyn.com</a>.</p>
        </section>
      </div>
    </div>
  );
}
