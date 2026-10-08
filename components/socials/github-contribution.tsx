"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from "react";

import { cn } from "@/lib/cn";
import { ChevronDown, ChevronUp } from "lucide-react";

// Tailwind-only scroll area — self-contained, no global CSS.
const HIDE_SCROLLBAR =
  "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";

type ScrollAxis = "y" | "x" | "both";
type ThumbMetrics = { size: number; offset: number; active: boolean };

function getScrollViewportClasses(axis: ScrollAxis): Readonly<{
  overflowClass: string;
  clipClass: string;
}> {
  if (axis === "x") {
    return {
      overflowClass: "overflow-x-scroll overflow-y-hidden",
      clipClass: "-mb-4 pb-4",
    };
  }

  if (axis === "both") {
    return {
      overflowClass: "overflow-scroll",
      clipClass: "-mr-4 pr-4 -mb-4 pb-4",
    };
  }

  return {
    overflowClass: "overflow-y-scroll overflow-x-hidden",
    clipClass: "-mr-4 pr-4",
  };
}

function computeVerticalThumb(el: HTMLElement): ThumbMetrics {
  const { scrollHeight, clientHeight, scrollTop } = el;
  if (scrollHeight <= clientHeight + 1)
    return { size: 0, offset: 0, active: false };
  const thumbSize = Math.max(24, (clientHeight / scrollHeight) * clientHeight);
  const maxOffset = clientHeight - thumbSize;
  const offset =
    maxOffset <= 0
      ? 0
      : (scrollTop / (scrollHeight - clientHeight)) * maxOffset;
  return { size: thumbSize, offset, active: true };
}

function computeHorizontalThumb(el: HTMLElement): ThumbMetrics {
  const { scrollWidth, clientWidth, scrollLeft } = el;
  if (scrollWidth <= clientWidth + 1)
    return { size: 0, offset: 0, active: false };
  const thumbSize = Math.max(24, (clientWidth / scrollWidth) * clientWidth);
  const maxOffset = clientWidth - thumbSize;
  const offset =
    maxOffset <= 0 ? 0 : (scrollLeft / (scrollWidth - clientWidth)) * maxOffset;
  return { size: thumbSize, offset, active: true };
}

type LocalScrollHoverAreaProps = Readonly<
  {
    children: React.ReactNode;
    viewportClassName?: string;
    axis?: ScrollAxis;
  } & React.ComponentPropsWithoutRef<"div">
>;

const LocalScrollHoverArea = forwardRef<
  HTMLDivElement,
  LocalScrollHoverAreaProps
>(({ className, viewportClassName, children, axis = "y", ...props }, ref) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [vertical, setVertical] = useState<ThumbMetrics>({
    size: 0,
    offset: 0,
    active: false,
  });
  const [horizontal, setHorizontal] = useState<ThumbMetrics>({
    size: 0,
    offset: 0,
    active: false,
  });

  const update = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    if (axis === "y" || axis === "both") setVertical(computeVerticalThumb(el));
    if (axis === "x" || axis === "both")
      setHorizontal(computeHorizontalThumb(el));
  }, [axis]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    for (const child of el.children) ro.observe(child);
    el.addEventListener("scroll", update, { passive: true });
    globalThis.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", update);
      globalThis.removeEventListener("resize", update);
    };
  }, [update, children]);

  const { overflowClass, clipClass } = getScrollViewportClasses(axis);

  return (
    <div
      ref={ref}
      className={cn("group/scrollarea relative overflow-hidden", className)}
      {...props}
    >
      <div
        ref={viewportRef}
        className={cn(
          "h-full w-full",
          HIDE_SCROLLBAR,
          overflowClass,
          clipClass,
          viewportClassName,
        )}
      >
        {children}
      </div>
      {vertical.active && (axis === "y" || axis === "both") && (
        <div
          className="pointer-events-none absolute top-0 right-1 bottom-0 z-10 w-1 opacity-0 transition-opacity duration-150 group-hover/scrollarea:opacity-100"
          aria-hidden
        >
          <div
            className="absolute right-0 w-1 rounded-full bg-neutral-400"
            style={{ height: vertical.size, top: vertical.offset }}
          />
        </div>
      )}
      {horizontal.active && (axis === "x" || axis === "both") && (
        <div
          className="pointer-events-none absolute right-0 bottom-1 left-0 z-10 h-1 opacity-0 transition-opacity duration-150 group-hover/scrollarea:opacity-100"
          aria-hidden
        >
          <div
            className="absolute bottom-0 h-1 rounded-full bg-neutral-400"
            style={{ width: horizontal.size, left: horizontal.offset }}
          />
        </div>
      )}
    </div>
  );
});
LocalScrollHoverArea.displayName = "LocalScrollHoverArea";

