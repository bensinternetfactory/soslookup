import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Briefcase, Trophy, Building2 } from "lucide-react";
import { Container } from "@/components/container";
import { StatusPill } from "@/components/status-pill";
import { BidCard } from "@/components/bid-card";
import { BIDS, VENDORS, findVendor, formatUSD, formatUSDExact } from "@/lib/data";

type Params = { slug: string };

export function generateStaticParams() {
  return VENDORS.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const v = findVendor(slug);
  if (!v) return {};
  return {
    title: v.name,
    description: `Dover contract history for ${v.name}: ${v.totalWins} wins out of ${v.totalBids} bids, ${formatUSD(v.lifetimeAwardCents)} lifetime.`,
  };
}

export default async function VendorPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const v = findVendor(slug);
  if (!v) notFound();

  const involvedBids = BIDS.filter(
    (b) => b.awardedTo === v.slug || b.submissions?.some((s) => s.vendorSlug === v.slug),
  ).sort((a, b) => (b.awardedAt ?? b.publishedAt).localeCompare(a.awardedAt ?? a.publishedAt));

  const wins = involvedBids.filter((b) => b.awardedTo === v.slug);
  const losses = involvedBids.filter(
    (b) => b.awardedTo && b.awardedTo !== v.slug && b.submissions?.some((s) => s.vendorSlug === v.slug),
  );
  const winRate = v.totalBids > 0 ? Math.round((v.totalWins / v.totalBids) * 100) : 0;

  return (
    <Container className="py-8 sm:py-12">
      <Link
        href="/vendors"
        className="inline-flex items-center gap-1 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] focus-ring rounded"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden /> All vendors
      </Link>

      <header className="mt-5 flex items-start gap-4">
        <span
          aria-hidden
          className="inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
        >
          <Trophy className="h-6 w-6" />
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            {v.isLocal ? (
              <StatusPill tone="success" icon={<MapPin className="h-3 w-3" />}>Local</StatusPill>
            ) : (
              <StatusPill tone="neutral">Out of area</StatusPill>
            )}
            {v.activeContracts > 0 && (
              <StatusPill tone="accent">{v.activeContracts} active contract{v.activeContracts === 1 ? "" : "s"}</StatusPill>
            )}
            <StatusPill tone="neutral">Formed in {v.stateOfFormation}</StatusPill>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{v.name}</h1>
          {v.address && (
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">{v.address}</p>
          )}
        </div>
      </header>

      <dl className="mt-6 grid gap-3 sm:grid-cols-4">
        <Stat label="Lifetime awarded" value={formatUSDExact(v.lifetimeAwardCents)} />
        <Stat label="Wins" value={v.totalWins.toString()} />
        <Stat label="Total bids" value={v.totalBids.toString()} />
        <Stat label="Win rate" value={`${winRate}%`} />
      </dl>

      {v.note && (
        <p className="mt-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-muted)] p-3 text-sm text-[var(--color-muted-foreground)]">
          {v.note}
        </p>
      )}

      {v.principals && v.principals.length > 0 && (
        <section aria-label="Principals" className="mt-10">
          <h2 className="text-lg font-semibold tracking-tight">Principals</h2>
          <ul role="list" className="mt-3 flex flex-wrap gap-2">
            {v.principals.map((p) => (
              <li key={p.name}>
                <StatusPill tone="neutral" icon={<Briefcase className="h-3 w-3" />}>
                  {p.name} · {p.title}
                </StatusPill>
              </li>
            ))}
          </ul>
          {v.sosEntityId && (
            <p className="mt-3 text-xs text-[var(--color-muted-foreground)]">
              NH SOS entity ID: {v.sosEntityId}
            </p>
          )}
        </section>
      )}

      <section aria-label="Categories" className="mt-8">
        <h2 className="text-lg font-semibold tracking-tight">Bids in these categories</h2>
        <ul role="list" className="mt-3 flex flex-wrap gap-2">
          {v.category.map((c) => (
            <li key={c}>
              <StatusPill tone="accent">{c.replace("-", " ")}</StatusPill>
            </li>
          ))}
        </ul>
      </section>

      {wins.length > 0 && (
        <section aria-label="Contract wins" className="mt-10">
          <h2 className="text-lg font-semibold tracking-tight">Contract wins</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {wins.map((b) => (
              <BidCard key={b.id} bid={b} />
            ))}
          </div>
        </section>
      )}

      {losses.length > 0 && (
        <section aria-label="Bids not won" className="mt-10">
          <h2 className="text-lg font-semibold tracking-tight">Bid but didn&rsquo;t win</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {losses.map((b) => (
              <BidCard key={b.id} bid={b} />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4">
      <dt className="text-xs font-medium text-[var(--color-muted-foreground)]">{label}</dt>
      <dd className="mt-1 text-xl font-bold tracking-tight tabular-nums">{value}</dd>
    </div>
  );
}

// avoid unused lucide import; Building2 would be useful when we add a small map pin later
void Building2;
