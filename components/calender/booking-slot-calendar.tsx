"use client";

import {
  forwardRef,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type SVGProps,
} from "react";

import { cn } from "@/lib/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Inlined — not in lucide; ships with the component so copy-paste stays self-contained.
export function GoogleCalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
      <path fill="#fff" d="M195.368 60.632H60.632v134.736h134.736z" />
      <path
        fill="#ea4335"
        d="M195.368 256L256 195.368l-30.316-5.172l-30.316 5.172l-5.533 27.73z"
      />
      <path
        fill="#188038"
        d="M0 195.368v40.421C0 246.956 9.044 256 20.21 256h40.422l6.225-30.316l-6.225-30.316l-33.033-5.172z"
      />
      <path
        fill="#1967d2"
        d="M256 60.632V20.21C256 9.044 246.956 0 235.79 0h-40.422q-5.532 22.554-5.533 33.196q0 10.641 5.533 27.436q20.115 5.76 30.316 5.76T256 60.631"
      />
      <path fill="#fbbc04" d="M256 60.632h-60.632v134.736H256z" />
      <path fill="#34a853" d="M195.368 195.368H60.632V256h134.736z" />
      <path
        fill="#4285f4"
        d="M195.368 0H20.211C9.044 0 0 9.044 0 20.21v175.158h60.632V60.632h134.736z"
      />
      <path
        fill="#4285f4"
        d="M88.27 165.154c-5.036-3.402-8.523-8.37-10.426-14.94l11.689-4.816q1.59 6.063 5.558 9.398c2.627 2.223 5.827 3.318 9.566 3.318q5.734 0 9.852-3.487c2.746-2.324 4.127-5.288 4.127-8.875q0-5.508-4.345-8.994c-2.897-2.324-6.535-3.486-10.88-3.486h-6.754v-11.57h6.063q5.608 0 9.448-3.033c2.56-2.02 3.84-4.783 3.84-8.303c0-3.132-1.145-5.625-3.435-7.494c-2.29-1.87-5.188-2.813-8.708-2.813c-3.436 0-6.164.91-8.185 2.745a16.1 16.1 0 0 0-4.413 6.754l-11.57-4.817c1.532-4.345 4.345-8.185 8.471-11.503s9.398-4.985 15.798-4.985c4.733 0 8.994.91 12.767 2.745c3.772 1.836 6.736 4.379 8.875 7.613c2.14 3.25 3.2 6.888 3.2 10.93c0 4.126-.993 7.613-2.98 10.476s-4.43 5.052-7.327 6.585v.69a22.25 22.25 0 0 1 9.398 7.327c2.442 3.284 3.672 7.208 3.672 11.79c0 4.58-1.163 8.673-3.487 12.26c-2.324 3.588-5.54 6.417-9.617 8.472c-4.092 2.055-8.69 3.1-13.793 3.1c-5.912.016-11.369-1.685-16.405-5.087m71.797-58.005l-12.833 9.28l-6.417-9.734l23.023-16.607h8.825v78.333h-12.598z"
      />
    </svg>
  );
}

const SLOTS = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
] as const;

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

