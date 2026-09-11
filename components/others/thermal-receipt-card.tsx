import { forwardRef, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";
import { QrCode } from "lucide-react";

export type ThermalReceiptItem = Readonly<{
  name: string;
  price: string;
}>;

export type ThermalReceiptCardProps = Readonly<
  {
    storeName?: string;
    storeAddress?: string;
    orderId?: string;
    date?: string;
    items?: ThermalReceiptItem[];
    subtotal?: string;
    tax?: string;
    total?: string;
    footer?: string;
  } & ComponentPropsWithoutRef<"div">
>;

const defaultItems: readonly ThermalReceiptItem[] = [
  { name: "AppUI Pro (Monthly)", price: "₹999" },
  { name: "Component Pack", price: "₹499" },
  { name: "Priority Support", price: "₹299" },
];

// Production-ready Thermal Receipt component — styled with Tailwind CSS.
export const ThermalReceiptCard = forwardRef<
  HTMLDivElement,
  ThermalReceiptCardProps
>(
  (
    {
      className,
      storeName = "APPUI COMPONENTS",
      storeAddress = "Park Street, Kolkata 700016",
      orderId = "#AUI-2847",
      date = "06 JUN 2026 · 14:32",
      items = defaultItems,
      subtotal = "₹1,797",
      tax = "₹323",
      total = "₹2,120",
      footer = "Thank you for building with AppUI",
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      data-slot="thermal-receipt-card"
      className={cn("w-55 font-mono md:max-w-50", className)}
      {...props}
    >
      <div className="relative bg-[#faf8f2] px-4 py-5 text-neutral-800 shadow-md">
        <div
          className="pointer-events-none absolute -top-2 right-0 left-0 h-2"
          style={{
            background:
              "radial-gradient(circle at 8px 0, transparent 6px, #faf8f2 6px)",
            backgroundSize: "16px 8px",
          }}
        />

        <div data-slot="thermal-receipt-card-header" className="text-center">
          <p className="text-[11px] font-bold tracking-[0.2em]">{storeName}</p>
          <p className="mt-1 text-[8px] leading-snug text-neutral-500">
            {storeAddress}
          </p>
          <p className="mt-2 text-[8px] text-neutral-400">
            {orderId} · {date}
          </p>
        </div>

        <div
          data-slot="thermal-receipt-card-divider"
          className="my-3 border-t border-dashed border-neutral-300"
        />

        <div data-slot="thermal-receipt-card-items" className="space-y-1.5">
          {items.map((item) => (
            <div
              key={item.name}
              className="flex justify-between gap-2 text-[9px]"
            >
              <span className="min-w-0 truncate">{item.name}</span>
              <span className="shrink-0">{item.price}</span>
            </div>
          ))}
        </div>

        <div className="my-3 border-t border-dashed border-neutral-300" />

        <div className="space-y-0.5 text-[9px]">
          <div className="flex justify-between text-neutral-500">
            <span>Subtotal</span>
            <span>{subtotal}</span>
          </div>
          <div className="flex justify-between text-neutral-500">
            <span>GST 18%</span>
            <span>{tax}</span>
          </div>
          <div className="flex justify-between pt-1 text-[11px] font-bold">
            <span>TOTAL</span>
            <span>{total}</span>
          </div>
        </div>

        <div className="mt-4 flex flex-col items-center gap-2">
          <QrCode size={36} className="text-neutral-700" aria-hidden />
          <p className="text-center text-[7px] leading-snug text-neutral-400">
            {footer}
          </p>
        </div>

        <div
          className="pointer-events-none absolute right-0 -bottom-2 left-0 h-2"
          style={{
            background:
              "radial-gradient(circle at 8px 8px, transparent 6px, #faf8f2 6px)",
            backgroundSize: "16px 8px",
          }}
        />
      </div>
    </div>
  ),
);

ThermalReceiptCard.displayName = "ThermalReceiptCard";
