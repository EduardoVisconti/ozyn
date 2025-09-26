export default function FAQ() {
  return (
    <div className="page-x py-12 md:py-16">
      <h1 className="text-2xl font-semibold">FAQ</h1>
      <div className="mt-6 space-y-6 text-sm text-neutral-700 dark:text-neutral-300">
        <div>
          <h2 className="font-semibold text-neutral-900 dark:text-neutral-100">Where do you ship?</h2>
          <p className="mt-1">We currently ship within the United States.</p>
        </div>
        <div>
          <h2 className="font-semibold text-neutral-900 dark:text-neutral-100">How long is shipping?</h2>
          <p className="mt-1">Orders typically process in 1–2 business days and deliver in 3–7 business days.</p>
        </div>
        <div>
          <h2 className="font-semibold text-neutral-900 dark:text-neutral-100">What’s your return policy?</h2>
          <p className="mt-1">30-day returns on unworn items with tags. See <a href="/shipping-returns" className="underline">Shipping & Returns</a> for details.</p>
        </div>
        <div>
          <h2 className="font-semibold text-neutral-900 dark:text-neutral-100">How do I find my size?</h2>
          <p className="mt-1">Check the <a href="/size-guide" className="underline">Size Guide</a> for measurements and fit tips.</p>
        </div>
      </div>
    </div>
  );
}
