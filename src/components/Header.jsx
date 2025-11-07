// src/components/Header.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { User, Sun, Moon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import CartButton from "./CartButton";

/* Theme with persistence */
function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return {
    theme,
    toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
  };
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggle } = useTheme();
  const { user } = useAuth() || {};
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Só o que existe hoje no catálogo
  const navItems = [
    { label: "Shop All", path: "/shop" },
    { label: "Sets", category: "Sets" },
    { label: "Maternity", category: "Maternity" },
    { label: "Dresses", category: "Dresses" },
  ];

  const handleNavClick = (item) => {
    if (item.path) {
      navigate(item.path);
      window.scrollTo(0, 0);
      return;
    }

    if (item.category) {
      const params = new URLSearchParams(location.search);
      params.set("category", item.category);
      navigate(`/shop?${params.toString()}`);
      window.scrollTo(0, 0);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Announcement bar */}
      <div className="w-full bg-neutral-100 text-xs text-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
        <div className="w-full py-2 text-center tracking-wide">
          Free Shipping丨Buy 2 get 10% off with code "OZYN"
        </div>
      </div>

      {/* Main nav */}
      <div
        className={`w-full bg-white/90 backdrop-blur dark:bg-black/90 supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-black/70 ${
          isScrolled ? "shadow-sm shadow-black/10 dark:shadow-black/30" : ""
        }`}
      >
        <nav className="relative flex h-16 w-full items-center page-x md:h-20">
          {/* LEFT: Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-[36px] font-semibold tracking-[0.28em] text-neutral-900 dark:text-neutral-100"
          >
            OZYN
          </Link>

          {/* CENTER: Menu (desktop) */}
          <div className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 md:block">
            <div className="pointer-events-auto flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className="text-[14px] font-medium uppercase tracking-[0.10em] text-neutral-800 hover:opacity-80 dark:text-neutral-200"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: icons */}
          <div className="ml-auto flex items-center gap-3 md:gap-5">
            {/* Account */}
            <Link
              to={user ? "/account" : "/login"}
              aria-label="Account"
              className="rounded p-1 text-neutral-800 hover:opacity-80 dark:text-neutral-200"
            >
              <User className="h-5 w-5" />
            </Link>

            {/* Cart drawer */}
            <CartButton />

            {/* Theme toggle */}
            <button
              aria-label="Toggle theme"
              onClick={toggle}
              className="rounded p-1 text-neutral-800 hover:opacity-80 dark:text-neutral-200"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
