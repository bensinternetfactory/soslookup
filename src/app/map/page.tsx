import type { Metadata } from "next";
import { Container } from "@/components/container";
import { DoverMap } from "@/components/dover-map";
import { StatusPill } from "@/components/status-pill";
import { AddressLookup } from "@/components/address-lookup";
import { BIDS } from "@/lib/data";
import Link from "next/link";
import { MapPin, Hammer, FileText, Mic } from "lucide-react";

export const metadata: Metadata = {
  title: "Map",
  description: "Interactive map of Dover, NH — wards, polling places, active bids, public hearings.",
};

export default function MapPage() {
  const geoBids = BIDS.filter((b) => b.location).slice(0, 6);

  return (
    <Container className="py-8 sm:py-12">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">
          Map
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Dover at a glance
        </h1>
        <p className="mt-2 max-w-2xl text-[var(--color-muted-foreground)]">
          Ward boundaries, active procurement, permit hearings, and polling
          locations. In the production build this becomes an interactive
          Mapbox GL map with live layers.
        </p>
      </header>

      <div className="mt-8">
        <DoverMap />
      </div>

      <section aria-label="Map layers" className="mt-8">
        <h2 className="text-lg font-semibold tracking-tight">Coming map layers</h2>
        <ul role="list" className="mt-3 grid gap-2 sm:grid-cols-2">
          {[
            { icon: MapPin, label: "Ward & polling-place boundaries", ready: true },
            { icon: Hammer, label: "Active construction bids & CIP projects", ready: true },
            { icon: FileText, label: "Planning Board hearings (500ft abutter circles)" },
            { icon: Mic, label: "Live meeting locations for the next 14 days" },
            { icon: MapPin, label: "School attendance zones" },
            { icon: Hammer, label: "Historic & proposed zoning overlays" },
          ].map((l) => (
            <li
              key={l.label}
              className="flex items-center justify-between gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-3"
            >
              <span className="inline-flex items-center gap-2 text-sm">
                <l.icon className="h-4 w-4 text-[var(--color-accent)]" aria-hidden />
                {l.label}
              </span>
              {l.ready ? (
                <StatusPill tone="success">v1</StatusPill>
              ) : (
                <StatusPill tone="neutral">soon</StatusPill>
              )}
            </li>
          ))}
        </ul>
      </section>

      {geoBids.length > 0 && (
        <section aria-label="Geolocated bids" className="mt-10">
          <h2 className="text-lg font-semibold tracking-tight">Geolocated active bids</h2>
          <p className="text-sm text-[var(--color-muted-foreground)]">
            Bids with a physical project site.
          </p>
          <ul role="list" className="mt-4 grid gap-3 sm:grid-cols-2">
            {geoBids.map((b) => (
              <li key={b.id}>
                <Link
                  href={`/bids/${b.id}`}
                  className="group flex items-start gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 transition-colors hover:border-[var(--color-accent)] focus-ring"
                >
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--color-accent)]" aria-hidden />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{b.title}</p>
                    <p className="mt-0.5 text-xs text-[var(--color-muted-foreground)]">
                      {b.location?.address}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-12">
        <AddressLookup />
      </div>
    </Container>
  );
}
