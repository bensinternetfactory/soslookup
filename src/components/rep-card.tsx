import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { StatusPill } from "./status-pill";
import type { Representative } from "@/lib/types";

const ROLE_LABEL: Record<Representative["role"], string> = {
  mayor: "Mayor",
  "deputy-mayor": "Deputy Mayor",
  councilor: "Councilor",
  "school-board": "School Board",
  "state-rep": "State Rep",
  "state-senator": "State Senator",
  "county-commissioner": "County Commissioner",
  "us-house": "U.S. House",
  "us-senate": "U.S. Senate",
};

export function RepCard({ rep, compact }: { rep: Representative; compact?: boolean }) {
  return (
    <Link
      href={`/representatives/${rep.slug}`}
      className="group flex items-start gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 transition-colors hover:border-[var(--color-accent)] focus-ring"
    >
      <span
        aria-hidden
        className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-soft)] text-sm font-semibold text-[var(--color-accent)]"
      >
        {rep.photoInitials}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-tight">
              {rep.name}
            </p>
            <p className="mt-0.5 text-xs text-[var(--color-muted-foreground)]">
              {ROLE_LABEL[rep.role]}
              {rep.ward ? ` · Ward ${rep.ward}` : ""}
              {rep.district ? ` · ${rep.district}` : ""}
            </p>
          </div>
          <ArrowUpRight
            className="h-4 w-4 flex-shrink-0 text-[var(--color-muted-foreground)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-accent)]"
            aria-hidden
          />
        </div>
        {!compact && (
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {rep.party && rep.party !== "nonpartisan" && (
              <StatusPill tone="neutral">{rep.party}</StatusPill>
            )}
            {typeof rep.meetingAttendancePct === "number" && (
              <StatusPill tone={rep.meetingAttendancePct >= 95 ? "success" : "neutral"}>
                {rep.meetingAttendancePct}% attendance
              </StatusPill>
            )}
            {rep.ward && (
              <span className="inline-flex items-center gap-1 text-xs text-[var(--color-muted-foreground)]">
                <MapPin className="h-3 w-3" aria-hidden /> Ward {rep.ward}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
