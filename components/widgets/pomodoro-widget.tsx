"use client";

import {
  forwardRef,
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
} from "react";

import { cn } from "@/lib/cn";
import { Pause, Play } from "lucide-react";

const DIAL = { cx: 88, cy: 88, r: 56 } as const;
const CIRC = 2 * Math.PI * DIAL.r;
const TOMATO = "#E85D4C";

function formatTime(totalSeconds: number) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return {
    mins: String(mins).padStart(2, "0"),
    secs: String(secs).padStart(2, "0"),
  };
}

export type PomodoroWidgetProps = Readonly<
  {
    minutes?: number;
    label?: string;
  } & ComponentPropsWithoutRef<"button">
>;

// Pomodoro — dark timer card with a thin ring, tap to start or pause.
export const PomodoroWidget = forwardRef<
  HTMLButtonElement,
  PomodoroWidgetProps
>(({ className, minutes = 25, label = "Focus", onClick, ...props }, ref) => {
  const totalSeconds = minutes * 60;
  const [remaining, setRemaining] = useState(totalSeconds);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || remaining <= 0) return;
    const timer = globalThis.setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => globalThis.clearInterval(timer);
  }, [running, remaining]);

  const progress = remaining / totalSeconds;
  const dashOffset = CIRC * (1 - progress);
  const { mins, secs } = formatTime(remaining);
  const isDone = remaining <= 0;

  const handleToggle = () => {
    if (isDone) {
      setRemaining(totalSeconds);
      setRunning(true);
      return;
    }
    setRunning((prev) => !prev);
  };

  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={running}
      aria-label={
        running ? "Pause timer" : isDone ? "Restart timer" : "Start timer"
      }
      data-slot="pomodoro-widget"
      onClick={(event) => {
        handleToggle();
        onClick?.(event);
      }}
      className={cn(
        "relative h-44 w-44 max-w-full cursor-pointer overflow-hidden rounded-[1.75rem] bg-[#0C0C0C] font-sans shadow-lg shadow-black/5 transition-transform select-none active:scale-[0.98]",
        className,
      )}
      {...props}
    >
      <svg
        viewBox="0 0 176 176"
        className="absolute inset-0 size-full"
        aria-hidden
      >
        <rect width="176" height="176" fill="#0C0C0C" />
        <circle
          cx={DIAL.cx}
          cy={DIAL.cy}
          r={DIAL.r}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="1.5"
        />
        <circle
          cx={DIAL.cx}
          cy={DIAL.cy}
          r={DIAL.r}
          fill="none"
          stroke={running ? TOMATO : "rgba(255,255,255,0.32)"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${DIAL.cx} ${DIAL.cy})`}
          className="transition-[stroke,stroke-dashoffset] duration-1000 ease-linear"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="flex items-baseline font-mono text-[1.75rem] leading-none font-light tracking-[-0.03em] tabular-nums">
          <span className="text-white">{mins}</span>
          <span className="mx-px text-white/30">:</span>
          <span className={cn(running ? "text-white/90" : "text-white/55")}>
            {secs}
          </span>
        </p>
        <p
          className={cn(
            "mt-2 text-[10px] font-medium tracking-[0.14em] uppercase",
            running ? "text-[#E85D4C]/80" : "text-white/30",
          )}
        >
          {isDone ? "Done" : running ? "Running" : label}
        </p>
      </div>

      <span
        className="absolute right-3.5 bottom-3.5 z-10 flex size-7 items-center justify-center rounded-full bg-white/[0.07] text-white/70"
        aria-hidden
      >
        {running ? (
          <Pause size={11} strokeWidth={2.5} fill="currentColor" />
        ) : (
          <Play
            size={11}
            strokeWidth={2.5}
            className="ml-0.5"
            fill="currentColor"
          />
        )}
      </span>
    </button>
  );
});

PomodoroWidget.displayName = "PomodoroWidget";
