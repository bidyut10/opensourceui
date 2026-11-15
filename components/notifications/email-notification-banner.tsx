"use client";

import {
  forwardRef,
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
} from "react";

import Image from "next/image";

import { cn } from "@/lib/cn";
import { X } from "lucide-react";

const EXIT_MS = 260;

export type EmailNotificationBannerProps = Readonly<
  {
    appName?: string;
    from?: string;
    subject?: string;
    preview?: string;
    time?: string;
    avatarSrc?: string;
    avatarAlt?: string;
    showTriggerLabel?: string;
    onDismiss?: () => void;
    onShow?: () => void;
  } & ComponentPropsWithoutRef<"output">
>;

// Mail alert — iOS grid, sender avatar, single natural body line.
export const EmailNotificationBanner = forwardRef<
  HTMLOutputElement,
  EmailNotificationBannerProps
>(
  (
    {
      className,
      appName = "Mail",
      from = "Alex Morgan",
      subject = "Re: Q3 roadmap draft",
      preview = "Looks good — I left two notes on the timeline slide. Can you take a look before Thursday?",
      time = "9:41 AM",
      avatarSrc = "/woman.png",
      avatarAlt = "Sender",
      showTriggerLabel = "Show email alert",
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
        data-slot="email-notification-banner"
        data-phase={phase}
        className={cn(
          "relative block w-80 overflow-hidden rounded-[1.25rem] border border-white/70 bg-white/90 p-0 font-sans",
          "shadow-[0_8px_32px_-4px_rgba(0,0,0,0.10)] backdrop-blur-xl",
          "translate-y-0 opacity-100 starting:-translate-y-2.5 starting:opacity-0",
          "transition-[translate,opacity] duration-340 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-opacity",
          "data-[phase=closing]:-translate-y-2 data-[phase=closing]:opacity-0 motion-reduce:data-[phase=closing]:translate-y-0",
          "data-[phase=closing]:duration-260",
          className,
        )}
        {...props}
      >
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss notification"
          className="absolute top-2 right-2 z-10 flex size-6 cursor-pointer items-center justify-center rounded-full text-neutral-400 transition-[color,background-color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-black/5 hover:text-neutral-600 active:scale-[0.97] motion-reduce:transition-colors motion-reduce:active:scale-100"
        >
          <X size={10} />
        </button>

        <div className="grid grid-cols-[2.375rem_minmax(0,1fr)] items-start gap-x-3 gap-y-1 px-3.5 py-3 pr-9">
          <div className="relative row-span-2 mt-0.5 size-9.5 shrink-0 overflow-hidden rounded-[0.625rem] shadow-sm ring-1 ring-black/2">
            <Image
              src={avatarSrc}
              alt={avatarAlt}
              fill
              sizes="38px"
              className="object-cover"
            />
          </div>

          <div className="col-start-2 flex min-w-0 items-center justify-between gap-2">
            <p className="truncate text-[13px] leading-tight font-semibold text-neutral-900">
              {appName}
            </p>
            <span className="shrink-0 text-[11px] leading-none tracking-tight text-neutral-400">
              {time}
            </span>
          </div>

          <p className="col-start-2 line-clamp-3 text-[13px] leading-[1.38] text-neutral-700">
            <span className="font-semibold text-neutral-900">{from}</span>
            <span className="text-neutral-500">: </span>
            <span className="font-medium text-neutral-800">{subject}</span>
            <span className="text-neutral-500"> — </span>
            {preview}
          </p>
        </div>
      </output>
    );
  },
);

EmailNotificationBanner.displayName = "EmailNotificationBanner";
