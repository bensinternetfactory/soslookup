import { Container } from "@/components/container";
import { StateSearch } from "@/components/state-search";
import { STATES } from "@/lib/states";
import { ShieldCheck, Zap, Smartphone } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-[480px] bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--color-accent)_18%,transparent),transparent_60%)]"
        />
        <Container className="pt-14 pb-6 sm:pt-20 sm:pb-10">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1 text-xs font-medium text-[var(--color-muted-foreground)]">
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"
              />
              All 50 states + DC · updated for 2026
            </p>
            <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              The fastest way to find a business on any{" "}
              <span className="bg-gradient-to-r from-[var(--color-accent)] to-[color-mix(in_oklab,var(--color-accent)_60%,white)] bg-clip-text text-transparent">
                Secretary of State
              </span>{" "}
              registry.
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg text-[var(--color-muted-foreground)]">
              Pick a state. Get sent straight to the official .gov search — no
              ads, no affiliate redirects, no paywall. Works great on mobile.
            </p>
          </div>

          <StateSearch states={STATES} />
        </Container>
      </section>

      <section aria-label="Why SOSLookup" className="mt-16 sm:mt-24">
        <Container>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Built to get you out of here fast.
          </h2>
          <ul
            role="list"
            className="mt-8 grid gap-4 sm:grid-cols-3"
          >
            <li className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5">
              <Zap className="h-5 w-5 text-[var(--color-accent)]" aria-hidden />
              <h3 className="mt-3 text-base font-semibold">One tap to .gov</h3>
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                Every link goes directly to the official state search — no
                intermediate forms or redirects.
              </p>
            </li>
            <li className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5">
              <ShieldCheck className="h-5 w-5 text-[var(--color-accent)]" aria-hidden />
              <h3 className="mt-3 text-base font-semibold">Verified sources</h3>
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                URLs point to the correct Secretary of State, Division of
                Corporations, or equivalent agency.
              </p>
            </li>
            <li className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-5">
              <Smartphone className="h-5 w-5 text-[var(--color-accent)]" aria-hidden />
              <h3 className="mt-3 text-base font-semibold">Mobile-first</h3>
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                Designed for thumbs: large targets, instant filter, dark mode,
                zero layout shift.
              </p>
            </li>
          </ul>
        </Container>
      </section>
    </>
  );
}
