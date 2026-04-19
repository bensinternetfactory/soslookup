"use client";

import Link from "next/link";
import { MapPin, Search } from "lucide-react";
import { useState } from "react";
import { WARDS } from "@/lib/data";

// Mock address → ward mapper. Real version: Mapbox geocoding → point-in-polygon
// against city ward shapefile served as GeoJSON.
function mockWardForAddress(addr: string): number | null {
  const a = addr.trim().toLowerCase();
  if (!a) return null;
  const streetHints: Record<string, number> = {
    "garrison": 1, "silver": 1, "arch": 1,
    "central": 2, "rogers": 2, "main": 2,
    "back river": 3, "dover point": 3, "knox": 3,
    "spur": 4, "long hill": 4, "rochester": 4,
    "cocheco": 5, "washington": 5, "henry law": 5,
    "littleworth": 6, "sixth": 6, "glenwood": 6,
    "sawyer": 7, "bellamy": 7,
  };
  for (const [k, w] of Object.entries(streetHints)) {
    if (a.includes(k)) return w;
  }
  // Deterministic fallback from hash so it's stable per address.
  let h = 0;
  for (let i = 0; i < a.length; i++) h = (h * 31 + a.charCodeAt(i)) >>> 0;
  return ((h % 7) + 1) as number;
}

export function AddressLookup() {
  const [addr, setAddr] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [touched, setTouched] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    setResult(mockWardForAddress(addr));
  }

  const ward = result != null ? WARDS.find((w) => w.number === result) : null;

  return (
    <section
      aria-label="Find your representatives by address"
      className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5"
    >
      <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
        Who represents you?
      </h2>
      <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
        Enter your Dover street address to see your ward and every elected
        official who represents you.
      </p>
      <form onSubmit={onSubmit} className="mt-4">
        <label htmlFor="addr" className="sr-only">
          Your address
        </label>
        <div className="relative">
          <Search
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-muted-foreground)]"
          />
          <input
            id="addr"
            type="text"
            inputMode="text"
            autoComplete="street-address"
            placeholder="e.g. 25 Central Ave"
            value={addr}
            onChange={(e) => setAddr(e.target.value)}
            className="h-12 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] pl-11 pr-24 text-base outline-none transition-colors placeholder:text-[var(--color-muted-foreground)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 inline-flex h-9 -translate-y-1/2 items-center rounded-lg bg-[var(--color-accent)] px-3 text-sm font-semibold text-[var(--color-accent-foreground)] transition-colors hover:bg-[var(--color-accent-hover)] focus-ring"
          >
            Find
          </button>
        </div>
      </form>
      {touched && ward && (
        <div className="mt-4 flex items-start gap-3 rounded-xl bg-[var(--color-accent-soft)] p-3">
          <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--color-accent)]" aria-hidden />
          <div className="text-sm">
            <p className="font-semibold">
              You&rsquo;re in Ward {ward.number} &mdash; {ward.tagline}
            </p>
            <Link
              href={`/wards/${ward.number}`}
              className="mt-0.5 inline-block font-medium text-[var(--color-accent)] underline-offset-2 hover:underline"
            >
              See every official representing Ward {ward.number} →
            </Link>
          </div>
        </div>
      )}
      <p className="mt-3 text-xs text-[var(--color-muted-foreground)]">
        Address lookup is currently a demo. Production version uses Mapbox
        geocoding + official Dover ward GIS boundaries.
      </p>
    </section>
  );
}
