// Página Home enxuta: só compõe as sections usando dados reais
import { useMemo } from "react";
import { products } from "../data/products";
import Hero from "../components/Hero";
import Carousel from "../components/Carousel";
import CategoryGrid from "../components/CategoryGrid";
import Sustainability from "../components/Sustainability";

export default function Home() {
  const newArrivals = useMemo(
    () =>
      products.map((p) => ({
        title: p.title,
        category: p.category,
        price: p.salePrice ?? p.price,
        image: p.images?.[0],
        tag: "New",
        to: `/product/${p.seo.slug}`,
      })),
    []
  );

  const bestSellers = useMemo(
    () =>
      [...products].reverse().map((p) => ({
        title: p.title,
        category: p.category,
        price: p.salePrice ?? p.price,
        image: p.images?.[0],
        to: `/product/${p.seo.slug}`,
      })),
    []
  );

  return (
    <div className="space-y-24 md:space-y-32">
      <Hero />
      <Carousel title="New Releases" ctaLabel="Shop All" ctaTo="/shop" items={newArrivals} />
      <Carousel title="Best Sellers" ctaLabel="Shop All" ctaTo="/shop" items={bestSellers} />
      <CategoryGrid />
      <Sustainability />
    </div>
  );
}
