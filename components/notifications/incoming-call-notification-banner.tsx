"use client";

import {
  forwardRef,
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
} from "react";

import Image from "next/image";

import { cn } from "@/lib/cn";
import { Phone, PhoneOff } from "lucide-react";

const EXIT_MS = 260;

export type IncomingCallNotificationBannerProps = Readonly<
  {
    caller?: string;
    callType?: string;
    avatarSrc?: string;
    avatarAlt?: string;
    showTriggerLabel?: string;
    onDismiss?: () => void;
    onAccept?: () => void;
    onShow?: () => void;
  } & ComponentPropsWithoutRef<"output">
>;

// Incoming call — avatar, caller name, accept/decline actions.
export const IncomingCallNotificationBanner = forwardRef<
  HTMLOutputElement,
  IncomingCallNotificationBannerProps
>(
  (
    {
      className,
      caller = "Sarah Chen",
      callType = "FaceTime Audio",
      avatarSrc = "/woman.png",
      avatarAlt = "Caller",
      showTriggerLabel = "Show incoming call",
      onDismiss,
      onAccept,
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
        data-slot="incoming-call-notification-banner"
        data-phase={phase}
        className={cn(
          "block w-80 rounded-[1.25rem] border border-white/70 bg-white/90 p-3.5 font-sans backdrop-blur-xl",
          "shadow-[0_8px_32px_-4px_rgba(0,0,0,0.10)]",
          "translate-y-0 opacity-100 starting:-translate-y-2.5 starting:opacity-0",
          "transition-[translate,opacity] duration-340 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-opacity",
          "data-[phase=closing]:-translate-y-2 data-[phase=closing]:opacity-0 motion-reduce:data-[phase=closing]:translate-y-0",
          "data-[phase=closing]:duration-260",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-3">
          <div className="relative size-11 shrink-0 overflow-hidden rounded-full ring-2 ring-neutral-100">
            <Image
              src={avatarSrc}
              alt={avatarAlt}
              fill
              sizes="44px"
              className="object-cover"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-semibold text-neutral-900">
              {caller}
            </p>
            <p className="truncate text-[12px] text-neutral-500">{callType}</p>
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={handleDismiss}
            className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full bg-red-500 py-2 text-[13px] font-semibold text-white transition-[background-color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-red-600 active:scale-[0.97] motion-reduce:transition-colors motion-reduce:active:scale-100"
          >
            <PhoneOff size={14} strokeWidth={2} aria-hidden />
            Decline
          </button>
          <button
            type="button"
            onClick={onAccept}
            className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full bg-emerald-500 py-2 text-[13px] font-semibold text-white transition-[background-color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-emerald-600 active:scale-[0.97] motion-reduce:transition-colors motion-reduce:active:scale-100"
          >
            <Phone size={14} strokeWidth={2} aria-hidden />
            Accept
          </button>
        </div>
      </output>
    );
  },
);

IncomingCallNotificationBanner.displayName = "IncomingCallNotificationBanner";
