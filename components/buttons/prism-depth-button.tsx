"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

import { cn } from "@/lib/cn";

export type PrismDepthButtonProps = Readonly<
  {
    children?: ReactNode;
  } & ComponentPropsWithoutRef<"button">
>;

const PRISM_SHELL =
  "radial-gradient(circle 80px at 80% -10%, #ffffff, #181b1b)";
const PRISM_EDGE_FLARE =
  "radial-gradient(circle 60px at 0% 100%, #3fe9ff, #0000ff80, transparent)";
const PRISM_CORE = "radial-gradient(circle 80px at 80% -50%, #777777, #0f1111)";
const PRISM_CORE_VEIL =
  "radial-gradient(circle 60px at 0% 100%, #00e1ff1a, #0000ff11, transparent)";

export const PrismDepthButton = forwardRef<
  HTMLButtonElement,
  PrismDepthButtonProps
>(
  (
    { children = "Continue", className, type = "button", disabled, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        data-slot="prism-depth-button"
        className={cn(
          "relative isolate cursor-pointer rounded-2xl border-0 p-0.5 text-[1.4rem] ring-0 outline-none",
          "transition-[scale,opacity] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]",
          "hover:scale-[1.02] active:scale-[0.98] motion-reduce:transition-opacity motion-reduce:hover:scale-100 motion-reduce:active:scale-100",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        style={{ background: PRISM_SHELL }}
        {...props}
      >
        <span
          aria-hidden="true"
          data-layer="prism-rim-glow"
          className="pointer-events-none absolute top-0 right-0 -z-10 h-[60%] w-[65%] rounded-[120px]"
          style={{ boxShadow: "0 0 20px #ffffff38" }}
        />

        <span
          aria-hidden="true"
          data-layer="prism-edge-flare"
          className="pointer-events-none absolute bottom-0 left-0 h-full w-[70px] rounded-2xl"
          style={{
            background: PRISM_EDGE_FLARE,
            boxShadow: "-10px 10px 30px #0051ff2d",
          }}
        />

        <span
          data-layer="prism-core"
          className="relative z-[3] block rounded-[14px] px-[25px] py-3.5 text-white"
          style={{ background: PRISM_CORE }}
        >
          <span
            aria-hidden="true"
            data-layer="prism-core-veil"
            className="pointer-events-none absolute inset-0 rounded-[14px]"
            style={{ background: PRISM_CORE_VEIL }}
          />
          <span
            data-layer="prism-label"
            className="relative z-[1] font-sans font-medium tracking-tight"
          >
            {children}
          </span>
        </span>
      </button>
    );
  },
);

PrismDepthButton.displayName = "PrismDepthButton";
