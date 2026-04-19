import type { Metadata } from "next";
import { Container } from "@/components/container";
import { RepCard } from "@/components/rep-card";
import { AddressLookup } from "@/components/address-lookup";
import { REPRESENTATIVES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Representatives",
  description:
    "Every elected official representing Dover, NH: mayor, city council, school board, NH House, NH Senate, county commissioners, and federal representatives.",
};

const SECTIONS = [
  { title: "City Council", body: "City Council", subtitle: "Mayor, deputy mayor, and ward councilors" },
  { title: "School Board", body: "School Board", subtitle: "SAU 11 elected school board" },
  { title: "NH House", body: "NH House", subtitle: "State representatives elected by Dover districts" },
  { title: "NH Senate", body: "NH Senate", subtitle: "State senator for the Dover district" },
  { title: "Strafford County", body: "Strafford County", subtitle: "County commissioners" },
  { title: "Federal", body: "US House", subtitle: "Your U.S. House representative" },
] as const;

export default function RepsPage() {
  return (
    <Container className="py-8 sm:py-12">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">
          Your representatives
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Every elected official serving Dover
        </h1>
        <p className="mt-2 max-w-2xl text-[var(--color-muted-foreground)]">
          From city hall to Washington. Contact info, voting records, committee
          assignments, and public meetings they chair.
        </p>
      </header>

      <div className="mt-8">
        <AddressLookup />
      </div>

      {SECTIONS.map((section) => {
        const reps = REPRESENTATIVES.filter((r) => r.body === section.body);
        if (!reps.length) return null;
        return (
          <section key={section.title} aria-label={section.title} className="mt-12">
            <h2 className="text-lg font-semibold tracking-tight">{section.title}</h2>
            <p className="text-sm text-[var(--color-muted-foreground)]">
              {section.subtitle}
            </p>
            <ul role="list" className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {reps.map((r) => (
                <li key={r.slug}>
                  <RepCard rep={r} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </Container>
  );
}
