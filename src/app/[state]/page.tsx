import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, ExternalLink, Globe, Info } from "lucide-react";
import { Container } from "@/components/container";
import { STATES, getAllSlugs, getStateBySlug } from "@/lib/states";
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
  const title = `${s.name} Secretary of State Business Search`;
  const description = `Search registered LLCs, corporations, and business entities in ${s.name} directly on ${s.agency}. Official, free, and mobile-friendly.`;
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

  return (
    <Container className="py-10 sm:py-14">
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
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-muted)] text-base font-semibold tracking-tight"
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

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <a
          href={s.searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-start justify-between gap-4 rounded-2xl border border-[var(--color-accent)] bg-[var(--color-accent)] p-5 text-[var(--color-accent-foreground)] shadow-sm transition-transform active:scale-[0.99] focus-ring"
        >
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide opacity-80">
              <Building2 className="h-4 w-4" aria-hidden />
              Official business search
            </div>
            <p className="mt-2 text-lg font-semibold leading-tight">
              Search {s.name} business entities
            </p>
            <p className="mt-1 text-sm opacity-80 break-all">{hostOf(s.searchUrl)}</p>
          </div>
          <ExternalLink
            className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </a>

        <a
          href={s.agencyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-start justify-between gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition-colors hover:border-[var(--color-accent)] focus-ring"
        >
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-[var(--color-muted-foreground)]">
              <Globe className="h-4 w-4" aria-hidden />
              Agency homepage
            </div>
            <p className="mt-2 text-lg font-semibold leading-tight">
              {s.agency}
            </p>
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)] break-all">
              {hostOf(s.agencyUrl)}
            </p>
          </div>
          <ExternalLink className="h-5 w-5 text-[var(--color-muted-foreground)]" aria-hidden />
        </a>
      </div>

      {s.notes && (
        <aside
          role="note"
          className="mt-4 flex items-start gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)] p-4 text-sm"
        >
          <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--color-accent)]" aria-hidden />
          <p>{s.notes}</p>
        </aside>
      )}

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">
          How to search in {s.name}
        </h2>
        <ol className="mt-4 space-y-3 text-sm text-[var(--color-muted-foreground)]">
          <li className="flex gap-3">
            <span className="font-semibold text-[var(--color-foreground)]">1.</span>
            Tap the blue button above to open {s.agency}.
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-[var(--color-foreground)]">2.</span>
            Enter a business name, entity ID, or officer/agent name depending
            on what the state supports.
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-[var(--color-foreground)]">3.</span>
            Review the filing history, status (active / dissolved), registered
            agent, and officers.
          </li>
        </ol>
      </section>

      <nav
        aria-label="Other states"
        className="mt-12 flex items-center justify-between gap-3 border-t border-[var(--color-border)] pt-6"
      >
        <Link
          href={`/${prev.slug}`}
          className="group inline-flex items-center gap-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] focus-ring rounded"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
          {prev.name}
        </Link>
        <Link
          href={`/${next.slug}`}
          className="group inline-flex items-center gap-2 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] focus-ring rounded"
        >
          {next.name}
          <ArrowLeft className="h-4 w-4 rotate-180 transition-transform group-hover:translate-x-0.5" aria-hidden />
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
