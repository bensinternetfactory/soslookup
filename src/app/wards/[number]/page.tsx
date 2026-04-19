import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Users, MapPin } from "lucide-react";
import { Container } from "@/components/container";
import { RepCard } from "@/components/rep-card";
import { StatusPill } from "@/components/status-pill";
import { REPRESENTATIVES, WARDS, findWard, repsByWard } from "@/lib/data";

type Params = { number: string };

export function generateStaticParams() {
  return WARDS.map((w) => ({ number: String(w.number) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { number } = await params;
  const w = findWard(Number(number));
  if (!w) return {};
  return { title: `Ward ${w.number}`, description: `${w.tagline}. Representatives, polling place, and neighborhoods.` };
}

export default async function WardPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { number } = await params;
  const n = Number(number);
  const w = findWard(n);
  if (!w) notFound();

  const direct = repsByWard(n);
  const citywide = REPRESENTATIVES.filter(
    (r) => r.body === "City Council" && (r.role === "mayor" || r.role === "deputy-mayor"),
  );
  const stateAndFed = REPRESENTATIVES.filter(
    (r) => r.body !== "City Council" && r.body !== "School Board",
  );

  return (
    <Container className="py-8 sm:py-12">
      <Link
        href="/wards"
        className="inline-flex items-center gap-1 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] focus-ring rounded"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden /> All wards
      </Link>

      <header className="mt-5 flex items-start gap-4">
        <span
          aria-hidden
          className="inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-[var(--color-accent-soft)] text-2xl font-bold text-[var(--color-accent)]"
        >
          {w.number}
        </span>
        <div>
          <StatusPill tone="accent">Ward {w.number}</StatusPill>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{w.tagline}</h1>
          <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-[var(--color-muted-foreground)]">
            <Users className="h-4 w-4" aria-hidden /> ~{w.populationApprox.toLocaleString()} residents
          </p>
        </div>
      </header>

      <section aria-label="Neighborhoods" className="mt-8">
        <h2 className="text-lg font-semibold tracking-tight">Neighborhoods</h2>
        <ul role="list" className="mt-3 flex flex-wrap gap-2">
          {w.neighborhoods.map((n) => (
            <li key={n}>
              <StatusPill tone="neutral" icon={<MapPin className="h-3 w-3" />}>
                {n}
              </StatusPill>
            </li>
          ))}
        </ul>
      </section>

      {direct.length > 0 && (
        <section aria-label="Ward representatives" className="mt-10">
          <h2 className="text-lg font-semibold tracking-tight">Your ward representatives</h2>
          <p className="text-sm text-[var(--color-muted-foreground)]">
            Directly elected to represent Ward {w.number}.
          </p>
          <ul role="list" className="mt-4 grid gap-3 sm:grid-cols-2">
            {direct.map((r) => (
              <li key={r.slug}>
                <RepCard rep={r} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-label="City-wide representatives" className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight">Citywide officials</h2>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Represent you alongside every other Dover resident.
        </p>
        <ul role="list" className="mt-4 grid gap-3 sm:grid-cols-2">
          {citywide.map((r) => (
            <li key={r.slug}>
              <RepCard rep={r} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="State and federal" className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight">State &amp; federal</h2>
        <ul role="list" className="mt-4 grid gap-3 sm:grid-cols-2">
          {stateAndFed.map((r) => (
            <li key={r.slug}>
              <RepCard rep={r} />
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
