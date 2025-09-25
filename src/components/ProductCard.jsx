import { Link } from "react-router-dom";

export default function ProductCard({ item }) {
  const price = item.price;
  return (
    <Link
      to={item.to}
      data-card
      className="group relative flex w-[300px] sm:w-[320px] md:w-[360px] xl:w-[400px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950"
    >
      <div className="relative w-full overflow-hidden h-[440px] sm:h-[480px] md:h-[520px] xl:h-[560px]">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div
            className="h-full w-full bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-700"
            aria-hidden
          />
        )}
        {item.tag && (
          <span className="absolute left-2 top-2 rounded bg-black/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white dark:bg-white/10">
            {item.tag}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <div className="text-sm text-neutral-600 dark:text-neutral-300">{item.category}</div>
        <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          {item.title}
        </div>
        <div className="mt-auto text-sm text-neutral-700 dark:text-neutral-300">${price}</div>
      </div>
    </Link>
  );
}
