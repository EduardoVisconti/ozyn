// src/components/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white py-12 text-sm text-neutral-700 dark:border-neutral-800 dark:bg-black dark:text-neutral-300">
      {/* topo do footer: grid centralizada */}
      <div className="page-x mx-auto max-w-[1600px]">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 justify-items-center md:justify-items-start text-center md:text-left">
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400">
              Help
            </div>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="hover:opacity-80">FAQ</Link>
              <Link to="/" className="hover:opacity-80">Track your order</Link>
              <Link to="/" className="hover:opacity-80">Size Guide</Link>
              <Link to="/" className="hover:opacity-80">Start a return</Link>
              <Link to="/" className="hover:opacity-80">Contact us</Link>
            </nav>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400">
              Services
            </div>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="hover:opacity-80">Shipping & Returns</Link>
              <Link to="/" className="hover:opacity-80">Accessibility</Link>
              <Link to="/" className="hover:opacity-80">Your Privacy Choices</Link>
            </nav>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400">
              About
            </div>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="hover:opacity-80">About us</Link>
              <Link to="/" className="hover:opacity-80">Careers</Link>
              <Link to="/" className="hover:opacity-80">Transparency</Link>
            </nav>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400">
              Legal
            </div>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="hover:opacity-80">Privacy Policy</Link>
              <Link to="/" className="hover:opacity-80">Terms of Service</Link>
            </nav>
          </div>
        </div>

        {/* linha de baixo centralizada */}
        <div className="mt-10 border-t border-neutral-200 pt-6 text-center text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
          © {new Date().getFullYear()} Ozyn. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
