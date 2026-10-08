"use client";

import {
  forwardRef,
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
} from "react";
import Image from "next/image";

import { cn } from "@/lib/cn";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

export type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
  rating?: number;
  avatar?: string;
};

export type TestimonialCardProps = Readonly<
  {
    testimonials?: TestimonialItem[];
    quote?: string;
    name?: string;
    role?: string;
    rating?: number;
    avatar?: string;
    avatarAlt?: string;
    quoteIcon?: React.ReactNode;
    autoPlayMs?: number;
    onChange?: (index: number) => void;
  } & ComponentPropsWithoutRef<"div">
>;

import { PRODUCT_HUNT_TESTIMONIALS } from "@/lib/home/testimonials";

const RATING_STARS = [
  "star-1",
  "star-2",
  "star-3",
  "star-4",
  "star-5",
] as const;

const defaultTestimonials: TestimonialItem[] = PRODUCT_HUNT_TESTIMONIALS;

// Production-ready Testimonial component — styled with Tailwind CSS.
export const TestimonialCard = forwardRef<HTMLDivElement, TestimonialCardProps>(
  (
    {
      className,
      testimonials,
      quote = defaultTestimonials[0].quote,
      name = defaultTestimonials[0].name,
      role = defaultTestimonials[0].role,
      rating = 5,
      avatar = "/profile-picture.png",
      avatarAlt = "Reviewer",
      quoteIcon,
      autoPlayMs = 6000,
      onChange,
      ...props
    },
    ref,
  ) => {
    const items =
      testimonials ??
      defaultTestimonials.map((item, index) =>
        index === 0 ? { ...item, quote, name, role, rating, avatar } : item,
      );

    const [index, setIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const current = items[index];

    const goTo = (next: number) => {
      if (animating || next === index) return;
      setAnimating(true);
      setIndex(next);
      onChange?.(next);
      globalThis.setTimeout(() => setAnimating(false), 320);
    };

    const prev = () => goTo((index - 1 + items.length) % items.length);
    const next = () => goTo((index + 1) % items.length);

    useEffect(() => {
      if (autoPlayMs <= 0) return;
      const timer = globalThis.setInterval(() => {
        setIndex((current) => {
          const next = (current + 1) % items.length;
          onChange?.(next);
          return next;
        });
      }, autoPlayMs);
      return () => globalThis.clearInterval(timer);
    }, [autoPlayMs, items.length, onChange]);

    return (
      <div
        ref={ref}
        data-slot="testimonial-card"
        className={cn(
          "relative w-72 rounded-2xl border border-neutral-100 bg-white p-6 font-sans shadow-lg",
          className,
        )}
        {...props}
      >
        <div
          data-slot="testimonial-card-quote-icon"
          className="pointer-events-none absolute top-5 right-5 text-neutral-100 select-none"
        >
          {quoteIcon ?? <Quote size={24} />}
        </div>

        <div
          key={current.name}
          className="transition-[translate,opacity] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-opacity starting:translate-y-1.5 starting:opacity-0"
        >
          <div
            data-slot="testimonial-card-rating"
            className="mb-4 flex gap-0.5"
          >
            {RATING_STARS.slice(0, current.rating ?? 5).map((starId) => (
              <Star
                key={starId}
                size={12}
                className="text-yellow-400"
                fill="#FFD700"
              />
            ))}
          </div>

          <p
            data-slot="testimonial-card-quote"
            className="relative z-10 mb-6 text-sm leading-relaxed text-neutral-700"
          >
            {current.quote}
          </p>

          <div
            data-slot="testimonial-card-author"
            className="flex items-center gap-3 border-t border-neutral-100 pt-4"
          >
            <div
              data-slot="testimonial-card-avatar"
              className="h-10 w-10 overflow-hidden rounded-full border-2 border-neutral-100"
            >
              <Image
                src={current.avatar ?? avatar}
                alt={avatarAlt}
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>

            <div data-slot="testimonial-card-author-info">
              <p className="text-sm font-semibold text-neutral-900">
                {current.name}
              </p>
              <p className="text-[11px] text-neutral-400">{current.role}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-1">
            {items.map((item) => (
              <button
                key={item.name}
                type="button"
                aria-label={`Go to testimonial ${items.indexOf(item) + 1}`}
                onClick={() => goTo(items.indexOf(item))}
                className={cn(
                  "h-1.5 cursor-pointer rounded-full transition-[width,background-color] duration-300 ease-[cubic-bezier(0.77,0,0.175,1)]",
                  items.indexOf(item) === index
                    ? "w-5 bg-neutral-900"
                    : "w-1.5 bg-neutral-200 hover:bg-neutral-300",
                )}
              />
            ))}
          </div>

          <div className="flex gap-1">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={prev}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition-[background-color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-neutral-50 active:scale-[0.97]"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={next}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition-[background-color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-neutral-50 active:scale-[0.97]"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  },
);

TestimonialCard.displayName = "TestimonialCard";
