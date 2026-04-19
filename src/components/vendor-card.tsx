import Link from "next/link";
import { ArrowUpRight, MapPin, Trophy } from "lucide-react";
import { StatusPill } from "./status-pill";
import { formatUSD } from "@/lib/data";
import type { Vendor } from "@/lib/types";

export function VendorCard({ vendor }: { vendor: Vendor }) {
  const winRate = vendor.totalBids > 0 ? Math.round((vendor.totalWins / vendor.totalBids) * 100) : 0;
  return (
    <Link
      href={`/vendors/${vendor.slug}`}
      className="group flex items-start gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 transition-colors hover:border-[var(--color-accent)] focus-ring"
    >
      <span
        aria-hidden
        className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
      >
        <Trophy className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-tight">
              {vendor.name}
            </p>
            <p className="mt-0.5 text-xs text-[var(--color-muted-foreground)]">
              {formatUSD(vendor.lifetimeAwardCents)} lifetime · {vendor.totalWins}{" "}
              wins / {vendor.totalBids} bids ({winRate}%)
            </p>
          </div>
          <ArrowUpRight
            className="h-4 w-4 flex-shrink-0 text-[var(--color-muted-foreground)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-accent)]"
            aria-hidden
          />
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {vendor.isLocal ? (
            <StatusPill tone="success" icon={<MapPin className="h-3 w-3" />}>
              Local
            </StatusPill>
          ) : (
            <StatusPill tone="neutral">Out of area</StatusPill>
          )}
          {vendor.activeContracts > 0 && (
            <StatusPill tone="accent">{vendor.activeContracts} active</StatusPill>
          )}
        </div>
      </div>
    </Link>
  );
}
