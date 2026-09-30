"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import Image from "next/image";

import { cn } from "@/lib/cn";

export type LinkedInProfileCardProps = Readonly<
  {
    name?: string;
    headline?: string;
    location?: string;
    connections?: string | number;
    bio?: string;
    posts?: string | number;
    experience?: string;
    coverImage?: string;
    avatar?: string;
    coverImageAlt?: string;
    avatarAlt?: string;
    connectLabel?: string;
    messageLabel?: string;
    connectButton?: ReactNode;
    messageButton?: ReactNode;
    onConnect?: () => void;
    onMessage?: () => void;
  } & ComponentPropsWithoutRef<"div">
>;

// Production-ready Linked In Profile component — styled with Tailwind CSS.
export const LinkedInProfileCard = forwardRef<
  HTMLDivElement,
  LinkedInProfileCardProps
>(
  (
    {
      className,
      name = "Bidyut Kundu",
      headline = "Software Developer at OpenSourceUI",
      location = "West Bengal, India",
      connections = "500+",
      bio = "Passionate about open-source, minimal UI, and developer tools.",
      posts = 42,
      experience = "2.5yr",
      coverImage = "/background5.webp",
      avatar = "/profile-picture.png",
      coverImageAlt = "LinkedIn cover image",
      avatarAlt = "Profile avatar",
      connectLabel = "Connect",
      messageLabel = "Message",
      connectButton,
      messageButton,
      onConnect,
      onMessage,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        data-slot="linkedin-profile-card"
        className={cn(
          "w-72 overflow-hidden rounded-xl border border-neutral-100 bg-white font-sans shadow-lg",
          className,
        )}
        {...props}
      >
        {/* Cover */}
        <div className="relative h-20">
          <Image
            src={coverImage}
            alt={coverImageAlt}
            fill
            className="object-cover"
            sizes="288px"
          />

          {/* Avatar */}
          <div className="absolute -bottom-8 left-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-neutral-800 shadow">
            <Image
              src={avatar}
              alt={avatarAlt}
              width={28}
              height={28}
              className="w-7"
              sizes="28px"
            />
          </div>
        </div>

        <div className="px-4 pt-10 pb-4">
          {/* Name */}
          <h4 title={name} className="mt-2 font-bold text-neutral-900">
            {name}
          </h4>

          {/* Headline */}
          <p title={headline} className="text-xs text-neutral-600">
            {headline}
          </p>

          {/* Location + connections */}
          <p className="mt-0.5 text-xs text-neutral-400">
            {location} · {connections} connections
          </p>

          {/* Bio */}
          <p
            title={bio}
            className="mt-2 text-xs leading-relaxed text-neutral-600"
          >
            {bio}
          </p>

          <div className="mt-3 flex gap-2">
            {connectButton ?? (
              <button
                type="button"
                aria-label={`Connect with ${name}`}
                onClick={onConnect}
                className="flex-1 cursor-pointer rounded-full bg-neutral-800 py-1.5 text-xs font-semibold text-white transition-[background-color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-black active:scale-[0.97] motion-reduce:transition-[background-color]"
              >
                {connectLabel}
              </button>
            )}

            {messageButton ?? (
              <button
                type="button"
                aria-label={`Message ${name}`}
                onClick={onMessage}
                className="flex-1 cursor-pointer rounded-full border border-neutral-200 py-1.5 text-xs font-medium text-neutral-600 transition-[background-color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-neutral-50 active:scale-[0.97] motion-reduce:transition-[background-color]"
              >
                {messageLabel}
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-around border-t border-neutral-100 px-4 py-3 text-center">
          <div>
            <p className="text-sm font-bold text-neutral-900">{posts}</p>
            <p className="text-[10px] tracking-wide text-neutral-400 uppercase">
              Posts
            </p>
          </div>

          <div>
            <p className="text-sm font-bold text-neutral-900">{connections}</p>
            <p className="text-[10px] tracking-wide text-neutral-400 uppercase">
              Connections
            </p>
          </div>

          <div>
            <p className="text-sm font-bold text-neutral-900">{experience}</p>
            <p className="text-[10px] tracking-wide text-neutral-400 uppercase">
              Experience
            </p>
          </div>
        </div>
      </div>
    );
  },
);

LinkedInProfileCard.displayName = "LinkedInProfileCard";
