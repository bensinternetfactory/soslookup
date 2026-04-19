import Link from "next/link";
import { Container } from "./container";
import { ThemeToggle } from "./theme-toggle";
import { siteConfig } from "@/lib/site";

const NAV = [
  { href: "/meetings", label: "Meetings" },
  { href: "/representatives", label: "Reps" },
  { href: "/bids", label: "Bids" },
  { href: "/vendors", label: "Vendors" },
  { href: "/budget", label: "Budget" },
  { href: "/map", label: "Map" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-background)_88%,transparent)] backdrop-blur supports-[backdrop-filter]:bg-[color-mix(in_oklab,var(--color-background)_72%,transparent)]">
      <Container className="flex h-14 items-center justify-between gap-4 sm:h-16">
        <Link
          href="/"
          className="flex items-center gap-2 text-base font-semibold tracking-tight focus-ring rounded-md"
        >
          <span
            aria-hidden
            className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-accent)] text-[var(--color-accent-foreground)] text-sm font-bold"
          >
            D
          </span>
          <span className="flex items-baseline gap-1.5">
            <span>{siteConfig.name}</span>
            <span className="hidden text-xs font-normal text-[var(--color-muted-foreground)] sm:inline">
              Dover, NH
            </span>
          </span>
        </Link>

        <nav aria-label="Desktop" className="hidden md:flex">
          <ul role="list" className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex h-10 items-center rounded-full px-3 text-sm font-medium text-[var(--color-muted-foreground)] transition-colors hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)] focus-ring"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ThemeToggle />
      </Container>
    </header>
  );
}
