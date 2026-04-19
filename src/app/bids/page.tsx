import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Trophy } from "lucide-react";
import { Container } from "@/components/container";
import { BidCard } from "@/components/bid-card";
import { SectionHeader } from "@/components/section-header";
import { StatusPill } from "@/components/status-pill";
import { BIDS, VENDORS, formatUSD } from "@/lib/data";

export const metadata: Metadata = {
  title: "Bids & contracts",
  description:
    "Open bids, contracts in evaluation, award history, and vendor performance for the City of Dover, NH.",
};

export default function BidsPage() {
  const open = BIDS.filter((b) => b.status === "open").sort((a, b) =>
    a.dueAt.localeCompare(b.dueAt),
  );
  const inEval = BIDS.filter((b) => b.status === "evaluation");
  const awarded = BIDS.filter((b) => b.status === "awarded").sort((a, b) =>
    (b.awardedAt ?? "").localeCompare(a.awardedAt ?? ""),
  );

  const totalLifetime = VENDORS.reduce((s, v) => s + v.lifetimeAwardCents, 0);
  const totalActive = BIDS.filter((b) => b.status === "open").length;

  return (
    <Container className="py-8 sm:py-12">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">
          Procurement
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Bids, awards, and where the money goes
        </h1>
        <p className="mt-2 max-w-2xl text-[var(--color-muted-foreground)]">
          Every competitive bid posted by the City of Dover, every award, and
          the vendor who won it. Unopposed and sole-source contracts are
          flagged.
        </p>
      </header>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Stat
          label="Open bids"
          value={totalActive.toString()}
          hint="accepting submissions"
          icon={<Building2 className="h-4 w-4" />}
        />
        <Stat
          label="In evaluation"
          value={inEval.length.toString()}
          hint="awaiting award"
          icon={<Building2 className="h-4 w-4" />}
        />
        <Stat
          label="Tracked vendors"
          value={VENDORS.length.toString()}
          hint={`${formatUSD(totalLifetime)} lifetime`}
          icon={<Trophy className="h-4 w-4" />}
        />
      </div>

      <section aria-label="Open bids" className="mt-12">
        <SectionHeader title="Open" subtitle="Accepting submissions now" />
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {open.map((b) => (
            <BidCard key={b.id} bid={b} />
          ))}
        </div>
      </section>

      <section aria-label="In evaluation" className="mt-12">
        <SectionHeader title="In evaluation" subtitle="Submissions received, award pending" />
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {inEval.map((b) => (
            <BidCard key={b.id} bid={b} />
          ))}
        </div>
      </section>

      <section aria-label="Awarded" className="mt-12">
        <SectionHeader
          title="Recent awards"
          subtitle="Awarded contracts and the winning vendors"
          href="/vendors"
        />
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {awarded.map((b) => (
            <BidCard key={b.id} bid={b} />
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-2xl border border-[var(--color-border)] bg-[var(--color-accent-soft)] p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">
          Data quality
        </p>
        <p className="mt-1 text-sm">
          Bids below the $25,000 council-approval threshold aren&rsquo;t
          published in packets and may not be fully tracked. Cooperative and
          state-contract purchases are flagged where known.{" "}
          <Link href="/about" className="font-medium text-[var(--color-accent)] hover:underline">
            Methodology
          </Link>
          .
        </p>
      </section>
    </Container>
  );
}

function Stat({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: string;
  hint: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4">
      <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-muted-foreground)]">
        <span className="text-[var(--color-accent)]">{icon}</span>
        {label}
      </div>
      <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
      <p className="text-xs text-[var(--color-muted-foreground)]">{hint}</p>
    </div>
  );
}

