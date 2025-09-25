// src/pages/Product.jsx
import { useContext, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import { CartContext } from "../context/CartContext";

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
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Product not found.
        </p>
        <Link to="/shop" className="mt-4 inline-block underline">
          Back to Shop
        </Link>
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

  return (
    <div className="page-x py-12 md:py-16">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Galeria simples */}
        <div className="space-y-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
            <img
              src={product.images?.[0]}
              alt={product.title}
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
          {product.images?.[1] && (
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
              <img
                src={product.images?.[1]}
                alt={product.title + " alt"}
                className="h-full w-full object-cover"
                loading="lazy"
              />
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
                  <span className="text-sm line-through text-neutral-500">
                    ${product.price}
                  </span>
                </>
              ) : (
                <span className="text-xl font-semibold">${product.price}</span>
              )}
            </div>
          </div>

          {/* Escolhas */}
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
                      color === c
                        ? "border-neutral-900 dark:border-neutral-100"
                        : "border-neutral-300 dark:border-neutral-700"
                    }`}
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
                      size === s
                        ? "border-neutral-900 dark:border-neutral-100"
                        : "border-neutral-300 dark:border-neutral-700"
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
            <div className="text-xs font-semibold uppercase tracking-wide text-neutral-600 dark:text-neutral-300">
              Qty
            </div>
            <div className="inline-flex items-center rounded-md border border-neutral-300 dark:border-neutral-700">
              <button
                className="px-3 py-1"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <div className="px-3 py-1 text-sm">{qty}</div>
              <button className="px-3 py-1" onClick={() => setQty((q) => q + 1)}>
                +
              </button>
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

          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}
