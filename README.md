# OZYN — Modern Activewear Storefront

OZYN is a modern ecommerce-style frontend built as a portfolio project for a women’s activewear brand.

The goal is to showcase production-ready patterns: reusable components, clean routing, a global cart with drawer UX, Firebase Authentication, and a Stripe Checkout integration via a minimal Node/Express backend — all wired with environment-based configuration and without exposing secrets.

---

## 1. Overview

Key capabilities:

- Home page with full-bleed hero, curated product rows and category grid.
- Product listing (Shop) with category filtering via query string.
- Product detail page (PDP) with:
  - size & quantity selection,
  - color variants for the **Power Seamless Set** in a single page,
  - responsive gallery with thumbnails.
- Global cart:
  - **Cart Drawer** (slide-out) + full Cart page,
  - add / increment / decrement / remove / clear,
  - persisted in `localStorage`.
- Authentication:
  - Firebase Email/Password (Login & Register),
  - protected Account page shell (Overview, Settings placeholder, Sign out).
- Stripe Checkout:
  - Node/Express endpoint to create Checkout Sessions in **test mode** using a `priceMap` contract.
  - Frontend wired to use env-based API URL.
- Deployed frontend on **Firebase Hosting** (`ozynfit.web.app`) as a live portfolio demo.

This project is safe to share publicly and suitable to include in a CV / portfolio.

---

## 2. Tech Stack

### Frontend

- **React** (Vite)
- **React Router DOM** — client-side routing
- **Tailwind CSS** — utility-first styling
- **Context API + localStorage** — cart state & cart drawer
- **Firebase Authentication** — email/password
- **SEO helpers** — `<Seo />` component for titles, descriptions, canonical URLs, and basic Product schema markup

### Backend (Checkout Demo)

- **Node.js + Express**
- **Stripe Node SDK**
- `priceMap.js` mapping product slugs → Stripe `price_id`
- CORS configured for:
  - `http://localhost:5173`
  - `https://ozynfit.web.app`
  - `https://ozynfit.firebaseapp.com`

> In the hosted version, Checkout is intentionally kept in **demo/test mode** so that no real payments are processed.

---

## 3. Project Structure

```bash
.
├─ package.json
├─ vite.config.js
├─ index.html
├─ /public
│  └─ assets/
│      ├─ hero.jpg
│      └─ products/              # Product and category images
├─ /src
│  ├─ main.jsx                   # <BrowserRouter><AuthProvider><CartProvider><App/>
│  ├─ App.jsx                    # Layout shell: Header, CartDrawer, Routes, Footer
│  ├─ index.css                  # Tailwind base + layout utilities (.page-x, etc.)
│  ├─ /lib
│  │   ├─ firebase.js            # Firebase initialization (Auth)
│  │   └─ site.js                # SITE metadata (name, url, defaults)
│  ├─ /context
│  │   ├─ AuthContext.jsx        # AuthProvider + useAuth hook
│  │   └─ CartContext.jsx        # CartProvider + cart state & drawer controls
│  ├─ /components
│  │   ├─ Header.jsx             # Logo left, centered nav, account, cart, theme toggle
│  │   ├─ Footer.jsx
│  │   ├─ Hero.jsx
│  │   ├─ Carousel.jsx           # “New Releases” / “Best Sellers”
│  │   ├─ CategoryGrid.jsx       # “Shop by Category” tiles
│  │   ├─ MidBanner.jsx          # Secondary wide banner
│  │   ├─ CartButton.jsx         # Cart icon with badge + opens drawer
│  │   ├─ CartDrawer.jsx         # Slide-out cart: list, inc/dec/remove/clear, checkout
│  │   └─ Seo.jsx                # Page-level SEO/meta helper
│  ├─ /pages
│  │   ├─ Home.jsx               # Composes hero, carousels, categories, mid-banner
│  │   ├─ Shop.jsx               # Product grid; supports ?category= filtering
│  │   ├─ Product.jsx            # PDP with variants (Power Seamless), gallery, CTAs
│  │   ├─ Cart.jsx               # Full cart page using CartContext
│  │   ├─ Account.jsx            # Auth-only shell (Overview, Orders placeholder, Settings)
│  │   └─ /auth
│  │       ├─ Login.jsx          # Firebase sign in
│  │       └─ Register.jsx       # Firebase sign up
│  ├─ /data
│  │   └─ products.js            # Mock catalog with slugs, variants, SEO fields
│  └─ /utils (optional)
│      └─ currency.js            # format helpers (if used)
└─ /server
   ├─ index.js                   # Express app + /create-checkout-session
   ├─ priceMap.js                # slug → Stripe price_id mapping
   └─ .env                       # STRIPE_SECRET_KEY, PORT (gitignored)
```

