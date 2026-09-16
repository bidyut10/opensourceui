import React, { forwardRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { Github } from "@/icons/brands/github";
import { Mail } from "lucide-react";

export const TeamMemberCard = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "group relative h-72 w-56 cursor-pointer overflow-hidden rounded-2xl",
      className,
    )}
    {...props}
  >
    <Image
      src="/profile-picture.png"
      alt="Team member"
      fill
      sizes="224px"
      className="object-cover transition-transform duration-700 group-hover:scale-110 motion-reduce:group-hover:scale-100"
    />
    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

    <div className="absolute top-3 right-3 flex translate-y-1 gap-1.5 opacity-0 transition-[translate,opacity] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:translate-y-0">
      <button className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-white/30 bg-white/20 text-white backdrop-blur-md transition-[background-color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white/30 active:scale-[0.97]">
        <Github size={13} />
      </button>
      <button className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-white/30 bg-white/20 text-white backdrop-blur-md transition-[background-color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white/30 active:scale-[0.97]">
        <Mail size={13} />
      </button>
    </div>

    <div className="absolute right-0 bottom-0 left-0 p-4">
      <p className="mb-1 font-mono text-[10px] tracking-widest text-white/50 uppercase">
        Lead Engineer
      </p>
      <h3 className="text-lg leading-tight font-semibold text-white">
        Bidyut Kundu
      </h3>
      <p className="mt-1.5 translate-y-2 text-xs leading-relaxed text-white/60 opacity-0 transition-[translate,opacity] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:translate-y-0">
        Building design tools that developers love. Previously at Stripe.
      </p>
    </div>
  </div>
));
TeamMemberCard.displayName = "TeamMemberCard";
