import type { Metadata } from "next";
import { Container } from "@/components/container";
import { VendorCard } from "@/components/vendor-card";
import { VENDORS, formatUSD } from "@/lib/data";

export const metadata: Metadata = {
  title: "Vendors",
  description:
    "Every vendor that bids on or wins contracts with the City of Dover, NH. Ranked by lifetime award.",
};

export default function VendorsPage() {
  const sorted = [...VENDORS].sort((a, b) => b.lifetimeAwardCents - a.lifetimeAwardCents);
  const totalLifetime = sorted.reduce((s, v) => s + v.lifetimeAwardCents, 0);
  const localPct = Math.round(
    (sorted.filter((v) => v.isLocal).reduce((s, v) => s + v.lifetimeAwardCents, 0) / totalLifetime) * 100,
  );

  return (
    <Container className="py-8 sm:py-12">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">
          Vendors
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Who Dover pays
        </h1>
        <p className="mt-2 max-w-2xl text-[var(--color-muted-foreground)]">
          Every vendor that has bid on or won a city contract, ranked by
          lifetime award. Tap one to see full bid history, win rate, and
          corporate information.
        </p>
      </header>

      <dl className="mt-6 grid gap-3 sm:grid-cols-3">
        <Stat label="Tracked vendors" value={sorted.length.toString()} />
        <Stat label="Lifetime awarded" value={formatUSD(totalLifetime)} />
        <Stat label="Local-vendor share" value={`${localPct}%`} hint="of lifetime spend" />
      </dl>

      <ul role="list" className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((v) => (
          <li key={v.slug}>
            <VendorCard vendor={v} />
          </li>
        ))}
      </ul>
    </Container>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4">
      <dt className="text-xs font-medium text-[var(--color-muted-foreground)]">{label}</dt>
      <dd className="mt-1 text-2xl font-bold tracking-tight tabular-nums">{value}</dd>
      {hint && <p className="text-xs text-[var(--color-muted-foreground)]">{hint}</p>}
    </div>
  );
}
