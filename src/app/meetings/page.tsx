import type { Metadata } from "next";
import { Container } from "@/components/container";
import { MeetingCard } from "@/components/meeting-card";
import { MEETINGS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Meetings",
  description:
    "Upcoming and past Dover, NH public meetings: City Council, School Board, Planning Board, Zoning Board, and more.",
};

export default function MeetingsPage() {
  const upcoming = MEETINGS.filter((m) => m.status === "upcoming").sort((a, b) =>
    a.date.localeCompare(b.date),
  );
  const past = MEETINGS.filter((m) => m.status === "completed").sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  return (
    <Container className="py-8 sm:py-12">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">
          Public meetings
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Every public meeting in Dover
        </h1>
        <p className="mt-2 max-w-2xl text-[var(--color-muted-foreground)]">
          City Council, School Board, Planning Board, Zoning Board of
          Adjustment, Conservation Commission — all in one calendar, with
          agendas, minutes, and video when available.
        </p>
      </header>

      <section aria-label="Upcoming meetings" className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight">
          Upcoming · {upcoming.length}
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((m) => (
            <MeetingCard key={m.slug} meeting={m} />
          ))}
          {upcoming.length === 0 && (
            <p className="text-sm text-[var(--color-muted-foreground)]">
              No meetings scheduled.
            </p>
          )}
        </div>
      </section>

      <section aria-label="Past meetings" className="mt-12">
        <h2 className="text-lg font-semibold tracking-tight">Past</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {past.map((m) => (
            <MeetingCard key={m.slug} meeting={m} />
          ))}
        </div>
      </section>
    </Container>
  );
}
