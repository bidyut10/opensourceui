import React, { forwardRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

export const StackedCardsEffect = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={cn("group relative h-64 w-56 font-sans", className)}
    {...props}
  >
    <div className="absolute inset-x-4 top-8 bottom-0 -rotate-6 rounded-2xl bg-neutral-200 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-[-8deg] motion-reduce:group-hover:-rotate-6" />
    <div className="absolute inset-x-2 top-4 bottom-0 rotate-3 rounded-2xl border border-neutral-200 bg-neutral-100 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-[5deg] motion-reduce:group-hover:rotate-3" />

    <div className="absolute inset-0 overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-lg transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-1 motion-reduce:group-hover:translate-y-0">
      <div className="relative h-28 overflow-hidden">
        <Image
          src="/background4.webp"
          alt="Card"
          fill
          sizes="288px"
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <div className="relative h-7 w-7 overflow-hidden rounded-full border border-neutral-100">
            <Image
              src="/profile-picture.png"
              alt="User"
              fill
              sizes="28px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-semibold text-neutral-900">
              Bidyut Kundu
            </p>
            <p className="text-[10px] text-neutral-400">3 new cards</p>
          </div>
        </div>
        <p className="text-[11px] leading-relaxed text-neutral-500">
          Your saved design collection with 12 components ready to use.
        </p>
        <div className="mt-3 flex gap-1.5">
          {["UI", "Cards", "Nav"].map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-neutral-100 px-2 py-0.5 text-[9px] font-medium text-neutral-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
));
StackedCardsEffect.displayName = "StackedCardsEffect";
