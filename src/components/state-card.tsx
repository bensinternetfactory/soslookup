import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { StateEntry } from "@/lib/states";

export function StateCard({ state }: { state: StateEntry }) {
  return (
    <Link
      href={`/${state.slug}`}
      className="group relative flex flex-col justify-between gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition-all hover:border-[var(--color-accent)] hover:shadow-lg focus-ring"
      aria-label={`${state.name} — ${state.agency}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          aria-hidden
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-muted)] text-sm font-semibold tracking-tight text-[var(--color-foreground)]"
        >
          {state.abbr}
        </span>
        <ArrowUpRight className="h-4 w-4 text-[var(--color-muted-foreground)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-accent)]" />
      </div>
      <div>
        <h3 className="text-base font-semibold leading-tight tracking-tight">
          {state.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs text-[var(--color-muted-foreground)]">
          {state.agency}
        </p>
      </div>
    </Link>
  );
}
