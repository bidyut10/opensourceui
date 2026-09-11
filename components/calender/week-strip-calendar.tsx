"use client";

import {
  forwardRef,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
} from "react";

import { cn } from "@/lib/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";

function startOfWeek(date: Date) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() - copy.getDay());
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function addDays(date: Date, days: number) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function startOfDay(date: Date) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function isSameDate(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export type WeekStripCalendarProps = Readonly<
  {
    onSelect?: (date: Date) => void;
  } & ComponentPropsWithoutRef<"div">
>;

// Week strip — swipe weeks with arrows, tap a day to select it.
export const WeekStripCalendar = forwardRef<
  HTMLDivElement,
  WeekStripCalendarProps
>(({ className, onSelect, ...props }, ref) => {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [weekStart, setWeekStart] = useState(() => startOfWeek(today));
  const [selected, setSelected] = useState(today);
  const [slideDirection, setSlideDirection] = useState(0);

  const days = useMemo(
    () => Array.from({ length: 7 }, (_, index) => addDays(weekStart, index)),
    [weekStart],
  );

  const monthLabel = days[3]?.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const rangeLabel = `${days[0]?.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${days[6]?.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;

  const selectDay = (date: Date) => {
    setSelected(startOfDay(date));
    onSelect?.(startOfDay(date));
  };

  const goPrevWeek = () => {
    setSlideDirection(-1);
    setWeekStart((prev) => addDays(prev, -7));
  };

  const goNextWeek = () => {
    setSlideDirection(1);
    setWeekStart((prev) => addDays(prev, 7));
  };

  return (
    <div
      ref={ref}
      data-slot="week-strip-calendar"
      className={cn(
        "w-80 overflow-hidden rounded-2xl border border-neutral-100 bg-white px-5 py-4 font-sans select-none",
        "shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.05),0_4px_8px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.04)]",
        className,
      )}
      {...props}
    >
      <div className="mb-1 flex items-center justify-between">
        <p className="text-sm font-semibold text-neutral-900">{monthLabel}</p>
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            aria-label="Previous week"
            onClick={goPrevWeek}
            className="flex size-8 cursor-pointer items-center justify-center rounded-full text-neutral-500 transition-colors duration-150 outline-none hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-neutral-800"
          >
            <ChevronLeft size={16} strokeWidth={2} aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Next week"
            onClick={goNextWeek}
            className="flex size-8 cursor-pointer items-center justify-center rounded-full text-neutral-500 transition-colors duration-150 outline-none hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-neutral-800"
          >
            <ChevronRight size={16} strokeWidth={2} aria-hidden />
          </button>
        </div>
      </div>

      <p
        key={rangeLabel}
        className="mb-4 text-xs font-medium text-neutral-500 opacity-100 transition-opacity duration-300 ease-out starting:opacity-0"
      >
        {rangeLabel}
      </p>

      <div
        key={weekStart.toISOString()}
        className={cn(
          "grid grid-cols-7 opacity-100 transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] starting:opacity-0",
          slideDirection >= 0
            ? "starting:translate-x-2"
            : "starting:-translate-x-2",
        )}
      >
        {days.map((date) => {
          const isSelected = isSameDate(date, selected);
          const isToday = isSameDate(date, today);

          return (
            <button
              key={date.toISOString()}
              type="button"
              aria-pressed={isSelected}
              onClick={() => selectDay(date)}
              className="group flex cursor-pointer flex-col items-center gap-1.5 outline-none"
            >
              <span
                className={cn(
                  "text-[10px] font-medium tracking-wide uppercase",
                  isSelected ? "text-neutral-800" : "text-neutral-400",
                )}
              >
                {date.toLocaleDateString("en-US", { weekday: "narrow" })}
              </span>
              <span
                className={cn(
                  "relative flex size-9 items-center justify-center rounded-full text-sm font-medium tabular-nums",
                  "transition-colors duration-150",
                  "group-focus-visible:outline-2 group-focus-visible:outline-offset-1 group-focus-visible:outline-neutral-800",
                  isSelected && "bg-neutral-800 font-semibold text-white",
                  !isSelected &&
                    isToday &&
                    "bg-neutral-100 font-semibold text-neutral-800 group-hover:bg-neutral-200",
                  !isSelected &&
                    !isToday &&
                    "text-neutral-700 group-hover:bg-neutral-100",
                )}
              >
                {date.getDate()}
                {isToday && !isSelected && (
                  <span
                    aria-hidden
                    className="absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-neutral-800"
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
});

WeekStripCalendar.displayName = "WeekStripCalendar";
