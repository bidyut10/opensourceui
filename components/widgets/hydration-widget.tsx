"use client";

import {
  forwardRef,
  useId,
  useState,
  type ComponentPropsWithoutRef,
} from "react";

import { cn } from "@/lib/cn";

export type HydrationWidgetProps = Readonly<
  {
    glasses?: number;
    goal?: number;
    label?: string;
  } & ComponentPropsWithoutRef<"button">
>;

// Hydration — tall bottle card, tap to fill one more glass.
export const HydrationWidget = forwardRef<
  HTMLButtonElement,
  HydrationWidgetProps
>(
  (
    {
      className,
      glasses: defaultGlasses = 5,
      goal = 8,
      label = "glasses",
      onClick,
      ...props
    },
    ref,
  ) => {
    const [glasses, setGlasses] = useState(defaultGlasses);
    const fill = Math.min(1, glasses / goal);
    const clipId = useId();

    return (
      <button
        ref={ref}
        type="button"
        aria-label="Log a glass of water"
        data-slot="hydration-widget"
        onClick={(event) => {
          setGlasses((prev) => (prev >= goal ? 0 : prev + 1));
          onClick?.(event);
        }}
        className={cn(
          "flex h-60 w-36 cursor-pointer flex-col items-center rounded-[2rem] border border-neutral-200/80 bg-white px-5 pt-5 pb-6 font-sans shadow-lg shadow-black/5 select-none",
          className,
        )}
        {...props}
      >
        <div className="w-full text-left">
          <span className="text-3xl leading-none font-light text-neutral-900 tabular-nums">
            {glasses}
          </span>
          <span className="ml-0.5 text-sm text-neutral-400">/{goal}</span>
          <p className="mt-1 text-xs text-neutral-500">{label}</p>
        </div>

        <div className="relative mt-5 flex flex-1 items-end justify-center">
          <svg viewBox="0 0 64 120" className="h-full w-14" aria-hidden>
            <defs>
              <clipPath id={clipId}>
                <rect x="12" y="18" width="40" height="94" rx="18" />
              </clipPath>
            </defs>

            <rect
              x="26"
              y="6"
              width="12"
              height="10"
              rx="3"
              fill="none"
              stroke="#D4D4D4"
              strokeWidth="1.5"
            />
            <rect
              x="12"
              y="18"
              width="40"
              height="94"
              rx="18"
              fill="none"
              stroke="#D4D4D4"
              strokeWidth="1.5"
            />

            <rect
              x="12"
              y={18 + 94 * (1 - fill)}
              width="40"
              height={94 * fill}
              fill="#7DD3FC"
              clipPath={`url(#${clipId})`}
              className="transition-all duration-300 ease-out"
            />
          </svg>
        </div>
      </button>
    );
  },
);

HydrationWidget.displayName = "HydrationWidget";
