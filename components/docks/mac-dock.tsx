"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

import Link from "next/link";

import { cn } from "@/lib/cn";

import {
  AdobePhotoshopIcon,
  AppleAppStoreIcon,
  AppleMusicIcon,
  AppleSafariIcon,
  NotionCalendarIcon,
  SpotifyIcon,
} from "./Icons";

export type MacDockItem = Readonly<{
  title: string;
  icon: ReactNode;
  href: string;
}>;

export type MacDockProps = Readonly<
  {
    items?: readonly MacDockItem[];
    desktopClassName?: string;
  } & Omit<ComponentPropsWithoutRef<"div">, "children">
>;

const DEFAULT_ITEMS: readonly MacDockItem[] = [
  {
    title: "Adobe Photoshop",
    href: "#",
    icon: <AdobePhotoshopIcon className="size-full" />,
  },
  {
    title: "Spotify",
    href: "#",
    icon: <SpotifyIcon className="size-full" />,
  },
  {
    title: "Notion Calendar",
    href: "#",
    icon: <NotionCalendarIcon className="size-full" />,
  },
  {
    title: "Apple Music",
    href: "#",
    icon: <AppleMusicIcon className="size-full" />,
  },
  {
    title: "App Store",
    href: "#",
    icon: <AppleAppStoreIcon className="size-full" />,
  },
  {
    title: "Safari",
    href: "#",
    icon: <AppleSafariIcon className="size-full" />,
  },
];

function DockLink({
  href,
  className,
  children,
  ariaLabel,
}: Readonly<{
  href: string;
  className?: string;
  children: ReactNode;
  ariaLabel: string;
}>) {
  if (!href || href === "#") {
    return (
      <button type="button" aria-label={ariaLabel} className={className}>
        {children}
      </button>
    );
  }

  return (
    <Link href={href} aria-label={ariaLabel} className={className}>
      {children}
    </Link>
  );
}

function DockIcon({ item }: Readonly<{ item: MacDockItem }>) {
  return (
    <DockLink
      href={item.href}
      ariaLabel={item.title}
      className="group relative z-10 flex flex-col items-center outline-none"
    >
      <span className="ease-smooth pointer-events-none absolute -top-10 left-1/2 z-20 -translate-x-1/2 rounded-md bg-neutral-950 px-2 py-0.5 text-[10px] font-medium whitespace-nowrap text-white opacity-0 shadow-sm transition-[opacity,transform] duration-200 group-hover:-translate-y-0.5 group-hover:opacity-100 group-focus-visible:opacity-100">
        {item.title}
      </span>

      {/* Transform on the outer wrapper — backdrop-blur fails if transform/will-change sit on the same node. */}
      <span className="ease-smooth origin-bottom cursor-pointer transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-125 group-focus-visible:-translate-y-2 group-focus-visible:scale-125">
        <span className="flex size-11 items-center justify-center rounded-lg border border-white/20 bg-white/50 shadow-xs shadow-black/5 backdrop-blur-xl">
          <span className="size-8">{item.icon}</span>
        </span>
      </span>
    </DockLink>
  );
}

// Mac dock — frosted app tray with smooth hover lift (design reference for docks/).
export const MacDock = forwardRef<HTMLDivElement, MacDockProps>(
  ({ className, items = DEFAULT_ITEMS, desktopClassName, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="mac-dock"
      className={cn("relative overflow-visible pt-10 font-sans", className)}
      {...props}
    >
      <nav
        aria-label="Application dock"
        className={cn(
          "relative mx-auto inline-flex items-end gap-2.5 p-3",
          desktopClassName,
        )}
      >
        {/* Tray glass as a sibling layer so icon tiles can blur the page behind, not a nested filter. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl border border-white/20 bg-white/10 shadow-xl shadow-black/10 backdrop-blur-md"
        />
        {items.map((item) => (
          <DockIcon key={item.title} item={item} />
        ))}
      </nav>
    </div>
  ),
);

MacDock.displayName = "MacDock";
