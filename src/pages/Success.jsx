import Seo from "../components/Seo";
import { SITE } from "../lib/site";
import { useEffect, useState } from "react";

export default function Success() {
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("session_id");
    if (id) setSessionId(id);
  }, []);

  return (
    <div className="page-x py-16">
      <Seo
        title={`Order received | ${SITE.name}`}
        description="Thanks for your order."
        canonical={`${SITE.url}/success`}
      />
      <h1 className="text-2xl font-semibold">Thank you!</h1>
      <p className="mt-2 text-neutral-700 dark:text-neutral-300">
        Your order has been received. We’ve sent a confirmation email.
      </p>
      {sessionId && (
        <p className="mt-2 text-xs text-neutral-500">Session: {sessionId}</p>
      )}
      <a href="/shop" className="mt-6 inline-block underline">Continue shopping</a>
    </div>
  );
}
