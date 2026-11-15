"use client";

import {
  forwardRef,
  useState,
  type ChangeEvent,
  type ComponentPropsWithoutRef,
} from "react";

import { cn } from "@/lib/cn";

const DIMPLE_MARK_COUNT = 12;

export type DimpleSwitchProps = Readonly<
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

const DIMPLE_FRAME =
  "relative inline-flex items-center justify-center rounded-lg p-0.5 text-2xl bg-linear-to-b from-[#d5d5d5] to-[#e8e8e8] shadow-[0_1px_1px_rgba(255,255,255,0.6)]";

const DIMPLE_TRACK =
  "relative flex h-[1.5em] w-[3em] items-center rounded-md bg-[#e8e8e8] shadow-[inset_0_0_0.0625em_0.125em_rgba(255,255,255,0.2),inset_0_0_0.0625em_0.125em_rgba(0,0,0,0.4)] transition-[background-color] duration-250 ease-[cubic-bezier(0.77,0,0.175,1)] motion-reduce:transition-none peer-checked:bg-[#f3b519] peer-checked:[&>span]:translate-x-[1.5em]";

const DIMPLE_KNOB =
  "absolute left-[0.0625em] flex h-[1.375em] w-[1.375em] items-center justify-center rounded-[0.3125em] bg-[#e8e8e8] shadow-[inset_0_-0.0625em_0.0625em_0.125em_rgba(0,0,0,0.1),inset_0_-0.125em_0.0625em_rgba(0,0,0,0.2),inset_0_0.1875em_0.0625em_rgba(255,255,255,0.3),0_0.125em_0.125em_rgba(0,0,0,0.5)] transition-[translate] duration-250 ease-[cubic-bezier(0.77,0,0.175,1)] motion-reduce:transition-none";

const DIMPLE_MARK_GRADIENT =
  "radial-gradient(circle at 50% 0, #f5f5f5, #c4c4c4)";

export const DimpleSwitch = forwardRef<HTMLInputElement, DimpleSwitchProps>(
  (
    {
      className,
      checked,
      defaultChecked = false,
      onCheckedChange,
      label = "Enable setting",
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
        data-slot="dimple-switch"
        data-state={isOn ? "on" : "off"}
        className={cn(
          DIMPLE_FRAME,
          "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-neutral-900",
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

        <span
          aria-hidden="true"
          data-layer="dimple-track"
          className={DIMPLE_TRACK}
        >
          <span data-layer="dimple-knob" className={DIMPLE_KNOB}>
            <span
              data-layer="dimple-knob-grid"
              className="absolute grid grid-cols-3 gap-0.5"
            >
              {Array.from({ length: DIMPLE_MARK_COUNT }, (_, index) => (
                <span
                  key={index}
                  data-layer="dimple-knob-mark"
                  className="size-0.5 rounded-full"
                  style={{ backgroundImage: DIMPLE_MARK_GRADIENT }}
                />
              ))}
            </span>
          </span>
        </span>
      </label>
    );
  },
);

DimpleSwitch.displayName = "DimpleSwitch";
