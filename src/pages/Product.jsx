// src/pages/Product.jsx
import { useContext, useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import { CartContext } from "../context/CartContext";
import Seo from "../components/Seo";
import { SITE } from "../lib/site";

export default function Product() {
  const { slug } = useParams();
  const { add } = useContext(CartContext);

  const product = useMemo(
    () => products.find((p) => p.seo.slug === slug),
    [slug]
  );

  // sempre começa do topo ao trocar de produto
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const hasVariants = !!product?.variants?.length;

  const [variantIndex, setVariantIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  // reset quando produto muda
  useEffect(() => {
    if (!product) return;
    setVariantIndex(0);
    setActiveImageIndex(0);
    setQty(1);
    setJustAdded(false);
    if (product.sizes?.length) {
      setSize(product.sizes[0]);
    } else {
      setSize(null);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="page-x py-16">
        <Seo
          title={`Product not found | ${SITE.name}`}
          description="Product not found."
        />
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Product not found.
        </p>
        <Link to="/shop" className="mt-4 inline-block underline">
          Back to Shop
        </Link>
      </div>
    );
  }

  const currentVariant = hasVariants
    ? product.variants[variantIndex] || product.variants[0]
    : null;

  const images = hasVariants
    ? currentVariant.images || []
    : product.images || [];

  const color = hasVariants
    ? currentVariant.color
    : product.color || currentVariant?.color || null;

  const price = product.price;

  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.title,
    image: images,
    description: product.description,
    brand: { "@type": "Brand", name: SITE.name },
    sku: product.id,
    offers: {
      "@type": "Offer",
      url: `${SITE.url}/product/${product.seo.slug}`,
      priceCurrency: "USD",
      price: String(price),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  const handlePrev = () => {
    if (!images.length) return;
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    if (!images.length) return;
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const handleAddToCart = () => {
    if (product.sizes?.length && !size) {
      alert("Please select a size.");
      return;
    }

    const displayColor = color || "Default";

    add({
      id: hasVariants
        ? `${product.id}-${currentVariant.code}-${size || "nosize"}`
        : `${product.id}-${displayColor}-${size || "nosize"}`,
      title: hasVariants
        ? `${product.title} - ${displayColor}`
        : product.title,
      price,
      qty,
      color: displayColor,
      size: size || null,
      image: images[activeImageIndex] || images[0],
      slug: product.seo.slug,
    });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <>
      <Seo
        title={`${product.seo.metaTitle || product.title} | ${SITE.name}`}
        description={
          product.seo.metaDescription || product.description || ""
        }
        canonical={`${SITE.url}/product/${product.seo.slug}`}
        jsonLd={productJsonLd}
      />

      <div className="page-x pb-24 pt-10 md:pb-16 md:pt-16">
        <div className="grid gap-10 md:grid-cols-2">
          {/* GALLERY */}
          <div className="space-y-3">
            {/* main image */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
              <img
                src={images[activeImageIndex] || images[0]}
                alt={product.title}
                className="h-full w-full object-cover"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-2 py-1 text-xs text-white backdrop-blur hover:bg-black/70"
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-2 py-1 text-xs text-white backdrop-blur hover:bg-black/70"
                    aria-label="Next image"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {/* thumbnails */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 md:grid-cols-5">
                {images.map((src, idx) => (
                  <button
                    key={src + idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-[4/5] overflow-hidden rounded-xl border ${
                      idx === activeImageIndex
                        ? "border-neutral-900 dark:border-neutral-100"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={src}
                      alt={`${product.title} view ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* INFO */}
          <div className="space-y-6">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
                {product.category}
              </div>
              <h1 className="mt-1 text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
                {product.title}
              </h1>
              {color && (
                <div className="mt-1 text-xs uppercase tracking-[0.16em] text-neutral-500">
                  Color: {color}
                </div>
              )}
              <div className="mt-3 text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                ${price}
              </div>
            </div>

            {/* Variants (cores) */}
            {hasVariants && (
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wide text-neutral-700 dark:text-neutral-300">
                  Color
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v, idx) => (
                    <button
                      key={v.color}
                      onClick={() => {
                        setVariantIndex(idx);
                        setActiveImageIndex(0);
                      }}
                      className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.16em] ${
                        idx === variantIndex
                          ? "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-50 dark:bg-neutral-50 dark:text-black"
                          : "border-neutral-300 text-neutral-800 dark:border-neutral-700 dark:text-neutral-200"
                      }`}
                    >
                      {v.color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes?.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wide text-neutral-700 dark:text-neutral-300">
                  Size
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`rounded-md border px-3 py-1 text-sm ${
                        size === s
                          ? "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-50 dark:bg-neutral-50 dark:text-black"
                          : "border-neutral-300 text-neutral-800 dark:border-neutral-700 dark:text-neutral-200"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty */}
            <div className="flex items-center gap-3">
              <div className="text-xs font-semibold uppercase tracking-wide text-neutral-700 dark:text-neutral-300">
                Qty
              </div>
              <div className="inline-flex items-center rounded-md border border-neutral-300 dark:border-neutral-700">
                <button
                  className="px-3 py-1"
                  onClick={() =>
                    setQty((q) => (q > 1 ? q - 1 : 1))
                  }
                >
                  −
                </button>
                <div className="px-3 py-1 text-sm">
                  {qty}
                </div>
                <button
                  className="px-3 py-1"
                  onClick={() => setQty((q) => q + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleAddToCart}
                className="rounded-xl border border-neutral-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-neutral-900 hover:bg-neutral-900 hover:text-white dark:border-neutral-50 dark:text-neutral-50 dark:hover:bg-neutral-50 dark:hover:text-black"
              >
                {justAdded ? "Added" : "Add to Cart"}
              </button>
              <Link
                to="/shop"
                className="rounded-xl border border-neutral-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900/60"
              >
                Continue Shopping
              </Link>
            </div>

            {/* Bullets + Description */}
            <ul className="mt-2 space-y-1 text-xs text-neutral-700 dark:text-neutral-300">
              <li>• Seamless, squat-proof and breathable.</li>
              <li>• Designed for gym, studio and everyday wear.</li>
              <li>• Secure checkout powered by Stripe.</li>
            </ul>

            {product.description && (
              <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                {product.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
