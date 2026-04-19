import Link from "next/link";

// Stylized ward map placeholder. Each polygon is a button-sized tap target.
// Swap with Mapbox GL + real ward GeoJSON in the next phase.

const WARD_PATHS: Record<number, { path: string; label: { x: number; y: number } }> = {
  1: { path: "M40,50 L150,40 L200,95 L145,160 L60,140 Z", label: { x: 115, y: 100 } },
  2: { path: "M200,95 L280,80 L310,155 L235,190 L200,160 L145,160 Z", label: { x: 240, y: 135 } },
  3: { path: "M310,155 L390,140 L410,220 L360,270 L275,245 L235,190 Z", label: { x: 325, y: 210 } },
  4: { path: "M280,80 L360,60 L420,110 L440,170 L390,140 L310,155 Z", label: { x: 365, y: 115 } },
  5: { path: "M235,190 L275,245 L250,310 L180,300 L150,240 Z", label: { x: 210, y: 265 } },
  6: { path: "M150,40 L230,20 L300,30 L280,80 L200,95 Z", label: { x: 220, y: 55 } },
  7: { path: "M60,140 L145,160 L150,240 L180,300 L100,310 L40,220 Z", label: { x: 115, y: 225 } },
};

export function DoverMap({
  onWardSelected,
  interactive = true,
}: {
  onWardSelected?: (ward: number) => void;
  interactive?: boolean;
}) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)]">
      {/* Decorative topo strokes */}
      <svg
        viewBox="0 0 450 340"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--color-border)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        {/* Cocheco river */}
        <path
          d="M0,180 Q100,150 180,200 T360,240 T450,280"
          fill="none"
          stroke="var(--color-accent)"
          strokeOpacity="0.25"
          strokeWidth="3"
        />
      </svg>

      <svg
        viewBox="0 0 450 340"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Map of Dover, NH showing the 7 wards"
      >
        {Object.entries(WARD_PATHS).map(([n, w]) => {
          const num = Number(n);
          const Shape = (
            <g>
              <path
                d={w.path}
                fill="var(--color-card)"
                stroke="var(--color-accent)"
                strokeOpacity="0.5"
                strokeWidth="1.5"
                className="transition-colors [&:hover]:fill-[var(--color-accent-soft)]"
              />
              <text
                x={w.label.x}
                y={w.label.y}
                textAnchor="middle"
                className="fill-[var(--color-foreground)] text-[13px] font-semibold"
              >
                {num}
              </text>
            </g>
          );
          if (!interactive) return <g key={n}>{Shape}</g>;
          return (
            <Link key={n} href={`/wards/${n}`}>
              <g
                className="cursor-pointer"
                onClick={onWardSelected ? () => onWardSelected(num) : undefined}
              >
                <title>Ward {num}</title>
                {Shape}
              </g>
            </Link>
          );
        })}
      </svg>

      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)]/90 px-3 py-2 text-xs backdrop-blur">
        <span className="font-medium">Dover, NH · 7 wards</span>
        <span className="text-[var(--color-muted-foreground)]">
          Mapbox coming soon — data stub
        </span>
      </div>
    </div>
  );
}