function isSameDate(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfDay(date: Date) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function isBeforeDay(date: Date, day: Date) {
  return startOfDay(date).getTime() < startOfDay(day).getTime();
}

export type BookingSlotCalendarProps = Readonly<
  {
    slots?: readonly string[];
    onBook?: (date: Date, slot: string) => void;
  } & ComponentPropsWithoutRef<"div">
>;

// Booking calendar — Google Calendar-style appointment picker: pick a day,
// then tap an available time slot.
export const BookingSlotCalendar = forwardRef<
  HTMLDivElement,
  BookingSlotCalendarProps
>(({ className, slots = SLOTS, onBook, ...props }, ref) => {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [weekStart, setWeekStart] = useState(() => startOfWeek(today));
  const [selectedDay, setSelectedDay] = useState(today);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [slideDirection, setSlideDirection] = useState(0);

  const days = useMemo(
    () => Array.from({ length: 7 }, (_, index) => addDays(weekStart, index)),
    [weekStart],
  );

  // Previous week is fully in the past when its last day is before today.
  const canGoPrev = !isBeforeDay(addDays(weekStart, -1), today);

  const monthLabel = days[3]?.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const dayLabel = selectedDay.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const pickDay = (date: Date) => {
    if (isBeforeDay(date, today)) return;
    setSelectedDay(startOfDay(date));
    setSelectedSlot(null);
  };

  const pickSlot = (slot: string) => {
    if (isBeforeDay(selectedDay, today)) return;
    setSelectedSlot(slot);
    onBook?.(selectedDay, slot);
  };

  const goPrevWeek = () => {
    if (!canGoPrev) return;
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
      data-slot="booking-slot-calendar"
      className={cn(
        "w-80 overflow-hidden rounded-2xl border border-neutral-100/80 bg-white font-sans select-none",
        "shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.05),0_4px_8px_rgba(0,0,0,0.06),0_12px_24px_rgba(0,0,0,0.04)]",
        className,
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-neutral-100 px-5 py-4">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg">
          <GoogleCalendarIcon className="size-7" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-neutral-900">Book a slot</p>
          <p className="truncate text-xs text-neutral-500">
            30 min · Google Meet video call
          </p>
        </div>
      </div>

      <div className="px-5 py-4">
        {/* Month + week navigation */}
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[13px] font-medium text-neutral-900">
            {monthLabel}
          </p>
          <div className="flex items-center">
            <button
              type="button"
              aria-label="Previous week"
              disabled={!canGoPrev}
              onClick={goPrevWeek}
              className={cn(
                "flex size-8 items-center justify-center rounded-full transition-colors duration-150 outline-none",
                "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-neutral-800",
                canGoPrev
                  ? "cursor-pointer text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                  : "cursor-not-allowed text-neutral-300",
              )}
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

        {/* Week strip */}
        <div
          key={weekStart.toISOString()}
          className={cn(
            "mb-4 grid grid-cols-7 opacity-100 transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] starting:opacity-0",
            slideDirection >= 0
              ? "starting:translate-x-2"
              : "starting:-translate-x-2",
          )}
        >
          {days.map((date) => {
            const active = isSameDate(date, selectedDay);
            const isToday = isSameDate(date, today);
            const past = isBeforeDay(date, today);
            return (
              <button
                key={date.toISOString()}
                type="button"
                aria-pressed={active}
                aria-disabled={past || undefined}
                disabled={past}
                onClick={() => pickDay(date)}
                className={cn(
                  "group flex flex-col items-center gap-1 outline-none",
                  past ? "cursor-not-allowed" : "cursor-pointer",
                )}
              >
                <span
                  className={cn(
                    "text-[10px] font-medium tracking-wide uppercase",
                    past ? "text-neutral-300" : "text-neutral-500",
                  )}
                >
                  {date.toLocaleDateString("en-US", { weekday: "narrow" })}
                </span>
                <span
                  className={cn(
                    "flex size-8 items-center justify-center rounded-full text-xs font-medium tabular-nums",
                    "transition-colors duration-150",
                    !past &&
                      "group-focus-visible:outline-2 group-focus-visible:outline-offset-1 group-focus-visible:outline-neutral-800",
                    past && "text-neutral-300",
                    !past &&
                      active &&
                      "bg-neutral-800 font-semibold text-white",
                    !past &&
                      !active &&
                      isToday &&
                      "bg-neutral-100 font-semibold text-neutral-800 group-hover:bg-neutral-200",
                    !past &&
                      !active &&
                      !isToday &&
                      "text-neutral-700 group-hover:bg-neutral-100",
                  )}
                >
                  {date.getDate()}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected day */}
        <p
          key={dayLabel}
          className="mb-2.5 text-xs font-medium text-neutral-500 opacity-100 transition-all duration-300 ease-out starting:opacity-0"
        >
          {dayLabel}
        </p>

        {/* Time slots */}
        <div
          key={`${selectedDay.toISOString()}-slots`}
          className="grid grid-cols-2 gap-2 opacity-100 transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] starting:translate-y-1 starting:opacity-0"
        >
          {slots.map((slot) => {
            const taken = slot === "10:30 AM" || slot === "2:30 PM";
            const active = selectedSlot === slot;

            return (
              <button
                key={slot}
                type="button"
                disabled={taken}
                aria-pressed={active}
                onClick={() => pickSlot(slot)}
                className={cn(
                  "h-9 rounded-lg text-xs font-medium tabular-nums outline-none",
                  "transition-colors duration-150",
                  "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-neutral-800",
                  taken &&
                    "cursor-not-allowed bg-neutral-50 text-neutral-300 line-through",
                  !taken &&
                    active &&
                    "cursor-pointer bg-neutral-800 text-white",
                  !taken &&
                    !active &&
                    "cursor-pointer bg-neutral-50 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900",
                )}
              >
                {slot}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
});

BookingSlotCalendar.displayName = "BookingSlotCalendar";
