// src/pages/Sale.jsx
import { Link } from "react-router-dom";
import { products } from "../data/Products";
import { SITE } from "../lib/site";
import Seo from "../components/Seo";

export default function Sale() {
  const onSale = products.filter((p) => p.salePrice);
  return (
    <div className="page-x py-12 md:py-16">
      <Seo
        title={`On Sale | ${SITE.name}`}
        description="Marked-down styles while they last."
        canonical={`${SITE.url}/sale`}
      />
      <div className="mb-6 flex items-end justify-between">
        <h1 className="text-2xl font-semibold">On Sale</h1>
        <div className="text-sm text-neutral-600 dark:text-neutral-300">
          {onSale.length} products
        </div>
      </div>

      {onSale.length === 0 ? (
        <p className="text-neutral-600 dark:text-neutral-300">No items on sale right now.</p>
      ) : (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
          {onSale.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.seo.slug}`}
              className="group rounded-2xl border border-neutral-200 bg-white dark:bg-neutral-950 dark:border-neutral-800 overflow-hidden"
            >
              <div className="relative aspect-[4/5]">
                <img
                  src={p.images?.[0]}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <span className="absolute left-2 top-2 rounded bg-black/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                  Sale
                </span>
              </div>
              <div className="p-3 text-sm">
                <div className="text-neutral-600 dark:text-neutral-300">{p.category}</div>
                <div className="font-semibold text-neutral-900 dark:text-neutral-100">{p.title}</div>
                <div className="mt-1">
                  <span className="font-semibold">${p.salePrice}</span>{" "}
                  <span className="text-neutral-500 line-through">${p.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
