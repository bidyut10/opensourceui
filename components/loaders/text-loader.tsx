"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/cn";

export type TextLoaderVariant = "default" | "sunset" | "ocean" | "neon";

export type TextLoaderProps = Readonly<{
  text?: string;
  variant?: TextLoaderVariant;
  textColor?: string;
  className?: string;
}>;

const colorSchemes = {
  default: {
    midBg: "#7c0911",
    shadows: [
      "0 1px 1px 0 #fff inset, 0 3px 5px 0 #ff5f9f inset, 0 4px 4px 0 #0693ff inset",
      "0 1px 1px 0 #fff inset, 0 3px 5px 0 #d60a47 inset, 0 4px 4px 0 #fbef19 inset",
      "0 1px 1px 0 #fff inset, 0 3px 5px 0 #ff5f9f inset, 0 4px 4px 0 #28a9ff inset",
    ],
  },
  sunset: {
    midBg: "#7c2d12",
    shadows: [
      "0 1px 1px 0 #fff inset, 0 3px 5px 0 #fb923c inset, 0 4px 4px 0 #f97316 inset",
      "0 1px 1px 0 #fff inset, 0 3px 5px 0 #ea580c inset, 0 4px 4px 0 #fbbf24 inset",
      "0 1px 1px 0 #fff inset, 0 3px 5px 0 #fb923c inset, 0 4px 4px 0 #fdba74 inset",
    ],
  },
  ocean: {
    midBg: "#0c4a6e",
    shadows: [
      "0 1px 1px 0 #fff inset, 0 3px 5px 0 #22d3ee inset, 0 4px 4px 0 #0284c7 inset",
      "0 1px 1px 0 #fff inset, 0 3px 5px 0 #06b6d4 inset, 0 4px 4px 0 #38bdf8 inset",
      "0 1px 1px 0 #fff inset, 0 3px 5px 0 #22d3ee inset, 0 4px 4px 0 #7dd3fc inset",
    ],
  },
  neon: {
    midBg: "#14532d",
    shadows: [
      "0 1px 1px 0 #fff inset, 0 3px 5px 0 #4ade80 inset, 0 4px 4px 0 #22d3ee inset",
      "0 1px 1px 0 #fff inset, 0 3px 5px 0 #22c55e inset, 0 4px 4px 0 #2dd4bf inset",
      "0 1px 1px 0 #fff inset, 0 3px 5px 0 #4ade80 inset, 0 4px 4px 0 #38bdf8 inset",
    ],
  },
} as const;

function TextLoaderOrb({
  scheme,
}: Readonly<{
  scheme: (typeof colorSchemes)[TextLoaderVariant];
}>) {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = orbRef.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.style.transform = "rotate(270deg)";
      node.style.backgroundColor = scheme.midBg;
      node.style.boxShadow = scheme.shadows[1];
      return;
    }

    const animation = node.animate(
      [
        {
          transform: "rotate(90deg)",
          backgroundColor: "transparent",
          boxShadow: scheme.shadows[0],
        },
        {
          transform: "rotate(270deg)",
          backgroundColor: scheme.midBg,
          boxShadow: scheme.shadows[1],
          offset: 0.5,
        },
        {
          transform: "rotate(450deg)",
          backgroundColor: "transparent",
          boxShadow: scheme.shadows[2],
        },
      ],
      {
        duration: 1500,
        iterations: Number.POSITIVE_INFINITY,
        easing: "linear",
      },
    );

    return () => animation.cancel();
  }, [scheme]);

  return (
    <div
      ref={orbRef}
      aria-hidden="true"
      className="z-0 size-5 shrink-0 rounded-full bg-transparent will-change-transform motion-reduce:transform-none"
      style={{ transform: "rotate(90deg)" }}
    />
  );
}

export function TextLoader({
  text = "Searching",
  variant = "default",
  textColor = "#ffffff",
  className,
}: TextLoaderProps) {
  const letters = text.split("");
  const scheme = colorSchemes[variant];

  return (
    <div
      data-slot="text-loader"
      data-variant={variant}
      className={cn(
        "relative flex items-center justify-center gap-2.5 select-none",
        className,
      )}
      style={{ color: textColor }}
      role="status"
      aria-live="polite"
      aria-label={text}
    >
      <TextLoaderOrb scheme={scheme} />

      <div className="flex gap-px" aria-hidden="true">
        {letters.map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            className="inline-block animate-pulse rounded-[50ch] border-none opacity-40 will-change-[opacity] motion-reduce:animate-none motion-reduce:opacity-100"
            style={{
              animationDuration: "1.8s",
              animationDelay: `${index * 0.09}s`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}
