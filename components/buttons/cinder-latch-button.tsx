"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

import { cn } from "@/lib/cn";

export type CinderLatchButtonProps = Readonly<
  {
    children?: ReactNode;
  } & ComponentPropsWithoutRef<"button">
>;

const CINDER_SHELL =
  "linear-gradient(180deg, #3a3a3a 0%, #1d1d1d 48%, #101010 100%)";
const CINDER_EMBER =
  "radial-gradient(circle 70px at 50% 115%, rgba(251,146,60,0.55), rgba(225,29,72,0.22), transparent 72%)";
const CINDER_FACE =
  "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 28%, rgba(0,0,0,0.2) 100%)";

export const CinderLatchButton = forwardRef<
  HTMLButtonElement,
  CinderLatchButtonProps
>(
  (
    { children = "Unlock", className, type = "button", disabled, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        data-slot="cinder-latch-button"
        className={cn(
          "relative isolate overflow-hidden rounded-[18px] border-0 px-6 py-3.5 text-[1.05rem] ring-0 outline-none",
          "font-sans font-medium tracking-tight text-neutral-100",
          "shadow-[0_1px_0_rgba(255,255,255,0.14),0_12px_28px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.12)]",
          "transition-[translate,filter] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]",
          "hover:brightness-110 active:translate-y-px active:brightness-95",
          "motion-reduce:transition-none motion-reduce:hover:brightness-100 motion-reduce:active:translate-y-0",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        style={{ background: CINDER_SHELL }}
        {...props}
      >
        <span
          aria-hidden="true"
          data-layer="cinder-ember"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%]"
          style={{ background: CINDER_EMBER }}
        />

        <span
          aria-hidden="true"
          data-layer="cinder-groove"
          className="pointer-events-none absolute inset-x-4 top-1/2 h-px -translate-y-1/2 bg-white/10"
        />

        <span
          aria-hidden="true"
          data-layer="cinder-face-sheen"
          className="pointer-events-none absolute inset-0"
          style={{ background: CINDER_FACE }}
        />

        <span data-layer="cinder-label" className="relative z-1">
          {children}
        </span>
      </button>
    );
  },
);

CinderLatchButton.displayName = "CinderLatchButton";
