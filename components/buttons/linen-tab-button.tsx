"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

import { cn } from "@/lib/cn";

export type LinenTabButtonProps = Readonly<
  {
    children?: ReactNode;
  } & ComponentPropsWithoutRef<"button">
>;

const LINEN_BODY =
  "linear-gradient(180deg, #f8f4ee 0%, #ebe4d8 55%, #dfd6c8 100%)";
const LINEN_WEAVE =
  "repeating-linear-gradient(90deg, rgba(120,113,108,0.04) 0 1px, transparent 1px 4px), repeating-linear-gradient(0deg, rgba(120,113,108,0.03) 0 1px, transparent 1px 5px)";

export const LinenTabButton = forwardRef<
  HTMLButtonElement,
  LinenTabButtonProps
>(
  (
    {
      children = "View details",
      className,
      type = "button",
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        data-slot="linen-tab-button"
        className={cn(
          "relative isolate overflow-hidden rounded-lg border border-[#d4cbc0] px-6 py-3 text-[1rem] ring-0 outline-none",
          "font-sans font-medium tracking-tight text-neutral-800",
          "shadow-[0_1px_0_rgba(255,255,255,0.85),0_6px_14px_rgba(120,113,108,0.16),inset_0_1px_0_rgba(255,255,255,0.65)]",
          "transition-[translate,box-shadow,filter] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]",
          "hover:brightness-[1.02] active:translate-y-px active:brightness-[0.98]",
          "motion-reduce:transition-[filter] motion-reduce:hover:brightness-100 motion-reduce:active:translate-y-0",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        style={{ background: LINEN_BODY }}
        {...props}
      >
        <span
          aria-hidden="true"
          data-layer="linen-weave"
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{ background: LINEN_WEAVE }}
        />

        <span
          aria-hidden="true"
          data-layer="linen-stitch-top"
          className="pointer-events-none absolute inset-x-3 top-1.5 border-t border-dashed border-[#c4b8aa]/80"
        />
        <span
          aria-hidden="true"
          data-layer="linen-stitch-bottom"
          className="pointer-events-none absolute inset-x-3 bottom-1.5 border-b border-dashed border-[#c4b8aa]/80"
        />

        <span
          aria-hidden="true"
          data-layer="linen-fold"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, transparent 28%, rgba(87,83,78,0.05) 100%)",
          }}
        />

        <span data-layer="linen-label" className="relative z-1">
          {children}
        </span>
      </button>
    );
  },
);

LinenTabButton.displayName = "LinenTabButton";