//GitHub-style contribution graph — pass a year + daily counts; grid and colors are derived.
export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type ContributionDay = Readonly<{
  // ISO date — `YYYY-MM-DD`
  date: string;
  count: number;
}>;

export type GithubContributionCardProps = Readonly<
  {
    // Initial / controlled calendar year (defaults to current year).
    year?: number;
    // Years shown in the dropdown (newest first). Auto-derived from data when omitted.
    years?: number[];
    username?: string;
    /**
     * Daily contribution counts — any year; graph filters by the selected year.
     * Pass `Record<"YYYY-MM-DD", number>` or `{ date, count }[]`.
     * Omit to use built-in demo data for the selected year.
     */
    contributions?: Record<string, number> | ContributionDay[];
    onYearChange?: (year: number) => void;
  } & ComponentPropsWithoutRef<"div">
>;

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

const DAY_LABELS: { row: number; label: string }[] = [
  { row: 1, label: "Mon" },
  { row: 3, label: "Wed" },
  { row: 5, label: "Fri" },
];

const LEVEL_BG: Record<ContributionLevel, string> = {
  0: "bg-[#ebedf0]",
  1: "bg-[#9be9a8]",
  2: "bg-[#40c463]",
  3: "bg-[#30a14e]",
  4: "bg-[#216e39]",
};

const WEEKS = 53;
const CELL = "h-[10px] w-[10px] rounded-[2px]";
const GAP = 3;
const COL = 10 + GAP;

type GraphCell = Readonly<{
  level: ContributionLevel;
  count: number;
  date: Date | null;
  inYear: boolean;
}>;

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function toDateKey(year: number, month: number, day: number) {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

function parseYearFromDate(date: string): number | null {
  const year = Number.parseInt(date.slice(0, 4), 10);
  return Number.isFinite(year) ? year : null;
}

function filterByYear(
  contributions: Map<string, number>,
  year: number,
): Map<string, number> {
  const prefix = `${year}-`;
  const filtered = new Map<string, number>();
  for (const [date, count] of contributions) {
    if (date.startsWith(prefix)) filtered.set(date, count);
  }
  return filtered;
}

function deriveAvailableYears(
  contributions: Map<string, number>,
  selectedYear: number,
  years?: number[],
): number[] {
  if (years?.length) {
    return [...new Set(years)].sort((a, b) => b - a);
  }

  const fromData = new Set<number>();
  for (const date of contributions.keys()) {
    const y = parseYearFromDate(date);
    if (y !== null) fromData.add(y);
  }
  fromData.add(selectedYear);

  const sorted = [...fromData].sort((a, b) => b - a);
  if (sorted.length > 1) return sorted;

  const current = new Date().getFullYear();
  return Array.from({ length: 5 }, (_, i) => current - i);
}

function normalizeContributions(
  input?: Record<string, number> | ContributionDay[],
): Map<string, number> {
  const map = new Map<string, number>();
  if (!input) return map;

  if (Array.isArray(input)) {
    for (const { date, count } of input) {
      if (count > 0) map.set(date, count);
    }
    return map;
  }

  for (const [date, count] of Object.entries(input)) {
    if (count > 0) map.set(date, count);
  }
  return map;
}

function getGraphStart(year: number): Date {
  const jan1 = new Date(year, 0, 1);
  const start = new Date(jan1);
  start.setDate(jan1.getDate() - jan1.getDay());
  start.setHours(0, 0, 0, 0);
  return start;
}

function cellToDate(graphStart: Date, week: number, day: number): Date {
  const date = new Date(graphStart);
  date.setDate(graphStart.getDate() + week * 7 + day);
  return date;
}

function countToLevel(count: number, max: number): ContributionLevel {
  if (count <= 0 || max <= 0) return 0;
  const ratio = count / max;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

// Deterministic demo — sparse Q1, Apr–Jun cluster, lighter H2.
function generateDemoContributions(year: number): Map<string, number> {
  const map = new Map<string, number>();

  for (let month = 0; month < 12; month++) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const seed = year * 10_000 + month * 100 + day;

      if (month >= 3 && month <= 5) {
        if (seed % 11 === 0) continue;
        map.set(toDateKey(year, month, day), (seed % 10) + 1);
        continue;
      }

      if (seed % 9 === 0 || seed % 13 === 0) {
        map.set(toDateKey(year, month, day), (seed % 5) + 1);
      }
    }
  }

  return map;
}