---

## 4. Data Model & Contracts

### Product shape (`/src/data/products.js`)

- Individual items:
  - `id`, `title`, `category`, `price`, `images[]`, `sizes[]`, `color?`, `tags?`
  - `seo: { slug, metaTitle, metaDescription }`
- **Power Seamless Set**:
  - Single product with `variants[]`:
    - `{ color, code, images[] }`
  - One PDP with selectable colors.

### Cart item shape

Pushed into `CartContext`:

```ts
{
  id: string;
  title: string;
  price: number;
  qty: number;
  color?: string;
  size?: string;
  image?: string;
  slug: string; // must match product.seo.slug
}
```

### Stripe Checkout request

Frontend → `POST ${VITE_API_URL}/create-checkout-session`:

```json
{
  "items": [
    {
      "slug": "mocha-layered-performance-set",
      "qty": 1,
      "size": "S",
      "color": "Mocha"
    }
  ],
  "customerEmail": "user@example.com",
  "successUrl": "http://localhost:5173/success",
  "cancelUrl": "http://localhost:5173/cart"
}
```

Backend:

- Uses `priceMap.js` to translate `slug` → `price_id`.
- Creates a Stripe Checkout Session (test mode in this project).

---

## 5. Environment Variables

All sensitive values are **local only** (not committed).

### Frontend — `.env.local`

```env
# Firebase Auth
VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID

# Stripe
VITE_STRIPE_PK=pk_test_xxx             # Test publishable key
VITE_API_URL=http://127.0.0.1:8787     # Local backend for checkout
```

### Backend — `server/.env`

```env
STRIPE_SECRET_KEY=sk_test_xxx          # Test secret key
PORT=8787
```

> Use matching pairs: `pk_test` with `sk_test`, or `pk_live` with `sk_live`.  
> For this portfolio, **test mode** is recommended.

---

## 6. Running Locally

### 1) Install dependencies

```bash
# root (frontend)
npm install

# server
cd server
npm install
cd ..
```

### 2) Start the backend (Stripe test mode)

```bash
cd server
npm start
# -> [server] listening on http://localhost:8787
```

### 3) Start the frontend

```bash
cd ..
npm run dev
# -> http://localhost:5173
```

- Add products to cart.
- Use the cart drawer or cart page to initiate checkout.
- Stripe Checkout opens using **test cards** (e.g. `4242 4242 4242 4242`).

If you only want the UI for portfolio (without a running backend), you can:

- keep the server offline, and/or
- guard the checkout call to behave as a **“Demo only”** message in production.

---

## 7. Deployment Notes

Current setup:

- **Frontend**: Firebase Hosting (`ozynfit.web.app`).
- **Backend**: Local-only for development.  
  For a full production flow you would:
  - Deploy `/server` to a host with Node (Render/Railway/Fly/etc).
  - Set `VITE_API_URL` to that HTTPS endpoint.
  - Switch Stripe keys to live mode.
  - Keep all secrets in environment variables on the server side.

In this portfolio version, the emphasis is on **architecture and integration**, not on processing real transactions.

---

## 8. What This Project Demonstrates

This codebase is useful on a resume to demonstrate:

- Building a **modern ecommerce SPA** with React and Tailwind.
- Implementing **global state** (cart + drawer) via React Context + localStorage.
- Creating **auth flows** with Firebase (sign up, login, logout, protected UI).
- Integrating with **Stripe Checkout** through a Node/Express backend using environment-based configuration.
- Applying **clean folder structure**, reusable UI components and SEO-minded details.
- Safe handling of credentials (keys via `.env`, not in source control).
