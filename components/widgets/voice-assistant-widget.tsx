"use client";

import {
  forwardRef,
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
} from "react";

import { cn } from "@/lib/cn";
import { Mic } from "lucide-react";

const WAVEFORM_BAR_COUNT = 16;

// Fixed bar ids (0–15) so list keys stay stable while heights animate.
const WAVEFORM_BAR_IDS = Array.from(
  { length: WAVEFORM_BAR_COUNT },
  (_, bar) => bar,
);

const IDLE_BAR_HEIGHT = 12;
const RESTING_BAR_HEIGHT = 20;

export type VoiceAssistantWidgetProps = Readonly<
  {
    // Shown below the mic button while listening is active.
    label?: string;
  } & ComponentPropsWithoutRef<"div">
>;

export const VoiceAssistantWidget = forwardRef<
  HTMLDivElement,
  VoiceAssistantWidgetProps
>(({ className, label = "Listening…", ...props }, ref) => {
  const [active, setActive] = useState(false);
  const [levels, setLevels] = useState<number[]>(() =>
    WAVEFORM_BAR_IDS.map(() => RESTING_BAR_HEIGHT),
  );

  // Simulate live mic levels while active; settle to short bars when idle.
  useEffect(() => {
    if (!active) {
      setLevels(WAVEFORM_BAR_IDS.map(() => IDLE_BAR_HEIGHT));
      return;
    }

    const timer = globalThis.setInterval(() => {
      setLevels(WAVEFORM_BAR_IDS.map(() => 15 + Math.random() * 55));
    }, 100);

    return () => globalThis.clearInterval(timer);
  }, [active]);

  return (
    <div
      ref={ref}
      data-slot="voice-assistant-widget"
      className={cn(
        "flex h-44 w-44 flex-col items-center justify-between overflow-hidden rounded-3xl border border-neutral-100 bg-white p-4 font-sans shadow-lg shadow-black/5 select-none",
        className,
      )}
      {...props}
    >
      <p className="text-[10px] font-semibold tracking-widest text-neutral-400 uppercase">
        Voice AI
      </p>

      {/* Equalizer bars — height animates to mimic incoming audio. */}
      <div className="flex h-10 items-end justify-center gap-0.5">
        {WAVEFORM_BAR_IDS.map((bar) => (
          <span
            key={bar}
            className={cn(
              "w-1 rounded-full transition-[height,background-color] duration-100",
              active ? "bg-neutral-900" : "bg-neutral-200",
            )}
            style={{ height: `${levels[bar]}%` }}
          />
        ))}
      </div>

      {/* Tap toggles listening; red = active, dark = idle. */}
      <button
        type="button"
        onClick={() => setActive(!active)}
        aria-label={active ? "Stop listening" : "Start listening"}
        aria-pressed={active}
        className={cn(
          "flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-[scale,background-color] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-95",
          active ? "bg-red-500 text-white" : "bg-neutral-900 text-white",
        )}
      >
        <Mic size={18} />
      </button>

      <p className="text-[11px] font-normal text-neutral-600">
        {active ? label : "Tap to speak"}
      </p>
    </div>
  );
});

VoiceAssistantWidget.displayName = "VoiceAssistantWidget";
