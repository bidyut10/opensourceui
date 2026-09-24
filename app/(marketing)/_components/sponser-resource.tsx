import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import { TailwindCSS } from "@/icons/brands/tailwind-css";
import { Typescript } from "@/icons/brands/typescript";
import { Vercel } from "@/icons/brands/vercel";
import { Unplash } from "@/icons/brands/unplash";
import { NextJs } from "@/icons/brands/next-js";
import { Sentry } from "@/icons/brands/sentry";
import { siteConfig } from "@/lib/site";
import { SponsorPlaceholderRow } from "./sponsor-placeholder-row";

type ResourceItem = {
  name: string;
  description: string;
  shortDescription?: string;
  href: string;
  domain?: string;
  color?: string;
  Icon?: ComponentType<{ size?: number; className?: string }>;
  imageSrc?: string;
  letter?: string;
};

const resources: ResourceItem[] = [
  {
    name: "Vercel",
    description: "For deploying",
    href: "https://vercel.com",
    Icon: Vercel,
  },
  {
    name: "Tailwind CSS",
    description: "For styling",
    href: "https://tailwindcss.com",
    Icon: TailwindCSS,
    color: "text-sky-400",
  },
  {
    name: "PostHog",
    description: "For tracking",
    href: "https://posthog.com",
    imageSrc: "/posthog.png",
  },
  {
    name: "Dither.it",
    description: "For making images better",
    href: "https://ditherit.com",
    letter: "D",
    color: "text-rose-400",
  },
  {
    name: "Cursor",
    description: "For Editor",
    href: "https://cursor.com",
    imageSrc: "/cursor.webp",
  },
  {
    name: "Unplash",
    description: "For background images",
    href: "https://unsplash.com",
    Icon: Unplash,
  },
  {
    name: "Lucide",
    description: "For icons",
    href: "https://lucide.dev",
    imageSrc: "/lucide-logo.svg",
  },
  {
    name: "TypeScript",
    description: "For type safety",
    href: "https://www.typescriptlang.org",
    Icon: Typescript,
    color: "text-blue-500",
  },
  {
    name: "Next.js",
    description: "For building web applications",
    href: "https://nextjs.org",
    Icon: NextJs,
  },
  {
    name: "Flaticon",
    description: "For image PNGs",
    href: "https://www.flaticon.com",
    imageSrc: "/flaticon.png",
  },
];

function getDomain(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

function ListIcon({ item }: { item: ResourceItem }) {
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

function ListRow({
  item,
  placeholder = false,
}: {
  item: ResourceItem;
  placeholder?: boolean;
}) {
  const domain = item.domain ?? getDomain(item.href);
  const mobileDescription = item.shortDescription ?? item.description;

  const nameClass = placeholder
    ? "font-semibold text-neutral-400 group-hover:text-neutral-600"
    : "font-semibold text-neutral-900 group-hover:text-neutral-700";

  const descriptionClass = placeholder
    ? "text-neutral-400 group-hover:text-neutral-500"
    : "text-neutral-500";

  return (
    <li className="min-w-0">
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex min-w-0 items-center gap-2.5 py-0.5 max-[499px]:gap-2"
      >
        {placeholder ? (
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-dashed border-neutral-300">
            <span className="font-sans text-[10px] text-neutral-400">+</span>
          </div>
        ) : (
          <ListIcon item={item} />
        )}
        <div className="flex min-w-0 flex-1 items-center gap-3 max-[499px]:gap-2">
          <p className="hidden min-w-0 flex-1 truncate font-sans text-sm leading-snug min-[500px]:block">
            <span className={nameClass}>{item.name}</span>
            <span className="text-neutral-300"> / </span>
            <span className={descriptionClass}>{item.description}</span>
          </p>

          <div className="flex min-w-0 flex-1 items-baseline overflow-hidden min-[500px]:hidden">
            <span
              className={`shrink-0 font-sans text-xs leading-snug ${nameClass}`}
            >
              {item.name}
            </span>
            <span className="shrink-0 px-1 font-sans text-xs text-neutral-300">
              /
            </span>
            <span
              className={`min-w-0 truncate font-sans text-xs leading-snug ${descriptionClass}`}
            >
              {mobileDescription}
            </span>
          </div>

          <span
            className={
              placeholder
                ? "shrink-0 font-mono text-sm text-neutral-300 group-hover:text-neutral-400 max-[499px]:text-[11px]"
                : "shrink-0 font-mono text-sm text-neutral-400 group-hover:text-neutral-500 max-[499px]:text-[11px]"
            }
          >
            {domain}
          </span>
        </div>
      </a>
    </li>
  );
}

const sponsors: ResourceItem[] = [
  {
    name: "Sentry",
    description: "Open-source sponsor — error monitoring",
    shortDescription: "OSS error monitoring",
    href: "https://sentry.io/for/open-source/",
    domain: "sentry.io",
    Icon: Sentry,
  },
];

const sponsorPlaceholder = {
  name: "Your brand",
  description: "Gold or Platinum — see plans",
  shortDescription: "See plans",
  domain: "yoursite.com",
} as const;

export function OpenSourcePanel() {
  return (
    <div className="mt-10 min-w-0 space-y-8 max-[499px]:overflow-hidden">
      <section>
        <h3 className="font-sans text-sm font-semibold text-neutral-900">
          <Link
            href={siteConfig.sponsorship.path}
            className="transition-colors hover:text-neutral-600"
          >
            Sponsors
          </Link>
        </h3>
        <ul className="mt-4 flex flex-col gap-2.5">
          {sponsors.map((item) => (
            <ListRow key={item.name} item={item} />
          ))}
          <SponsorPlaceholderRow {...sponsorPlaceholder} />
        </ul>
      </section>

      <section>
        <h3 className="font-sans text-sm font-semibold text-neutral-900">
          Resources
        </h3>
        <ul className="mt-4 flex flex-col gap-2.5">
          {[...resources]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((item) => (
              <ListRow key={item.name} item={item} />
            ))}
        </ul>
      </section>
    </div>
  );
}
