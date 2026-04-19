import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

export function SectionHeader({
  title,
  subtitle,
  href,
  action,
}: {
  title: string;
  subtitle?: string;
  href?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-3">
      <div className="min-w-0">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
            {subtitle}
          </p>
        )}
      </div>
      {href ? (
        <Link
          href={href}
          className="group inline-flex flex-shrink-0 items-center gap-1 text-sm font-medium text-[var(--color-accent)] focus-ring rounded"
        >
          See all
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      ) : action ?? null}
    </div>
  );
}
