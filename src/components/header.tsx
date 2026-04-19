import Link from "next/link";
import { Container } from "./container";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-background)_85%,transparent)] backdrop-blur supports-[backdrop-filter]:bg-[color-mix(in_oklab,var(--color-background)_70%,transparent)]">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-base font-semibold tracking-tight focus-ring rounded-md"
        >
          <span
            aria-hidden
            className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-accent)] text-[var(--color-accent-foreground)] text-sm font-bold"
          >
            S
          </span>
          <span>
            SOS<span className="text-[var(--color-muted-foreground)]">Lookup</span>
          </span>
        </Link>
        <nav className="flex items-center gap-2">
          <Link
            href="/#states"
            className="hidden sm:inline-flex h-10 items-center rounded-full px-4 text-sm font-medium text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] focus-ring"
          >
            All states
          </Link>
          <Link
            href="/about"
            className="hidden sm:inline-flex h-10 items-center rounded-full px-4 text-sm font-medium text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] focus-ring"
          >
            About
          </Link>
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  );
}
