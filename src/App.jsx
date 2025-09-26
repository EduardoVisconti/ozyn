// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";

import Shop from "./pages/Shop";
import Sale from "./pages/Sale";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import CartDrawer from "./components/CartDrawer";

import Success from "./pages/Success";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Account from "./pages/Account";
import RequireAuth from "./routes/RequireAuth";

import FAQ from "./pages/FAQ";
import SizeGuide from "./pages/SizeGuide";
import ShippingReturns from "./pages/ShippingReturns";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Accessibility from "./pages/Accessibility";
import PrivacyChoices from "./pages/PrivacyChoices";

import GlobalSeo from "./components/GlobalSeo";
import Analytics from "./components/Analytics";

export default function App() {
  const { user } = useAuth() || {};

  return (
    <>
      <Header />
      <GlobalSeo />
      <Analytics />
       <CartDrawer userEmail={user?.email} />
      <main className="min-h-[60vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />

          {/* >>> ADICIONE ESTAS DUAS LINHAS (rotas reais) <<< */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />

          {/* redirects (ok manter) */}
          <Route path="/login" element={<Navigate to="/auth/login" replace />} />
          <Route path="/register" element={<Navigate to="/auth/register" replace />} />

          {/* Protected */}
          <Route
            path="/account"
            element={
              <RequireAuth>
                <Account />
              </RequireAuth>
            }
          />

          {/* outras páginas */}
          <Route path="/faq" element={<FAQ />} />
          <Route path="/size-guide" element={<SizeGuide />} />
          <Route path="/shipping-returns" element={<ShippingReturns />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/privacy-choices" element={<PrivacyChoices />} />

          {/* fallback opcional */}
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>

      </main>
      <Footer />
    </>
  );
}
