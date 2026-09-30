"use client";

import {
  forwardRef,
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
} from "react";

import { cn } from "@/lib/cn";

const IOS_RED = "#FF3B30";
const IOS_LABEL = "#8E8E93";

export type IosCalenderWidgetProps = Readonly<ComponentPropsWithoutRef<"div">>;

// iOS-style calendar tile: weekday on top, day + month at the bottom.
export const IosCalenderWidget = forwardRef<
  HTMLDivElement,
  IosCalenderWidgetProps
>(({ className, ...props }, ref) => {
  // Start as null so the first paint matches SSR; date only changes once per minute.
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const timer = globalThis.setInterval(update, 60_000);
    return () => globalThis.clearInterval(timer);
  }, []);

  const weekday = now
    ? now.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()
    : "";
  const day = now ? now.getDate() : 0;
  const month = now ? now.toLocaleDateString("en-US", { month: "long" }) : "";

  return (
    <div
      ref={ref}
      data-slot="ios-calender-widget"
      className={cn(
        "flex h-44 w-44 flex-col overflow-hidden rounded-[22px] border border-neutral-100 bg-white px-4 pt-4 pb-3.5 font-sans shadow-lg shadow-black/5 select-none",
        className,
      )}
      {...props}
    >
      {now ? (
        <div className="flex h-full flex-col opacity-100 transition-opacity duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] starting:opacity-0">
          <p
            className="text-[13px] leading-none font-semibold tracking-[-0.02em] transition-colors duration-300"
            style={{ color: IOS_RED }}
          >
            {weekday}
          </p>

          <div className="mt-auto flex items-baseline gap-1.5">
            <p
              key={day}
              className="text-7xl leading-none font-medium tracking-tighter text-black tabular-nums opacity-100 transition-[opacity,translate] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-opacity starting:translate-y-1 starting:opacity-0"
            >
              {day}
            </p>
            <p
              className="pb-1 text-[17px] leading-none font-normal tracking-[-0.01em]"
              style={{ color: IOS_LABEL }}
            >
              {month}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col pt-0.5">
          <div className="h-3 w-9 rounded bg-neutral-100" aria-hidden />
          <div className="mt-auto flex items-baseline gap-1.5">
            <div className="h-12 w-10 rounded bg-neutral-100" aria-hidden />
            <div className="h-4 w-14 rounded bg-neutral-100" aria-hidden />
          </div>
        </div>
      )}
    </div>
  );
});

IosCalenderWidget.displayName = "IosCalenderWidget";
