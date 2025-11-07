// Página Home enxuta: só compõe as sections usando dados reais
import { useMemo } from "react";
import { products } from "../data/products";
import { SITE } from "../lib/site";
import Hero from "../components/Hero";
import Carousel from "../components/Carousel";
import MidBanner from "../components/MidBanner";
import CategoryGrid from "../components/CategoryGrid";
import Sustainability from "../components/Sustainability";
import Seo from "../components/Seo";

export default function Home() {
  const newArrivals = useMemo(
    () =>
      products.map((p) => ({
        title: p.title,
        category: p.category,
        price: p.salePrice ?? p.price,
        image: p.images?.[0] || p.variants?.[0]?.images?.[0],
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
    <div className="space-y-2 md:space-y-2">
      <Seo
      title={`Women's Training & Yoga Apparel | ${SITE.name}`}
      description="Performance-first pieces for women who train — gym, yoga and everything in between."
      canonical={`${SITE.url}/`}
    />
      <Hero />
      <Carousel title="New Releases" ctaLabel="Shop All" ctaTo="/shop" items={newArrivals} />
      <MidBanner />
      <Carousel title="Best Sellers" ctaLabel="Shop All" ctaTo="/shop" items={bestSellers} />
      <CategoryGrid />
      <Sustainability />
    </div>
  );
}
