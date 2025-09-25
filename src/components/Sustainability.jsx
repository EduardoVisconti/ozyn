import { Leaf, Handshake, Cloud, Recycle } from "lucide-react";

export default function Sustainability() {
  return (
    <section className="w-full pb-16">
      <div className="overflow-hidden rounded-none bg-white p-8 dark:bg-neutral-950 md:p-12">
        <h2 className="page-x text-2xl md:text-3xl font-semibold tracking-wide text-neutral-900 dark:text-neutral-100 text-center">
          Designed with an approach to reduce our environmental impact
        </h2>
        <p className="page-x mt-2 max-w-5xl text-sm text-neutral-700 dark:text-neutral-300 mx-auto text-center">
          At OZYN, we focus on doing better each season: choosing smarter materials where
          possible, prioritising partners that care for people, and designing products made
          to last your training.
        </p>
        <div className="mt-8 grid gap-6 page-x md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-neutral-200 p-6 text-center dark:border-neutral-800">
            <Leaf className="mx-auto mb-3 h-7 w-7" />
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">Materials with lower impact</h3>
            <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
              We’re increasing the share of recycled and responsibly sourced fibers across future drops.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 p-6 text-center dark:border-neutral-800">
            <Handshake className="mx-auto mb-3 h-7 w-7" />
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">Ethical & inclusive</h3>
            <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
              We aim to work with partners who uphold strong standards for worker care and safe conditions.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 p-6 text-center dark:border-neutral-800">
            <Cloud className="mx-auto mb-3 h-7 w-7" />
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">Carbon awareness</h3>
            <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
              We track and learn from our footprint while exploring ways to avoid and reduce emissions.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 p-6 text-center dark:border-neutral-800">
            <Recycle className="mx-auto mb-3 h-7 w-7" />
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">Recycled packaging</h3>
            <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
              Where possible, we use recycled content in polybags, mailers and cartons.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
