import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MoveRight, Quote, Star } from "lucide-react";

import { ProductHunt } from "@/icons/brands/producthunt";
import { Twitter } from "@/icons/brands/twitter";
import { HOME_REVIEWS, PRODUCT_HUNT_URL } from "@/lib/home/testimonials";
import type { HomeReview, ReviewPlatform } from "@/lib/home/testimonials";

const RATING_STARS = [
  "star-1",
  "star-2",
  "star-3",
  "star-4",
  "star-5",
] as const;

function PlatformIcon({ platform }: Readonly<{ platform: ReviewPlatform }>) {
  if (platform === "product-hunt") {
    return (
      <ProductHunt
        size={16}
        className="shrink-0 text-[#DA552F]"
        aria-label="Product Hunt"
      />
    );
  }

  return (
    <Twitter
      size={14}
      className="shrink-0 text-neutral-900"
      aria-label="X (Twitter)"
    />
  );
}

function ReviewCard({
  quote,
  name,
  platform,
  href,
  avatar,
  role,
  rating = 5,
}: HomeReview) {
  const subtitle =
    role ?? (platform === "product-hunt" ? "Product Hunt" : "Twitter");

  return (
    <figure className="flex w-full flex-col rounded-2xl border border-neutral-100 bg-white p-4 md:h-full md:min-w-0">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="relative size-9 shrink-0 overflow-hidden rounded-full bg-neutral-200 ring-1 ring-neutral-100">
          <Image
            src={avatar}
            alt=""
            fill
            sizes="36px"
            className="object-cover"
          />
        </div>
        <PlatformIcon platform={platform} />
      </div>

      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex gap-0.5">
          {RATING_STARS.slice(0, rating).map((starId) => (
            <Star
              key={starId}
              size={11}
              className="text-yellow-400"
              fill="#FFD700"
            />
          ))}
        </div>
        <Quote size={16} className="shrink-0 text-neutral-200" aria-hidden />
      </div>

      <blockquote className="flex-1 font-sans text-sm leading-relaxed text-neutral-600 md:line-clamp-6 md:text-[0.8125rem]">
        {quote}
      </blockquote>

      <figcaption className="mt-4 border-t border-neutral-100 pt-3 md:mt-auto">
        <p className="truncate font-sans text-xs font-semibold text-neutral-900">
          {name}
        </p>
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-0.5 inline-flex items-center gap-1 font-mono text-[10px] text-neutral-400 transition-colors hover:text-neutral-600"
        >
          {subtitle}
        </Link>
      </figcaption>
    </figure>
  );
}

export function HomeTestimonials() {
  return (
    <div className="mt-10 w-full min-w-0">
      <div className="flex w-full flex-col gap-3 md:grid md:grid-cols-5 md:items-stretch">
        {HOME_REVIEWS.map((review) => (
          <ReviewCard key={`${review.name}-${review.platform}`} {...review} />
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        <Link
          href={PRODUCT_HUNT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 font-sans text-xs text-neutral-400 underline decoration-neutral-200 underline-offset-4 transition-colors hover:text-neutral-600 hover:decoration-neutral-400"
        >
          see the producthunt launch
          <span className="relative inline-flex size-3.5 shrink-0 items-center justify-center">
            <ChevronRight
              size={14}
              strokeWidth={2.5}
              className="ease-smooth transition-[opacity,transform] duration-500 group-hover:translate-x-0.5 group-hover:scale-95 group-hover:opacity-0"
            />
            <MoveRight
              size={14}
              strokeWidth={1.5}
              className="ease-smooth absolute -translate-x-0.5 scale-95 opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100"
            />
          </span>
        </Link>
      </div>
    </div>
  );
}
