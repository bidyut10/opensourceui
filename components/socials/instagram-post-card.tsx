"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import Image from "next/image";

import { cn } from "@/lib/cn";

import {
  Ellipsis,
  ThumbsUp,
  MessageCircle,
  Bookmark,
  Share2,
} from "lucide-react";

export type InstagramPostCardProps = Readonly<
  {
    username?: string;
    location?: string;
    likes?: number;
    caption?: string;
    hashtags?: string;
    timestamp?: string;
    avatar?: string;
    postImage?: string;
    avatarAlt?: string;
    imageAlt?: string;
    imagePriority?: boolean;
    likeIcon?: ReactNode;
    commentIcon?: ReactNode;
    shareIcon?: ReactNode;
    bookmarkIcon?: ReactNode;
    onLike?: () => void;
    onComment?: () => void;
    onShare?: () => void;
    onBookmark?: () => void;
  } & ComponentPropsWithoutRef<"div">
>;

// Production-ready Instagram Post component — styled with Tailwind CSS.
export const InstagramPostCard = forwardRef<
  HTMLDivElement,
  InstagramPostCardProps
>(
  (
    {
      className,
      username = "bidyut.dev",
      location = "West Bengal, India",
      likes = 1204,
      caption = "New card UI drop. Minimal, clean, and open-source.",
      hashtags = "#uidesign #reactjs #webdev",
      timestamp = "2 hours ago",
      avatar = "/profile-picture.png",
      postImage = "/background1.webp",
      avatarAlt = "User avatar",
      imageAlt = "Instagram post image",
      imagePriority = false,
      likeIcon,
      commentIcon,
      shareIcon,
      bookmarkIcon,
      onLike,
      onComment,
      onShare,
      onBookmark,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        data-slot="instagram-post-card"
        className={cn(
          "w-xs overflow-hidden rounded-xl border border-neutral-100 bg-white font-sans shadow-lg",
          className,
        )}
        {...props}
      >
        {/* Profile header */}
        <div
          data-slot="instagram-post-card-header"
          className="flex items-center gap-2 px-3 py-2.5"
        >
          <div className="h-8 w-8 rounded-full bg-linear-to-tr from-yellow-400 via-pink-500 to-blue-600 p-0.5">
            <div className="h-full w-full rounded-full bg-white p-0.5">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-neutral-900">
                <Image
                  src={avatar}
                  alt={avatarAlt}
                  width={16}
                  height={16}
                  className="w-4"
                  sizes="16px"
                />
              </div>
            </div>
          </div>

          <div>
            <p
              title={username}
              className="text-xs font-semibold text-neutral-900"
            >
              {username}
            </p>

            <p title={location} className="text-[10px] text-neutral-400">
              {location}
            </p>
          </div>

          <button
            type="button"
            aria-label="More options"
            className="ml-auto cursor-pointer text-neutral-400"
          >
            <Ellipsis size={15} aria-hidden />
          </button>
        </div>

        {/* Post image */}
        <div className="relative h-36 w-full">
          <Image
            data-slot="instagram-post-card-image"
            src={postImage}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="320px"
            priority={imagePriority}
          />
        </div>

        {/* Post content */}
        <div className="px-3 pt-2.5 pb-3">
          {/* Engagement actions */}
          <div
            data-slot="instagram-post-card-actions"
            className="mb-2 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label={`Like post from ${username}`}
                onClick={onLike}
                className="cursor-pointer text-neutral-700 transition-[color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-black active:scale-[0.97] motion-reduce:transition-[color]"
              >
                {likeIcon ?? <ThumbsUp size={15} />}
              </button>

              <button
                type="button"
                aria-label={`Comment on post from ${username}`}
                onClick={onComment}
                className="cursor-pointer text-neutral-700 transition-[color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-black active:scale-[0.97] motion-reduce:transition-[color]"
              >
                {commentIcon ?? <MessageCircle size={15} />}
              </button>

              <button
                type="button"
                aria-label={`Share post from ${username}`}
                onClick={onShare}
                className="cursor-pointer text-neutral-700 transition-[color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-black active:scale-[0.97] motion-reduce:transition-[color]"
              >
                {shareIcon ?? <Share2 size={15} />}
              </button>
            </div>

            <button
              type="button"
              aria-label={`Save post from ${username}`}
              onClick={onBookmark}
              className="cursor-pointer text-neutral-700 transition-[color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-black active:scale-[0.97] motion-reduce:transition-[color]"
            >
              {bookmarkIcon ?? <Bookmark size={15} />}
            </button>
          </div>

          <p className="mb-1 text-xs font-semibold text-neutral-900">
            {likes.toLocaleString("en-US")} likes
          </p>

          <p className="text-xs leading-relaxed text-neutral-800">
            <span className="font-semibold">{username}</span> {caption}{" "}
            <span className="text-blue-500">{hashtags}</span>
          </p>

          <p className="mt-1 text-[10px] tracking-wide text-neutral-400 uppercase">
            {timestamp}
          </p>
        </div>
      </div>
    );
  },
);

InstagramPostCard.displayName = "InstagramPostCard";
