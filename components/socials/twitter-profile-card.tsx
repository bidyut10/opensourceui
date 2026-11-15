"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import Image from "next/image";

import { cn } from "@/lib/cn";

import { MapPin, Globe } from "lucide-react";

export type TwitterProfileCardProps = Readonly<
  {
    name?: string;
    username?: string;
    bio?: string;
    location?: string;
    website?: string;
    following?: string | number;
    followers?: string | number;
    coverImage?: string;
    avatar?: string;
    coverImageAlt?: string;
    avatarAlt?: string;
    followLabel?: string;
    locationIcon?: ReactNode;
    websiteIcon?: ReactNode;
    followButton?: ReactNode;
    onFollow?: () => void;
  } & ComponentPropsWithoutRef<"div">
>;

// Production-ready Twitter Profile component — styled with Tailwind CSS.
export const TwitterProfileCard = forwardRef<
  HTMLDivElement,
  TwitterProfileCardProps
>(
  (
    {
      className,
      name = "Bidyut Kundu",
      username = "@bidyutkundu",
      bio = "Building things on the web · Minimalism enthusiast · Open-source",
      location = "West Bengal",
      website = "opensourceui.in",
      following = 320,
      followers = "1.2K",
      coverImage = "/background1.webp",
      avatar = "/profile-picture.png",
      coverImageAlt = "Profile cover image",
      avatarAlt = "Profile avatar",
      followLabel = "Follow",
      locationIcon,
      websiteIcon,
      followButton,
      onFollow,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        data-slot="twitter-profile-card"
        className={cn(
          "w-72 overflow-hidden rounded-2xl border border-neutral-100 bg-white font-sans shadow-lg",
          className,
        )}
        {...props}
      >
        {/* Cover image */}
        <div data-slot="twitter-profile-card-cover" className="relative h-24">
          <Image
            src={coverImage}
            alt={coverImageAlt}
            fill
            className="object-cover"
            sizes="288px"
          />

          {/* Profile avatar */}
          <div className="absolute -bottom-8 left-5 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-neutral-800">
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

        <div
          data-slot="twitter-profile-card-content"
          className="px-5 pt-12 pb-5"
        >
          <div className="flex items-start justify-between">
            <div>
              <p
                title={name}
                className="text-lg leading-none font-semibold text-neutral-900"
              >
                {name}
              </p>

              <p title={username} className="mt-1 text-sm text-neutral-400">
                {username}
              </p>
            </div>

            {followButton ?? (
              <button
                type="button"
                aria-label={`Follow ${name}`}
                onClick={onFollow}
                className="cursor-pointer rounded-full bg-neutral-800 px-3 pt-1 pb-0.5 text-[10px] font-medium text-white transition-[background-color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-black active:scale-[0.97]"
              >
                {followLabel}
              </button>
            )}
          </div>

          {/* Bio */}
          <p
            data-slot="twitter-profile-card-bio"
            title={bio}
            className="mt-4 text-sm leading-relaxed text-neutral-700"
          >
            {bio}
          </p>

          {/* Profile details */}
          <div
            data-slot="twitter-profile-card-details"
            className="mt-4 flex flex-wrap gap-4 text-sm text-neutral-500"
          >
            <span className="flex items-center gap-1">
              {locationIcon ?? <MapPin size={13} />}
              {location}
            </span>

            <span className="flex items-center gap-1">
              {websiteIcon ?? <Globe size={13} />}
              {website}
            </span>
          </div>

          {/* Stats */}
          <div
            data-slot="twitter-profile-card-stats"
            className="mt-4 flex gap-5 text-sm text-neutral-500"
          >
            <span>
              <b className="text-neutral-900">
                {typeof following === "number"
                  ? following.toLocaleString()
                  : following}
              </b>{" "}
              Following
            </span>

            <span>
              <b className="text-neutral-900">
                {typeof followers === "number"
                  ? followers.toLocaleString()
                  : followers}
              </b>{" "}
              Followers
            </span>
          </div>
        </div>
      </div>
    );
  },
);

TwitterProfileCard.displayName = "TwitterProfileCard";
