import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  ExternalLink,
  Globe,
  Info,
  FileText,
  Search,
  ClipboardCheck,
} from "lucide-react";
import { Container } from "@/components/container";
import { ProfessionalVerify } from "@/components/professional-verify";
import { STATES, getAllSlugs, getStateBySlug } from "@/lib/states";
import { NATIONAL_LOOKUPS, STATE_BAR_LOOKUPS } from "@/lib/professionals";
import { siteConfig } from "@/lib/site";

type Params = { state: string };

export function generateStaticParams() {
  return getAllSlugs().map((state) => ({ state }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { state } = await params;
  const s = getStateBySlug(state);
  if (!s) return {};
  const title = `${s.name} business lookup, SoS search & professional verification`;
  const description = `Search registered businesses in ${s.name} on ${s.agency}, verify CPAs, attorneys, brokers, and financial advisors — all free and linked to the official source.`;
  return {
    title,
    description,
    alternates: { canonical: `${siteConfig.url}/${s.slug}` },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/${s.slug}`,
      type: "website",
    },
  };
}

export default async function StatePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { state } = await params;
  const s = getStateBySlug(state);
  if (!s) notFound();

  const idx = STATES.findIndex((x) => x.slug === s.slug);
  const prev = idx > 0 ? STATES[idx - 1] : STATES[STATES.length - 1];
  const next = idx < STATES.length - 1 ? STATES[idx + 1] : STATES[0];
  const stateBar = STATE_BAR_LOOKUPS[s.slug];

  return (
    <Container className="py-8 sm:py-12">
      <Link
        href="/#states"
        className="inline-flex items-center gap-1 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] focus-ring rounded"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        All states
      </Link>

      <header className="mt-6">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-accent-soft)] text-base font-semibold tracking-tight text-[var(--color-accent)]"
          >
            {s.abbr}
          </span>
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {s.name}
            </h1>
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
              {s.agency}
            </p>
          </div>
        </div>
      </header>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <a
          href={s.searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-start justify-between gap-4 rounded-2xl bg-[var(--color-accent)] p-5 text-[var(--color-accent-foreground)] shadow-sm transition-colors hover:bg-[var(--color-accent-hover)] active:scale-[0.99] focus-ring"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide opacity-90">
              <Building2 className="h-4 w-4" aria-hidden />
              Official business search
            </div>
            <p className="mt-2 text-lg font-semibold leading-tight">
              Search {s.name} business entities
            </p>
            <p className="mt-1 truncate text-sm opacity-85">{hostOf(s.searchUrl)}</p>
          </div>
          <ExternalLink
            className="h-5 w-5 flex-shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </a>

        <a
          href={s.agencyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-start justify-between gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition-colors hover:border-[var(--color-accent)] focus-ring"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-muted-foreground)]">
              <Globe className="h-4 w-4" aria-hidden />
              Agency homepage
            </div>
            <p className="mt-2 text-lg font-semibold leading-tight">{s.agency}</p>
            <p className="mt-1 truncate text-sm text-[var(--color-muted-foreground)]">
              {hostOf(s.agencyUrl)}
            </p>
          </div>
          <ExternalLink
            className="h-5 w-5 flex-shrink-0 text-[var(--color-muted-foreground)]"
            aria-hidden
          />
        </a>
      </div>

      {s.notes && (
        <aside
          role="note"
          className="mt-4 flex items-start gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)] p-4 text-sm"
        >
          <Info
            className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--color-accent)]"
            aria-hidden
          />
          <p>{s.notes}</p>
        </aside>
      )}

      <section aria-label="Common filings" className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Common {s.name} filings
        </h2>
        <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
          All links go to {s.agency}. Specific form paths change often — start
          at the agency homepage if a direct link has moved.
        </p>
        <ul
          role="list"
          className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {[
            {
              icon: FileText,
              label: "Form an LLC or corporation",
              hint: "New entity registration",
            },
            {
              icon: ClipboardCheck,
              label: "File an annual report",
              hint: "Stay in good standing",
            },
            {
              icon: Search,
              label: "Check name availability",
              hint: "Before you file",
            },
            {
              icon: FileText,
              label: "DBA / fictitious name",
              hint: "Register a trade name",
            },
            {
              icon: Search,
              label: "Registered agent lookup",
              hint: "Serve process",
            },
            {
              icon: FileText,
              label: "Reinstate / dissolve",
              hint: "End-of-life filings",
            },
          ].map((item) => (
            <li key={item.label}>
              <a
                href={s.agencyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 transition-colors hover:border-[var(--color-accent)] focus-ring"
              >
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                >
                  <item.icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold leading-tight">
                      {item.label}
                    </span>
                    <ExternalLink
                      className="h-4 w-4 flex-shrink-0 text-[var(--color-muted-foreground)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </span>
                  <span className="mt-1 block text-xs text-[var(--color-muted-foreground)]">
                    {item.hint}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-14">
        <ProfessionalVerify
          lookups={NATIONAL_LOOKUPS}
          stateBar={stateBar}
          stateName={s.name}
        />
      </div>

      <section aria-label="Search tips" className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight">
          Tips for searching {s.name}
        </h2>
        <ol className="mt-4 space-y-3 text-sm text-[var(--color-muted-foreground)]">
          <li className="flex gap-3">
            <span className="font-semibold text-[var(--color-foreground)]">1.</span>
            Start broad — search the most distinctive word in the name, not
            the full legal name. Many states drop &ldquo;LLC&rdquo; or
            &ldquo;Inc.&rdquo; from indexing.
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-[var(--color-foreground)]">2.</span>
            If you have the entity ID or registered agent name, use those —
            they&rsquo;re unique and return cleaner results than a name search.
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-[var(--color-foreground)]">3.</span>
            Check status (Active / Good Standing vs. Dissolved / Forfeited).
            A dissolved entity can&rsquo;t legally transact business.
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-[var(--color-foreground)]">4.</span>
            Download the most recent annual report and check officers /
            managers against who you&rsquo;re actually dealing with.
          </li>
        </ol>
      </section>

      <nav
        aria-label="Other states"
        className="mt-14 flex items-center justify-between gap-3 border-t border-[var(--color-border)] pt-6"
      >
        <Link
          href={`/${prev.slug}`}
          className="group inline-flex items-center gap-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] focus-ring rounded"
        >
          <ArrowLeft
            className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
            aria-hidden
          />
          {prev.name}
        </Link>
        <Link
          href={`/${next.slug}`}
          className="group inline-flex items-center gap-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] focus-ring rounded"
        >
          {next.name}
          <ArrowLeft
            className="h-4 w-4 rotate-180 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      </nav>
    </Container>
  );
}

function hostOf(url: string): string {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}
