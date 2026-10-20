"use client";

import Image from "next/image";
import type { ComponentType } from "react";
import { useSyncExternalStore } from "react";
import { NextJs } from "@/icons/brands/next-js";
import { ReactJs } from "@/icons/brands/react-js";
import { TailwindCSS } from "@/icons/brands/tailwind-css";
import { Typescript } from "@/icons/brands/typescript";

type LayoutConfig = {
  ringStart: number;
  ringStep: number;
  viewPadding: number;
};

const MOBILE_LAYOUT: LayoutConfig = {
  ringStart: 58,
  ringStep: 28,
  viewPadding: 28,
};

const DESKTOP_LAYOUT: LayoutConfig = {
  ringStart: 72,
  ringStep: 34,
  viewPadding: 24,
};

type StackIcon = ComponentType<{
  size?: number;
  className?: string;
}>;

export type TechStackItem = {
  label: string;
  Icon?: StackIcon;
  imageSrc?: string;
  iconClass?: string;
};

type TechStackCenter = {
  src: string;
  alt: string;
};

export type TechStackProps = {
  items: TechStackItem[];
  center?: TechStackCenter | null;
};

const DEFAULT_CENTER: TechStackCenter = {
  src: "/osui-logo.png",
  alt: "Opensource UI",
};

export const TECH_STACK_ITEMS: TechStackItem[] = [
  { label: "React", Icon: ReactJs, iconClass: "text-sky-500" },
  { label: "Next.js", Icon: NextJs, iconClass: "text-neutral-900" },
  { label: "Tailwind v4", Icon: TailwindCSS, iconClass: "text-sky-400" },
  { label: "Lucide", imageSrc: "/lucide-logo.svg" },
  { label: "TypeScript", Icon: Typescript, iconClass: "text-blue-500" },
];

function useIsMdUp() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const media = window.matchMedia("(min-width: 768px)");
      media.addEventListener("change", onStoreChange);
      return () => media.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(min-width: 768px)").matches,
    () => false,
  );
}

function ringRadius(index: number, layout: LayoutConfig) {
  return layout.ringStart + index * layout.ringStep;
}

function itemAngle(index: number, count: number) {
  if (count === 1) return -90;
  return -90 + (360 / count) * index;
}

function getLayout(count: number, config: LayoutConfig) {
  const outerRadius =
    count > 0 ? ringRadius(count - 1, config) : config.ringStart;
  const viewbox = (outerRadius + config.viewPadding) * 2;
  const center = viewbox / 2;

  return { viewbox, center, outerRadius };
}

function nodePosition(angleDeg: number, radius: number, viewbox: number) {
  const rad = (angleDeg * Math.PI) / 180;
  const half = viewbox / 2;

  return {
    left: `${50 + (radius / half) * 50 * Math.cos(rad)}%`,
    top: `${50 + (radius / half) * 50 * Math.sin(rad)}%`,
  };
}

function StackNode({
  item,
  compact,
}: {
  item: TechStackItem;
  compact: boolean;
}) {
  const { Icon, imageSrc, label, iconClass } = item;

  return (
    <div
      className={
        compact
          ? "flex h-8 w-8 items-center justify-center rounded-full border border-neutral-100 bg-white"
          : "flex h-11 w-11 items-center justify-center rounded-full border border-neutral-100 bg-white md:h-12 md:w-12"
      }
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={label}
          width={28}
          height={28}
          className={compact ? "h-3.5 w-3.5" : "h-6 w-6 md:h-7 md:w-7"}
        />
      ) : Icon ? (
        <Icon size={compact ? 14 : 24} className={iconClass} />
      ) : null}
    </div>
  );
}

export function TechStack({ items, center }: TechStackProps) {
  const logo = center ?? DEFAULT_CENTER;
  const isMdUp = useIsMdUp();
  const layout = isMdUp ? DESKTOP_LAYOUT : MOBILE_LAYOUT;
  const { viewbox, center: svgCenter } = getLayout(items.length, layout);

  return (
    <div className="relative mx-auto w-full overflow-visible py-2 md:py-6">
      <div className="relative mx-auto aspect-square w-full md:max-w-[38rem]">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full text-neutral-100"
          viewBox={`0 0 ${viewbox} ${viewbox}`}
          aria-hidden
        >
          {items.map((item, index) => (
            <circle
              key={item.label}
              cx={svgCenter}
              cy={svgCenter}
              r={ringRadius(index, layout)}
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        <div className="absolute top-1/2 left-1/2 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-100 bg-white md:h-[6.5rem] md:w-[6.5rem]">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={512}
            height={512}
            className="h-auto w-[2rem] md:w-[3.75rem]"
          />
        </div>

        {items.map((item, index) => {
          const radius = ringRadius(index, layout);
          const angle = itemAngle(index, items.length);
          const position = nodePosition(angle, radius, viewbox);

          return (
            <div
              key={item.label}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
              style={position}
            >
              <StackNode item={item} compact={!isMdUp} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
