// src/pages/account/Account.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Account() {
  const { user, signOut } = useAuth() || {};
  const [tab, setTab] = useState("overview"); // "overview" | "orders" | "settings"

  if (!user) {
    return (
      <main className="page-x py-16">
        <h1 className="text-2xl font-semibold">Account</h1>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400">
          You need to sign in to access your account.
        </p>
      </main>
    );
  }

  return (
    <main className="page-x py-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        {/* Sidebar */}
        <aside className="w-full max-w-[240px] rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
          <div className="text-sm font-semibold">{user.displayName || "Your account"}</div>
          <div className="mt-1 text-xs text-neutral-500">{user.email}</div>

          <nav className="mt-4 flex flex-col gap-1 text-sm">
            <button
              className={`rounded-lg px-3 py-2 text-left ${tab === "overview" ? "bg-neutral-100 dark:bg-neutral-900" : ""}`}
              onClick={() => setTab("overview")}
            >
              Overview
            </button>
            <button
              className={`rounded-lg px-3 py-2 text-left ${tab === "orders" ? "bg-neutral-100 dark:bg-neutral-900" : ""}`}
              onClick={() => setTab("orders")}
            >
              Orders
            </button>
            <button
              className={`rounded-lg px-3 py-2 text-left ${tab === "settings" ? "bg-neutral-100 dark:bg-neutral-900" : ""}`}
              onClick={() => setTab("settings")}
            >
              Settings
            </button>
          </nav>

          <button
            onClick={signOut}
            className="mt-4 w-full rounded-xl border border-neutral-300 px-3 py-2 text-xs uppercase tracking-wide text-neutral-700 hover:opacity-90 dark:border-neutral-700 dark:text-neutral-300"
          >
            Sign out
          </button>
        </aside>

        {/* Content */}
        <section className="flex-1 rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800">
          {tab === "overview" && (
            <div>
              <h2 className="text-lg font-semibold">Welcome back</h2>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                Track your orders, manage your details, and shop faster.
              </p>
            </div>
          )}

          {tab === "orders" && (
            <div>
              <h2 className="text-lg font-semibold">Orders</h2>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                Your recent orders will appear here.
              </p>
              {/* Quando implementar webhooks, renderize uma tabela dos pedidos aqui */}
              <div className="mt-4 rounded-xl border border-neutral-200 p-4 text-sm text-neutral-500 dark:border-neutral-800">
                No orders yet.
              </div>
            </div>
          )}

          {tab === "settings" && (
            <div>
              <h2 className="text-lg font-semibold">Settings</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
                  <div className="text-sm font-semibold">Email</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">{user.email}</div>
                </div>
                <div className="rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
                  <div className="text-sm font-semibold">Name</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    {user.displayName || "—"}
                  </div>
                </div>
                {/* Campos como endereço de envio podem ser adicionados quando salvarmos no Firestore */}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
