"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

const MENU_ITEMS = ["Music", "Photos", "Extras", "Settings"] as const;

const VISUALIZER_DURATIONS = [
  "0.95s",
  "1.2s",
  "0.88s",
  "1.3s",
  "1.05s",
  "0.92s",
  "1.15s",
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

function IpodVisualizer({ active }: { active: boolean }) {
  return (
    <div className="flex h-4 items-end justify-center gap-px py-0.5">
      {VISUALIZER_DURATIONS.map((duration, barIndex) => (
        <span
          key={barIndex}
          className={cn(
            "h-3 w-0.5 origin-bottom rounded-full bg-neutral-800",
            active && "motion-safe:animate-[ipod-bar_ease-in-out_infinite]",
          )}
          style={{
            animationDuration: duration,
            animationDelay: `${barIndex * 0.08}s`,
          }}
        />
      ))}
    </div>
  );
}

function IpodNowPlaying({ active }: { active: boolean }) {
  return (
    <div className="flex h-full w-full flex-col bg-white font-sans">
      <div className="relative flex-1 overflow-hidden bg-neutral-900">
        <Image
          src="/background6.webp"
          alt=""
          fill
          sizes="180px"
          className={cn(
            "object-cover",
            active &&
              "motion-safe:animate-[showcase-art-zoom_9s_ease-in-out_infinite]",
          )}
        />
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 to-transparent px-2 pt-8 pb-2">
          <p className="truncate text-[9px] font-medium text-white">
            Slow Mornings
          </p>
          <p className="truncate text-[8px] text-white/60">Opensource UI</p>
        </div>
      </div>

      <div className="border-t border-neutral-200 px-2 py-1.5">
        <IpodVisualizer active={active} />
        <div className="mt-1 flex w-full items-center gap-1.5">
          <span className="font-mono text-[7px] text-neutral-400 tabular-nums">
            1:12
          </span>
          <div className="h-0.5 flex-1 overflow-hidden rounded-full bg-neutral-100">
            <div
              className={cn(
                "h-full w-full origin-left rounded-full bg-neutral-800",
                active &&
                  "motion-safe:animate-[showcase-progress_12s_linear_infinite]",
              )}
            />
          </div>
          <span className="font-mono text-[7px] text-neutral-400 tabular-nums">
            3:48
          </span>
        </div>
      </div>
    </div>
  );
}

function IpodMenu({ active }: { active: boolean }) {
  const [selected, setSelected] = useState(MENU_ITEMS.length - 1);

  useEffect(() => {
    if (!active) {
      const resetTimer = globalThis.setTimeout(
        () => setSelected(MENU_ITEMS.length - 1),
        0,
      );
      return () => globalThis.clearTimeout(resetTimer);
    }

    const timers = [
      globalThis.setTimeout(() => setSelected(2), 350),
      globalThis.setTimeout(() => setSelected(1), 700),
      globalThis.setTimeout(() => setSelected(0), 1050),
    ];

    return () => {
      for (const timer of timers) globalThis.clearTimeout(timer);
    };
  }, [active]);

  return (
    <div className="flex h-full w-full flex-col justify-center bg-white px-2 py-2 font-sans">
      <p className="mb-1 text-[8px] font-semibold text-neutral-400 uppercase">
        iPod
      </p>
      <div className="relative">
        <div
          className="ease-smooth absolute inset-x-0 rounded bg-neutral-900 transition-transform duration-700 motion-reduce:transition-none"
          style={{
            height: "18px",
            transform: `translateY(${selected * 18}px)`,
          }}
        />
        {MENU_ITEMS.map((item, itemIndex) => (
          <div
            key={item}
            className="relative flex items-center justify-between rounded px-1.5 py-0.5"
          >
            <p
              className={cn(
                "ease-smooth text-[9px] transition-colors duration-700 motion-reduce:transition-none",
                itemIndex === selected
                  ? "font-medium text-white"
                  : "text-neutral-600",
              )}
            >
              {item}
            </p>
            {itemIndex === selected ? (
              <span className="text-[7px] text-white/70">›</span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function IpodLibrary({ active }: { active: boolean }) {
  const tracks = [
    { title: "Slow Mornings", artist: "Opensource UI" },
    { title: "Craft Bench", artist: "Geist Studio" },
    { title: "Paper Stage", artist: "Instrument" },
  ] as const;
  const [activeTrack, setActiveTrack] = useState(tracks.length - 1);

  useEffect(() => {
    if (!active) {
      const resetTimer = globalThis.setTimeout(
        () => setActiveTrack(tracks.length - 1),
        0,
      );
      return () => globalThis.clearTimeout(resetTimer);
    }

    const timers = [
      globalThis.setTimeout(() => setActiveTrack(1), 450),
      globalThis.setTimeout(() => setActiveTrack(0), 900),
    ];

    return () => {
      for (const timer of timers) globalThis.clearTimeout(timer);
    };
  }, [active, tracks.length]);

  return (
    <div className="flex h-full w-full flex-col justify-center bg-white px-2 py-2 font-sans">
      <p className="mb-1 text-[8px] font-semibold text-neutral-400 uppercase">
        Songs
      </p>
      <div className="relative">
        <div
          className="ease-smooth absolute inset-x-0 rounded bg-neutral-100 transition-transform duration-700 motion-reduce:transition-none"
          style={{
            height: "26px",
            transform: `translateY(${activeTrack * 26}px)`,
          }}
        />
        {tracks.map((track, trackIndex) => (
          <div key={track.title} className="relative rounded px-1.5 py-0.5">
            <p
              className={cn(
                "ease-smooth truncate text-[9px] transition-colors duration-700 motion-reduce:transition-none",
                trackIndex === activeTrack
                  ? "font-medium text-neutral-900"
                  : "text-neutral-600",
              )}
            >
              {track.title}
            </p>
            <p
              className={cn(
                "ease-smooth truncate text-[7px] transition-colors duration-700 motion-reduce:transition-none",
                trackIndex === activeTrack
                  ? "text-neutral-500"
                  : "text-neutral-400",
              )}
            >
              {track.artist}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const SCENES = [
  { id: "menu", duration: 2800, Slide: IpodMenu },
  { id: "library", duration: 2800, Slide: IpodLibrary },
  { id: "now-playing", duration: 6000, Slide: IpodNowPlaying },
] as const;

function IpodDots({ index }: { index: number }) {
  return (
    <div className="absolute inset-x-0 bottom-1 z-20 flex justify-center gap-1">
      {SCENES.map((scene, sceneIndex) => (
        <span
          key={scene.id}
          aria-hidden
          className={cn(
            "ease-smooth rounded-full transition-all duration-500 motion-reduce:transition-none",
            sceneIndex === index
              ? "h-0.5 w-2.5 bg-neutral-800"
              : "size-0.5 bg-neutral-300",
          )}
        />
      ))}
    </div>
  );
}

export function IpodShowcaseScreen() {
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;

    const timeout = globalThis.setTimeout(() => {
      setIndex((current) => (current + 1) % SCENES.length);
    }, SCENES[index].duration);

    return () => globalThis.clearTimeout(timeout);
  }, [index, reducedMotion]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {SCENES.map(({ id, Slide }, sceneIndex) => (
        <div
          key={id}
          aria-hidden={sceneIndex !== index}
          className={cn(
            "ease-smooth absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none",
            sceneIndex === index ? "z-10 opacity-100" : "z-0 opacity-0",
          )}
        >
          <Slide active={sceneIndex === index} />
        </div>
      ))}
      {!reducedMotion ? <IpodDots index={index} /> : null}
    </div>
  );
}
