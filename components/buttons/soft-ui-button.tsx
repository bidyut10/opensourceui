"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

import { cn } from "@/lib/cn";

export type SoftUiButtonSize = "sm" | "md" | "lg";

export type SoftUiButtonProps = Readonly<
  {
    children: ReactNode;
    size?: SoftUiButtonSize;
  } & ComponentPropsWithoutRef<"button">
>;

const SIZE: Record<SoftUiButtonSize, string> = {
  sm: "h-9 gap-1.5 rounded-xl px-3.5 text-xs",
  md: "h-10 gap-2 rounded-xl px-4 text-sm",
  lg: "h-12 gap-2 rounded-2xl px-5 text-sm",
};

// Soft UI / neumorphic — even light + dark shadows, no hard bevel rim.
// SoftUiButton — universal soft-UI button; pass any children.
export const SoftUiButton = forwardRef<HTMLButtonElement, SoftUiButtonProps>(
  (
    { className, children, size = "md", type = "button", disabled, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        data-slot="soft-ui-button"
        data-size={size}
        className={cn(
          "inline-flex cursor-pointer items-center justify-center bg-neutral-100 font-sans font-semibold text-neutral-800 outline-none select-none",
          "shadow-[6px_6px_14px_rgba(0,0,0,0.08),-6px_-6px_14px_rgba(255,255,255,0.9)]",
          "transition-[box-shadow,background-color,color] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
          "hover:text-neutral-900",
          "active:shadow-[inset_4px_4px_10px_rgba(0,0,0,0.08),inset_-4px_-4px_10px_rgba(255,255,255,0.85)]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40",
          SIZE[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

SoftUiButton.displayName = "SoftUiButton";
