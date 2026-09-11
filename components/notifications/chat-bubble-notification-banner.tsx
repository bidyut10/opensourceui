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

export type ChatBubbleNotificationBannerProps = Readonly<
  {
    sender?: string;
    message?: string;
    time?: string;
    avatarSrc?: string;
    avatarAlt?: string;
    showTriggerLabel?: string;
    onDismiss?: () => void;
    onShow?: () => void;
  } & ComponentPropsWithoutRef<"output">
>;

// Chat bubble alert — sender label above a rounded message bubble.
export const ChatBubbleNotificationBanner = forwardRef<
  HTMLOutputElement,
  ChatBubbleNotificationBannerProps
>(
  (
    {
      className,
      sender = "Maya",
      message = "Running 5 min late — start without me if you need to",
      time = "just now",
      avatarSrc = "/woman.png",
      avatarAlt = "Maya",
      showTriggerLabel = "Show chat alert",
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
            "cursor-pointer rounded-full bg-neutral-100 px-4 py-2 text-xs font-medium text-neutral-700",
            "opacity-100 transition-opacity duration-200 hover:bg-neutral-200 starting:opacity-0",
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
        data-slot="chat-bubble-notification-banner"
        data-phase={phase}
        className={cn(
          "relative block w-72 font-sans",
          "translate-y-0 opacity-100 starting:translate-y-2 starting:opacity-0",
          "transition-all duration-300 ease-out",
          "data-[phase=closing]:translate-y-1.5 data-[phase=closing]:opacity-0",
          className,
        )}
        {...props}
      >
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss"
          className="absolute -top-1 -right-1 z-10 flex size-6 cursor-pointer items-center justify-center rounded-full bg-white text-neutral-400 shadow-sm transition-colors hover:text-neutral-600"
        >
          <X size={10} strokeWidth={2} />
        </button>

        <div className="flex items-end gap-2">
          <div className="relative size-7 shrink-0 overflow-hidden rounded-full bg-neutral-200">
            <Image
              src={avatarSrc}
              alt={avatarAlt}
              fill
              sizes="508px"
              className="object-cover"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="mb-1 px-1 text-[11px] font-medium text-neutral-600">
              {sender}
            </p>
            <p className="rounded-2xl rounded-bl-md bg-neutral-100 px-3.5 py-2.5 text-[12px] leading-relaxed text-neutral-800">
              {message}
            </p>
            <p className="mt-1 px-1 text-right text-[10px] text-neutral-400">
              {time}
            </p>
          </div>
        </div>
      </output>
    );
  },
);

ChatBubbleNotificationBanner.displayName = "ChatBubbleNotificationBanner";
