import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Why ${siteConfig.name} exists and how the links are kept current.`,
  alternates: { canonical: `${siteConfig.url}/about` },
};

export default function AboutPage() {
  return (
    <Container className="py-12 sm:py-16">
      <article className="prose prose-neutral max-w-2xl text-[var(--color-foreground)]">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          About SOSLookup
        </h1>
        <p className="mt-4 text-lg text-[var(--color-muted-foreground)]">
          A free, ad-free directory pointing to the official business entity
          search for every US state plus DC.
        </p>

        <h2 className="mt-10 text-xl font-semibold">What it is</h2>
        <p className="mt-3 text-[var(--color-muted-foreground)]">
          Each state runs its own corporate registry — usually the Secretary of
          State, sometimes a Division of Corporations, Department of State,
          Corporation Commission, or similar. The URLs change often, they&rsquo;re
          hard to remember, and Google frequently ranks third-party lookup
          services above the official ones. This site fixes that.
        </p>

        <h2 className="mt-10 text-xl font-semibold">What it is not</h2>
        <p className="mt-3 text-[var(--color-muted-foreground)]">
          Not a government site. Not affiliated with any state agency. We
          don&rsquo;t store or query business data ourselves — every search
          happens on the official state domain.
        </p>

        <h2 className="mt-10 text-xl font-semibold">Found a broken link?</h2>
        <p className="mt-3 text-[var(--color-muted-foreground)]">
          State agencies occasionally migrate their search tools. If a link is
          stale, please{" "}
          <a
            className="underline"
            href="https://github.com/bensinternetfactory/soslookup/issues/new"
            target="_blank"
            rel="noopener noreferrer"
          >
            open an issue on GitHub
          </a>{" "}
          and we&rsquo;ll fix it fast.
        </p>

        <p className="mt-12">
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-full bg-[var(--color-accent)] px-5 text-sm font-semibold text-[var(--color-accent-foreground)] focus-ring"
          >
            Back to state directory
          </Link>
        </p>
      </article>
    </Container>
  );
}
