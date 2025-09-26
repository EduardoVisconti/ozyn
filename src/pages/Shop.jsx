import { Link, useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import { SITE } from "../lib/site";
import Seo from "../components/Seo";

export default function Shop() {
  const [params] = useSearchParams();
  const category = params.get("category") || "";
  const list = category
    ? products.filter((p) => p.category.toLowerCase() === category.toLowerCase())
    : products;

  return (
    <div className="page-x py-12 md:py-16">
      <Seo
        title={`Shop | ${SITE.name}`}
        description="Explore tops, leggings, sports bras and more."
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
        {list.map((p) => (
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
              {p.salePrice && (
                <span className="absolute left-2 top-2 rounded bg-black/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                  Sale
                </span>
              )}
            </div>
            <div className="p-3 text-sm">
              <div className="text-neutral-600 dark:text-neutral-300">{p.category}</div>
              <div className="font-semibold text-neutral-900 dark:text-neutral-100">{p.title}</div>
              <div className="mt-1">
                {p.salePrice ? (
                  <>
                    <span className="font-semibold">${p.salePrice}</span>{" "}
                    <span className="text-neutral-500 line-through">${p.price}</span>
                  </>
                ) : (
                  <span className="text-neutral-700 dark:text-neutral-300">${p.price}</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
