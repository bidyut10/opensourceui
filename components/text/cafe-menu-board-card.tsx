"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";
import { Coffee } from "lucide-react";

export type CafeMenuItem = Readonly<{
  name: string;
  price: string;
  note?: string;
}>;

export type CafeMenuBoardCardProps = Readonly<
  {
    cafeName?: string;
    tagline?: string;
    items?: readonly CafeMenuItem[];
  } & ComponentPropsWithoutRef<"div">
>;

const DEFAULT_ITEMS: readonly CafeMenuItem[] = [
  { name: "Flat White", price: "₹180", note: "Double shot" },
  { name: "Cold Brew", price: "₹210" },
  { name: "Almond Croissant", price: "₹160", note: "Baked daily" },
  { name: "Matcha Latte", price: "₹220" },
];

export const CafeMenuBoardCard = forwardRef<
  HTMLDivElement,
  CafeMenuBoardCardProps
>(
  (
    {
      className,
      cafeName = "Corner & Steam",
      tagline = "Small batch · Open till 8",
      items = DEFAULT_ITEMS,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        data-slot="cafe-menu-board-card"
        className={cn(
          "w-80 overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 font-sans text-neutral-100 shadow-[0_18px_40px_rgba(0,0,0,0.28)]",
          className,
        )}
        {...props}
      >
        <div className="border-b border-neutral-800 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-300">
              <Coffee size={18} aria-hidden />
            </div>
            <div>
              <h3 className="text-base font-semibold tracking-tight">
                {cafeName}
              </h3>
              <p className="text-xs text-neutral-400">{tagline}</p>
            </div>
          </div>
        </div>

        <ul className="space-y-0 px-5 py-4">
          {items.map((item, index) => (
            <li
              key={item.name}
              className={cn(
                "py-3",
                index < items.length - 1
                  ? "border-b border-neutral-800/80"
                  : undefined,
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-neutral-100">
                    {item.name}
                  </p>
                  {item.note ? (
                    <p className="mt-0.5 text-[11px] text-neutral-500">
                      {item.note}
                    </p>
                  ) : null}
                </div>
                <p className="shrink-0 text-sm font-semibold text-amber-300">
                  {item.price}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  },
);

CafeMenuBoardCard.displayName = "CafeMenuBoardCard";
