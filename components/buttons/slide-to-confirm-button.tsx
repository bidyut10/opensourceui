"use client";

import {
  forwardRef,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { cn } from "@/lib/cn";
import { ArrowRight, Check } from "lucide-react";

const PAD = 4;
const KNOB = 48;

export type SlideToConfirmButtonProps = Readonly<
  {
    label?: string;
    confirmedLabel?: string;
    onConfirm?: () => void;
  } & Omit<ComponentPropsWithoutRef<"div">, "onConfirm">
>;

// Slide-to-confirm — drag the knob across the track to commit an action.
export const SlideToConfirmButton = forwardRef<
  HTMLDivElement,
  SlideToConfirmButtonProps
>(
  (
    {
      className,
      label = "Slide to confirm",
      confirmedLabel = "Confirmed",
      onConfirm,
      ...props
    },
    ref,
  ) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const draggingRef = useRef(false);
    const [x, setX] = useState(0);
    const [confirmed, setConfirmed] = useState(false);

    const maxX = () => {
      const track = trackRef.current;
      if (!track) return 0;
      return track.offsetWidth - KNOB - PAD * 2;
    };

    const handleDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
      if (confirmed) return;
      draggingRef.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    };

    const handleMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
      if (!draggingRef.current || confirmed) return;
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const next = Math.min(
        Math.max(event.clientX - rect.left - PAD - KNOB / 2, 0),
        maxX(),
      );
      setX(next);
    };

    const handleUp = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      if (x >= maxX() - 4) {
        setX(maxX());
        setConfirmed(true);
        onConfirm?.();
      } else {
        setX(0);
      }
    };

    const progress = maxX() > 0 ? x / maxX() : 0;

    return (
      <div
        ref={ref}
        data-slot="slide-to-confirm-button"
        className="font-sans select-none"
        {...props}
      >
        <div
          ref={trackRef}
          className={cn(
            // transform-gpu + isolate promote the track to its own compositor
            // layer so the knob's moving shadow can't leave stale ghost pixels.
            "relative isolate h-14 w-72 transform-gpu overflow-hidden rounded-full p-1 transition-[background-color,box-shadow] duration-300",
            "shadow-[inset_0_1px_2px_rgba(0,0,0,0.08),inset_0_2px_4px_rgba(0,0,0,0.05),inset_0_-2px_3px_rgba(0,0,0,0.06),0_1px_0_rgba(255,255,255,0.9)]",
            confirmed
              ? "bg-emerald-600 shadow-[inset_0_1px_3px_rgba(0,0,0,0.2),inset_0_-2px_3px_rgba(0,0,0,0.12),0_1px_0_rgba(255,255,255,0.9)]"
              : "bg-neutral-100",
            className,
          )}
        >
          <span
            aria-hidden
            className={cn(
              "absolute inset-0 flex items-center justify-center text-sm font-medium transition-colors duration-200",
              confirmed
                ? "text-white [text-shadow:0_1px_1px_rgba(0,0,0,0.25)]"
                : "text-neutral-500 [text-shadow:0_1px_0_rgba(255,255,255,0.8)]",
            )}
            style={{ opacity: confirmed ? 1 : 1 - progress * 1.4 }}
          >
            {confirmed ? confirmedLabel : label}
          </span>

          <button
            type="button"
            aria-label={label}
            disabled={confirmed}
            onPointerDown={handleDown}
            onPointerMove={handleMove}
            onPointerUp={handleUp}
            onPointerCancel={handleUp}
            className={cn(
              // will-change keeps the knob on its own compositor layer so the
              // moving box-shadow doesn't leave stale ghost pixels on the track.
              "absolute top-1 left-1 flex size-12 touch-none items-center justify-center rounded-full bg-neutral-50 text-neutral-700 will-change-transform",
              // Keycap material like the quantity stepper, but with a tight,
              // downward-only shadow so the knob sits in the groove instead of
              // floating in a soft halo.
              "shadow-[0_1px_1px_rgba(0,0,0,0.12),0_2px_3px_rgba(0,0,0,0.12),inset_0_1.5px_0_rgba(255,255,255,1),inset_0_-2px_3px_rgba(0,0,0,0.1)]",
              confirmed
                ? "cursor-default"
                : "cursor-grab active:cursor-grabbing active:bg-neutral-100 active:shadow-[0_1px_1px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(0,0,0,0.06),inset_0_2px_3px_rgba(0,0,0,0.03),inset_0_-2px_3px_rgba(0,0,0,0.05)]",
              draggingRef.current
                ? "transition-[box-shadow,background-color] duration-200 ease-out"
                : "transition-[transform,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
            )}
            style={{ transform: `translate3d(${x}px, 0, 0)` }}
          >
            {confirmed ? (
              <Check
                size={18}
                strokeWidth={2.5}
                aria-hidden
                className="text-emerald-600 filter-[drop-shadow(0_1px_0_rgba(255,255,255,0.9))_drop-shadow(0_-1px_0.5px_rgba(0,0,0,0.12))]"
              />
            ) : (
              <ArrowRight
                size={18}
                strokeWidth={2.5}
                aria-hidden
                className="filter-[drop-shadow(0_1px_0_rgba(255,255,255,0.9))_drop-shadow(0_-1px_0.5px_rgba(0,0,0,0.12))]"
              />
            )}
          </button>
        </div>
      </div>
    );
  },
);

SlideToConfirmButton.displayName = "SlideToConfirmButton";
