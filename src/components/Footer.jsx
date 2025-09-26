import { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    // TODO: integrate a real email service later
    try {
      localStorage.setItem("ozyn_newsletter", email);
      setOk(true);
      setEmail("");
    } catch {}
  };

  return (
    <footer className="border-t border-neutral-200 bg-white py-12 text-sm text-neutral-700 dark:border-neutral-800 dark:bg-black dark:text-neutral-300">
      <div className="page-x mx-auto max-w-[1600px]">
        {/* Newsletter */}
        <div className="mx-auto mb-10 max-w-xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400">
            Stay in the loop
          </div>
          <h3 className="mt-1 text-lg font-semibold text-neutral-900 dark:text-neutral-100">Sign up for updates</h3>
          <form onSubmit={onSubmit} className="mt-4 flex items-center justify-center gap-2">
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full max-w-[360px] rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="rounded-xl border border-neutral-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-900 hover:opacity-90 dark:border-neutral-100 dark:text-neutral-100"
            >
              Subscribe
            </button>
          </form>
          {ok && <div className="mt-2 text-xs text-green-600">Thanks! You’re in.</div>}
        </div>

        {/* Links */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 justify-items-center md:justify-items-start text-center md:text-left">
          {/* HELP */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400">
              Help
            </div>
            <nav className="flex flex-col gap-2">
              <Link to="/faq" className="hover:opacity-80">FAQ</Link>
              <Link to="/size-guide" className="hover:opacity-80">Size Guide</Link>
              <Link to="/shipping-returns" className="hover:opacity-80">Shipping & Returns</Link>
              <Link to="/contact" className="hover:opacity-80">Contact us</Link>
            </nav>
          </div>

          {/* ABOUT */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400">
              About
            </div>
            <nav className="flex flex-col gap-2">
              <Link to="/about" className="hover:opacity-80">About us</Link>
            </nav>
          </div>

          {/* LEGAL */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400">
              Legal
            </div>
            <nav className="flex flex-col gap-2">
              <Link to="/privacy" className="hover:opacity-80">Privacy Policy</Link>
              <Link to="/terms" className="hover:opacity-80">Terms of Service</Link>
              <Link to="/accessibility" className="hover:opacity-80">Accessibility</Link>
              <Link to="/privacy-choices" className="hover:opacity-80">Your Privacy Choices</Link>
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-neutral-200 pt-6 text-center text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
          © {new Date().getFullYear()} Ozyn. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
