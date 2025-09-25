import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="w-full pt-4 md:pt-6">
      <div className="relative w-full min-h-[70vh] md:min-h-[85vh]">
        <img
          src="/assets/hero.png"
          alt="OZYN hero"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-transparent dark:from-black/60 dark:via-black/35"
          aria-hidden
        />
        <div className="relative grid h-full w-full items-end md:grid-cols-5">
          <div className="page-x md:col-span-2 flex flex-col gap-4 justify-end pb-10 md:pb-16 pt-14 md:pt-0">
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight text-white">
              Move beautifully.
            </h1>
            <p className="max-w-md text-sm md:text-base text-neutral-200">
              Performance-first pieces designed for women who train — gym, yoga, and everything in
              between.
            </p>
            <div>
              <Link
                to="/shop"
                className="inline-block rounded-xl border border-white/90 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:opacity-90"
              >
                Shop
              </Link>
            </div>
          </div>
          <div className="hidden md:block md:col-span-3" />
        </div>
      </div>
    </section>
  );
}
