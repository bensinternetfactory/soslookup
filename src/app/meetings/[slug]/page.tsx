import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Mic,
  FileText,
  Video,
  ExternalLink,
} from "lucide-react";
import { Container } from "@/components/container";
import { StatusPill } from "@/components/status-pill";
import { findMeeting, MEETINGS, findVendor } from "@/lib/data";

type Params = { slug: string };

export function generateStaticParams() {
  return MEETINGS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = findMeeting(slug);
  if (!m) return {};
  const d = new Date(m.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  });
  return {
    title: `${m.body} · ${d}`,
    description: `Agenda and documents for the ${m.body} meeting on ${d}.`,
  };
}

const KIND_TONE = {
  "public-hearing": "warning",
  ordinance: "accent",
  resolution: "accent",
  report: "neutral",
  discussion: "neutral",
  consent: "neutral",
  "new-business": "success",
} as const;

const KIND_LABEL = {
  "public-hearing": "Public hearing",
  ordinance: "Ordinance",
  resolution: "Resolution",
  report: "Report",
  discussion: "Discussion",
  consent: "Consent",
  "new-business": "New business",
} as const;

export default async function MeetingPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const m = findMeeting(slug);
  if (!m) notFound();

  const dt = new Date(m.date);
  const weekday = dt.toLocaleDateString("en-US", { weekday: "long", timeZone: "America/New_York" });
  const date = dt.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "America/New_York" });
  const time = dt.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/New_York" });

  return (
    <Container className="py-8 sm:py-12">
      <Link
        href="/meetings"
        className="inline-flex items-center gap-1 text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] focus-ring rounded"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden /> All meetings
      </Link>

      <header className="mt-5">
        <div className="flex flex-wrap items-center gap-2">
          <StatusPill tone="accent">{m.body}</StatusPill>
          <StatusPill tone={m.status === "upcoming" ? "success" : "neutral"}>
            {m.status === "upcoming" ? "Upcoming" : "Past"}
          </StatusPill>
          {m.publicCommentOpen && (
            <StatusPill tone="warning" icon={<Mic className="h-3 w-3" />}>
              Public comment open
            </StatusPill>
          )}
        </div>
        <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
          {m.body} &mdash; {date}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[var(--color-muted-foreground)]">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4" aria-hidden /> {weekday}, {time}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4" aria-hidden /> {m.location}
          </span>
        </div>
      </header>

      <div className="mt-6 flex flex-wrap gap-2">
        {m.packetUrl && (
          <a
            href={m.packetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-[var(--color-accent)] px-4 text-sm font-semibold text-[var(--color-accent-foreground)] hover:bg-[var(--color-accent-hover)] focus-ring"
          >
            <FileText className="h-4 w-4" aria-hidden /> Agenda packet
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        )}
        {m.minutesUrl && (
          <a
            href={m.minutesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-4 text-sm font-semibold hover:border-[var(--color-accent)] focus-ring"
          >
            <FileText className="h-4 w-4" aria-hidden /> Minutes
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        )}
        {m.videoUrl && (
          <a
            href={m.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-4 text-sm font-semibold hover:border-[var(--color-accent)] focus-ring"
          >
            <Video className="h-4 w-4" aria-hidden /> Watch
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        )}
      </div>

      <section className="mt-10" aria-label="Agenda">
        <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
          Agenda &mdash; {m.agenda.length} {m.agenda.length === 1 ? "item" : "items"}
        </h2>
        <ol role="list" className="mt-4 space-y-3">
          {m.agenda.map((item) => {
            const vendor = item.relatedVendor ? findVendor(item.relatedVendor) : null;
            return (
              <li
                key={item.number}
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-4"
              >
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="inline-flex h-8 min-w-[2rem] flex-shrink-0 items-center justify-center rounded-lg bg-[var(--color-muted)] px-2 text-xs font-semibold text-[var(--color-muted-foreground)]"
                  >
                    {item.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <StatusPill tone={KIND_TONE[item.kind]}>{KIND_LABEL[item.kind]}</StatusPill>
                      {typeof item.documentCount === "number" && item.documentCount > 0 && (
                        <StatusPill tone="neutral" icon={<FileText className="h-3 w-3" />}>
                          {item.documentCount} docs
                        </StatusPill>
                      )}
                    </div>
                    <h3 className="mt-2 font-semibold leading-tight">{item.title}</h3>
                    <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                      {item.summary}
                    </p>
                    {(item.sponsor || vendor) && (
                      <div className="mt-2 flex flex-wrap gap-3 text-xs text-[var(--color-muted-foreground)]">
                        {item.sponsor && <span>Sponsor: {item.sponsor}</span>}
                        {vendor && (
                          <Link
                            href={`/vendors/${vendor.slug}`}
                            className="inline-flex items-center gap-1 text-[var(--color-accent)] hover:underline"
                          >
                            Vendor: {vendor.name}
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {m.status === "upcoming" && m.publicCommentOpen && (
        <section className="mt-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-accent-soft)] p-5">
          <h2 className="text-base font-semibold">Want to speak?</h2>
          <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
            Public comment is accepted at the start of the meeting. Sign up at
            the door or email the city clerk ahead of time. Three-minute limit
            per speaker.
          </p>
          <a
            href={`mailto:cityclerk@dover.nh.gov?subject=Request to speak — ${encodeURIComponent(m.body)} ${date}`}
            className="mt-3 inline-flex h-10 items-center rounded-full bg-[var(--color-accent)] px-4 text-sm font-semibold text-[var(--color-accent-foreground)] hover:bg-[var(--color-accent-hover)] focus-ring"
          >
            Email city clerk
          </a>
        </section>
      )}
    </Container>
  );
}
