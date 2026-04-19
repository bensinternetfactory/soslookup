import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, Calendar, MapPin, FileText } from "lucide-react";
import { Container } from "@/components/container";
import { StatusPill } from "@/components/status-pill";
import { BIDS, findBid, findVendor, formatUSDExact } from "@/lib/data";

type Params = { id: string };

export function generateStaticParams() {
  return BIDS.map((b) => ({ id: b.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const b = findBid(id);
  if (!b) return {};
  return { title: `${b.id} · ${b.title}`, description: b.summary };
}

export default async function BidPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const b = findBid(id);
  if (!b) notFound();

  const winner = b.awardedTo ? findVendor(b.awardedTo) : null;
  const ranked = (b.submissions ?? []).slice().sort((a, c) => a.amount - c.amount);
  const lowest = ranked[0];
  const savingsVsAvg =
    ranked.length > 1
      ? Math.round(
          ranked.slice(1).reduce((s, r) => s + r.amount, 0) / (ranked.length - 1),
        ) - ranked[0].amount
      : null;

  return (
    <Container className="py-8 sm:py-12">
      <Link
        href="/bids"
        className="inline-flex items-center gap-1 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] focus-ring rounded"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden /> All bids
      </Link>

      <header className="mt-5">
        <div className="flex flex-wrap items-center gap-1.5">
          <StatusPill
            tone={
              b.status === "open"
                ? "success"
                : b.status === "evaluation"
                  ? "warning"
                  : b.status === "awarded"
                    ? "accent"
                    : "neutral"
            }
          >
            {b.status === "open"
              ? "Open"
              : b.status === "evaluation"
                ? "In evaluation"
                : b.status === "awarded"
                  ? "Awarded"
                  : b.status === "cancelled"
                    ? "Cancelled"
                    : "No bids"}
          </StatusPill>
          <StatusPill tone="neutral">{b.department}</StatusPill>
          <StatusPill tone="neutral">{b.category.replace("-", " ")}</StatusPill>
          {b.unopposed && <StatusPill tone="danger">Unopposed</StatusPill>}
          {b.soleSource && <StatusPill tone="danger">Sole-source</StatusPill>}
        </div>
        <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted-foreground)]">
          {b.id}
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">{b.title}</h1>
        <p className="mt-3 text-[var(--color-muted-foreground)]">{b.summary}</p>
      </header>

      <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Fact label="Published" value={new Date(b.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} />
        <Fact label={b.status === "open" ? "Due" : "Was due"} value={new Date(b.dueAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} />
        {b.estimatedValue && <Fact label="Estimated" value={formatUSDExact(b.estimatedValue)} />}
        {b.awardedAmount && <Fact label="Awarded" value={formatUSDExact(b.awardedAmount)} emphasis />}
      </dl>

      {b.location && (
        <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-[var(--color-muted-foreground)]">
          <MapPin className="h-4 w-4" aria-hidden /> {b.location.address}
        </p>
      )}

      {winner && (
        <section aria-label="Winner" className="mt-10">
          <h2 className="text-lg font-semibold tracking-tight">Awarded to</h2>
          <Link
            href={`/vendors/${winner.slug}`}
            className="group mt-3 flex items-start gap-3 rounded-2xl border border-[var(--color-accent)] bg-[var(--color-accent-soft)] p-4 transition-colors hover:bg-[var(--color-accent-soft)] focus-ring"
          >
            <span
              aria-hidden
              className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent)] text-[var(--color-accent-foreground)]"
            >
              <Building2 className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold">{winner.name}</p>
              <p className="text-xs text-[var(--color-muted-foreground)]">
                {winner.isLocal ? "Local · " : ""}
                {winner.totalWins} lifetime wins · {formatUSDExact(winner.lifetimeAwardCents)} total
              </p>
            </div>
          </Link>
        </section>
      )}

      {ranked.length > 0 && (
        <section aria-label="Bid tabulation" className="mt-10">
          <h2 className="text-lg font-semibold tracking-tight">Bid tabulation</h2>
          <ol role="list" className="mt-3 space-y-2">
            {ranked.map((s, i) => {
              const v = findVendor(s.vendorSlug);
              const isWinner = winner && s.vendorSlug === winner.slug;
              return (
                <li
                  key={s.vendorSlug}
                  className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 ${
                    isWinner
                      ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)]"
                      : "border-[var(--color-border)] bg-[var(--color-card)]"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      aria-hidden
                      className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-muted)] text-xs font-bold"
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      {v ? (
                        <Link href={`/vendors/${v.slug}`} className="truncate text-sm font-semibold hover:underline">
                          {v.name}
                        </Link>
                      ) : (
                        <span className="text-sm font-semibold">{s.vendorSlug}</span>
                      )}
                      {s.notes && <p className="text-xs text-[var(--color-muted-foreground)]">{s.notes}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {isWinner && <StatusPill tone="accent">Winner</StatusPill>}
                    <span className="font-semibold tabular-nums">
                      {formatUSDExact(s.amount)}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
          {savingsVsAvg != null && savingsVsAvg > 0 && lowest && (
            <p className="mt-3 text-sm text-[var(--color-muted-foreground)]">
              The winning bid was{" "}
              <span className="font-semibold text-[var(--color-foreground)]">
                {formatUSDExact(savingsVsAvg)}
              </span>{" "}
              lower than the average of the other bids.
            </p>
          )}
        </section>
      )}

      <section className="mt-10 flex flex-wrap items-center gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)] p-4 text-sm text-[var(--color-muted-foreground)]">
        <FileText className="h-4 w-4" aria-hidden /> {b.documentCount} document{b.documentCount === 1 ? "" : "s"} filed with this bid.{" "}
        <Calendar className="h-4 w-4" aria-hidden /> All filings are public under NH RSA 91-A.
      </section>
    </Container>
  );
}

function Fact({
  label,
  value,
  emphasis,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4">
      <dt className="text-xs font-medium text-[var(--color-muted-foreground)]">{label}</dt>
      <dd className={`mt-1 tabular-nums ${emphasis ? "text-xl font-bold text-[var(--color-accent)]" : "text-base font-semibold"}`}>
        {value}
      </dd>
    </div>
  );
}