function buildGraph(
  year: number,
  contributions: Map<string, number>,
): { grid: GraphCell[][]; total: number } {
  const graphStart = getGraphStart(year);
  const max = Math.max(0, ...contributions.values());
  let total = 0;

  const grid: GraphCell[][] = Array.from({ length: WEEKS }, (_, week) =>
    Array.from({ length: 7 }, (_, day) => {
      const date = cellToDate(graphStart, week, day);
      const inYear = date.getFullYear() === year;

      if (!inYear) {
        return { level: 0, count: 0, date, inYear: false };
      }

      const key = toDateKey(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
      );
      const count = contributions.get(key) ?? 0;
      total += count;

      return {
        level: countToLevel(count, max),
        count,
        date,
        inYear: true,
      };
    }),
  );

  return { grid, total };
}

function computeMonthLabels(year: number): { label: string; week: number }[] {
  const start = getGraphStart(year);
  const labels: { label: string; week: number }[] = [];
  let lastMonth = -1;

  for (let w = 0; w < WEEKS; w++) {
    const date = new Date(start);
    date.setDate(start.getDate() + w * 7);
    const month = date.getMonth();
    if (month !== lastMonth) {
      labels.push({ label: MONTHS[month], week: w });
      lastMonth = month;
    }
  }

  return labels;
}

const LEVEL_FILL: Record<ContributionLevel, string> = {
  0: "#ebedf0",
  1: "#9be9a8",
  2: "#40c463",
  3: "#30a14e",
  4: "#216e39",
};

