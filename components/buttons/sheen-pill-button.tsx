"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

import { cn } from "@/lib/cn";

export type SheenPillButtonProps = Readonly<
  {
    children: ReactNode;
    width?: number;
    height?: number;
    highlight?: number;
  } & ComponentPropsWithoutRef<"button">
>;

const SHEEN_PILL_RADIUS = 9999;

const SHEEN_SHELL =
  "group relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-4 overflow-hidden border border-double border-[rgba(51,51,51,0.08)] bg-[rgba(255,255,255,0.08)] backdrop-blur-[5px] brightness-[1.05]";

const SHEEN_SHELL_SHADOW =
  "[box-shadow:inset_2px_-2px_1px_-1px_rgba(255,255,255,0.9),inset_-2px_2px_1px_-1px_rgba(255,255,255,0.9),inset_6px_-6px_1px_-6px_rgba(255,255,255,0.55),inset_-6px_6px_1px_-6px_rgba(255,255,255,0.55),inset_0_0_2px_rgba(0,0,0,0.8),0_4px_8px_rgba(0,0,0,0.2)]";

const SHEEN_SHELL_HOVER_SHADOW =
  "hover:[box-shadow:inset_2px_-2px_1px_-1px_rgba(255,255,255,0.95),inset_-2px_2px_1px_-1px_rgba(255,255,255,0.95),inset_6px_-6px_1px_-6px_rgba(255,255,255,0.65),inset_-6px_6px_1px_-6px_rgba(255,255,255,0.65),inset_0_0_2px_rgba(0,0,0,0.65),0_6px_12px_rgba(0,0,0,0.22)]";

export const SheenPillButton = forwardRef<
  HTMLButtonElement,
  SheenPillButtonProps
>(
  (
    {
      children,
      className,
      width = 180,
      height = 60,
      highlight = 15,
      type = "button",
      disabled,
      style,
      ...props
    },
    ref,
  ) => {
    const shadeVeilWidth = width - 16;
    const shadeVeilHeight = height - 16;
    const rimWireWidth = width - 9;
    const rimWireHeight = height - 9;

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        data-slot="sheen-pill-button"
        className={cn(
          SHEEN_SHELL,
          "transition-[scale,background-color,box-shadow,filter] duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-[background-color,box-shadow,filter]",
          "hover:scale-[1.02] hover:bg-transparent hover:brightness-110",
          "active:scale-100 motion-reduce:hover:scale-100",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          SHEEN_SHELL_SHADOW,
          SHEEN_SHELL_HOVER_SHADOW,
          className,
        )}
        style={{
          width,
          height,
          borderRadius: SHEEN_PILL_RADIUS,
          ...style,
        }}
        {...props}
      >
        <span
          aria-hidden="true"
          data-layer="sheen-shade-veil"
          className="pointer-events-none absolute top-[35%] left-1/2 z-0 -translate-x-1/2 border border-[rgba(0,0,0,0.9)] blur-sm transition-[opacity,transform,filter] duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:opacity-80 group-hover:blur-md motion-reduce:transition-[opacity,filter]"
          style={{
            width: shadeVeilWidth,
            height: shadeVeilHeight,
            borderRadius: SHEEN_PILL_RADIUS,
          }}
        />

        <span
          aria-hidden="true"
          data-layer="sheen-light-band"
          className="pointer-events-none absolute inset-0 z-10 opacity-80 blur-[7px] transition-[opacity,scale,filter] duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105 group-hover:opacity-100 group-hover:blur-[9px] motion-reduce:transition-[opacity,filter] motion-reduce:group-hover:scale-100"
          style={{
            borderRadius: SHEEN_PILL_RADIUS,
            background: `linear-gradient(45deg, rgba(255,255,255,0.8) 0%, transparent ${highlight}%, transparent calc(100% - ${highlight}%), rgba(255,255,255,0.8) 100%)`,
          }}
        />

        <span
          aria-hidden="true"
          data-layer="sheen-rim-wire"
          className="pointer-events-none absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 border border-[rgba(255,255,255,0.2)] blur-[1px] transition-[border-color,opacity] duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:border-[rgba(255,255,255,0.45)] group-hover:opacity-100"
          style={{
            width: rimWireWidth,
            height: rimWireHeight,
            borderRadius: SHEEN_PILL_RADIUS,
          }}
        />

        <span
          data-layer="sheen-label-well"
          className="relative z-30 flex h-full w-full items-center justify-center gap-4 px-[0.8rem]"
        >
          <span
            data-layer="sheen-label"
            className="text-lg leading-none whitespace-nowrap text-[#3e3e3e] filter-[drop-shadow(0_25px_3px_rgba(102,102,102,0.15))] transition-[color,filter,translate] duration-250 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-[-0.5px] group-hover:text-neutral-800 group-hover:filter-[drop-shadow(0_28px_4px_rgba(102,102,102,0.2))] motion-reduce:transition-[color,filter] motion-reduce:group-hover:translate-y-0"
          >
            {children}
          </span>
        </span>
      </button>
    );
  },
);

SheenPillButton.displayName = "SheenPillButton";
