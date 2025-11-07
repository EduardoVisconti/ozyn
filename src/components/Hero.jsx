import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      {/* Background image */}
      <img
        src="/assets/hero.jpg"
        alt="OZYN performance wear"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Gradient overlay para ler o texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content bottom-left */}
      <div className="relative flex h-full items-end">
        <div className="page-x pb-16 md:pb-24">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-semibold leading-tight md:text-7xl md:leading-[1.05]">
              Holiday
              <br />
              show-stoppers.
            </h1>
            <p className="mt-4 text-base md:text-xl leading-relaxed text-neutral-100">
              This gear performs as effortlessly as you do.
            </p>
            <button
              onClick={() => (window.location.href = "/shop")}
              className="mt-6 inline-flex items-center rounded-full bg-white/95 px-7 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-900 hover:bg-white"
            >
              Shop Women&apos;s New In
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
