"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";

import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/cn";

export type UserProfileCardProps = Readonly<
  {
    name?: string;
    title?: string;
    bio?: string;
    image?: string;
    imageAlt?: string;
    emailHref?: string;
    websiteHref?: string;
    emailLabel?: string;
    websiteLabel?: string;
    sectionLabel?: string;
  } & ComponentPropsWithoutRef<"article">
>;

function ProfileLink({
  href,
  label,
}: Readonly<{
  href: string;
  label: string;
}>) {
  const className =
    "group inline-flex items-center gap-1 text-sm text-neutral-800 underline-offset-4 transition-colors hover:text-neutral-950 hover:underline";

  if (!href || href === "#") {
    return (
      <button type="button" className={className}>
        {label}
        <ArrowUpRight
          size={13}
          aria-hidden
          className="transition-transform group-hover:translate-x-px group-hover:-translate-y-px"
        />
      </button>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
      <ArrowUpRight
        size={13}
        aria-hidden
        className="transition-transform group-hover:translate-x-px group-hover:-translate-y-px"
      />
    </Link>
  );
}

// User profile — author byline on warm editorial paper, not another avatar hero card.
export const UserProfileCard = forwardRef<HTMLElement, UserProfileCardProps>(
  (
    {
      className,
      name = "Bidyut Kundu",
      title = "Founder & engineer",
      bio = "Building open-source UI for developers who care about craft, speed, and copy-paste simplicity.",
      image = "/profile-picture.png",
      imageAlt,
      emailHref = "mailto:bidyut.kundu.dev@gmail.com",
      websiteHref = "https://opensourceui.in",
      emailLabel = "bidyut.kundu.dev@gmail.com",
      websiteLabel = "opensourceui.in",
      sectionLabel = "Profile",
      ...props
    },
    ref,
  ) => {
    const alt = imageAlt ?? name;

    return (
      <article
        ref={ref}
        data-slot="user-profile-card"
        className={cn(
          "w-80 border border-neutral-200 bg-[#f6f2eb] p-5 font-sans",
          className,
        )}
        {...props}
      >
        <div className="mb-4 flex items-center justify-between border-b border-neutral-200 pb-3">
          <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-neutral-500 uppercase">
            {sectionLabel}
          </span>
        </div>

        <div className="flex gap-4">
          <div className="size-16 shrink-0 overflow-hidden border border-neutral-300 bg-neutral-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={alt} className="size-full object-cover" />
          </div>

          <div className="min-w-0 pt-0.5">
            <h3 className="font-serif text-2xl leading-none tracking-tight text-neutral-950">
              {name}
            </h3>
            <p className="mt-2 font-mono text-[10px] font-medium tracking-[0.16em] text-neutral-500 uppercase">
              {title}
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-neutral-700">{bio}</p>

        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-neutral-200 pt-4">
          <ProfileLink href={emailHref} label={emailLabel} />
          <ProfileLink href={websiteHref} label={websiteLabel} />
        </div>
      </article>
    );
  },
);

UserProfileCard.displayName = "UserProfileCard";
