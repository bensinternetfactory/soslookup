"use client";

import { Search, X } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import type { StateEntry } from "@/lib/states";
import { StateCard } from "./state-card";

export function StateSearch({ states }: { states: StateEntry[] }) {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);

  const filtered = useMemo(() => {
    const q = deferred.trim().toLowerCase();
    if (!q) return states;
    return states.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.abbr.toLowerCase() === q ||
        s.agency.toLowerCase().includes(q),
    );
  }, [deferred, states]);

  return (
    <section id="states" aria-label="Search states" className="mt-10">
      <div className="relative">
        <label htmlFor="state-search" className="sr-only">
          Search states
        </label>
        <Search
          aria-hidden
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-muted-foreground)]"
        />
        <input
          id="state-search"
          type="search"
          inputMode="search"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          placeholder="Search a state or abbreviation (e.g. California, TX)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-14 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] pl-12 pr-12 text-base shadow-sm outline-none transition-colors placeholder:text-[var(--color-muted-foreground)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 sm:text-base"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] focus-ring"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <p
        aria-live="polite"
        className="mt-3 text-sm text-[var(--color-muted-foreground)]"
      >
        {filtered.length === states.length
          ? `Browse all ${states.length} jurisdictions`
          : `${filtered.length} ${filtered.length === 1 ? "match" : "matches"}`}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-[var(--color-border)] p-10 text-center text-sm text-[var(--color-muted-foreground)]">
          No match for &ldquo;{query}&rdquo;. Try a full state name or two-letter code.
        </div>
      ) : (
        <ul
          role="list"
          className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
        >
          {filtered.map((state) => (
            <li key={state.slug}>
              <StateCard state={state} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
