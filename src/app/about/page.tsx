import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Methodology and data sources for ${siteConfig.name}.`,
};

export default function AboutPage() {
  return (
    <Container className="py-12 sm:py-16">
      <article className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">
          About
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          What this site is, and isn&rsquo;t.
        </h1>

        <h2 className="mt-10 text-xl font-semibold">The mission</h2>
        <p className="mt-3 text-[var(--color-muted-foreground)]">
          In under ten seconds on a phone, a Dover resident should be able to
          see who represents them, what their government is deciding this
          week, and what it has decided before — with every claim backed by a
          link to the primary source document.
        </p>

        <h2 className="mt-10 text-xl font-semibold">What it is</h2>
        <p className="mt-3 text-[var(--color-muted-foreground)]">
          An independent civic-transparency project for Dover, New Hampshire.
          Data is gathered from public sources (dover.nh.gov, SAU 11, NH
          General Court, Strafford County, and NH Secretary of State) and
          normalized into a consistent format. Nothing is behind a paywall.
        </p>

        <h2 className="mt-10 text-xl font-semibold">What it is not</h2>
        <p className="mt-3 text-[var(--color-muted-foreground)]">
          Not a government site. Not affiliated with the City of Dover, SAU
          11, or any candidate or party. Not a replacement for the official
          meeting record — when there&rsquo;s ever a discrepancy, the official
          record wins.
        </p>

        <h2 className="mt-10 text-xl font-semibold">Methodology</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--color-muted-foreground)]">
          <li>
            Meeting agendas and minutes are parsed from dover.nh.gov packets
            the morning they&rsquo;re posted.
          </li>
          <li>
            Vendor names are normalized with fuzzy matching and cross-
            referenced to NH Secretary of State entity records when possible.
          </li>
          <li>
            Bids below the council-approval threshold may not be complete in
            this dataset; the threshold is flagged on the bids page.
          </li>
          <li>
            Cooperative and state-contract purchases (which don&rsquo;t
            compete locally) are labeled distinctly from competitive bids.
          </li>
          <li>
            Representative voting records currently count roll-call votes
            only; voice votes are excluded because they aren&rsquo;t
            individually attributable in the official record.
          </li>
        </ul>

        <h2 className="mt-10 text-xl font-semibold">Corrections</h2>
        <p className="mt-3 text-[var(--color-muted-foreground)]">
          Found an error? Please{" "}
          <a
            className="font-medium text-[var(--color-accent)] hover:underline"
            href={`mailto:${siteConfig.contactEmail}`}
          >
            email us
          </a>{" "}
          with the URL of the page and a link to the primary source. We fix
          errors fast and log every correction publicly.
        </p>

        <p className="mt-12">
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-full bg-[var(--color-accent)] px-5 text-sm font-semibold text-[var(--color-accent-foreground)] hover:bg-[var(--color-accent-hover)] focus-ring"
          >
            Back to home
          </Link>
        </p>
      </article>
    </Container>
  );
}
