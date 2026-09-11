"use client";

import { forwardRef, useState, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";
import { Minus, Plus } from "lucide-react";

export type QuantityStepperButtonProps = Readonly<
  {
    value?: number;
    min?: number;
    max?: number;
    onChange?: (value: number) => void;
  } & Omit<ComponentPropsWithoutRef<"div">, "onChange">
>;

// Quantity stepper — minus, count, plus in one inline control.
export const QuantityStepperButton = forwardRef<
  HTMLDivElement,
  QuantityStepperButtonProps
>(
  (
    {
      className,
      value: defaultValue = 1,
      min = 0,
      max = 99,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [value, setValue] = useState(defaultValue);

    const update = (next: number) => {
      const clamped = Math.min(max, Math.max(min, next));
      setValue(clamped);
      onChange?.(clamped);
    };

    // Raised key: layered drop shadows below, white bevel on top, shaded
    // bottom edge. Pressing sinks it and flips the shadows inward.
    const keyClass = cn(
      "group flex w-10 cursor-pointer items-center justify-center rounded-lg bg-neutral-50 text-neutral-600 transition-[box-shadow,color,transform,background-color] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)]",
      "shadow-[0_1px_1px_rgba(0,0,0,0.12),0_2px_3px_rgba(0,0,0,0.1),0_4px_8px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-2px_3px_rgba(0,0,0,0.1),inset_1px_0_1px_rgba(255,255,255,0.25),inset_-1px_0_1px_rgba(255,255,255,0.25)]",
      "hover:text-neutral-900",
      "active:bg-neutral-100 active:shadow-[0_1px_1px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(0,0,0,0.06),inset_0_2px_3px_rgba(0,0,0,0.03),inset_0_-2px_3px_rgba(0,0,0,0.05)]",
      "disabled:cursor-default disabled:bg-transparent disabled:text-neutral-300 disabled:shadow-none",
    );

    // Soft cast shadow under the glyph — 3D lift, no hard outline rim.
    const iconClass = cn(
      "shrink-0 filter-[drop-shadow(0_1px_1px_rgba(0,0,0,0.22))_drop-shadow(0_2px_3px_rgba(0,0,0,0.12))]",
      "group-disabled:filter-none",
    );

    return (
      <div
        ref={ref}
        data-slot="quantity-stepper-button"
        className={cn(
          "inline-flex h-11 items-stretch gap-1 rounded-xl bg-neutral-100 p-1 font-sans text-sm font-medium select-none",
          "shadow-[inset_0_1px_2px_rgba(0,0,0,0.08),inset_0_2px_4px_rgba(0,0,0,0.05),inset_0_-2px_3px_rgba(0,0,0,0.06),0_1px_0_rgba(255,255,255,0.9)]",
          className,
        )}
        {...props}
      >
        <button
          type="button"
          aria-label="Decrease quantity"
          disabled={value <= min}
          onClick={() => update(value - 1)}
          className={keyClass}
        >
          <Minus
            size={15}
            strokeWidth={2.5}
            aria-hidden
            className={iconClass}
          />
        </button>

        <span
          className="flex min-w-10 items-center justify-center px-2 text-neutral-900 tabular-nums [text-shadow:0_1px_0_rgba(255,255,255,0.8)]"
          aria-live="polite"
        >
          {value}
        </span>

        <button
          type="button"
          aria-label="Increase quantity"
          disabled={value >= max}
          onClick={() => update(value + 1)}
          className={keyClass}
        >
          <Plus size={15} strokeWidth={2.5} aria-hidden className={iconClass} />
        </button>
      </div>
    );
  },
);

QuantityStepperButton.displayName = "QuantityStepperButton";
