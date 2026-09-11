import Image from "next/image";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ComponentType,
  type SVGProps,
} from "react";

import { cn } from "@/lib/cn";
import { ProductHunt } from "@/icons/brands/producthunt";

export type ResourceLinkItem = Readonly<{
  name: string;
  description: string;
  shortDescription?: string;
  href: string;
  domain?: string;
  color?: string;
  Icon?: ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
  imageSrc?: string;
  letter?: string;
}>;

const DEMO_ITEMS: ResourceLinkItem[] = [
  {
    name: "Cursor",
    description: "For Editor",
    href: "https://cursor.com",
    imageSrc: "/cursor.webp",
  },
  {
    name: "Dither.it",
    description: "For making images better",
    href: "https://ditherit.com",
    letter: "D",
    color: "text-rose-400",
  },
  {
    name: "Lucide",
    description: "For icons",
    href: "https://lucide.dev",
    imageSrc: "/lucide-logo.svg",
  },
  {
    name: "Product Hunt",
    description: "For new products",
    href: "https://www.producthunt.com",
    Icon: ProductHunt,
    color: "text-red-400",
  },
];

export type ResourceLinksPanelProps = Readonly<
  {
    title?: string;
    items?: readonly ResourceLinkItem[];
    sortItems?: boolean;
  } & ComponentPropsWithoutRef<"div">
>;

function getDomain(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

function ListIcon({ item }: { item: ResourceLinkItem }) {
  const { Icon, imageSrc, letter, color } = item;
  const iconColor = color ?? "text-neutral-800";
  const letterColor = color ?? "text-neutral-600";

  return (
    <div className="flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden">
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          width={20}
          height={20}
          className="h-5 w-5 rounded object-contain"
        />
      ) : Icon ? (
        <Icon size={16} className={iconColor} />
      ) : (
        <span className={`font-sans text-[16px] font-semibold ${letterColor}`}>
          {letter}
        </span>
      )}
    </div>
  );
}

function ListRow({ item }: { item: ResourceLinkItem }) {
  const domain = item.domain ?? getDomain(item.href);
  const mobileDescription = item.shortDescription ?? item.description;

  return (
    <li className="min-w-0">
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex min-w-0 items-center gap-2.5 py-0.5 max-[499px]:gap-2"
      >
        <ListIcon item={item} />
        <div className="flex min-w-0 flex-1 items-center gap-3 max-[499px]:gap-2">
          <p className="hidden min-w-0 flex-1 truncate font-sans text-sm leading-snug min-[500px]:block">
            <span className="font-semibold text-neutral-900 group-hover:text-neutral-700">
              {item.name}
            </span>
            <span className="text-neutral-300"> / </span>
            <span className="text-neutral-500">{item.description}</span>
          </p>

          <div className="flex min-w-0 flex-1 items-baseline overflow-hidden min-[500px]:hidden">
            <span className="shrink-0 font-sans text-xs leading-snug font-semibold text-neutral-900 group-hover:text-neutral-700">
              {item.name}
            </span>
            <span className="shrink-0 px-1 font-sans text-xs text-neutral-300">
              /
            </span>
            <span className="min-w-0 truncate font-sans text-xs leading-snug text-neutral-500">
              {mobileDescription}
            </span>
          </div>

          <span className="shrink-0 font-mono text-sm text-neutral-400 group-hover:text-neutral-500 max-[499px]:text-[11px]">
            {domain}
          </span>
        </div>
      </a>
    </li>
  );
}

// Resource link list — same row layout as the homepage Resources section. Copy, pass title + items.
export const ResourceLinksPanel = forwardRef<
  HTMLDivElement,
  ResourceLinksPanelProps
>(function ResourceLinksPanel(
  {
    title = "Resources",
    items = DEMO_ITEMS,
    sortItems = true,
    className,
    ...props
  },
  ref,
) {
  const rows = sortItems
    ? [...items].sort((a, b) => a.name.localeCompare(b.name))
    : items;

  return (
    <div
      ref={ref}
      className={cn("min-w-0 max-[499px]:overflow-hidden", className)}
      {...props}
    >
      <section>
        <h3 className="font-sans text-sm font-semibold text-neutral-900">
          {title}
        </h3>
        <ul className="mt-4 flex flex-col gap-2.5">
          {rows.map((item) => (
            <ListRow key={item.name} item={item} />
          ))}
        </ul>
      </section>
    </div>
  );
});

ResourceLinksPanel.displayName = "ResourceLinksPanel";
