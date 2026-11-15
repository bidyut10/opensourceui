"use client";

import { forwardRef, useState, type ComponentPropsWithoutRef } from "react";
import Image from "next/image";

import { cn } from "@/lib/cn";

export type WalletPassCardProps = Readonly<
  {
    memberName?: string;
    membershipType?: string;
    passType?: string;
    expiryDate?: string;
    memberId?: string;
    avatar?: string;
    avatarAlt?: string;
    onFlip?: (flipped: boolean) => void;
  } & ComponentPropsWithoutRef<"div">
>;

const PASS_PERFORATIONS = [
  "pass-perf-1",
  "pass-perf-2",
  "pass-perf-3",
  "pass-perf-4",
  "pass-perf-5",
  "pass-perf-6",
  "pass-perf-7",
  "pass-perf-8",
  "pass-perf-9",
  "pass-perf-10",
  "pass-perf-11",
  "pass-perf-12",
] as const;

const QR_CELLS = [
  { id: "qr-01", dark: true },
  { id: "qr-02", dark: false },
  { id: "qr-03", dark: true },
  { id: "qr-04", dark: false },
  { id: "qr-05", dark: true },
  { id: "qr-06", dark: false },
  { id: "qr-07", dark: true },
  { id: "qr-08", dark: false },
  { id: "qr-09", dark: true },
  { id: "qr-10", dark: false },
  { id: "qr-11", dark: true },
  { id: "qr-12", dark: false },
  { id: "qr-13", dark: true },
  { id: "qr-14", dark: false },
  { id: "qr-15", dark: true },
  { id: "qr-16", dark: false },
  { id: "qr-17", dark: true },
  { id: "qr-18", dark: false },
  { id: "qr-19", dark: true },
  { id: "qr-20", dark: false },
  { id: "qr-21", dark: true },
  { id: "qr-22", dark: false },
  { id: "qr-23", dark: true },
  { id: "qr-24", dark: false },
  { id: "qr-25", dark: true },
] as const;

// Production-ready Wallet Pass component — styled with Tailwind CSS.
export const WalletPassCard = forwardRef<HTMLDivElement, WalletPassCardProps>(
  (
    {
      className,
      memberName = "Bidyut Kundu",
      membershipType = "Premium Member",
      passType = "Member Pass",
      expiryDate = "Dec 2026",
      memberId = "MBR-2048",
      avatar = "/profile-picture.png",
      avatarAlt = "Member profile",
      onFlip,
      ...props
    },
    ref,
  ) => {
    const [flipped, setFlipped] = useState(false);

    const toggleFlip = () => {
      const next = !flipped;
      setFlipped(next);
      onFlip?.(next);
    };

    return (
      <div
        ref={ref}
        data-slot="wallet-pass-card"
        className={cn("w-64 font-sans perspective-[1000px]", className)}
        {...props}
      >
        <style>{`
          @keyframes wallet-flip-shadow {
            0%, 100% { box-shadow: 0 10px 30px rgba(0,0,0,0.12); }
            50% { box-shadow: 0 18px 40px rgba(0,0,0,0.18); }
          }
        `}</style>

        <button
          type="button"
          onClick={toggleFlip}
          aria-label={flipped ? "Show pass front" : "Show pass back"}
          aria-pressed={flipped}
          data-slot="wallet-pass-card-flip"
          className="relative h-54 w-full cursor-pointer overflow-hidden rounded-2xl border-0 bg-white p-0 shadow-lg transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] outline-none active:scale-[0.99] motion-reduce:animate-none!"
          style={{
            animation: flipped
              ? undefined
              : "wallet-flip-shadow 3s ease-in-out infinite",
          }}
        >
          <div
            className="relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.34,1.2,0.64,1)] motion-reduce:transition-none"
            style={{
              transformStyle: "preserve-3d",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl bg-white"
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="bg-linear-to-br from-blue-600 to-teal-700 p-4">
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-widest text-white/60 uppercase">
                    {passType}
                  </span>
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white/20">
                    <span className="text-[10px] font-bold text-white">
                      {memberName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white/30">
                    <Image
                      src={avatar}
                      alt={avatarAlt}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-white">
                      {memberName}
                    </p>
                    <p className="text-[11px] text-white/60">
                      {membershipType}
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative flex-1 bg-white px-4 py-3">
                <div className="absolute -top-1.5 right-0 left-0 flex justify-between px-2">
                  {PASS_PERFORATIONS.map((perforationId) => (
                    <div
                      key={perforationId}
                      className="h-3 w-3 rounded-full bg-white ring-1 ring-white"
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between pt-1">
                  <div className="text-left">
                    <p className="font-mono text-[9px] tracking-wider text-neutral-400 uppercase">
                      Valid Until
                    </p>
                    <p className="text-xs font-semibold text-neutral-900">
                      {expiryDate}
                    </p>
                  </div>
                  <p className="text-[10px] text-neutral-400">Tap to flip</p>
                </div>
              </div>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 overflow-hidden rounded-2xl bg-white"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div className="flex h-full flex-col items-center justify-center bg-white p-5">
                <p className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
                  Scan at entry
                </p>
                <div className="my-3 grid h-20 w-20 grid-cols-5 gap-px rounded-lg border border-neutral-100 bg-white p-2">
                  {QR_CELLS.map((cell) => (
                    <div
                      key={cell.id}
                      className={cn(
                        "rounded-[1px]",
                        cell.dark ? "bg-neutral-900" : "bg-white",
                      )}
                    />
                  ))}
                </div>
                <p className="font-mono text-xs text-neutral-700">{memberId}</p>
                <p className="mt-1 text-[10px] text-neutral-400">
                  Tap again to flip back
                </p>
              </div>
            </div>
          </div>
        </button>
      </div>
    );
  },
);

WalletPassCard.displayName = "WalletPassCard";
