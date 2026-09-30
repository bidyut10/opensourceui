"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import Image from "next/image";

import { cn } from "@/lib/cn";
import {
  Bookmark,
  MessageCircle,
  Ellipsis,
  Heart,
  Repeat,
  Share,
} from "lucide-react";

export type TwitterPostCardProps = Readonly<
  {
    username?: string;
    handle?: string;
    timestamp?: string;
    content?: string;
    hashtags?: string;
    comments?: number;
    reposts?: number;
    likes?: number;
    avatar?: string;
    avatarAlt?: string;
    menuIcon?: ReactNode;
    commentIcon?: ReactNode;
    repostIcon?: ReactNode;
    likeIcon?: ReactNode;
    bookmarkIcon?: ReactNode;
    shareIcon?: ReactNode;
    onComment?: () => void;
    onRepost?: () => void;
    onLike?: () => void;
    onBookmark?: () => void;
    onShare?: () => void;
  } & ComponentPropsWithoutRef<"div">
>;

// Production-ready Twitter Post component — styled with Tailwind CSS.
export const TwitterPostCard = forwardRef<HTMLDivElement, TwitterPostCardProps>(
  (
    {
      className,
      username = "Bidyut Kundu",
      handle = "@bidyut10",
      timestamp = "2h",
      content = "Building the future of UI with minimalist design and performance-first components. Obsessed with the little details.",
      hashtags = "#WebDev #Design",
      comments = 12,
      reposts = 38,
      likes = 450,
      avatar = "/profile-picture.png",
      avatarAlt = "User avatar",
      menuIcon,
      commentIcon,
      repostIcon,
      likeIcon,
      bookmarkIcon,
      shareIcon,
      onComment,
      onRepost,
      onLike,
      onBookmark,
      onShare,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        data-slot="twitter-post-card"
        className={cn(
          "max-w-96 rounded-2xl border border-neutral-100 bg-white p-5 font-sans shadow-lg",
          className,
        )}
        {...props}
      >
        <div data-slot="twitter-post-card-header" className="flex gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-800">
            <Image
              src={avatar}
              alt={avatarAlt}
              width={32}
              height={32}
              className="w-8"
              sizes="32px"
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap items-center gap-1">
                <span
                  title={username}
                  className="text-sm font-bold text-neutral-900"
                >
                  {username}
                </span>

                <span title={handle} className="text-xs text-neutral-400">
                  {handle} · {timestamp}
                </span>
              </div>

              <div className="shrink-0 text-neutral-400">
                {menuIcon ?? <Ellipsis className="h-4 w-4" />}
              </div>
            </div>

            <p
              data-slot="twitter-post-card-content"
              className="mt-2 text-sm leading-relaxed text-neutral-800"
            >
              {content} <span className="text-sky-500">{hashtags}</span>
            </p>

            <div
              data-slot="twitter-post-card-actions"
              className="mt-4 flex max-w-xs justify-between text-neutral-400"
            >
              <button
                type="button"
                aria-label={`Comment on post from ${username}`}
                onClick={onComment}
                className="flex cursor-pointer items-center gap-1 transition-[color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-sky-500 active:scale-[0.97] motion-reduce:transition-[color]"
              >
                {commentIcon ?? <MessageCircle size={14} />}
                <span className="text-xs">{comments.toLocaleString()}</span>
              </button>

              <button
                type="button"
                aria-label={`Repost post from ${username}`}
                onClick={onRepost}
                className="flex cursor-pointer items-center gap-1 transition-[color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-emerald-500 active:scale-[0.97] motion-reduce:transition-[color]"
              >
                {repostIcon ?? <Repeat size={16} />}
                <span className="text-xs">{reposts.toLocaleString()}</span>
              </button>

              <button
                type="button"
                aria-label={`Like post from ${username}`}
                onClick={onLike}
                className="flex cursor-pointer items-center gap-1 transition-[color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-rose-500 active:scale-[0.97] motion-reduce:transition-[color]"
              >
                {likeIcon ?? <Heart size={15} />}
                <span className="text-xs">{likes.toLocaleString()}</span>
              </button>

              <button
                type="button"
                aria-label={`Save post from ${username}`}
                onClick={onBookmark}
                className="flex cursor-pointer items-center gap-1 transition-[color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-sky-500 active:scale-[0.97] motion-reduce:transition-[color]"
              >
                {bookmarkIcon ?? <Bookmark size={15} />}
              </button>

              <button
                type="button"
                aria-label={`Share post from ${username}`}
                onClick={onShare}
                className="flex cursor-pointer items-center gap-1 transition-[color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-sky-500 active:scale-[0.97] motion-reduce:transition-[color]"
              >
                {shareIcon ?? <Share size={14} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

TwitterPostCard.displayName = "TwitterPostCard";
