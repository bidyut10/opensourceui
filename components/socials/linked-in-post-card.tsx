"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import Image from "next/image";

import { cn } from "@/lib/cn";

import {
  Clock,
  Ellipsis,
  ThumbsUp,
  MessageCircle,
  Repeat,
  Share2,
} from "lucide-react";

export type LinkedInPostCardProps = Readonly<
  {
    username?: string;
    headline?: string;
    timestamp?: string;
    content?: string;
    hashtags?: string;
    websiteName?: string;
    websiteDescription?: string;
    reactions?: number;
    comments?: number;
    reposts?: number;
    avatar?: string;
    avatarAlt?: string;
    menuIcon?: ReactNode;
    likeIcon?: ReactNode;
    commentIcon?: ReactNode;
    repostIcon?: ReactNode;
    sendIcon?: ReactNode;
    onLike?: () => void;
    onComment?: () => void;
    onRepost?: () => void;
    onSend?: () => void;
  } & ComponentPropsWithoutRef<"div">
>;

// Production-ready Linked In Post component — styled with Tailwind CSS.
export const LinkedInPostCard = forwardRef<
  HTMLDivElement,
  LinkedInPostCardProps
>(
  (
    {
      className,
      username = "Bidyut Kundu",
      headline = "Software Developer · 1st",
      timestamp = "2h",
      content = "Excited to share my latest open-source UI library — built with accessibility and performance in mind.",
      hashtags = "#OpenSource #UI #React #FrontendDev",
      websiteName = "nexticons.in",
      websiteDescription = "Minimal, performant UI components for modern apps.",
      reactions = 842,
      comments = 57,
      reposts = 23,
      avatar = "/profile-picture.png",
      avatarAlt = "User avatar",
      menuIcon,
      likeIcon,
      commentIcon,
      repostIcon,
      sendIcon,
      onLike,
      onComment,
      onRepost,
      onSend,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        data-slot="linkedin-post-card"
        className={cn(
          "w-sm rounded-xl border border-neutral-100 bg-white p-5 font-sans shadow-lg",
          className,
        )}
        {...props}
      >
        {/* Post header */}
        <div data-slot="linkedin-post-card-header" className="mb-3 flex gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-800">
            <Image
              src={avatar}
              alt={avatarAlt}
              width={32}
              height={32}
              className="w-8"
              sizes="32px"
            />
          </div>

          <div>
            <p
              title={username}
              className="text-sm font-semibold text-neutral-900"
            >
              {username}
            </p>

            <p title={headline} className="text-xs text-neutral-500">
              {headline}
            </p>

            <p className="text-xs text-neutral-400">
              {timestamp} · <Clock className="inline" size={12} />
            </p>
          </div>

          <div className="ml-auto text-neutral-400">
            {menuIcon ?? <Ellipsis size={15} />}
          </div>
        </div>

        {/* Post content */}
        <p
          data-slot="linkedin-post-card-content"
          className="mb-3 text-sm leading-relaxed text-neutral-800"
        >
          {content}
          <br />
          <span className="text-blue-600">{hashtags}</span>
        </p>

        {/* Link preview */}
        <div
          data-slot="linkedin-post-card-preview"
          className="mb-3 rounded-lg border border-neutral-200 bg-neutral-50 p-3"
        >
          <p className="text-xs font-semibold text-neutral-800">
            {websiteName}
          </p>

          <p className="text-xs text-neutral-500">{websiteDescription}</p>
        </div>

        {/* Engagement summary */}
        <div
          data-slot="linkedin-post-card-stats"
          className="flex items-center justify-between border-t border-neutral-100 pt-3 text-xs text-neutral-500"
        >
          <span className="flex items-center gap-1">
            {likeIcon ?? <ThumbsUp size={13} className="text-blue-600" />}
            {reactions.toLocaleString()} reactions
          </span>

          <span>
            {comments.toLocaleString()} comments · {reposts.toLocaleString()}{" "}
            reposts
          </span>
        </div>

        {/* Post actions */}
        <div
          data-slot="linkedin-post-card-actions"
          className="mt-3 flex gap-1 border-t border-neutral-100 pt-3"
        >
          <button
            type="button"
            aria-label={`Like post from ${username}`}
            onClick={onLike}
            className="flex flex-1 cursor-pointer flex-col items-center gap-1 rounded-md py-1 text-[11px] font-medium text-neutral-500 transition-[color,background-color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-neutral-50 hover:text-neutral-900 active:scale-[0.97] motion-reduce:transition-[color,background-color]"
          >
            {likeIcon ?? <ThumbsUp size={14} />}
            Like
          </button>

          <button
            type="button"
            aria-label={`Comment on post from ${username}`}
            onClick={onComment}
            className="flex flex-1 cursor-pointer flex-col items-center gap-1 rounded-md py-1 text-[11px] font-medium text-neutral-500 transition-[color,background-color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-neutral-50 hover:text-neutral-900 active:scale-[0.97] motion-reduce:transition-[color,background-color]"
          >
            {commentIcon ?? <MessageCircle size={14} />}
            Comment
          </button>

          <button
            type="button"
            aria-label={`Repost post from ${username}`}
            onClick={onRepost}
            className="flex flex-1 cursor-pointer flex-col items-center gap-1 rounded-md py-1 text-[11px] font-medium text-neutral-500 transition-[color,background-color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-neutral-50 hover:text-neutral-900 active:scale-[0.97] motion-reduce:transition-[color,background-color]"
          >
            {repostIcon ?? <Repeat size={14} />}
            Repost
          </button>

          <button
            type="button"
            aria-label={`Send post from ${username}`}
            onClick={onSend}
            className="flex flex-1 cursor-pointer flex-col items-center gap-1 rounded-md py-1 text-[11px] font-medium text-neutral-500 transition-[color,background-color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-neutral-50 hover:text-neutral-900 active:scale-[0.97] motion-reduce:transition-[color,background-color]"
          >
            {sendIcon ?? <Share2 size={14} />}
            Send
          </button>
        </div>
      </div>
    );
  },
);

LinkedInPostCard.displayName = "LinkedInPostCard";
