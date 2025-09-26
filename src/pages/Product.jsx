// src/pages/Product.jsx
import { useContext, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import { CartContext } from "../context/CartContext";
import Seo from "../components/Seo";
import { SITE } from "../lib/site";

export default function Product() {
  const { slug } = useParams();
  const product = useMemo(
    () => products.find((p) => p.seo.slug === slug),
    [slug]
  );
  const { add } = useContext(CartContext);
  const nav = useNavigate();

  const [color, setColor] = useState(product?.colors?.[0] || null);
  const [size, setSize] = useState(product?.sizes?.[0] || null);
  const [qty, setQty] = useState(1);
  const price = product?.salePrice ?? product?.price;

  if (!product) {
    return (
      <div className="page-x py-16">
        <Seo title={`Product not found | ${SITE.name}`} description="Product not found." />
        <p className="text-sm text-neutral-600 dark:text-neutral-300">Product not found.</p>
        <Link to="/shop" className="mt-4 inline-block underline">Back to Shop</Link>
      </div>
    );
  }

  const addToCart = () => {
    if (!size || !color) return;
    add({
      id: product.id,
      title: product.title,
      price,
      qty,
      color,
      size,
      image: product.images?.[0],
      slug: product.seo.slug,
    });
    nav("/cart");
  };

  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.title,
    image: product.images || [],
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

  return (
    <>
      <Seo
        title={`${product.seo.metaTitle || product.title} | ${SITE.name}`}
        description={product.seo.metaDesc || product.description}
        canonical={`${SITE.url}/product/${product.seo.slug}`}
        jsonLd={productJsonLd}
      />

      <div className="page-x pb-28 pt-12 md:pb-16 md:pt-16">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
              <img src={product.images?.[0]} alt={product.title} className="h-full w-full object-cover" loading="eager" />
            </div>
            {product.images?.[1] && (
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
                <img src={product.images?.[1]} alt={`${product.title} alt`} className="h-full w-full object-cover" loading="lazy" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                {product.category}
              </div>
              <h1 className="mt-1 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                {product.title}
              </h1>
              <div className="mt-2 flex items-center gap-3">
                {product.salePrice ? (
                  <>
                    <span className="text-xl font-semibold">${product.salePrice}</span>
                    <span className="text-sm line-through text-neutral-500">${product.price}</span>
                  </>
                ) : (
                  <span className="text-xl font-semibold">${product.price}</span>
                )}
              </div>
            </div>

            {/* Options */}
            {product.colors?.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wide text-neutral-600 dark:text-neutral-300">
                  Color
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={`rounded-full border px-3 py-1 text-sm capitalize ${
                        color === c ? "border-neutral-900 dark:border-neutral-100" : "border-neutral-300 dark:border-neutral-700"
                      }`}
                      aria-pressed={color === c}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes?.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wide text-neutral-600 dark:text-neutral-300">
                  Size
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`rounded-md border px-3 py-1 text-sm ${
                        size === s ? "border-neutral-900 dark:border-neutral-100" : "border-neutral-300 dark:border-neutral-700"
                      }`}
                      aria-pressed={size === s}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty */}
            <div className="flex items-center gap-3">
              <div className="text-xs font-semibold uppercase tracking-wide text-neutral-600 dark:text-neutral-300">
                Qty
              </div>
              <div className="inline-flex items-center rounded-md border border-neutral-300 dark:border-neutral-700" role="group" aria-label="Quantity">
                <button className="px-3 py-1" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
                <div className="px-3 py-1 text-sm" aria-live="polite">{qty}</div>
                <button className="px-3 py-1" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">+</button>
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <button
                onClick={addToCart}
                disabled={!color || !size}
                className="rounded-xl border border-neutral-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-900 hover:opacity-90 dark:border-neutral-100 dark:text-neutral-100 disabled:opacity-50"
              >
                Add to Cart
              </button>
              <Link
                to="/shop"
                className="rounded-xl border border-neutral-300 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-700 hover:opacity-90 dark:border-neutral-700 dark:text-neutral-300"
              >
                Continue Shopping
              </Link>
            </div>

            {/* Trust bullets */}
            <ul className="mt-2 space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
              <li>• Free US shipping</li>
              <li>• 30-day returns on unworn items</li>
              <li>• Secure checkout</li>
            </ul>

            <p className="text-sm text-neutral-700 dark:text-neutral-300">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Sticky Add to Cart (mobile) */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 p-3 backdrop-blur md:hidden dark:border-neutral-800 dark:bg-black/80">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">{product.title}</div>
            <div className="text-xs text-neutral-600 dark:text-neutral-300">${price}</div>
          </div>
          <button
            onClick={addToCart}
            disabled={!color || !size}
            className="shrink-0 rounded-xl border border-neutral-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-900 hover:opacity-90 dark:border-neutral-100 dark:text-neutral-100 disabled:opacity-50"
            aria-label="Add to cart"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}
