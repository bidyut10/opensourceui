"use client";

import {
  forwardRef,
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
} from "react";

import { cn } from "@/lib/cn";
import { Pause, Play } from "lucide-react";

const BAR_COUNT = 12;
const BAR_IDS = Array.from({ length: BAR_COUNT }, (_, bar) => bar);

export type AudioRecorderWidgetProps = Readonly<
  {
    title?: string;
    date?: string;
  } & ComponentPropsWithoutRef<"div">
>;

// Production-ready Audio Recorder component — styled with Tailwind CSS.
export const AudioRecorderWidget = forwardRef<
  HTMLDivElement,
  AudioRecorderWidgetProps
>(({ className, title = "New Audio", date = "12.8.24", ...props }, ref) => {
  const [recording, setRecording] = useState(true);
  const [bars, setBars] = useState<number[]>(() => BAR_IDS.map(() => 30));

  useEffect(() => {
    if (!recording) return;
    const timer = globalThis.setInterval(() => {
      setBars(BAR_IDS.map(() => 20 + Math.random() * 60));
    }, 120);
    return () => globalThis.clearInterval(timer);
  }, [recording]);

  return (
    <div
      ref={ref}
      data-slot="audio-recorder-widget"
      className={cn(
        "flex h-44 w-44 flex-col justify-between rounded-3xl bg-neutral-900 p-4 font-sans text-white shadow-lg",
        className,
      )}
      {...props}
    >
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-[11px] text-neutral-400">{date}</p>
      </div>

      <div className="flex h-10 items-end justify-center gap-0.5">
        {BAR_IDS.map((bar) => (
          <span
            key={bar}
            className="w-1.5 rounded-full bg-red-500 transition-[height] duration-100"
            style={{ height: `${bars[bar]}%` }}
          />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-neutral-300">01:12:25</span>
        <button
          type="button"
          onClick={() => setRecording(!recording)}
          aria-label={recording ? "Pause recording" : "Resume recording"}
          aria-pressed={recording}
          className={cn(
            "flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-white transition-transform ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-105 active:scale-95",
            recording ? "bg-red-500" : "bg-neutral-700",
          )}
        >
          {recording ? (
            <Pause size={14} fill="white" />
          ) : (
            <Play size={14} fill="white" />
          )}
        </button>
      </div>
    </div>
  );
});

AudioRecorderWidget.displayName = "AudioRecorderWidget";
