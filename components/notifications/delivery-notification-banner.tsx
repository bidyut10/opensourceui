"use client";

import {
  forwardRef,
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
} from "react";

import { cn } from "@/lib/cn";
import { Package, X } from "lucide-react";

const EXIT_MS = 260;

export type DeliveryNotificationBannerProps = Readonly<
  {
    status?: string;
    eta?: string;
    orderId?: string;
    showTriggerLabel?: string;
    onDismiss?: () => void;
    onShow?: () => void;
  } & ComponentPropsWithoutRef<"output">
>;

// Delivery update — compact row, package icon, status + ETA.
export const DeliveryNotificationBanner = forwardRef<
  HTMLOutputElement,
  DeliveryNotificationBannerProps
>(
  (
    {
      className,
      status = "Out for delivery",
      eta = "Arriving today by 6:15 PM",
      orderId = "#4821",
      showTriggerLabel = "Show delivery update",
      onDismiss,
      onShow,
      ...props
    },
    ref,
  ) => {
    const [phase, setPhase] = useState<"open" | "closing" | "closed">("open");

    useEffect(() => {
      if (phase !== "closing") return;
      const timer = globalThis.setTimeout(() => setPhase("closed"), EXIT_MS);
      return () => globalThis.clearTimeout(timer);
    }, [phase]);

    const handleDismiss = () => {
      if (phase !== "open") return;
      setPhase("closing");
      onDismiss?.();
    };

    const handleShow = () => {
      setPhase("open");
      onShow?.();
    };

    if (phase === "closed") {
      return (
        <button
          type="button"
          onClick={handleShow}
          className={cn(
            "cursor-pointer rounded-xl bg-[#f2f2f7] px-4 py-2 text-xs font-medium text-neutral-700",
            "opacity-100 starting:opacity-0",
            "transition-opacity duration-280 ease-out hover:bg-[#e8e8ed]",
            className,
          )}
        >
          {showTriggerLabel}
        </button>
      );
    }

    return (
      <output
        ref={ref}
        data-slot="delivery-notification-banner"
        data-phase={phase}
        className={cn(
          "relative flex w-80 items-start gap-3 rounded-[1.25rem] border border-white/70 bg-white/90 px-3.5 py-3 pr-9 font-sans backdrop-blur-xl",
          "shadow-[0_8px_32px_-4px_rgba(0,0,0,0.10)]",
          "translate-y-0 opacity-100 starting:-translate-y-2.5 starting:opacity-0",
          "transition-all duration-340 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
          "data-[phase=closing]:-translate-y-2 data-[phase=closing]:opacity-0",
          "data-[phase=closing]:duration-260 data-[phase=closing]:ease-[cubic-bezier(0.4,0,0.6,1)]",
          className,
        )}
        {...props}
      >
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss notification"
          className="absolute top-2 right-2 flex size-6 cursor-pointer items-center justify-center rounded-full text-neutral-400 transition-colors duration-150 hover:bg-black/5 hover:text-neutral-600"
        >
          <X size={10} />
        </button>

        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-50">
          <Package
            size={18}
            strokeWidth={2}
            className="text-sky-600"
            aria-hidden
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold text-neutral-900">{status}</p>
          <p className="mt-0.5 text-[12px] leading-snug text-neutral-600">
            {eta}
          </p>
          <p className="mt-1 text-[11px] text-neutral-400">Order {orderId}</p>
        </div>
      </output>
    );
  },
);

DeliveryNotificationBanner.displayName = "DeliveryNotificationBanner";
