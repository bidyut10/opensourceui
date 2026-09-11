"use client";

import { forwardRef, useState, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";
import { UserCheck, UserPlus } from "lucide-react";

export type FollowButtonProps = Readonly<
  {
    label?: string;
    followingLabel?: string;
    defaultFollowing?: boolean;
  } & ComponentPropsWithoutRef<"button">
>;

// Both labels stack in the same grid cell so the button width never jumps.
// The outgoing label fades out first; the incoming one fades in after a
// short delay, so the swap reads as fade-out, then fade-in.
const LABEL_LAYER =
  "col-start-1 row-start-1 flex items-center justify-center gap-2 transition-opacity ease-out motion-reduce:transition-none";

// Follow toggle — raised dark key becomes a quiet light "Following" key.
export const FollowButton = forwardRef<HTMLButtonElement, FollowButtonProps>(
  (
    {
      className,
      label = "Follow",
      followingLabel = "Following",
      defaultFollowing = false,
      onClick,
      ...props
    },
    ref,
  ) => {
    const [following, setFollowing] = useState(defaultFollowing);

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={following}
        data-slot="follow-button"
        onClick={(event) => {
          setFollowing((prev) => !prev);
          onClick?.(event);
        }}
        className={cn(
          "grid h-10 cursor-pointer place-items-stretch rounded-full px-4 font-sans text-sm font-semibold outline-none select-none",
          "transition-[background-color,box-shadow,color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900",
          following
            ? cn(
                // Light raised keycap — soft blurred highlight, not a hard rim.
                "bg-neutral-50 text-neutral-600",
                "shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_1px_1px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.08)]",
                "active:bg-neutral-100 active:shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_1px_1px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(0,0,0,0.08),inset_0_2px_4px_rgba(0,0,0,0.04),inset_0_-1px_2px_rgba(0,0,0,0.05)]",
              )
            : cn(
                // Dark 3D key: soft top sheen + deep lift + bottom recess.
                "bg-neutral-900 text-white hover:bg-neutral-800",
                "shadow-[0_1px_1px_rgba(0,0,0,0.35),0_3px_6px_rgba(0,0,0,0.28),0_8px_16px_rgba(0,0,0,0.22),inset_0_1px_2px_rgba(255,255,255,0.14),inset_0_-3px_6px_rgba(0,0,0,0.55)]",
                "active:bg-neutral-950 active:shadow-[0_1px_2px_rgba(0,0,0,0.25),inset_0_2px_6px_rgba(0,0,0,0.55),inset_0_-1px_1px_rgba(255,255,255,0.06)]",
              ),
          className,
        )}
        {...props}
      >
        <span
          aria-hidden={following}
          className={cn(
            LABEL_LAYER,
            following
              ? "opacity-0 duration-200"
              : "opacity-100 delay-200 duration-300",
          )}
        >
          <UserPlus size={15} strokeWidth={2} aria-hidden />
          {label}
        </span>

        <span
          aria-hidden={!following}
          className={cn(
            LABEL_LAYER,
            following
              ? "opacity-100 delay-200 duration-300"
              : "opacity-0 duration-200",
          )}
        >
          <UserCheck size={15} strokeWidth={2} aria-hidden />
          {followingLabel}
        </span>
      </button>
    );
  },
);

FollowButton.displayName = "FollowButton";
