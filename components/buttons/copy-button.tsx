"use client";

import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from "react";

import { cn } from "@/lib/cn";
import { Check, Copy } from "lucide-react";

export type CopyButtonProps = Readonly<
  {
    value?: string;
    label?: string;
    copiedLabel?: string;
    resetMs?: number;
  } & ComponentPropsWithoutRef<"button">
>;

// Icons stack in one fixed slot and fade with the same rhythm as the labels.
const ICON_LAYER =
  "absolute inset-0 grid place-items-center transition-opacity ease-out motion-reduce:transition-none";

// Labels stack in one grid cell; outgoing fades out, incoming fades in after.
const LABEL_LAYER =
  "col-start-1 row-start-1 text-left transition-opacity ease-out motion-reduce:transition-none";

// Soft cast shadow under the glyph — 3D lift, no hard outline rim.
const ICON_SHADOW =
  "filter-[drop-shadow(0_1px_1px_rgba(0,0,0,0.22))_drop-shadow(0_2px_3px_rgba(0,0,0,0.12))]";
const ICON_SHADOW_COPIED =
  "filter-[drop-shadow(0_1px_1px_rgba(4,120,87,0.3))_drop-shadow(0_2px_3px_rgba(4,120,87,0.15))]";

// Copy — writes to clipboard and fades the icon and label to a confirmation.
export const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    {
      className,
      value = "npm i @appui/components",
      label = "Copy",
      copiedLabel = "Copied",
      resetMs = 1600,
      onClick,
      ...props
    },
    ref,
  ) => {
    const [copied, setCopied] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
      return () => {
        if (timerRef.current !== null) {
          globalThis.clearTimeout(timerRef.current);
        }
      };
    }, []);

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      try {
        await navigator.clipboard.writeText(value);
      } catch {
        // Clipboard may be unavailable; still show the confirmation state.
      }
      setCopied(true);
      if (timerRef.current !== null) globalThis.clearTimeout(timerRef.current);
      timerRef.current = globalThis.setTimeout(() => setCopied(false), resetMs);
    };

    return (
      <button
        ref={ref}
        type="button"
        data-slot="copy-button"
        data-copied={copied}
        onClick={handleClick}
        className={cn(
          "inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-neutral-50 px-3.5 font-sans text-sm font-medium outline-none select-none",
          "transition-[background-color,box-shadow,color] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900",
          // Raised keycap: hairline outline, downward shadows, bottom shade.
          "shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_1px_1px_rgba(0,0,0,0.12),0_2px_3px_rgba(0,0,0,0.12),inset_0_-2px_3px_rgba(0,0,0,0.08)]",
          // Pressing sinks the key with the balanced inset recipe.
          "active:bg-neutral-100 active:shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_1px_1px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(0,0,0,0.06),inset_0_2px_3px_rgba(0,0,0,0.03),inset_0_-2px_3px_rgba(0,0,0,0.05)]",
          copied
            ? "text-emerald-700"
            : "text-neutral-700 hover:text-neutral-900",
          className,
        )}
        {...props}
      >
        {/* Bare icon in a fixed slot — no chip background. */}
        <span className="relative size-4 shrink-0">
          <span
            aria-hidden
            className={cn(
              ICON_LAYER,
              copied
                ? "opacity-0 duration-200"
                : "opacity-100 delay-200 duration-300",
            )}
          >
            <Copy size={12} strokeWidth={2} className={ICON_SHADOW} />
          </span>
          <span
            aria-hidden
            className={cn(
              ICON_LAYER,
              copied
                ? "opacity-100 delay-200 duration-300"
                : "opacity-0 duration-200",
            )}
          >
            <Check size={14} strokeWidth={2.5} className={ICON_SHADOW_COPIED} />
          </span>
        </span>

        <span className="grid [text-shadow:0_1px_0_rgba(255,255,255,0.8)]">
          <span
            aria-hidden={copied}
            className={cn(
              LABEL_LAYER,
              copied
                ? "opacity-0 duration-200"
                : "opacity-100 delay-200 duration-300",
            )}
          >
            {label}
          </span>
          <span
            aria-hidden={!copied}
            className={cn(
              LABEL_LAYER,
              copied
                ? "opacity-100 delay-200 duration-300"
                : "opacity-0 duration-200",
            )}
          >
            {copiedLabel}
          </span>
        </span>

        <span className="sr-only" aria-live="polite">
          {copied ? copiedLabel : ""}
        </span>
      </button>
    );
  },
);

CopyButton.displayName = "CopyButton";
