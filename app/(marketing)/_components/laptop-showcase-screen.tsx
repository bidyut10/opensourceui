"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

function ShellChrome() {
  return (
    <div className="flex items-center justify-between border-b border-neutral-100 px-3 py-1.5">
      <div className="flex items-center gap-1.5">
        <div className="size-2 rounded-sm bg-neutral-900" aria-hidden />
        <span className="text-[8px] font-medium text-neutral-700">
          Opensource UI
        </span>
      </div>
      <div className="flex gap-1" aria-hidden>
        <span className="size-1 rounded-full bg-neutral-300" />
        <span className="size-1 rounded-full bg-neutral-300" />
        <span className="size-1 rounded-full bg-neutral-300" />
      </div>
    </div>
  );
}

function HeroScene() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
      <p className="font-serif text-[13px] leading-tight text-neutral-900">
        Ship UI faster
      </p>
      <p className="mt-1 max-w-36 text-[8px] leading-relaxed text-neutral-400">
        Copy-paste components for your next project
      </p>
      <button
        type="button"
        className="mt-3 rounded-md bg-neutral-900 px-3 py-1 text-[9px] font-medium text-white"
      >
        Get started
      </button>
    </div>
  );
}

function CardsScene() {
  return (
    <div className="grid flex-1 grid-cols-2 gap-2 p-3">
      <div className="relative rounded-lg border border-neutral-200 bg-white p-2">
        <span className="absolute top-1.5 right-1.5 rounded bg-neutral-900 px-1 py-px text-[6px] font-medium tracking-wide text-white uppercase">
          New
        </span>
        <div className="h-8 rounded-md bg-neutral-100" />
        <div className="mt-1.5 h-1 w-3/4 rounded-full bg-neutral-200" />
        <div className="mt-1 h-1 w-1/2 rounded-full bg-neutral-100" />
      </div>
      <div className="rounded-lg border border-neutral-200 bg-white p-2">
        <div className="h-8 rounded-md bg-neutral-100" />
        <div className="mt-1.5 h-1 w-3/4 rounded-full bg-neutral-200" />
        <div className="mt-1 h-1 w-1/2 rounded-full bg-neutral-100" />
      </div>
      <div className="rounded-lg border border-neutral-200 bg-white p-2">
        <div className="h-8 rounded-md bg-neutral-100" />
        <div className="mt-1.5 h-1 w-3/4 rounded-full bg-neutral-200" />
        <div className="mt-1 h-1 w-1/2 rounded-full bg-neutral-100" />
      </div>
      <div className="rounded-lg border border-neutral-200 bg-white p-2">
        <div className="h-8 rounded-md bg-neutral-100" />
        <div className="mt-1.5 h-1 w-3/4 rounded-full bg-neutral-200" />
        <div className="mt-1 h-1 w-1/2 rounded-full bg-neutral-100" />
      </div>
    </div>
  );
}

function SearchScene() {
  return (
    <div className="flex flex-1 flex-col justify-center px-4">
      <p className="text-[8px] font-medium text-neutral-500">Browse</p>
      <div className="mt-1 rounded-md border border-neutral-200 bg-white px-2 py-1.5 text-[9px] text-neutral-400">
        Search components…
      </div>
      <div className="mt-2 space-y-1.5">
        {["Buttons", "Cards", "Forms"].map((item) => (
          <div
            key={item}
            className="flex items-center justify-between rounded-md border border-neutral-100 bg-white px-2 py-1"
          >
            <span className="text-[8px] text-neutral-600">{item}</span>
            <span className="text-[7px] text-neutral-300">›</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const SCENES = [
  { id: "hero", Scene: HeroScene },
  { id: "cards", Scene: CardsScene },
  { id: "search", Scene: SearchScene },
] as const;

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

export function LaptopShowcaseScreen() {
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;

    const interval = globalThis.setInterval(() => {
      setIndex((current) => (current + 1) % SCENES.length);
    }, 3500);

    return () => globalThis.clearInterval(interval);
  }, [reducedMotion]);

  return (
    <div className="absolute inset-0 flex flex-col bg-neutral-50 font-sans">
      <ShellChrome />

      <div className="relative flex min-h-0 flex-1 flex-col">
        {SCENES.map(({ id, Scene }, sceneIndex) => (
          <div
            key={id}
            aria-hidden={sceneIndex !== index}
            className={cn(
              "absolute inset-0 flex flex-col",
              sceneIndex === index
                ? "ease-smooth z-10 opacity-100 transition-opacity duration-500 motion-reduce:transition-none"
                : "pointer-events-none z-0 opacity-0",
            )}
          >
            <Scene />
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-1 border-t border-neutral-100 py-1.5">
        {SCENES.map((scene, sceneIndex) => (
          <span
            key={scene.id}
            aria-hidden
            className={cn(
              "ease-smooth rounded-full transition-all duration-300 motion-reduce:transition-none",
              sceneIndex === index
                ? "size-1 bg-neutral-800"
                : "size-0.5 bg-neutral-300",
            )}
          />
        ))}
      </div>
    </div>
  );
}
