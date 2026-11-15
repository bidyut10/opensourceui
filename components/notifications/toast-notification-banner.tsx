"use client";

import {
  forwardRef,
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
} from "react";

import { cn } from "@/lib/cn";
import { Check } from "lucide-react";

const EXIT_MS = 260;

export type ToastNotificationBannerProps = Readonly<
  {
    message?: string;
    actionLabel?: string;
    showTriggerLabel?: string;
    onDismiss?: () => void;
    onAction?: () => void;
    onShow?: () => void;
  } & ComponentPropsWithoutRef<"output">
>;

// Light snackbar — check icon, optional action, slides up from bottom.
export const ToastNotificationBanner = forwardRef<
  HTMLOutputElement,
  ToastNotificationBannerProps
>(
  (
    {
      className,
      message = "Changes saved",
      actionLabel = "Undo",
      showTriggerLabel = "Show toast",
      onDismiss,
      onAction,
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
            "transition-[opacity,background-color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#e8e8ed] active:scale-[0.97] motion-reduce:transition-[opacity,background-color] motion-reduce:active:scale-100",
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
        data-slot="toast-notification-banner"
        data-phase={phase}
        className={cn(
          "inline-flex max-w-80 items-center gap-2.5 rounded-xl border border-neutral-200/80 bg-white/95 px-3 py-2.5 font-sans backdrop-blur-xl",
          "shadow-[0_4px_24px_-2px_rgba(0,0,0,0.10),0_0_0_1px_rgba(0,0,0,0.02)]",
          "translate-y-0 opacity-100 starting:translate-y-3 starting:opacity-0",
          "transition-[translate,opacity] duration-340 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-opacity",
          "data-[phase=closing]:translate-y-3 data-[phase=closing]:opacity-0 motion-reduce:data-[phase=closing]:translate-y-0",
          "data-[phase=closing]:duration-260",
          className,
        )}
        {...props}
      >
        <span
          aria-hidden
          className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500"
        >
          <Check size={11} strokeWidth={3} className="text-white" />
        </span>

        <p className="min-w-0 flex-1 text-[13px] leading-tight text-neutral-800">
          {message}
        </p>

        {actionLabel ? (
          <button
            type="button"
            onClick={onAction}
            className="shrink-0 cursor-pointer text-[13px] font-semibold text-sky-600 transition-[color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-sky-700 active:scale-[0.97] motion-reduce:transition-colors motion-reduce:active:scale-100"
          >
            {actionLabel}
          </button>
        ) : null}

        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss"
          className="shrink-0 cursor-pointer px-0.5 text-[11px] text-neutral-400 transition-[color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-neutral-600 active:scale-[0.97] motion-reduce:transition-colors motion-reduce:active:scale-100"
        >
          ✕
        </button>
      </output>
    );
  },
);

ToastNotificationBanner.displayName = "ToastNotificationBanner";
