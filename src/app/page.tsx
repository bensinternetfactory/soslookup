import Link from "next/link";
import { ArrowRight, Radio } from "lucide-react";
import { Container } from "@/components/container";
import { SectionHeader } from "@/components/section-header";
import { MeetingCard } from "@/components/meeting-card";
import { BidCard } from "@/components/bid-card";
import { VendorCard } from "@/components/vendor-card";
import { RepCard } from "@/components/rep-card";
import { DoverMap } from "@/components/dover-map";
import { AddressLookup } from "@/components/address-lookup";
import { StatusPill } from "@/components/status-pill";
import { BIDS, MEETINGS, REPRESENTATIVES, VENDORS } from "@/lib/data";

export default function HomePage() {
  const upcomingMeetings = MEETINGS.filter((m) => m.status === "upcoming")
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);
  const nextMeeting = upcomingMeetings[0];

  const openBids = BIDS.filter((b) => b.status === "open").slice(0, 3);
  const leaders = [...VENDORS]
    .sort((a, b) => b.lifetimeAwardCents - a.lifetimeAwardCents)
    .slice(0, 3);
  const featuredReps = REPRESENTATIVES.filter(
    (r) => r.role === "mayor" || r.role === "deputy-mayor",
  ).slice(0, 2);

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-[360px] bg-[radial-gradient(ellipse_at_top,var(--color-accent-soft),transparent_65%)]"
        />
        <Container className="pt-8 pb-4 sm:pt-16 sm:pb-8">
          <div className="max-w-3xl">
            <StatusPill tone="accent" icon={<Radio className="h-3 w-3" />}>
              Live · Dover, New Hampshire
            </StatusPill>
            <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Know what your city is deciding{" "}
              <span className="text-[var(--color-accent)]">before</span> they
              decide it.
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-base text-[var(--color-muted-foreground)] sm:text-lg">
              Every meeting, every vote, every contract, every dollar — with
              citations back to the primary source. Built for Dover residents,
              by residents.
            </p>
          </div>
        </Container>
      </section>

      <Container className="pb-10">
        <AddressLookup />
      </Container>

      {nextMeeting && (
        <Container>
          <SectionHeader
            title="Happening next"
            subtitle="Public meetings in the next two weeks"
            href="/meetings"
          />
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingMeetings.map((m) => (
              <MeetingCard
                key={m.slug}
                meeting={m}
                highlight={m.slug === nextMeeting.slug}
              />
            ))}
          </div>
        </Container>
      )}

      <Container className="mt-12 sm:mt-16">
        <SectionHeader
          title="Active procurement"
          subtitle="Open bids, contracts in evaluation, recent awards"
          href="/bids"
        />
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {openBids.map((b) => (
            <BidCard key={b.id} bid={b} />
          ))}
        </div>
      </Container>

      <Container className="mt-12 sm:mt-16">
        <SectionHeader
          title="Top Dover vendors"
          subtitle="Ranked by lifetime award value"
          href="/vendors"
        />
        <ul role="list" className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {leaders.map((v) => (
            <li key={v.slug}>
              <VendorCard vendor={v} />
            </li>
          ))}
        </ul>
      </Container>

      <Container className="mt-12 sm:mt-16">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div>
            <SectionHeader
              title="Your ward, your map"
              subtitle="Tap a ward to see its councilor, school board rep, polling place, and active permits"
            />
            <div className="mt-4">
              <DoverMap />
            </div>
          </div>
          <div>
            <SectionHeader
              title="City leadership"
              subtitle="Mayor, councilors, school board"
              href="/representatives"
            />
            <div className="mt-4 space-y-3">
              {featuredReps.map((r) => (
                <RepCard key={r.slug} rep={r} />
              ))}
              <Link
                href="/representatives"
                className="group flex items-center justify-between rounded-2xl border border-dashed border-[var(--color-border)] p-4 text-sm font-medium text-[var(--color-muted-foreground)] hover:border-[var(--color-accent)] hover:text-[var(--color-foreground)] focus-ring"
              >
                See all {REPRESENTATIVES.length} representatives
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </div>
          </div>
        </div>
      </Container>

      <Container className="mt-16">
        <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">
            Stay informed
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Get an email when your city decides something that affects you.
          </h2>
          <p className="mt-2 max-w-xl text-sm text-[var(--color-muted-foreground)]">
            Subscribe by topic (downtown parking, STRs, school budget), by
            representative, or by street address. Free, one click to unsubscribe.
          </p>
          <form
            className="mt-5 flex flex-col gap-2 sm:flex-row"
            action="#"
            method="post"
          >
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="your@email.com"
              className="h-12 flex-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-4 text-base outline-none transition-colors focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
            />
            <button
              type="submit"
              className="h-12 inline-flex items-center justify-center rounded-xl bg-[var(--color-accent)] px-5 text-sm font-semibold text-[var(--color-accent-foreground)] transition-colors hover:bg-[var(--color-accent-hover)] focus-ring"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-2 text-xs text-[var(--color-muted-foreground)]">
            Email delivery is not active in this preview.
          </p>
        </div>
      </Container>
    </>
  );
}
