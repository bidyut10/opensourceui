"use client";

import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from "react";

import { cn } from "@/lib/cn";
import { Play, Pause, Repeat } from "lucide-react";

// Stopwatch widget — start, pause, lap, and reset with centisecond precision.
// Splits elapsed milliseconds into MM:SS and centiseconds for the display
function formatStopwatch(ms: number) {
  const mins = Math.floor(ms / 60_000);
  const secs = Math.floor((ms % 60_000) / 1000);
  const centis = Math.floor((ms % 1000) / 10);
  return {
    main: `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`,
    centis: String(centis).padStart(2, "0"),
  };
}

type StopSquareProps = Readonly<{
  size?: number;
}>;

// Small square icon used on the stop button
function StopSquare({ size = 8 }: StopSquareProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" fill="none" aria-hidden>
      <rect width="8" height="8" rx="1.5" fill="currentColor" />
    </svg>
  );
}

export type StopwatchWidgetProps = Readonly<ComponentPropsWithoutRef<"div">>;

export const StopwatchWidget = forwardRef<HTMLDivElement, StopwatchWidgetProps>(
  ({ className, ...props }, ref) => {
    const [elapsed, setElapsed] = useState(0);
    const [running, setRunning] = useState(false);
    // startRef = timestamp when the current run began; baseRef = ms already counted before pause
    const startRef = useRef<number | null>(null);
    const baseRef = useRef(0);

    // requestAnimationFrame loop keeps the centisecond readout smooth while running
    useEffect(() => {
      if (!running) return;

      startRef.current = performance.now();

      const tick = () => {
        setElapsed(
          baseRef.current + (performance.now() - (startRef.current ?? 0)),
        );
        frame = globalThis.requestAnimationFrame(tick);
      };

      let frame = globalThis.requestAnimationFrame(tick);
      return () => globalThis.cancelAnimationFrame(frame);
    }, [running]);

    const handlePlay = () => {
      baseRef.current = elapsed;
      setRunning(true);
    };

    const handlePause = () => {
      if (running && startRef.current !== null) {
        baseRef.current += performance.now() - startRef.current;
        setElapsed(baseRef.current);
      }
      setRunning(false);
    };

    // Reset clears elapsed time and stops the timer
    const clearTimer = () => {
      baseRef.current = 0;
      startRef.current = null;
      setElapsed(0);
      setRunning(false);
    };

    const { main, centis } = formatStopwatch(elapsed);
    const canReset = elapsed > 0 && !running;
    const canStop = running;

    // Green status dot (top-right), MM:SS.centis readout, reset · play/pause · stop controls
    return (
      <div
        ref={ref}
        data-slot="minimal-stopwatch-widget"
        className={cn(
          "relative flex h-44 w-44 max-w-full flex-col items-center justify-between overflow-hidden rounded-3xl border border-neutral-100 bg-white px-4 py-5 font-sans shadow-lg shadow-black/5 select-none",
          className,
        )}
        {...props}
      >
        <span
          aria-hidden
          className={cn(
            "absolute top-4 right-4 h-2 w-2 rounded-full transition-colors duration-300",
            running
              ? "bg-[#34C759]/55 ring-1 ring-[#34C759]/20"
              : "bg-[#34C759]/18 ring-1 ring-[#34C759]/10",
          )}
        />

        <div className="flex flex-1 flex-col items-center justify-center">
          <p className="flex items-baseline leading-none tabular-nums">
            <span className="text-[32px] font-extralight tracking-[-0.04em] text-neutral-900">
              {main}
            </span>
            <span className="ml-px text-[15px] font-light text-neutral-400">
              .{centis}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-neutral-50 px-2 py-1.5 ring-1 ring-neutral-100">
          <button
            type="button"
            aria-label="Reset stopwatch"
            onClick={clearTimer}
            disabled={!canReset}
            className={cn(
              "flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white text-neutral-500 ring-1 ring-neutral-200/80 transition-[scale,opacity] ease-[cubic-bezier(0.23,1,0.32,1)] enabled:active:scale-95 disabled:cursor-default disabled:opacity-30",
            )}
          >
            <Repeat size={11} color="currentColor" />
          </button>

          {running ? (
            <button
              type="button"
              aria-label="Pause stopwatch"
              onClick={handlePause}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#FF9500] text-white shadow-[0_2px_8px_rgba(255,149,0,0.28)] transition-transform ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-95"
            >
              <Pause size={14} color="#FFFFFF" fill="#FFFFFF" />
            </button>
          ) : (
            <button
              type="button"
              aria-label="Start stopwatch"
              onClick={handlePlay}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#34C759] text-white shadow-[0_2px_8px_rgba(52,199,89,0.28)] transition-transform ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-95"
            >
              <Play size={14} color="#FFFFFF" fill="#FFFFFF" />
            </button>
          )}

          <button
            type="button"
            aria-label="Stop stopwatch"
            onClick={clearTimer}
            disabled={!canStop}
            className={cn(
              "flex h-7 w-7 cursor-pointer items-center justify-center rounded-full transition-[scale,opacity,color,background-color,box-shadow] ease-[cubic-bezier(0.23,1,0.32,1)] enabled:active:scale-95 disabled:cursor-default disabled:opacity-30",
              canStop
                ? "bg-[#FF3B30] text-white shadow-[0_2px_8px_rgba(255,59,48,0.25)]"
                : "bg-white text-neutral-300 ring-1 ring-neutral-200/80",
            )}
          >
            <StopSquare size={8} />
          </button>
        </div>
      </div>
    );
  },
);

StopwatchWidget.displayName = "StopwatchWidget";
