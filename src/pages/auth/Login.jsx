import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const { login, resetPassword, mapError } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const loc = useLocation();
  const redirectTo = loc.state?.from?.pathname || "/account";

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await login(email.trim(), password);
      nav(redirectTo, { replace: true });
    } catch (e) {
      setErr(mapError(e));
    } finally {
      setLoading(false);
    }
  };

  const onReset = async () => {
    if (!email) return setErr("Enter your email to reset the password.");
    setErr("");
    try {
      await resetPassword(email.trim());
      alert("We sent a password reset link to your email (check spam).");
    } catch (e) {
      setErr(mapError(e));
    }
  };

  return (
    <div className="min-h-[70vh] grid place-items-center page-x py-16">
      <div className="w-full max-w-md rounded-3xl border border-neutral-200 p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
        <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Sign in</h1>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
          Access your Ozyn account.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600 dark:text-neutral-300">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600 dark:text-neutral-300">
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {err && <div className="text-sm text-red-600 dark:text-red-400">{err}</div>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-xl border border-neutral-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-900 hover:opacity-90 disabled:opacity-50 dark:border-neutral-100 dark:text-neutral-100"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <button
            type="button"
            onClick={onReset}
            className="w-full rounded-xl border border-neutral-300 px-6 py-2 text-xs uppercase tracking-wide text-neutral-700 hover:opacity-90 dark:border-neutral-700 dark:text-neutral-300"
          >
            Forgot your password?
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-300">
          Don’t have an account?{" "}
          <Link to="/auth/register" className="underline">
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
}
