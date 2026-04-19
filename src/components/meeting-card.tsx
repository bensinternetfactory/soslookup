import Link from "next/link";
import { Calendar, MapPin, FileText, Mic, ArrowUpRight } from "lucide-react";
import { StatusPill } from "./status-pill";
import type { Meeting } from "@/lib/types";

function formatMeetingDate(iso: string) {
  const d = new Date(iso);
  const weekday = d.toLocaleDateString("en-US", { weekday: "short", timeZone: "America/New_York" });
  const date = d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "America/New_York" });
  const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/New_York" });
  return { weekday, date, time };
}

function relativeMeeting(iso: string) {
  const now = Date.now();
  const then = new Date(iso).getTime();
  const deltaHours = Math.round((then - now) / 36e5);
  if (deltaHours < -168) return null;
  if (deltaHours < 0) return `${Math.abs(Math.round(deltaHours / 24))}d ago`;
  if (deltaHours < 24) return `in ${deltaHours}h`;
  const days = Math.round(deltaHours / 24);
  return `in ${days}d`;
}

export function MeetingCard({
  meeting,
  highlight,
}: {
  meeting: Meeting;
  highlight?: boolean;
}) {
  const { weekday, date, time } = formatMeetingDate(meeting.date);
  const rel = relativeMeeting(meeting.date);
  const itemCount = meeting.agenda.length;

  return (
    <Link
      href={`/meetings/${meeting.slug}`}
      className={`group relative flex h-full flex-col gap-3 rounded-2xl border border-[var(--color-border)] p-4 transition-colors hover:border-[var(--color-accent)] focus-ring ${
        highlight ? "bg-[var(--color-accent-soft)]" : "bg-[var(--color-card)]"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          aria-hidden
          className="flex flex-col items-center justify-center flex-shrink-0 rounded-xl bg-[var(--color-muted)] px-3 py-2 text-center leading-none"
        >
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-muted-foreground)]">
            {weekday}
          </span>
          <span className="mt-1 text-lg font-bold leading-none">{date}</span>
          <span className="mt-1 text-[10px] font-medium text-[var(--color-muted-foreground)]">
            {time}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <StatusPill tone={meeting.status === "upcoming" ? "accent" : "neutral"}>
              {meeting.body}
            </StatusPill>
            {rel && meeting.status === "upcoming" && (
              <StatusPill tone="success" icon={<Calendar className="h-3 w-3" />}>
                {rel}
              </StatusPill>
            )}
            {meeting.publicCommentOpen && (
              <StatusPill tone="warning" icon={<Mic className="h-3 w-3" />}>
                Public comment
              </StatusPill>
            )}
          </div>
          <p className="mt-2 line-clamp-2 flex items-start gap-1.5 text-xs text-[var(--color-muted-foreground)]">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0 translate-y-[1px]" aria-hidden />
            {meeting.location}
          </p>
        </div>
        <ArrowUpRight
          className="h-4 w-4 flex-shrink-0 text-[var(--color-muted-foreground)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-accent)]"
          aria-hidden
        />
      </div>

      <div className="flex items-center gap-1.5 text-xs text-[var(--color-muted-foreground)]">
        <FileText className="h-3.5 w-3.5" aria-hidden />
        <span>
          {itemCount} agenda {itemCount === 1 ? "item" : "items"}
        </span>
      </div>

      {meeting.agenda[0] && (
        <p className="mt-0.5 line-clamp-2 text-sm font-medium text-[var(--color-foreground)]">
          {meeting.agenda.find((a) => a.kind !== "report" && a.kind !== "consent")?.title ??
            meeting.agenda[0].title}
        </p>
      )}
    </Link>
  );
}
