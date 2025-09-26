# OZYN — Project Snapshot (copy-paste this whole block into your README or notes)

# ───────────────────────────────────────────────────────────────────────────────

# 1) Stack & Status

# - React (Vite + Tailwind), react-router-dom

# - Firebase Auth (email/password)

# - Stripe Checkout (server Node/Express)

# - Cart Drawer (Context + localStorage)

# - Pages: Home, Shop, Cart, Login, Register, Account

# - Header com badge do carrinho + theme toggle

# ───────────────────────────────────────────────────────────────────────────────

# ───────────────────────────────────────────────────────────────────────────────

# 2) Project Structure

# (paths are relative to repo root)

# ───────────────────────────────────────────────────────────────────────────────

.
├─ index.html
├─ vite.config.js
├─ package.json
├─ .env.local # frontend envs (ignored)
├─ /public
│ └─ assets/
│ ├─ hero.png
│ └─ products/ # product/category images
├─ /src
│ ├─ main.jsx # <BrowserRouter><AuthProvider><CartProvider><App/>
│ ├─ App.jsx # Header, CartDrawer (global), Routes, Footer
│ ├─ index.css # Tailwind base + .page-x utility
│ ├─ /lib
│ │ └─ firebase.js # init Firebase + export { auth }
│ ├─ /context
│ │ ├─ AuthContext.jsx # export { AuthProvider, useAuth, AuthContext }
│ │ └─ CartContext.jsx # export { CartProvider, CartContext } (named)
│ ├─ /components
│ │ ├─ Header.jsx # menu + brand + account + CartButton + theme toggle
│ │ ├─ Footer.jsx
│ │ ├─ CartDrawer.jsx # side panel: list, inc/dec/remove/clear, checkout
│ │ ├─ CartButton.jsx # cart icon with badge, opens drawer
│ │ └─ AddToCartButton.jsx # add to cart + open drawer (no navigation)
│ ├─ /pages
│ │ ├─ Home.jsx # hero full-bleed; New Releases; Best Sellers; Categories (3x2)
│ │ ├─ Shop.jsx # grid of products (uses AddToCartButton)
│ │ ├─ Cart.jsx # legacy cart page (drawer is primary)
│ │ ├─ Account.jsx # tabs: Overview, Orders (placeholder), Settings, Sign out
│ │ └─ /auth
│ │ ├─ Login.jsx # sign in (Firebase)
│ │ └─ Register.jsx # sign up (Firebase)
│ ├─ /data
│ │ ├─ products.js # mock catalog: {id, slug, title, price, image, color?, size?}
│ │ └─ categories.js # category tiles for “Shop by Category”
│ └─ /utils
│ └─ currency.js # formatUSD (optional)
└─ /server
├─ index.js # Express + Stripe create-checkout-session + /debug/price/:id
├─ priceMap.js # { slug -> price_id } (MUST match Stripe & frontend slugs)
└─ .env # STRIPE_SECRET_KEY, PORT

# ───────────────────────────────────────────────────────────────────────────────

# 3) Environment Variables

# ───────────────────────────────────────────────────────────────────────────────

# Frontend (.env.local)

# ---------------------

# VITE*FIREBASE*\* values from your Firebase project (Auth enabled for Email/Password).

# VITE*STRIPE_PK must match your Stripe mode (pk_live*_ with price*live*_; pk*test*_ with price*test*_).

# VITE_API_URL should point to your backend base (local or deployed).

cat > .env.local <<'EOF'
VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID

VITE_STRIPE_PK=pk_live_xxx_or_pk_test_xxx
VITE_API_URL=http://127.0.0.1:8787
EOF

# Server (server/.env)

# --------------------

# STRIPE*SECRET_KEY must be the matching mode (sk_live*_ ↔ pk*live*_, sk*test*_ ↔ pk*test*_).

cat > server/.env <<'EOF'
STRIPE_SECRET_KEY=sk_live_xxx_or_sk_test_xxx
PORT=8787
EOF

# ───────────────────────────────────────────────────────────────────────────────

# 4) Contracts & Key Notes

# ───────────────────────────────────────────────────────────────────────────────

# - Cart items object shape:

# { id, title, price, qty, color?, size?, image?, slug }

# - Checkout request (POST ${VITE_API_URL}/create-checkout-session):

# {

# items: [{ slug: "product-slug", qty: 1, size: "S", color: "Black" }],

# customerEmail: "user@example.com",

# successUrl: "http://localhost:5173/success",

# cancelUrl: "http://localhost:5173/cart"

# }

# - server/priceMap.js: slug -> price_id (MUST match Stripe products & frontend slugs)

# - Use AddToCartButton instead of navigating to /cart (it opens the Cart Drawer)

# - Only one <BrowserRouter> in the app (main.jsx)

# - AuthContext exports: { AuthProvider, useAuth, AuthContext }

# - CartContext exports: { CartProvider, CartContext } and includes: add/inc/dec/remove/clear/count/subtotal/isOpen/openCart/closeCart/toggleCart

# - Theme persisted in localStorage ("light" | "dark")

# ───────────────────────────────────────────────────────────────────────────────

# 5) Run locally

# ───────────────────────────────────────────────────────────────────────────────

# Frontend

npm i
npm run dev

# → http://localhost:5173

# Server (Stripe)

cd server
npm i
npm run dev

# → http://127.0.0.1:8787

# Debug: GET /debug/price/:id to verify your sk*\* sees the price*\*

# ───────────────────────────────────────────────────────────────────────────────

# 6) Commit suggestions (Conventional)

# ───────────────────────────────────────────────────────────────────────────────

# Single atomic commit:

git add -A
git commit -m "feat: cart drawer, header badge, auth pages, account page, and Stripe checkout server"
git push

# ───────────────────────────────────────────────────────────────────────────────

# 7) Short Roadmap

# ───────────────────────────────────────────────────────────────────────────────

# 1) PDP (detail page) with variations and related products

# 2) Shop filters/sort/pagination

# 3) Orders in Account via Stripe webhooks + Firestore

# 4) Address book (Firestore) for faster checkout

# 5) SEO/A11y polish (OG tags per PDP, sitemap/robots)

# 6) Deploy: Front (Vercel/Netlify) + Server (Render/Railway/Fly)
