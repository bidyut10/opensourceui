"use client";

import { forwardRef, useMemo, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";
import { Clock } from "lucide-react";

/** Monthly activity calendar — highlight active days and a selected date. */
const WEEKDAY_HEADERS = [
  { id: "sun", label: "S" },
  { id: "mon", label: "M" },
  { id: "tue", label: "T" },
  { id: "wed", label: "W" },
  { id: "thu", label: "T" },
  { id: "fri", label: "F" },
  { id: "sat", label: "S" },
] as const;

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

/** Up to six day numbers before today in the same month — demo streak. */
function defaultActiveDays(today: Date) {
  const day = today.getDate();
  const start = Math.max(1, day - 6);
  return Array.from({ length: day - start }, (_, index) => start + index);
}

// activeDays — emerald dots; highlightDay — orange selected day (defaults to today)
export type DailyActivityCalendarWidgetProps = Readonly<
  {
    activeDays?: number[];
    highlightDay?: number;
  } & ComponentPropsWithoutRef<"div">
>;

export const DailyActivityCalendarWidget = forwardRef<
  HTMLDivElement,
  DailyActivityCalendarWidgetProps
>(
  (
    {
      className,
      activeDays: activeDaysProp,
      highlightDay: highlightDayProp,
      ...props
    },
    ref,
  ) => {
    const today = useMemo(() => {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      return date;
    }, []);

    const year = today.getFullYear();
    const monthIndex = today.getMonth();
    const daysCount = daysInMonth(year, monthIndex);
    const leadingBlanks = new Date(year, monthIndex, 1).getDay();

    const monthLabel = today.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
    const monthBadge = today.toLocaleDateString("en-US", { month: "short" });

    const activeDays = activeDaysProp ?? defaultActiveDays(today);
    const highlightDay = highlightDayProp ?? today.getDate();

    return (
      <div
        ref={ref}
        data-slot="daily-activity-calendar-widget"
        data-year={year}
        className={cn(
          "flex h-44 w-44 flex-col overflow-hidden rounded-3xl bg-neutral-900 p-3 font-sans text-white shadow-lg",
          className,
        )}
        {...props}
      >
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold">Daily Activity</p>
          <Clock size={14} className="text-neutral-400" />
        </div>

        <div className="mb-2 flex items-center justify-between">
          <span className="rounded-full bg-neutral-700 px-2 py-0.5 text-[9px]">
            {monthBadge}
          </span>
          <span className="text-[10px] text-neutral-400">{monthLabel}</span>
        </div>

        <div className="mb-1 grid grid-cols-7 gap-0.5 text-center text-[8px] text-neutral-500">
          {WEEKDAY_HEADERS.map(({ id, label }) => (
            <span key={id}>{label}</span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-0.5 text-center">
          {Array.from({ length: leadingBlanks }, (_, slot) => (
            <span key={`start-${slot}`} />
          ))}
          {Array.from({ length: daysCount }, (_, dayIndex) => dayIndex + 1).map(
            (day) => {
              const isActive = activeDays.includes(day);
              const isHighlight = day === highlightDay;
              const isIdle = !isActive && !isHighlight;

              return (
                <span
                  key={day}
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full text-[9px] transition-all duration-200 ease-out",
                    isActive &&
                      "scale-100 bg-emerald-500 font-semibold text-white",
                    isHighlight &&
                      "scale-100 bg-orange-500 font-semibold text-white",
                    isIdle && "text-neutral-400",
                  )}
                >
                  {day}
                </span>
              );
            },
          )}
        </div>
      </div>
    );
  },
);

DailyActivityCalendarWidget.displayName = "DailyActivityCalendarWidget";
