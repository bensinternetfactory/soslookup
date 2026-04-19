import Link from "next/link";
import { Container } from "./container";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--color-border)] py-10 text-sm text-[var(--color-muted-foreground)]">
      <Container className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} SOSLookup. Not affiliated with any
          government agency. Links go to official .gov and state sources.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/about" className="hover:text-[var(--color-foreground)] focus-ring rounded">
            About
          </Link>
          <Link href="/#states" className="hover:text-[var(--color-foreground)] focus-ring rounded">
            All states
          </Link>
          <a
            href="https://www.usa.gov/business"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-foreground)] focus-ring rounded"
          >
            USA.gov
          </a>
        </div>
      </Container>
    </footer>
  );
}
