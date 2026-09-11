"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";
import { CloudRain, Droplets, Sun, Wind } from "lucide-react";

export type WeatherSnapshotCardProps = Readonly<
  {
    city?: string;
    condition?: string;
    temperature?: number;
    high?: number;
    low?: number;
    humidity?: number;
    wind?: string;
    variant?: "clear" | "rain";
  } & ComponentPropsWithoutRef<"div">
>;

export const WeatherSnapshotCard = forwardRef<
  HTMLDivElement,
  WeatherSnapshotCardProps
>(
  (
    {
      className,
      city = "Kolkata",
      condition = "Partly cloudy",
      temperature = 31,
      high = 34,
      low = 26,
      humidity = 72,
      wind = "12 km/h",
      variant = "clear",
      ...props
    },
    ref,
  ) => {
    const isRain = variant === "rain";

    return (
      <div
        ref={ref}
        data-slot="weather-snapshot-card"
        data-variant={variant}
        className={cn(
          "w-72 overflow-hidden rounded-3xl border font-sans shadow-md",
          isRain
            ? "border-sky-200 bg-sky-50 text-sky-950"
            : "border-amber-100 bg-amber-50 text-amber-950",
          className,
        )}
        {...props}
      >
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium tracking-wide text-neutral-500 uppercase">
                {city}
              </p>
              <p className="mt-1 text-sm text-neutral-600">{condition}</p>
            </div>

            <div
              data-layer="weather-icon"
              className={cn(
                "flex size-11 items-center justify-center rounded-2xl",
                isRain
                  ? "bg-sky-200/70 text-sky-800"
                  : "bg-amber-200/80 text-amber-800",
              )}
            >
              {isRain ? (
                <CloudRain size={22} aria-hidden />
              ) : (
                <Sun size={22} aria-hidden />
              )}
            </div>
          </div>

          <p className="mt-4 text-5xl font-light tracking-tight">
            {temperature}
            <span className="align-top text-2xl">°</span>
          </p>

          <p className="mt-1 text-xs text-neutral-500">
            H {high}° · L {low}°
          </p>
        </div>

        <div
          className={cn(
            "grid grid-cols-2 gap-px border-t text-xs",
            isRain
              ? "border-sky-200 bg-sky-200"
              : "border-amber-200 bg-amber-200",
          )}
        >
          <div
            className={cn(
              "flex items-center gap-2 px-4 py-3",
              isRain ? "bg-sky-50" : "bg-amber-50",
            )}
          >
            <Droplets size={14} className="text-neutral-500" aria-hidden />
            <span>{humidity}% humidity</span>
          </div>
          <div
            className={cn(
              "flex items-center gap-2 px-4 py-3",
              isRain ? "bg-sky-50" : "bg-amber-50",
            )}
          >
            <Wind size={14} className="text-neutral-500" aria-hidden />
            <span>{wind}</span>
          </div>
        </div>
      </div>
    );
  },
);

WeatherSnapshotCard.displayName = "WeatherSnapshotCard";
