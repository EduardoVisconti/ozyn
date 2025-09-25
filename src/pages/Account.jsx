// src/pages/Account.jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Account() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="page-x py-12 md:py-16">
      <h1 className="text-2xl font-semibold">Account</h1>

      <div className="mt-4 rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800">
        <div className="text-sm text-neutral-700 dark:text-neutral-300">
          <div>
            <span className="font-semibold">Name:</span>{" "}
            {user?.displayName || "—"}
          </div>
          <div className="mt-1">
            <span className="font-semibold">Email:</span>{" "}
            {user?.email}
          </div>
        </div>

        <button
          onClick={logout}
          className="mt-6 rounded-xl border border-neutral-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-900 hover:opacity-90 dark:border-neutral-100 dark:text-neutral-100"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
