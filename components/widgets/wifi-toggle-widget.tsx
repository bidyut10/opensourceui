"use client";

import { forwardRef, useState, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";
import { Wifi } from "lucide-react";

// iOS-style Wi-Fi card with a status dot, network label, and on/off switch.
export type WiFiToggleWidgetProps = Readonly<
  {
    // Network name shown when Wi-Fi is on.
    networkName?: string;
    // Initial toggle state when the widget first renders.
    defaultOn?: boolean;
  } & ComponentPropsWithoutRef<"div">
>;

// iOS-style Wi-Fi card with a status dot, network label, and on/off switch.
export const WiFiToggleWidget = forwardRef<
  HTMLDivElement,
  WiFiToggleWidgetProps
>(
  (
    { className, networkName = "Studio-5G", defaultOn = false, ...props },
    ref,
  ) => {
    const [on, setOn] = useState(defaultOn);

    return (
      <div
        ref={ref}
        data-slot="wifi-toggle-widget"
        className={cn(
          "flex h-44 w-44 flex-col overflow-hidden rounded-3xl border border-neutral-100 bg-white p-4 font-sans shadow-lg shadow-black/5 select-none",
          className,
        )}
        {...props}
      >
        <div className="flex items-center justify-between gap-2">
          <p className="text-[10px] font-semibold tracking-widest text-neutral-400 uppercase">
            Wi-Fi
          </p>
          {/* Green dot = connected, gray dot = off. */}
          <span
            aria-hidden
            className={cn(
              "h-2 w-2 shrink-0 rounded-full transition-colors",
              on ? "bg-emerald-500" : "bg-neutral-300",
            )}
          />
          <span className="sr-only">{on ? "Connected" : "Off"}</span>
        </div>

        {/* Icon and network details update based on the toggle state. */}
        <div className="flex flex-1 flex-col items-center justify-center gap-1 py-2">
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full transition-colors",
              on ? "bg-neutral-100" : "bg-neutral-50",
            )}
          >
            <Wifi
              size={22}
              className={cn(
                "transition-colors",
                on ? "text-neutral-900" : "text-neutral-300",
              )}
            />
          </div>
          <p
            className={cn(
              "max-w-full truncate text-xs font-semibold",
              on ? "text-neutral-900" : "text-neutral-400",
            )}
          >
            {on ? networkName : "No network"}
          </p>
          <p className="text-[10px] text-neutral-400">
            {on ? "WPA3 · 5 GHz" : "Tap to connect"}
          </p>
        </div>

        {/* Bottom switch — slides right when Wi-Fi is on. */}
        <div className="flex justify-center">
          <button
            type="button"
            aria-label="Toggle Wi-Fi"
            aria-pressed={on}
            onClick={() => setOn(!on)}
            className={cn(
              "flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-[background-color,scale] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] motion-reduce:transition-[background-color] motion-reduce:active:scale-100",
              on ? "bg-emerald-400" : "bg-neutral-200",
            )}
          >
            <span
              className={cn(
                "h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none",
                on ? "translate-x-5" : "translate-x-0",
              )}
            />
          </button>
        </div>
      </div>
    );
  },
);

WiFiToggleWidget.displayName = "WiFiToggleWidget";
