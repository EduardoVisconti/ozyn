import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Register() {
  const { register, mapError } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    if (password !== confirm) return setErr("Passwords do not match.");
    setLoading(true);
    try {
      await register({ name: name.trim(), email: email.trim(), password });
      nav("/account", { replace: true });
    } catch (e) {
      setErr(mapError(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] grid place-items-center page-x py-16">
      <div className="w-full max-w-md rounded-3xl border border-neutral-200 p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
        <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Create account</h1>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
          Join Ozyn and start moving.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600 dark:text-neutral-300">
              Name
            </label>
            <input
              type="text"
              className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
          </div>

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

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600 dark:text-neutral-300">
                Password
              </label>
              <input
                type="password"
                className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
                minLength={6}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600 dark:text-neutral-300">
                Confirm password
              </label>
              <input
                type="password"
                className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                autoComplete="new-password"
                required
                minLength={6}
              />
            </div>
          </div>

          {err && <div className="text-sm text-red-600 dark:text-red-400">{err}</div>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-xl border border-neutral-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-900 hover:opacity-90 disabled:opacity-50 dark:border-neutral-100 dark:text-neutral-100"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-300">
          Already have an account?{" "}
          <Link to="/auth/login" className="underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