function contributionCellSrc(
  level: ContributionLevel,
  inYear: boolean,
): string {
  const fill = inYear ? LEVEL_FILL[level] : "transparent";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><rect width="10" height="10" rx="2" fill="${fill}"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function formatTooltip(date: Date, count: number, username: string) {
  const label = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  if (count === 0) return `No contributions on ${label}`;
  return `${count} contribution${count === 1 ? "" : "s"} on ${label} — ${username}`;
}

type YearDropdownProps = Readonly<{
  years: readonly number[];
  value: number;
  onChange: (year: number) => void;
}>;

function YearDropdown({ years, value, onChange }: YearDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [close, open]);

  const handleSelect = (year: number) => {
    onChange(year);
    close();
  };

  return (
    <div
      ref={rootRef}
      data-slot="github-contribution-card-year-selector"
      className="relative z-20 min-w-17 shrink-0"
    >
      <select
        aria-label="Contribution years"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="sr-only"
        tabIndex={-1}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`Contribution year, ${value}`}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "flex w-full items-center justify-between gap-2 border border-neutral-200 bg-white px-2 py-1 text-[11px] font-medium text-neutral-700 transition-colors hover:bg-neutral-50",
          open
            ? "relative z-10 rounded-t-md rounded-b-none border-b-transparent bg-neutral-50"
            : "rounded-md",
        )}
      >
        <span className="tabular-nums">{value}</span>
        <span className="text-neutral-400" aria-hidden>
          {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </span>
      </button>

      {open ? (
        <div className="absolute top-[calc(100%-1px)] right-0 left-0 z-10 overflow-hidden rounded-b-md border border-t-0 border-neutral-200 bg-white shadow-sm transition-opacity duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] starting:opacity-0">
          <ul className="max-h-32 scrollbar-thin overflow-y-auto py-0.5">
            {years.map((year) => {
              const selected = year === value;
              return (
                <li key={year}>
                  <button
                    type="button"
                    onClick={() => handleSelect(year)}
                    className={cn(
                      "flex w-full px-2 py-1 text-left text-[11px] tabular-nums transition-colors",
                      selected
                        ? "bg-neutral-100 font-medium text-neutral-900"
                        : "text-neutral-600 hover:bg-neutral-50",
                    )}
                  >
                    {year}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export const GithubContributionCard = forwardRef<
  HTMLDivElement,
  GithubContributionCardProps
>(
  (
    {
      className,
      year: yearProp,
      years: yearsProp,
      username = "bidyut10",
      contributions: contributionsInput,
      onYearChange,
      ...props
    },
    ref,
  ) => {
    const [internalYear, setInternalYear] = useState(
      () => yearProp ?? new Date().getFullYear(),
    );
    const selectedYear = yearProp ?? internalYear;

    const allContributions = useMemo(
      () => normalizeContributions(contributionsInput),
      [contributionsInput],
    );

    const hasUserData = contributionsInput !== undefined;

    const availableYears = useMemo(
      () => deriveAvailableYears(allContributions, selectedYear, yearsProp),
      [allContributions, selectedYear, yearsProp],
    );

    const yearContributions = useMemo(() => {
      if (!hasUserData) return generateDemoContributions(selectedYear);
      return filterByYear(allContributions, selectedYear);
    }, [allContributions, hasUserData, selectedYear]);

    const { grid, total } = useMemo(
      () => buildGraph(selectedYear, yearContributions),
      [selectedYear, yearContributions],
    );

    const monthLabels = useMemo(
      () => computeMonthLabels(selectedYear),
      [selectedYear],
    );
    const graphWidth = WEEKS * COL - GAP;

    const handleYearSelect = (nextYear: number) => {
      if (yearProp === undefined) setInternalYear(nextYear);
      onYearChange?.(nextYear);
    };

    return (
      <div
        ref={ref}
        data-slot="github-contribution-card"
        className={cn(
          "max-w-sm rounded-3xl border border-neutral-100 bg-white p-4 font-sans shadow-lg shadow-black/5 select-none",
          className,
        )}
        {...props}
      >
        <div
          data-slot="github-contribution-card-header"
          className="relative z-10 mb-3 flex items-center justify-between gap-2"
        >
          <p className="text-sm text-neutral-700">
            <span className="font-semibold text-neutral-900">
              {total.toLocaleString("en-US")}
            </span>{" "}
            contributions in {selectedYear}
          </p>

          <YearDropdown
            years={availableYears}
            value={selectedYear}
            onChange={handleYearSelect}
          />
        </div>

        <LocalScrollHoverArea axis="x" className="w-full">
          <div className="inline-flex min-w-max flex-col" style={{ gap: GAP }}>
            <div
              className="relative h-4"
              style={{ width: graphWidth, marginLeft: 27 }}
            >
              {monthLabels.map(({ label, week }) => (
                <span
                  key={`${label}-${week}`}
                  className="absolute top-0 text-[10px] text-neutral-500"
                  style={{ left: week * COL }}
                >
                  {label}
                </span>
              ))}
            </div>

            <div className="flex" style={{ gap: GAP }}>
              <div
                className="relative shrink-0 text-[10px] text-neutral-500"
                style={{ width: 24, height: 7 * COL - GAP }}
              >
                {DAY_LABELS.map(({ row, label }) => (
                  <span
                    key={label}
                    className="absolute leading-none"
                    style={{ top: row * COL + 1 }}
                  >
                    {label}
                  </span>
                ))}
              </div>

              <div className="flex" style={{ gap: GAP }}>
                {grid.map((week) => {
                  const weekStart = week[0].date!;
                  return (
                    <div
                      key={toDateKey(
                        weekStart.getFullYear(),
                        weekStart.getMonth(),
                        weekStart.getDate(),
                      )}
                      className="flex flex-col"
                      style={{ gap: GAP }}
                      data-slot="github-contribution-card-week"
                    >
                      {week.map((cell) => {
                        const cellDate = cell.date!;
                        const tooltip = formatTooltip(
                          cellDate,
                          cell.count,
                          username,
                        );

                        return (
                          // Data-URI SVG cells — native img+alt for a11y; not a Next.js LCP image.
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            key={toDateKey(
                              cellDate.getFullYear(),
                              cellDate.getMonth(),
                              cellDate.getDate(),
                            )}
                            alt={tooltip || ""}
                            aria-hidden={!tooltip}
                            title={tooltip || undefined}
                            src={contributionCellSrc(cell.level, cell.inYear)}
                            width={10}
                            height={10}
                            className={cn(CELL, "block")}
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </LocalScrollHoverArea>

        <div
          data-slot="github-contribution-card-footer"
          className="mt-3 flex items-center justify-end gap-1 text-[10px] text-neutral-500"
        >
          <span>Less</span>
          {([0, 1, 2, 3, 4] as ContributionLevel[]).map((level) => (
            <div
              key={level}
              className={cn("h-2.5 w-2.5 rounded-xs", LEVEL_BG[level])}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    );
  },
);

GithubContributionCard.displayName = "GithubContributionCard";
