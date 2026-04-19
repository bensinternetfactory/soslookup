import { ExternalLink, Shield, Scale, Calculator, Briefcase, Building2 } from "lucide-react";
import type { ProfessionalLookup } from "@/lib/professionals";

const CATEGORY_META: Record<
  ProfessionalLookup["category"],
  { icon: typeof Shield; label: string }
> = {
  finance: { icon: Shield, label: "Financial services" },
  tax: { icon: Calculator, label: "Tax & accounting" },
  legal: { icon: Scale, label: "Legal" },
  business: { icon: Building2, label: "Business" },
  license: { icon: Briefcase, label: "License" },
};

export function ProfessionalVerify({
  lookups,
  stateBar,
  stateName,
}: {
  lookups: ProfessionalLookup[];
  stateBar?: { url: string; name: string };
  stateName?: string;
}) {
  return (
    <section aria-label="Verify a professional">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Verify a professional{stateName ? ` in ${stateName}` : ""}
          </h2>
          <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
            Hiring an advisor, broker, CPA, or attorney? Confirm their license
            before handing over money or signing contracts.
          </p>
        </div>
      </div>

      <ul role="list" className="mt-5 grid gap-3 sm:grid-cols-2">
        {stateBar && (
          <li>
            <a
              href={stateBar.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full items-start gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 transition-colors hover:border-[var(--color-accent)] focus-ring"
            >
              <span
                aria-hidden
                className="mt-0.5 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
              >
                <Scale className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold leading-tight">
                    Find an attorney
                  </span>
                  <ExternalLink
                    className="h-4 w-4 flex-shrink-0 text-[var(--color-muted-foreground)]"
                    aria-hidden
                  />
                </span>
                <span className="mt-0.5 block text-xs font-medium text-[var(--color-muted-foreground)]">
                  {stateBar.name}
                </span>
                <span className="mt-1.5 block text-xs text-[var(--color-muted-foreground)]">
                  Official state attorney directory. Confirm active license,
                  bar number, and any disciplinary history.
                </span>
              </span>
            </a>
          </li>
        )}
        {lookups.map((p) => {
          const { icon: Icon, label } = CATEGORY_META[p.category];
          return (
            <li key={p.url}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-start gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 transition-colors hover:border-[var(--color-accent)] focus-ring"
              >
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold leading-tight">
                      {p.name}
                    </span>
                    <ExternalLink
                      className="h-4 w-4 flex-shrink-0 text-[var(--color-muted-foreground)]"
                      aria-hidden
                    />
                  </span>
                  <span className="mt-0.5 block text-xs font-medium text-[var(--color-muted-foreground)]">
                    {p.provider} · {label}
                  </span>
                  <span className="mt-1.5 block text-xs text-[var(--color-muted-foreground)]">
                    {p.description}
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
