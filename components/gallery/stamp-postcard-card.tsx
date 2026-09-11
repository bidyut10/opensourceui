import Image from "next/image";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

export type StampPostcardCardProps = Readonly<
  {
    message?: string;
    location?: string;
    stampValue?: string;
    imageSrc?: string;
  } & ComponentPropsWithoutRef<"div">
>;

// Production-ready Stamp Postcard component — styled with Tailwind CSS.
export const StampPostcardCard = forwardRef<
  HTMLDivElement,
  StampPostcardCardProps
>(
  (
    {
      className,
      message = "Wish you were here! The Sundarbans at golden hour — absolutely unreal.",
      location = "Sundarbans, WB",
      stampValue = "₹5",
      imageSrc = "/background1.webp",
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      data-slot="stamp-postcard-card"
      className={cn("w-sm font-sans", className)}
      {...props}
    >
      <div className="relative overflow-hidden rounded-sm border border-neutral-200 bg-[#fffef8] shadow-md">
        <div className="relative h-32 md:h-36">
          <Image
            src={imageSrc}
            alt={location}
            fill
            sizes="320px"
            className="object-cover"
          />
          <div className="absolute top-2 right-2 flex h-14 w-11 rotate-3 flex-col items-center justify-center border-2 border-dashed border-[#b4b1ac] bg-[#f6f2eb]">
            <span className="text-[8px] font-bold text-[#979591]">INDIA</span>
            <span className="text-sm font-black text-[#6b6966]">
              {stampValue}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-0 border-t border-neutral-200">
          <div className="border-r border-neutral-200 p-3">
            <p className="text-[12px] leading-relaxed text-neutral-700 italic">
              {message}
            </p>
          </div>
          <div className="flex flex-col justify-end p-3">
            <p className="font-mono text-[9px] tracking-wider text-neutral-400 uppercase">
              Posted from
            </p>
            <p className="mt-0.5 text-[11px] font-semibold text-neutral-800">
              {location}
            </p>
            <div className="mt-3 space-y-2">
              <div className="h-px bg-neutral-200" />
              <div className="h-px bg-neutral-200" />
              <div className="h-px bg-neutral-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
);

StampPostcardCard.displayName = "StampPostcardCard";
