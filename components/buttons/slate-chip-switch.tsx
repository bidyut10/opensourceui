"use client";

import {
  forwardRef,
  useState,
  type ChangeEvent,
  type ComponentPropsWithoutRef,
} from "react";

import { cn } from "@/lib/cn";

export type SlateChipSwitchProps = Readonly<
  {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    label?: string;
  } & Omit<
    ComponentPropsWithoutRef<"input">,
    "type" | "checked" | "defaultChecked" | "onChange"
  >
>;

const CHIP_FRAME =
  "relative inline-flex items-center rounded-full p-1 text-xl bg-linear-to-b from-[#eceff3] to-[#d9dee5] shadow-[0_1px_1px_rgba(255,255,255,0.75)]";

const CHIP_TRACK =
  "relative h-[1.45em] w-[2.85em] rounded-full bg-[#c7ced8] shadow-[inset_0_1px_3px_rgba(0,0,0,0.18)] transition-[background-color,box-shadow] duration-300 ease-out motion-reduce:transition-none peer-checked:bg-sky-500 peer-checked:shadow-[inset_0_1px_3px_rgba(0,0,0,0.12),0_0_0_1px_rgba(14,116,144,0.25)] peer-checked:[&>span]:translate-x-[1.35em]";

const CHIP_THUMB =
  "absolute left-[0.08em] top-1/2 size-[1.22em] -translate-y-1/2 rounded-full bg-white shadow-[0_2px_5px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.95)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

export const SlateChipSwitch = forwardRef<
  HTMLInputElement,
  SlateChipSwitchProps
>(
  (
    {
      className,
      checked,
      defaultChecked = false,
      onCheckedChange,
      label = "Enable mode",
      disabled,
      id,
      ...props
    },
    ref,
  ) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isControlled = checked !== undefined;
    const isOn = isControlled ? checked : internalChecked;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const next = event.target.checked;
      if (!isControlled) {
        setInternalChecked(next);
      }
      onCheckedChange?.(next);
    };

    return (
      <label
        data-slot="slate-chip-switch"
        data-state={isOn ? "on" : "off"}
        className={cn(
          CHIP_FRAME,
          "has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-sky-400",
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
          className,
        )}
      >
        <input
          ref={ref}
          id={id}
          type="checkbox"
          checked={isControlled ? checked : undefined}
          defaultChecked={isControlled ? undefined : defaultChecked}
          disabled={disabled}
          aria-label={label}
          onChange={handleChange}
          className="peer absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none opacity-0 ring-0 outline-none focus:ring-0 disabled:cursor-not-allowed"
          {...props}
        />

        <span aria-hidden="true" data-layer="chip-track" className={CHIP_TRACK}>
          <span data-layer="chip-thumb" className={CHIP_THUMB} />
        </span>
      </label>
    );
  },
);

SlateChipSwitch.displayName = "SlateChipSwitch";
