"use client";

import { useEffect, useState } from "react";

const ENDPOINT = "https://abacus.jasoncameron.dev/hit/satyampatil513.github.io/visits";

/** Fires once per page load, not once per mount — React runs effects twice in
 * development, which would otherwise count every local view as two. */
let counted = false;

/** A visit count, from a free third-party counter.
 *
 * The site is static, so there is nowhere of our own to keep a tally. That
 * means two honest limits: the endpoint is public, so the number can be
 * inflated by anyone who cares to, and the service is somebody's side project
 * that may one day stop answering. Neither is worth breaking a page over, so
 * this renders nothing at all unless it gets a number back — a failed request,
 * an ad blocker, or the service disappearing all just leave the footer as it
 * was.
 */
export default function VisitCounter() {
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    if (counted) return;
    counted = true;

    const abort = new AbortController();
    const timeout = setTimeout(() => abort.abort(), 6000);

    fetch(ENDPOINT, { signal: abort.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { value?: number } | null) => {
        if (typeof data?.value === "number") setVisits(data.value);
      })
      .catch(() => {
        /* Offline, blocked, or the service is gone. Show nothing. */
      })
      .finally(() => clearTimeout(timeout));

    return () => clearTimeout(timeout);
  }, []);

  if (visits === null) return null;

  return (
    <span className="font-mono tabular-nums">
      {visits.toLocaleString()} {visits === 1 ? "visit" : "visits"}
    </span>
  );
}
