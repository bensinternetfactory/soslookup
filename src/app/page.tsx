import { Container } from "@/components/container";
import { StateSearch } from "@/components/state-search";
import { ProfessionalVerify } from "@/components/professional-verify";
import { STATES } from "@/lib/states";
import { NATIONAL_LOOKUPS } from "@/lib/professionals";
import { ShieldCheck, Zap, Smartphone } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-[380px] bg-[radial-gradient(ellipse_at_top,var(--color-accent-soft),transparent_65%)]"
        />
        <Container className="pt-12 pb-4 sm:pt-20 sm:pb-8">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1 text-xs font-medium text-[var(--color-muted-foreground)]">
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"
              />
              All 50 states + DC · updated for 2026
            </p>
            <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight text-[var(--color-foreground)] sm:text-5xl lg:text-6xl">
              Look up any US business &mdash; or the pro you&rsquo;re hiring
              &mdash; in one tap.
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg text-[var(--color-muted-foreground)]">
              Free directory to every Secretary of State business registry,
              plus national verification for CPAs, brokers, financial
              advisors, mortgage pros, and attorneys. No ads, no paywall,
              straight to the .gov source.
            </p>
          </div>

          <StateSearch states={STATES} />
        </Container>
      </section>

      <section className="mt-20 sm:mt-24">
        <Container>
          <ProfessionalVerify lookups={NATIONAL_LOOKUPS} />
        </Container>
      </section>

      <section aria-label="Why SOSLookup" className="mt-20 sm:mt-24">
        <Container>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Built to get you out of here fast.
          </h2>
          <ul role="list" className="mt-8 grid gap-4 sm:grid-cols-3">
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
              <h3 className="mt-3 text-base font-semibold">Verify before you hire</h3>
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                BrokerCheck, SEC IAPD, NMLS, CPAverify, IRS preparer directory,
                SAM.gov — all linked on every state page.
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
