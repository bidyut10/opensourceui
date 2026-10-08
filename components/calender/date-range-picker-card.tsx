"use client";

import {
  forwardRef,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
} from "react";

import { cn } from "@/lib/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"] as const;

type DayCell = Readonly<{ day: number; month: number; year: number }>;

function buildMonthCells(year: number, month: number): Array<DayCell | null> {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<DayCell | null> = [];

  for (let index = 0; index < firstDay; index += 1) {
    cells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ day, month, year });
  }
  return cells;
}

function toKey(cell: DayCell) {
  return `${cell.year}-${cell.month}-${cell.day}`;
}

function formatCell(cell: DayCell) {
  return new Date(cell.year, cell.month, cell.day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export type DateRangePickerCardProps = Readonly<
  {
    defaultYear?: number;
    defaultMonth?: number;
    onChange?: (start: Date | null, end: Date | null) => void;
  } & ComponentPropsWithoutRef<"div">
>;

// Date range picker — first tap sets start, second tap sets end, range fills between.
export const DateRangePickerCard = forwardRef<
  HTMLDivElement,
  DateRangePickerCardProps
>(({ className, defaultYear, defaultMonth, onChange, ...props }, ref) => {
  const today = useMemo(() => new Date(), []);
  const [viewYear, setViewYear] = useState(defaultYear ?? today.getFullYear());
  const [viewMonth, setViewMonth] = useState(defaultMonth ?? today.getMonth());
  const [start, setStart] = useState<DayCell | null>(null);
  const [end, setEnd] = useState<DayCell | null>(null);
  const [slideDirection, setSlideDirection] = useState(0);

  const cells = useMemo(
    () => buildMonthCells(viewYear, viewMonth),
    [viewYear, viewMonth],
  );

  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleDateString(
    "en-US",
    { month: "long", year: "numeric" },
  );

  const shiftMonth = (delta: number) => {
    setSlideDirection(delta);
    const next = new Date(viewYear, viewMonth + delta, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
  };

  const selectCell = (cell: DayCell) => {
    if (!start || (start && end)) {
      setStart(cell);
      setEnd(null);
      onChange?.(new Date(cell.year, cell.month, cell.day), null);
      return;
    }

    const startTime = new Date(start.year, start.month, start.day).getTime();
    const cellTime = new Date(cell.year, cell.month, cell.day).getTime();

    if (cellTime < startTime) {
      setEnd(start);
      setStart(cell);
      onChange?.(
        new Date(cell.year, cell.month, cell.day),
        new Date(start.year, start.month, start.day),
      );
    } else {
      setEnd(cell);
      onChange?.(
        new Date(start.year, start.month, start.day),
        new Date(cell.year, cell.month, cell.day),
      );
    }
  };

  const inRange = (cell: DayCell) => {
    if (!start || !end) return false;
    const time = new Date(cell.year, cell.month, cell.day).getTime();
    const a = new Date(start.year, start.month, start.day).getTime();
    const b = new Date(end.year, end.month, end.day).getTime();
    const min = Math.min(a, b);
    const max = Math.max(a, b);
    return time >= min && time <= max;
  };

  const rangeLabel =
    start && end
      ? `${formatCell(start)} – ${formatCell(end)}`
      : start
        ? `${formatCell(start)} – pick end`
        : "Select a date range";

  return (
    <div
      ref={ref}
      data-slot="date-range-picker-card"
      className={cn(
        "w-80 overflow-hidden rounded-2xl border border-neutral-100 bg-white p-4 font-sans shadow-lg shadow-black/5 select-none",
        className,
      )}
      {...props}
    >
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          aria-label="Previous month"
          onClick={() => shiftMonth(-1)}
          className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-neutral-500 transition-[background-color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-neutral-100 active:scale-95"
        >
          <ChevronLeft size={16} strokeWidth={2} />
        </button>
        <p
          key={monthLabel}
          className="text-sm font-semibold text-neutral-900 opacity-100 transition-opacity duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] starting:opacity-0"
        >
          {monthLabel}
        </p>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => shiftMonth(1)}
          className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-neutral-500 transition-[background-color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-neutral-100 active:scale-95"
        >
          <ChevronRight size={16} strokeWidth={2} />
        </button>
      </div>

      <p
        key={rangeLabel}
        className="mb-3 text-xs text-neutral-500 opacity-100 transition-opacity duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] starting:opacity-0"
      >
        {rangeLabel}
      </p>

      <div className="mb-2 grid grid-cols-7 text-center text-[10px] font-medium text-neutral-400">
        {WEEKDAYS.map((label, index) => (
          <span key={`${label}-${index}`}>{label}</span>
        ))}
      </div>

      <div
        key={`${viewYear}-${viewMonth}`}
        className={cn(
          "grid grid-cols-7 gap-y-1 opacity-100 transition-[opacity,translate] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-opacity starting:opacity-0",
          slideDirection >= 0
            ? "starting:translate-x-2"
            : "starting:-translate-x-2",
        )}
      >
        {cells.map((cell, index) => {
          if (!cell) {
            return <span key={`empty-${index}`} className="h-9" />;
          }

          const key = toKey(cell);
          const isStart = start && toKey(start) === key;
          const isEnd = end && toKey(end) === key;
          const isBetween = inRange(cell) && !isStart && !isEnd;

          return (
            <button
              key={key}
              type="button"
              onClick={() => selectCell(cell)}
              className={cn(
                "mx-auto flex h-9 w-9 cursor-pointer items-center justify-center text-sm tabular-nums transition-[color,background-color,font-weight,scale] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-95 motion-reduce:transition-colors",
                isBetween &&
                  "w-full rounded-none bg-neutral-100 text-neutral-800",
                (isStart || isEnd) &&
                  "scale-100 rounded-full bg-neutral-900 font-semibold text-white",
                !isBetween &&
                  !isStart &&
                  !isEnd &&
                  "rounded-full text-neutral-700 hover:bg-neutral-100",
              )}
            >
              {cell.day}
            </button>
          );
        })}
      </div>
    </div>
  );
});

DateRangePickerCard.displayName = "DateRangePickerCard";
