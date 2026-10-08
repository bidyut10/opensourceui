"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

const DEFAULT_GREETINGS = [
  "hello",
  "bonjour",
  "hola",
  "ciao",
  "olá",
  "namaste",
] as const;

export type AppleHelloLoaderProps = Readonly<{
  greetings?: readonly string[];
  intervalMs?: number;
  fadeMs?: number;
  fill?: boolean;
  className?: string;
}>;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function AppleHelloLoader({
  greetings = DEFAULT_GREETINGS,
  intervalMs = 2600,
  fadeMs = 400,
  fill = false,
  className,
}: AppleHelloLoaderProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const items = greetings.length > 0 ? greetings : DEFAULT_GREETINGS;

  useEffect(() => {
    if (reducedMotion || items.length <= 1) return;

    const interval = globalThis.setInterval(() => {
      setVisible(false);
      globalThis.setTimeout(() => {
        setIndex((current) => (current + 1) % items.length);
        setVisible(true);
      }, fadeMs);
    }, intervalMs);

    return () => globalThis.clearInterval(interval);
  }, [fadeMs, intervalMs, items.length, reducedMotion]);

  return (
    <div
      data-slot="apple-hello-loader"
      className={cn(
        "flex items-center justify-center bg-black",
        fill ? "absolute inset-0" : "min-h-24 min-w-40 rounded-2xl px-6 py-8",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-label={items[index]}
    >
      <p
        className={cn(
          "px-4 text-center font-sans text-lg font-extralight tracking-tight text-white capitalize transition-[opacity,translate] duration-500 motion-reduce:transition-opacity",
          visible ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
        )}
      >
        {items[index]}
      </p>
    </div>
  );
}
