import type { ReactNode } from "react";

type Tone = "neutral" | "accent" | "success" | "warning" | "danger";

const TONE_CLASSES: Record<Tone, string> = {
  neutral:
    "bg-[var(--color-muted)] text-[var(--color-muted-foreground)] border-[var(--color-border)]",
  accent:
    "bg-[var(--color-accent-soft)] text-[var(--color-accent)] border-transparent",
  success:
    "bg-[var(--color-success-soft)] text-[var(--color-success)] border-transparent",
  warning:
    "bg-[var(--color-warning-soft)] text-[var(--color-warning)] border-transparent",
  danger:
    "bg-[var(--color-danger-soft)] text-[var(--color-danger)] border-transparent",
};

export function StatusPill({
  tone = "neutral",
  children,
  icon,
}: {
  tone?: Tone;
  children: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${TONE_CLASSES[tone]}`}
    >
      {icon}
      {children}
    </span>
  );
}
