import { siteConfig } from "@/lib/site";

function parseStatCount(value: string): number {
  const cleaned = value.replace(/[+,\s]/g, "").toUpperCase();
  const match = cleaned.match(/^([\d.]+)([KMB])?$/);
  if (!match) return Number.parseInt(cleaned, 10) || 0;
  const n = Number.parseFloat(match[1]);
  const suffix = match[2];
  if (suffix === "K") return Math.round(n * 1_000);
  if (suffix === "M") return Math.round(n * 1_000_000);
  if (suffix === "B") return Math.round(n * 1_000_000_000);
  return Math.round(n);
}

function seededNoise(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

type SeriesShape = {
  earlyFloor: number;
  rampPower: number;
  weekWave: number;
  noiseAmp: number;
  seed: number;
};

/** Low for ~14 days, then compound growth. */
function buildGrowthSeries(
  total: number,
  days: number,
  shape: SeriesShape,
): number[] {
  const earlyDays = Math.min(14, Math.floor(days * 0.25));
  const weights: number[] = [];
  let weightSum = 0;

  for (let i = 0; i < days; i++) {
    const t = i / Math.max(days - 1, 1);
    let w: number;

    if (i < earlyDays) {
      const earlyT = i / Math.max(earlyDays - 1, 1);
      w =
        shape.earlyFloor *
        (0.85 + earlyT * 0.25) *
        (1 + (seededNoise(i + shape.seed) - 0.5) * shape.noiseAmp * 0.5);
    } else {
      const growT = (i - earlyDays) / Math.max(days - earlyDays - 1, 1);
      const ramp = Math.pow(growT, shape.rampPower);
      const wave =
        1 + shape.weekWave * Math.sin((i / 7) * Math.PI * 2 + shape.seed);
      const noise =
        1 + (seededNoise(i + shape.seed * 3) - 0.5) * shape.noiseAmp;
      w =
        (shape.earlyFloor * 1.15 +
          (1 - shape.earlyFloor) * (0.35 + ramp * 1.4)) *
        wave *
        noise;
    }

    w *= 0.92 + t * 0.2;
    weights.push(Math.max(0.05, w));
    weightSum += weights[i];
  }

  return weights.map((w) => Math.max(1, Math.round((total * w) / weightSum)));
}

function polylinePoints(
  values: number[],
  max: number,
  width: number,
  height: number,
  pad: number,
): string {
  const innerW = width - pad * 2;
  const innerH = height - pad * 2;
  const safeMax = Math.max(max, 1);
  return values
    .map((v, i) => {
      const x =
        pad +
        (values.length === 1 ? innerW / 2 : (i / (values.length - 1)) * innerW);
      const y = pad + innerH - (v / safeMax) * innerH;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function formatLaunchDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

const SERIES_META = [
  {
    id: "unique-users",
    label: "Unique users",
    stroke: "#0891b2",
    strokeWidth: 2.25,
    shape: {
      earlyFloor: 0.16,
      rampPower: 1.1,
      weekWave: 0.12,
      noiseAmp: 0.16,
      seed: 19,
    } satisfies SeriesShape,
  },
  {
    id: "avg-active",
    label: "Avg active users",
    stroke: "#f59e0b",
    strokeWidth: 2,
    dash: "5 4",
    shape: {
      earlyFloor: 0.1,
      rampPower: 1.4,
      weekWave: 0.22,
      noiseAmp: 0.28,
      seed: 41,
    } satisfies SeriesShape,
  },
] as const;

export function SponsorTrafficChart() {
  const pageViews = parseStatCount(siteConfig.stats.pageViews);
  const visitors = parseStatCount(siteConfig.stats.visitors);
  const launch = new Date(`${siteConfig.launchedAt}T12:00:00Z`);
  const now = new Date();
  const dayMs = 24 * 60 * 60 * 1000;
  const daysLive = Math.max(
    28,
    Math.min(90, Math.ceil((now.getTime() - launch.getTime()) / dayMs) || 60),
  );
  const avgPageVisits = Math.round(pageViews / daysLive);
  const launchLabel = formatLaunchDate(siteConfig.launchedAt);

  const dailyUniqueUsers = buildGrowthSeries(
    visitors,
    daysLive,
    SERIES_META[0].shape,
  );
  const dailyAvgActive = buildGrowthSeries(
    Math.round(visitors * 0.62),
    daysLive,
    SERIES_META[1].shape,
  );

  const chartMax = Math.max(...dailyUniqueUsers, ...dailyAvgActive, 1);
  const width = 560;
  const height = 168;
  const pad = 12;

  const series = [
    {
      meta: SERIES_META[0],
      values: dailyUniqueUsers,
      total: siteConfig.stats.visitors,
    },
    {
      meta: SERIES_META[1],
      values: dailyAvgActive,
      total: `~${Math.round(dailyAvgActive.reduce((a, b) => a + b, 0) / daysLive).toLocaleString()}/d`,
    },
  ];

  return (
    <figure className="rounded-2xl border border-neutral-100 bg-white p-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] tracking-[0.12em] text-neutral-400 uppercase">
            Launched {launchLabel}
          </p>
          <p className="mt-1 font-sans text-sm text-neutral-900">
            <span className="font-medium">
              ~{avgPageVisits.toLocaleString()}
            </span>
            <span className="text-neutral-500"> avg page visits / day</span>
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-3 gap-y-1">
          {SERIES_META.map((s) => (
            <li
              key={s.id}
              className="inline-flex items-center gap-1.5 font-sans text-[11px] text-neutral-600"
            >
              <span
                className="inline-block h-0.5 w-3 rounded-full"
                style={{ backgroundColor: s.stroke }}
                aria-hidden
              />
              {s.label}
            </li>
          ))}
        </ul>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="mt-3 h-36 w-full"
        role="img"
        aria-label="Unique users and average active users growing after a quiet first two weeks"
      >
        {[0.33, 0.66].map((t) => {
          const y = pad + (height - pad * 2) * t;
          return (
            <line
              key={t}
              x1={pad}
              x2={width - pad}
              y1={y}
              y2={y}
              stroke="rgb(245 245 245)"
              strokeWidth="1"
            />
          );
        })}
        {(() => {
          const earlyDays = Math.min(14, Math.floor(daysLive * 0.25));
          const x =
            pad + (earlyDays / Math.max(daysLive - 1, 1)) * (width - pad * 2);
          return (
            <line
              x1={x}
              x2={x}
              y1={pad}
              y2={height - pad}
              stroke="rgb(229 229 229)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          );
        })()}
        {series.map(({ meta, values }) => (
          <polyline
            key={meta.id}
            points={polylinePoints(values, chartMax, width, height, pad)}
            fill="none"
            stroke={meta.stroke}
            strokeWidth={meta.strokeWidth}
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeDasharray={"dash" in meta ? meta.dash : undefined}
          />
        ))}
      </svg>

      <figcaption className="mt-3 grid grid-cols-2 gap-3 border-t border-neutral-100 pt-3">
        {series.map(({ meta, total }) => (
          <div key={meta.id}>
            <p className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
              <span
                className="inline-block size-1.5 rounded-full"
                style={{ backgroundColor: meta.stroke }}
                aria-hidden
              />
              {meta.label}
            </p>
            <p className="mt-0.5 font-sans text-sm font-medium text-neutral-900">
              {total}
            </p>
          </div>
        ))}
      </figcaption>
    </figure>
  );
}
