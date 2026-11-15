"use client";

import {
  forwardRef,
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
} from "react";

import { cn } from "@/lib/cn";
import { Heart } from "lucide-react";

const PARTICLES = [
  { x: 0, y: -22 },
  { x: 18, y: -14 },
  { x: 22, y: 4 },
  { x: 13, y: 20 },
  { x: -13, y: 20 },
  { x: -22, y: 4 },
  { x: -18, y: -14 },
];

type BurstProps = Readonly<{ color: string }>;

// Particles fly outward once on mount using a rAF-triggered transition.
function Burst({ color }: BurstProps) {
  const [out, setOut] = useState(false);

  useEffect(() => {
    const id = globalThis.requestAnimationFrame(() => setOut(true));
    return () => globalThis.cancelAnimationFrame(id);
  }, []);

  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      {PARTICLES.map((particle, index) => (
        <span
          key={index}
          className="absolute top-1/2 left-1/2 size-1.5 rounded-full transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-opacity"
          style={{
            backgroundColor: color,
            opacity: out ? 0 : 1,
            transform: out
              ? `translate(calc(-50% + ${particle.x}px), calc(-50% + ${particle.y}px)) scale(0.2)`
              : "translate(-50%, -50%) scale(1)",
          }}
        />
      ))}
    </span>
  );
}

export type LikeButtonProps = Readonly<
  {
    label?: string;
    likedLabel?: string;
    defaultLiked?: boolean;
    count?: number;
  } & ComponentPropsWithoutRef<"button">
>;

// Like — heart pops and scatters particles when toggled on.
export const LikeButton = forwardRef<HTMLButtonElement, LikeButtonProps>(
  (
    {
      className,
      label = "Like",
      likedLabel = "Liked",
      defaultLiked = false,
      count = 128,
      onClick,
      ...props
    },
    ref,
  ) => {
    const [liked, setLiked] = useState(defaultLiked);
    const [burstKey, setBurstKey] = useState(0);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      setLiked((prev) => {
        if (!prev) setBurstKey((key) => key + 1);
        return !prev;
      });
    };

    const shown = count + (liked && !defaultLiked ? 1 : 0);

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={liked}
        aria-label={liked ? likedLabel : label}
        data-slot="like-button"
        onClick={handleClick}
        className={cn(
          "inline-flex h-10 cursor-pointer items-center gap-2 rounded-full pr-4 pl-3 font-sans text-sm font-medium select-none",
          "transition-[background-color,box-shadow,color] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)]",
          // Soft blurred top highlight (not a hard white rim) + lift shadows.
          "shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_1px_1px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.08)]",
          "active:shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_1px_1px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(0,0,0,0.08),inset_0_2px_4px_rgba(0,0,0,0.04),inset_0_-1px_2px_rgba(0,0,0,0.05)]",
          liked
            ? "bg-rose-50 text-rose-600 active:bg-rose-100"
            : "bg-neutral-50 text-neutral-600 hover:text-neutral-900 active:bg-neutral-100",
          className,
        )}
        {...props}
      >
        <span className="relative flex size-5 items-center justify-center">
          {liked && <Burst key={burstKey} color="#FB7185" />}
          <Heart
            size={16}
            strokeWidth={2}
            aria-hidden
            className={cn(
              "relative z-10 transition-[scale,fill,color,filter] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-[fill,color,filter]",
              "filter-[drop-shadow(0_1px_1px_rgba(0,0,0,0.22))_drop-shadow(0_2px_3px_rgba(0,0,0,0.12))]",
              liked
                ? "scale-110 fill-rose-500 text-rose-500 filter-[drop-shadow(0_1px_1px_rgba(244,63,94,0.35))_drop-shadow(0_2px_4px_rgba(244,63,94,0.2))]"
                : "scale-100 fill-transparent text-current",
            )}
          />
        </span>

        <span className="tabular-nums">{shown.toLocaleString()}</span>
      </button>
    );
  },
);

LikeButton.displayName = "LikeButton";
