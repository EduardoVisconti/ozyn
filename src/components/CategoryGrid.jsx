// src/components/CategoryGrid.jsx
import { useNavigate } from "react-router-dom";

const categories = [
  {
    label: "Full Sets",
    hint: "Matching tops & leggings",
    image: "/assets/products/power-black-1.jpg",
    to: "/shop?category=Sets",
  },
  {
    label: "Short Sets",
    hint: "Heat-ready fits",
    image: "/assets/products/evergreen-short-set-1.jpg",
    to: "/shop?category=Sets",
  },
  {
    label: "Layered & Jackets",
    hint: "Zip-ups & 3-piece looks",
    image: "/assets/products/mocha-set-1.jpg",
    to: "/shop?category=Sets",
  },
  {
    label: "Seamless Essentials",
    hint: "Second-skin feel",
    image: "/assets/products/power-pink-1.jpg",
    to: "/shop?category=Sets",
  },
  {
    label: "Maternity",
    hint: "Support through every stage",
    image: "/assets/products/maternity-support-set-1.jpg",
    to: "/shop?category=Maternity",
  },
  {
    label: "Dresses",
    hint: "From studio to street",
    image: "/assets/products/minimal-rib-dress-1.jpg",
    to: "/shop?category=Dresses",
  },
];

export default function CategoryGrid() {
  const navigate = useNavigate();

  return (
    <section className="page-x">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-lg font-semibold tracking-[0.18em] uppercase text-neutral-900 dark:text-neutral-50">
          Shop by Category
        </h2>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {categories.map((cat) => (
          <button
            key={cat.label}
            onClick={() => navigate(cat.to)}
            className="group relative flex h-40 items-end overflow-hidden rounded-3xl bg-neutral-900 text-left md:h-56"
          >
            {cat.image && (
              <img
                src={cat.image}
                alt={cat.label}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90" />
            <div className="relative z-10 px-4 pb-3 text-white md:px-5 md:pb-4">
              <div className="text-xs font-semibold uppercase tracking-[0.18em]">
                {cat.label}
              </div>
              <div className="text-[10px] text-neutral-200 md:text-xs">
                {cat.hint}
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
