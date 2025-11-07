// src/pages/Shop.jsx
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { products } from "../data/products";
import { SITE } from "../lib/site";
import Seo from "../components/Seo";

export default function Shop() {
  const [params] = useSearchParams();
  const category = params.get("category") || "";
  
  // sempre começar do topo quando mudar categoria ou entrar na shop
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  const list = category
    ? products.filter(
        (p) =>
          p.category.toLowerCase() === category.toLowerCase()
      )
    : products;

  return (
    <div className="page-x py-12 md:py-16">
      <Seo
        title={`Shop | ${SITE.name}`}
        description="Explore performance-first sets, dresses and maternity pieces designed for women who train."
        canonical={`${SITE.url}/shop`}
      />

      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="text-2xl font-semibold">
          {category ? `Shop — ${category}` : "Shop"}
        </h1>
        <div className="text-sm text-neutral-600 dark:text-neutral-300">
          {list.length} {list.length === 1 ? "product" : "products"}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
        {list.map((p) => {
          const cover =
            p.images?.[0] || p.variants?.[0]?.images?.[0];

          return (
            <Link
              key={p.id}
              to={`/product/${p.seo.slug}`}
              className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:bg-neutral-950 dark:border-neutral-800"
            >
              <div className="relative aspect-[4/5]">
                {cover && (
                  <img
                    src={cover}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                )}
                {p.tags?.includes("new") && (
                  <span className="absolute left-2 top-2 rounded bg-black/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                    New
                  </span>
                )}
                {p.tags?.includes("bestseller") && (
                  <span className="absolute right-2 top-2 rounded bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-black">
                    Best Seller
                  </span>
                )}
              </div>
              <div className="p-3 text-sm">
                <div className="text-[11px] uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                  {p.category}
                </div>
                <div className="line-clamp-2 font-semibold text-neutral-900 dark:text-neutral-100">
                  {p.title}
                </div>
                <div className="mt-1 text-neutral-900 dark:text-neutral-100">
                  ${p.price}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
