// src/components/Header.jsx
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, User, ShoppingBag, Sun, Moon } from "lucide-react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext"; // <-- importa o auth

/* theme with persistence */
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
  return { theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggle } = useTheme();
  const { count } = useContext(CartContext) || { count: 0 };
  const { user } = useContext(AuthContext) || {}; // <-- pega o usuário logado (se existir)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "SHOP", to: "/shop" },
    { label: "ON SALE", to: "/sale" },
    { label: "ABOUT", to: "/about" },
    { label: "CONTACT", to: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* announcement */}
      <div className="w-full bg-neutral-100 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 text-xs md:text-sm">
        <div className="w-full py-2 text-center tracking-wide">
          Launch Sale — 15% OFF · Use code: OZYN15
        </div>
      </div>

      {/* nav */}
      <div
        className={`w-full bg-white/90 dark:bg-black/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-black/70 ${
          isScrolled ? "shadow-sm shadow-black/10 dark:shadow-black/30" : ""
        }`}
      >
        <nav className="relative flex h-16 w-full items-center justify-between page-x md:h-20">
          {/* MOBILE brand (left) */}
          <Link
            to="/"
            className="md:hidden text-xl font-semibold tracking-[0.25em] text-neutral-900 dark:text-neutral-100"
          >
            OZYN
          </Link>

          {/* LEFT links (desktop) */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="text-sm font-medium uppercase tracking-wide text-neutral-800 dark:text-neutral-200"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CENTER brand (desktop) */}
          <div className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 md:block">
            <Link
              to="/"
              className="pointer-events-auto select-none text-2xl font-semibold tracking-[0.25em] text-neutral-900 dark:text-neutral-100"
            >
              OZYN
            </Link>
          </div>

          {/* RIGHT icons */}
          <div className="flex items-center gap-3 md:gap-5 ml-auto">
            <button
              aria-label="Search"
              className="hidden md:inline-flex rounded p-1 text-neutral-800 dark:text-neutral-200"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* <-- se estiver logado vai para /account, senão /auth/login */}
            <Link
              to={user ? "/account" : "/auth/login"}
              aria-label="Account"
              className="rounded p-1 text-neutral-800 dark:text-neutral-200"
            >
              <User className="h-5 w-5" />
            </Link>

            <Link
              to="/cart"
              aria-label="Cart"
              className="relative rounded p-1 text-neutral-800 dark:text-neutral-200"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="pointer-events-none absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-red-700 px-1 text-[10px] font-semibold text-white">
                {count}
              </span>
            </Link>

            <button
              aria-label="Toggle theme"
              onClick={toggle}
              className="rounded p-1 text-neutral-800 dark:text-neutral-200"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
