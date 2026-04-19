import Link from "next/link";
import { Clock, Hammer, ArrowUpRight, Building2 } from "lucide-react";
import { StatusPill } from "./status-pill";
import { formatUSD } from "@/lib/data";
import type { Bid } from "@/lib/types";

function timeToDue(dueIso: string) {
  const ms = new Date(dueIso).getTime() - Date.now();
  if (ms < 0) return null;
  const d = Math.floor(ms / 864e5);
  const h = Math.floor((ms % 864e5) / 36e5);
  if (d >= 2) return `${d}d left`;
  if (d === 1) return `1d ${h}h left`;
  if (d === 0) return `${h}h left`;
  return null;
}

export function BidCard({ bid }: { bid: Bid }) {
  const left = bid.status === "open" ? timeToDue(bid.dueAt) : null;
  return (
    <Link
      href={`/bids/${bid.id}`}
      className="group relative flex h-full flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 transition-colors hover:border-[var(--color-accent)] focus-ring"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <StatusPill
            tone={
              bid.status === "open"
                ? "success"
                : bid.status === "evaluation"
                  ? "warning"
                  : bid.status === "awarded"
                    ? "accent"
                    : "neutral"
            }
          >
            {bid.status === "open"
              ? "Open"
              : bid.status === "evaluation"
                ? "In evaluation"
                : bid.status === "awarded"
                  ? "Awarded"
                  : bid.status === "cancelled"
                    ? "Cancelled"
                    : "No bids"}
          </StatusPill>
          {left && (
            <StatusPill tone="warning" icon={<Clock className="h-3 w-3" />}>
              {left}
            </StatusPill>
          )}
          {bid.unopposed && <StatusPill tone="danger">Unopposed</StatusPill>}
          {bid.soleSource && <StatusPill tone="danger">Sole-source</StatusPill>}
        </div>
        <ArrowUpRight
          className="h-4 w-4 flex-shrink-0 text-[var(--color-muted-foreground)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-accent)]"
          aria-hidden
        />
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted-foreground)]">
          {bid.id} · {bid.department}
        </p>
        <h3 className="mt-1 line-clamp-2 text-base font-semibold leading-tight">
          {bid.title}
        </h3>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-3 text-xs text-[var(--color-muted-foreground)]">
        {bid.estimatedValue && (
          <span className="inline-flex items-center gap-1">
            <Hammer className="h-3.5 w-3.5" aria-hidden />
            est. {formatUSD(bid.estimatedValue)}
          </span>
        )}
        {bid.awardedAmount && (
          <span className="inline-flex items-center gap-1 text-[var(--color-foreground)]">
            <Building2 className="h-3.5 w-3.5" aria-hidden />
            awarded {formatUSD(bid.awardedAmount)}
          </span>
        )}
      </div>
    </Link>
  );
}
