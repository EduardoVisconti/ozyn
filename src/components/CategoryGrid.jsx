import { Link } from "react-router-dom";
import { products } from "../data/products";

const desiredCategories = ["Leggings", "Sports Bras", "Tops", "Shorts", "Jackets", "Accessories"];
const fallbackImages = [
  "/assets/prod/leggings-1.jpg",
  "/assets/prod/bra-1.jpg",
  "/assets/prod/tank-1.jpg",
  "/assets/prod/leggings-1b.jpg",
  "/assets/prod/bra-1b.jpg",
  "/assets/prod/tank-1.jpg",
];

function findImageForCategory(cat, fallbackIdx) {
  const match = products.find(
    (p) => p.category.toLowerCase() === cat.toLowerCase() && p.images?.[0]
  );
  return match?.images?.[0] || fallbackImages[fallbackIdx % fallbackImages.length];
}

function CategoryTile({ label, to, image }) {
  return (
    <Link
      to={to}
      className="group relative flex h-48 md:h-60 xl:h-64 items-end overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 transition hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
    >
      {image ? (
        <img src={image} alt={label} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      <span className="relative z-[1] m-4 rounded-md bg-black/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white dark:bg-white/10">
        {label}
      </span>
    </Link>
  );
}

export default function CategoryGrid() {
  let idx = 0;
  const data = desiredCategories.map((label) => {
    const img = findImageForCategory(label, idx);
    idx++;
    return { label, to: `/shop?category=${encodeURIComponent(label)}`, image: img };
  });

  return (
    <section className="w-full pb-14">
      <div className="mb-10 md:mb-12 page-x">
        <h2 className="text-xl font-semibold tracking-wide text-neutral-900 dark:text-neutral-100">
          Shop by Category
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 page-x">
        {data.map((c) => (
          <CategoryTile key={c.label} label={c.label} to={c.to} image={c.image} />
        ))}
      </div>
    </section>
  );
}
