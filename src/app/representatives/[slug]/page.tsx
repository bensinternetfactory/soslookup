import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Vote,
  ClipboardList,
  CheckCircle2,
} from "lucide-react";
import { Container } from "@/components/container";
import { StatusPill } from "@/components/status-pill";
import { REPRESENTATIVES, findRep } from "@/lib/data";
import type { Role } from "@/lib/types";

type Params = { slug: string };

export function generateStaticParams() {
  return REPRESENTATIVES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const r = findRep(slug);
  if (!r) return {};
  return { title: r.name, description: `${r.name} — ${r.body}${r.ward ? `, Ward ${r.ward}` : ""}${r.district ? ` · ${r.district}` : ""}.` };
}

const ROLE_LABEL: Record<Role, string> = {
  mayor: "Mayor",
  "deputy-mayor": "Deputy Mayor",
  councilor: "City Councilor",
  "school-board": "School Board Member",
  "state-rep": "NH State Representative",
  "state-senator": "NH State Senator",
  "county-commissioner": "Strafford County Commissioner",
  "us-house": "U.S. Representative",
  "us-senate": "U.S. Senator",
};

export default async function RepPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const r = findRep(slug);
  if (!r) notFound();

  return (
    <Container className="py-8 sm:py-12">
      <Link
        href="/representatives"
        className="inline-flex items-center gap-1 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] focus-ring rounded"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden /> All representatives
      </Link>

      <header className="mt-6 flex items-start gap-4">
        <span
          aria-hidden
          className="inline-flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-[var(--color-accent-soft)] text-lg font-bold text-[var(--color-accent)]"
        >
          {r.photoInitials}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <StatusPill tone="accent">{ROLE_LABEL[r.role]}</StatusPill>
            {r.party && r.party !== "nonpartisan" && (
              <StatusPill tone="neutral">{r.party}</StatusPill>
            )}
            {r.ward && <StatusPill tone="neutral">Ward {r.ward}</StatusPill>}
            {r.district && <StatusPill tone="neutral">{r.district}</StatusPill>}
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{r.name}</h1>
          <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">{r.body}</p>
        </div>
      </header>

      <div className="mt-6 flex flex-wrap gap-2">
        {r.email && (
          <a
            href={`mailto:${r.email}`}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-[var(--color-accent)] px-4 text-sm font-semibold text-[var(--color-accent-foreground)] hover:bg-[var(--color-accent-hover)] focus-ring"
          >
            <Mail className="h-4 w-4" aria-hidden /> Email
          </a>
        )}
        {r.phone && (
          <a
            href={`tel:${r.phone.replace(/[^0-9+]/g, "")}`}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-4 text-sm font-semibold hover:border-[var(--color-accent)] focus-ring"
          >
            <Phone className="h-4 w-4" aria-hidden /> {r.phone}
          </a>
        )}
      </div>

      <section aria-label="Bio" className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight">Background</h2>
        <p className="mt-2 text-[var(--color-muted-foreground)]">{r.bio}</p>
      </section>

      <section aria-label="Stats" className="mt-10 grid gap-3 sm:grid-cols-3">
        <StatCard
          label="Meeting attendance"
          value={r.meetingAttendancePct != null ? `${r.meetingAttendancePct}%` : "—"}
          icon={<CheckCircle2 className="h-4 w-4" />}
        />
        <StatCard
          label="Votes cast (term)"
          value={r.votesCast?.toString() ?? "—"}
          icon={<Vote className="h-4 w-4" />}
        />
        <StatCard
          label="Items sponsored"
          value={r.sponsored?.toString() ?? "—"}
          icon={<ClipboardList className="h-4 w-4" />}
        />
      </section>

      {r.committees && r.committees.length > 0 && (
        <section aria-label="Committees" className="mt-10">
          <h2 className="text-lg font-semibold tracking-tight">Committee assignments</h2>
          <ul role="list" className="mt-3 flex flex-wrap gap-2">
            {r.committees.map((c) => (
              <li key={c}>
                <StatusPill tone="neutral">{c}</StatusPill>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-label="Term" className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight">Current term</h2>
        <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-[var(--color-muted-foreground)]">
          <Calendar className="h-4 w-4" aria-hidden />
          {new Date(r.termStart).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })} →{" "}
          {new Date(r.termEnd).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
        </p>
      </section>
    </Container>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4">
      <p className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-muted-foreground)]">
        <span className="text-[var(--color-accent)]">{icon}</span>
        {label}
      </p>
      <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
    </div>
  );
}
