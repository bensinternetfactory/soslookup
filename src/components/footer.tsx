import Link from "next/link";
import { Container } from "./container";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--color-border)] py-10 text-sm text-[var(--color-muted-foreground)] sm:mt-24">
      <Container className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-md">
          <p className="font-semibold text-[var(--color-foreground)]">
            {siteConfig.name}
          </p>
          <p className="mt-1 text-xs">
            An independent civic-transparency project for the people of Dover,
            New Hampshire. Not affiliated with the City of Dover. Every claim
            links to a primary source.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/meetings" className="hover:text-[var(--color-foreground)] focus-ring rounded">Meetings</Link>
          <Link href="/representatives" className="hover:text-[var(--color-foreground)] focus-ring rounded">Reps</Link>
          <Link href="/bids" className="hover:text-[var(--color-foreground)] focus-ring rounded">Bids</Link>
          <Link href="/budget" className="hover:text-[var(--color-foreground)] focus-ring rounded">Budget</Link>
          <Link href="/about" className="hover:text-[var(--color-foreground)] focus-ring rounded">About</Link>
          <a
            href="https://www.dover.nh.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-foreground)] focus-ring rounded"
          >
            dover.nh.gov
          </a>
        </div>
      </Container>
    </footer>
  );
}
