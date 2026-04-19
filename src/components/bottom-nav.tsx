"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Users, FileText, Map } from "lucide-react";

const TABS = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/meetings", label: "Meetings", Icon: Calendar },
  { href: "/representatives", label: "Reps", Icon: Users },
  { href: "/bids", label: "Bids", Icon: FileText },
  { href: "/map", label: "Map", Icon: Map },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--color-border)] bg-[var(--color-background)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-background)]/80 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul role="list" className="flex items-stretch justify-around">
        {TABS.map(({ href, label, Icon }) => {
          const active =
            href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-[56px] flex-col items-center justify-center gap-0.5 px-1 py-1.5 text-[11px] font-medium focus-ring ${
                  active
                    ? "text-[var(--color-accent)]"
                    : "text-[var(--color-muted-foreground)]"
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${active ? "" : ""}`}
                  aria-hidden
                  strokeWidth={active ? 2.5 : 2}
                />
                <span className="leading-none">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
