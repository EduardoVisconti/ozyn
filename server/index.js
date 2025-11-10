require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
const priceMap = require("./priceMap");

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ozynfit.web.app",
      "https://ozynfit.firebaseapp.com",
    ],
  })
);
app.use(express.json());

function mapItemsToPrices(items = []) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("No items provided");
  }

  return items.map((item) => {
    const slug = item.slug;
    const qty = item.qty ?? 1;

    if (!slug) throw new Error("Missing slug for item");

    let key = slug;

    // Se você tiver prices diferentes por cor para Power Seamless:
    // (só descomenta se configurou no priceMap)
    /*
    if (slug === "power-seamless-set") {
      const color = (item.color || "").toLowerCase();
      if (!color) {
        throw new Error(`Missing color for Power Seamless Set (slug="${slug}")`);
      }
      key = `${slug}::${color}`;
    }
    */

    const priceId = priceMap[key];

    if (!priceId) {
      throw new Error(`Price not found for slug="${slug}" (key="${key}")`);
    }

    return {
      price: priceId,
      quantity: qty,
    };
  });
}

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { items, successUrl, cancelUrl, customerEmail } = req.body;

    const line_items = mapItemsToPrices(items);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      customer_email: customerEmail,
      success_url:
        successUrl ||
        "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: cancelUrl || "http://localhost:5173/cart",
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      allow_promotion_codes: true,
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error("Stripe session error:", err);
    res
      .status(500)
      .json({ error: err.message || "Internal server error" });
  }
});

const PORT = process.env.PORT || 8787;
app.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`);
});
