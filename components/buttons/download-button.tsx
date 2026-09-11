"use client";

import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from "react";

import { cn } from "@/lib/cn";
import { ArrowDownToLine, Check, Loader2 } from "lucide-react";

type Phase = "idle" | "downloading" | "done";

export type DownloadButtonProps = Readonly<
  {
    label?: string;
    downloadingLabel?: string;
    doneLabel?: string;
    downloadMs?: number;
    resetMs?: number;
    onDownload?: () => void;
  } & Omit<ComponentPropsWithoutRef<"button">, "onDownload">
>;

// Icons stack in one fixed slot and crossfade, so nothing shifts.
const ICON_LAYER =
  "absolute inset-0 grid place-items-center transition-opacity duration-300 ease-out motion-reduce:transition-none";

// Labels stack in one grid cell; outgoing fades out, incoming fades in after.
const LABEL_LAYER =
  "col-start-1 row-start-1 text-left transition-opacity ease-out motion-reduce:transition-none";

// Download — raised key sinks while downloading, then settles into a green
// done state; icon morphs arrow → spinner → check in place.
export const DownloadButton = forwardRef<
  HTMLButtonElement,
  DownloadButtonProps
>(
  (
    {
      className,
      label = "Download File",
      downloadingLabel = "Downloading...",
      doneLabel = "Downloaded",
      downloadMs = 1400,
      resetMs = 1800,
      onDownload,
      onClick,
      ...props
    },
    ref,
  ) => {
    const [phase, setPhase] = useState<Phase>("idle");
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
      return () => {
        if (timerRef.current !== null)
          globalThis.clearTimeout(timerRef.current);
      };
    }, []);

    const schedule = (fn: () => void, ms: number) => {
      if (timerRef.current !== null) globalThis.clearTimeout(timerRef.current);
      timerRef.current = globalThis.setTimeout(fn, ms);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (phase !== "idle") return;

      setPhase("downloading");
      onDownload?.();

      schedule(() => {
        setPhase("done");
        schedule(() => setPhase("idle"), resetMs);
      }, downloadMs);
    };

    const idle = phase === "idle";
    const downloading = phase === "downloading";
    const done = phase === "done";

    return (
      <button
        ref={ref}
        type="button"
        data-slot="download-button"
        data-phase={phase}
        aria-busy={downloading || undefined}
        onClick={handleClick}
        className={cn(
          "inline-flex h-10 items-center gap-2 rounded-lg px-4 font-sans text-sm font-medium outline-none select-none",
          "transition-[background-color,box-shadow,color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900",
          // Soft 3D key; sinks in while pressed or downloading.
          "shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_1px_1px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.08)]",
          downloading &&
            "shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_1px_1px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(0,0,0,0.08),inset_0_2px_4px_rgba(0,0,0,0.04),inset_0_-1px_2px_rgba(0,0,0,0.05)]",
          idle &&
            "cursor-pointer bg-neutral-50 text-neutral-700 hover:text-neutral-900 active:bg-neutral-100 active:shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_1px_1px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(0,0,0,0.08),inset_0_2px_4px_rgba(0,0,0,0.04),inset_0_-1px_2px_rgba(0,0,0,0.05)]",
          downloading && "cursor-default bg-neutral-100 text-neutral-500",
          // Done: emerald 3D key — soft sheen + deep lift (no hard white rim).
          done &&
            "cursor-default bg-emerald-600 text-white shadow-[0_1px_1px_rgba(0,0,0,0.25),0_3px_6px_rgba(0,0,0,0.2),0_6px_12px_rgba(0,0,0,0.15),inset_0_1px_2px_rgba(255,255,255,0.22),inset_0_-3px_6px_rgba(0,0,0,0.35)]",
          className,
        )}
        {...props}
      >
        <span className="sr-only" aria-live="polite">
          {downloading ? downloadingLabel : done ? doneLabel : ""}
        </span>

        {/* Fixed icon slot keeps the icon and label aligned in every phase. */}
        <span className="relative size-4 shrink-0">
          <span
            aria-hidden
            className={cn(ICON_LAYER, idle ? "opacity-100" : "opacity-0")}
          >
            <ArrowDownToLine size={15} strokeWidth={2} />
          </span>
          <span
            aria-hidden
            className={cn(
              ICON_LAYER,
              downloading ? "opacity-100" : "opacity-0",
            )}
          >
            <Loader2
              size={15}
              strokeWidth={2}
              className="animate-spin motion-reduce:animate-none"
            />
          </span>
          <span
            aria-hidden
            className={cn(ICON_LAYER, done ? "opacity-100" : "opacity-0")}
          >
            <Check size={15} strokeWidth={2.5} />
          </span>
        </span>

        <span className="grid">
          <span
            aria-hidden={!idle}
            className={cn(
              LABEL_LAYER,
              idle
                ? "opacity-100 delay-200 duration-300"
                : "opacity-0 duration-200",
            )}
          >
            {label}
          </span>
          <span
            aria-hidden={!downloading}
            className={cn(
              LABEL_LAYER,
              downloading
                ? "opacity-100 delay-200 duration-300"
                : "opacity-0 duration-200",
            )}
          >
            {downloadingLabel}
          </span>
          <span
            aria-hidden={!done}
            className={cn(
              LABEL_LAYER,
              done
                ? "opacity-100 delay-200 duration-300"
                : "opacity-0 duration-200",
            )}
          >
            {doneLabel}
          </span>
        </span>
      </button>
    );
  },
);

DownloadButton.displayName = "DownloadButton";
