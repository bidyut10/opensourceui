"use client";

import {
  forwardRef,
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
} from "react";

import { cn } from "@/lib/cn";
import { Heart } from "lucide-react";

const MASCOT = "#FB7185";
const ACCENT = "#FDA4AF";
const DIAL = { cx: 88, cy: 84, r: 56 } as const;

export type HeartRateWidgetProps = Readonly<
  {
    bpm?: number;
    label?: string;
  } & ComponentPropsWithoutRef<"div">
>;

// Heart rate — DND-style face card with a soft pulse on the dial.
export const HeartRateWidget = forwardRef<HTMLDivElement, HeartRateWidgetProps>(
  ({ className, bpm: defaultBpm = 72, label = "BPM", ...props }, ref) => {
    const [bpm, setBpm] = useState(defaultBpm);
    const [pulse, setPulse] = useState(false);

    useEffect(() => {
      const beat = globalThis.setInterval(() => {
        setPulse((prev) => !prev);
        setBpm(defaultBpm + Math.floor(Math.random() * 3) - 1);
      }, 900);
      return () => globalThis.clearInterval(beat);
    }, [defaultBpm]);

    return (
      <div
        ref={ref}
        data-slot="heart-rate-widget"
        className={cn(
          "relative h-44 w-44 overflow-hidden rounded-[1.75rem] bg-black font-sans shadow-lg shadow-black/5 select-none",
          className,
        )}
        {...props}
      >
        <svg
          viewBox="0 0 176 176"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <rect width="176" height="176" fill="#1A0509" />
          <circle cx="88" cy="142" r="58" fill={MASCOT} />
          <circle cx="68" cy="122" r="5" fill="white" />
          <circle cx="108" cy="122" r="5" fill="white" />
          <path
            d="M76 138 Q88 144 100 138"
            stroke="white"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />
          <circle
            cx={DIAL.cx}
            cy={DIAL.cy}
            r={DIAL.r}
            fill="none"
            stroke={ACCENT}
            strokeWidth="1.5"
            opacity={pulse ? 0.5 : 0.22}
            className="transition-opacity duration-300 ease-out"
          />
        </svg>

        <span className="absolute top-3.5 right-3.5 z-10" aria-hidden>
          <Heart size={14} color={ACCENT} fill={ACCENT} />
        </span>

        <div className="absolute inset-x-0 top-[32%] z-10 px-3 text-center">
          <p className="text-base leading-none font-semibold text-white tabular-nums">
            {bpm}
          </p>
          <p className="mt-1 text-[10px] font-medium tracking-wide text-white/40 uppercase">
            {label}
          </p>
        </div>
      </div>
    );
  },
);

HeartRateWidget.displayName = "HeartRateWidget";
