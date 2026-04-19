import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Users } from "lucide-react";
import { Container } from "@/components/container";
import { DoverMap } from "@/components/dover-map";
import { WARDS, repsByWard } from "@/lib/data";

export const metadata: Metadata = {
  title: "Wards",
  description:
    "Dover's seven wards: who represents each, polling places, and neighborhood breakdown.",
};

export default function WardsPage() {
  return (
    <Container className="py-8 sm:py-12">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">
          Dover wards
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Seven wards, seven voices
        </h1>
        <p className="mt-2 max-w-2xl text-[var(--color-muted-foreground)]">
          Every ward sends a councilor to City Council and a representative to
          the School Board. Tap any ward to see everyone who represents it.
        </p>
      </header>

      <div className="mt-8">
        <DoverMap />
      </div>

      <ul role="list" className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {WARDS.map((w) => {
          const reps = repsByWard(w.number);
          return (
            <li key={w.number}>
              <Link
                href={`/wards/${w.number}`}
                className="group flex h-full flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition-colors hover:border-[var(--color-accent)] focus-ring"
              >
                <div className="flex items-start justify-between">
                  <span
                    aria-hidden
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-accent-soft)] text-sm font-bold text-[var(--color-accent)]"
                  >
                    {w.number}
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 text-[var(--color-muted-foreground)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-accent)]"
                    aria-hidden
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold tracking-tight">Ward {w.number}</h2>
                  <p className="text-sm text-[var(--color-muted-foreground)]">{w.tagline}</p>
                </div>
                <p className="mt-auto inline-flex items-center gap-1.5 text-xs text-[var(--color-muted-foreground)]">
                  <Users className="h-3.5 w-3.5" aria-hidden />
                  ~{w.populationApprox.toLocaleString()} residents · {reps.length} direct rep{reps.length === 1 ? "" : "s"}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
