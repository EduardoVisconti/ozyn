// server/index.js
require("dotenv").config();
const express = require("express");
const Stripe = require("stripe");
const priceMap = require("./priceMap");

const app = express();
const PORT = process.env.PORT || 8787;

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("[ERROR] Missing STRIPE_SECRET_KEY in server/.env");
  process.exit(1);
}
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// CORS: ajuste quando publicar
const ALLOW_ORIGINS = new Set([
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && ALLOW_ORIGINS.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === "OPTIONS") return res.status(204).end();
  next();
});

app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

// DEBUG: ver se a sua secret enxerga um price_...
app.get("/debug/price/:id", async (req, res) => {
  try {
    const p = await stripe.prices.retrieve(req.params.id);
    res.json({
      ok: true,
      id: p.id,
      currency: p.currency,
      unit_amount: p.unit_amount,
      livemode: p.livemode,
      product: p.product,
    });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
});

// frete SEM grátis (sempre cobra)
const STANDARD_SHIPPING_CENTS = 500; // $5 fixo

function mapItemsToPrices(items) {
  const mapped = [];
  for (const it of items) {
    const slug = String(it.slug || "").trim();
    const qty = Number(it.qty || 1);
    const variantKey = it.size || "DEFAULT";
    const prices = priceMap[slug];
    const priceId = prices && (prices[variantKey] || prices.DEFAULT);
    if (!priceId) {
      throw new Error(`Price not found for slug="${slug}" (variant="${variantKey}")`);
    }
    mapped.push({ priceId, qty: Math.max(1, qty) });
  }
  return mapped;
}

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { items, successUrl, cancelUrl, customerEmail } = req.body || {};
    if (!Array.isArray(items) || !items.length) {
      return res.status(400).json({ error: "No items in cart" });
    }

    const mapped = mapItemsToPrices(items);

    const line_items = mapped.map(({ priceId, qty }) => ({
      price: priceId,
      quantity: qty,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      allow_promotion_codes: true,
      customer_email: customerEmail || undefined,
      automatic_tax: { enabled: true }, // opcional; deixe true se configurou taxes
      phone_number_collection: { enabled: true },

      shipping_address_collection: { allowed_countries: ["US"] },
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: "Standard Shipping",
            type: "fixed_amount",
            fixed_amount: { amount: STANDARD_SHIPPING_CENTS, currency: "usd" },
          },
        },
      ],

      success_url:
        (successUrl || "http://localhost:5173/success") +
        "?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: cancelUrl || "http://localhost:5173/cart",

      payment_intent_data: {
        metadata: {
          cart: JSON.stringify(
            items.map(({ slug, size, color, qty }) => ({ slug, size, color, qty }))
          ),
          source: "ozyn-web",
        },
      },
      metadata: { env: process.env.NODE_ENV || "dev" },
    });

    res.json({ id: session.id });
  } catch (e) {
    console.error("Stripe session error:", e);
    res.status(500).json({ error: e.message || "Stripe error" });
  }
});

app.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`);
});
