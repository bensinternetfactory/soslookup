import type { Metadata } from "next";
import { Container } from "@/components/container";
import { StatusPill } from "@/components/status-pill";
import { BUDGET_FY26, TAX_RATES, formatUSD, formatUSDExact } from "@/lib/data";
import type { BudgetNode } from "@/lib/types";

export const metadata: Metadata = {
  title: "Budget",
  description: "City of Dover, NH budget visualization: general fund, schools, enterprise funds, capital improvement, and tax rate history.",
};

function deltaPct(current: number, prev?: number) {
  if (!prev) return null;
  return Math.round(((current - prev) / prev) * 1000) / 10;
}

const CATEGORY_TONE = {
  operations: "accent",
  capital: "success",
  debt: "warning",
  schools: "accent",
  enterprise: "neutral",
} as const;

function BudgetRow({ node, depth = 0 }: { node: BudgetNode; depth?: number }) {
  const pctTotal = (node.amountCents / BUDGET_FY26.amountCents) * 100;
  const d = deltaPct(node.amountCents, node.prevYearCents);
  return (
    <div
      className={`rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-3 ${
        depth === 0 ? "" : "ml-0 sm:ml-6"
      }`}
      style={{ marginLeft: depth > 0 ? depth * 12 : 0 }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <p className="truncate text-sm font-semibold leading-tight">{node.name}</p>
            {node.category && depth < 2 && (
              <StatusPill tone={CATEGORY_TONE[node.category]}>{node.category}</StatusPill>
            )}
          </div>
          <p className="mt-0.5 text-xs text-[var(--color-muted-foreground)]">
            {formatUSDExact(node.amountCents)}
            {d != null && (
              <span className={`ml-2 ${d > 0 ? "text-[var(--color-warning)]" : "text-[var(--color-success)]"}`}>
                {d > 0 ? "▲" : "▼"} {Math.abs(d)}% YoY
              </span>
            )}
          </p>
        </div>
        <span className="flex-shrink-0 text-sm font-semibold tabular-nums text-[var(--color-muted-foreground)]">
          {pctTotal.toFixed(1)}%
        </span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-muted)]">
        <div
          className="h-full rounded-full bg-[var(--color-accent)]"
          style={{ width: `${Math.min(100, pctTotal * 2)}%` }}
        />
      </div>
      {node.children && (
        <div className="mt-3 space-y-2">
          {node.children
            .slice()
            .sort((a, b) => b.amountCents - a.amountCents)
            .map((c) => (
              <BudgetRow key={c.name} node={c} depth={depth + 1} />
            ))}
        </div>
      )}
    </div>
  );
}

export default function BudgetPage() {
  const d = deltaPct(BUDGET_FY26.amountCents, BUDGET_FY26.prevYearCents);
  const current = TAX_RATES[0];

  return (
    <Container className="py-8 sm:py-12">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">
          Budget
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Where every Dover dollar goes
        </h1>
        <p className="mt-2 max-w-2xl text-[var(--color-muted-foreground)]">
          FY2026 adopted budget, compared to FY2025. Drill into any category
          to see what it covers.
        </p>
      </header>

      <section aria-label="Top-line" className="mt-8 grid gap-3 sm:grid-cols-3">
        <Stat label="Total budget" value={formatUSD(BUDGET_FY26.amountCents)} hint={d != null ? `${d > 0 ? "+" : ""}${d}% vs prior year` : undefined} />
        <Stat label="Tax rate" value={`$${current.totalRate.toFixed(2)}`} hint={`per $1,000 · ${current.year}`} />
        <Stat label="Budget year" value="FY2026" hint="Jul 1, 2025 – Jun 30, 2026" />
      </section>

      <section aria-label="Breakdown" className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight">Breakdown</h2>
        <div className="mt-4 space-y-2">
          <BudgetRow node={BUDGET_FY26} />
        </div>
      </section>

      <section aria-label="Tax rate history" className="mt-12">
        <h2 className="text-lg font-semibold tracking-tight">Tax rate history</h2>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Combined rate per $1,000 of assessed value.
        </p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[var(--color-border)]">
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-muted)] text-left text-xs uppercase text-[var(--color-muted-foreground)]">
              <tr>
                <th className="px-3 py-2">Year</th>
                <th className="px-3 py-2 tabular-nums">City</th>
                <th className="px-3 py-2 tabular-nums">School</th>
                <th className="px-3 py-2 tabular-nums">County</th>
                <th className="px-3 py-2 tabular-nums">State</th>
                <th className="px-3 py-2 text-right tabular-nums">Total</th>
              </tr>
            </thead>
            <tbody>
              {TAX_RATES.map((r) => (
                <tr key={r.year} className="border-t border-[var(--color-border)]">
                  <td className="px-3 py-2 font-semibold">{r.year}</td>
                  <td className="px-3 py-2 tabular-nums">{r.cityRate.toFixed(2)}</td>
                  <td className="px-3 py-2 tabular-nums">{r.schoolRate.toFixed(2)}</td>
                  <td className="px-3 py-2 tabular-nums">{r.countyRate.toFixed(2)}</td>
                  <td className="px-3 py-2 tabular-nums">{r.stateRate.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right font-semibold tabular-nums">
                    ${r.totalRate.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Container>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4">
      <dt className="text-xs font-medium text-[var(--color-muted-foreground)]">{label}</dt>
      <dd className="mt-1 text-2xl font-bold tracking-tight tabular-nums">{value}</dd>
      {hint && <p className="text-xs text-[var(--color-muted-foreground)]">{hint}</p>}
    </div>
  );
}
