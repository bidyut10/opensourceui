"use client";

import React from "react";

export type AppleWatchFrameVariant =
  | "black"
  | "silver"
  | "titanium"
  | "starlight"
  | "blue"
  | "gold"
  | "rose";

interface AppleWatchMockupCardProps {
  variant?: AppleWatchFrameVariant;
  children?: React.ReactNode;
  className?: string;
}

const VARIANTS: Record<
  AppleWatchFrameVariant,
  {
    metal: string;
    strap: string;
  }
> = {
  black: {
    metal:
      "linear-gradient(135deg, #050505 0%, #383838 16%, #111 38%, #4a4a4a 58%, #090909 82%, #303030 100%)",
    strap:
      "linear-gradient(180deg, #111 0%, #333 30%, #191919 58%, #080808 100%)",
  },

  silver: {
    metal:
      "linear-gradient(135deg, #727272 0%, #f5f5f5 15%, #a9a9a9 34%, #fafafa 51%, #888 72%, #ededed 87%, #777 100%)",
    strap:
      "linear-gradient(180deg, #bdbdbd 0%, #eeeeee 27%, #d2d2d2 55%, #f1f1f1 76%, #adadad 100%)",
  },

  titanium: {
    metal:
      "linear-gradient(135deg, #484744 0%, #aaa7a1 16%, #706e69 34%, #c1bdb6 51%, #625f5b 73%, #9a9690 88%, #41403d 100%)",
    strap:
      "linear-gradient(180deg, #686661 0%, #aaa7a1 28%, #7c7974 55%, #aaa69f 78%, #5c5955 100%)",
  },

  starlight: {
    metal:
      "linear-gradient(135deg, #9b9287 0%, #f0e9de 16%, #c9c0b4 34%, #f5eee3 51%, #b5aca0 72%, #e5ddd2 88%, #948b80 100%)",
    strap:
      "linear-gradient(180deg, #b8afa4 0%, #f0e8dd 27%, #d4cabe 55%, #f2eadf 76%, #aaa096 100%)",
  },

  blue: {
    metal:
      "linear-gradient(135deg, #273e50 0%, #7b96aa 16%, #4e6c81 34%, #91aaba 51%, #3f5d72 72%, #718da1 88%, #253b4d 100%)",
    strap:
      "linear-gradient(180deg, #4d697d 0%, #829cad 27%, #607d91 55%, #87a0b1 76%, #3e596b 100%)",
  },

  gold: {
    metal:
      "linear-gradient(135deg, #967b4c 0%, #ead39a 16%, #c2a665 34%, #f1d99d 51%, #aa8b50 72%, #dfc486 88%, #8b7246 100%)",
    strap:
      "linear-gradient(180deg, #b39a62 0%, #ecd69d 27%, #ceb573 55%, #edd89f 76%, #a38852 100%)",
  },

  rose: {
    metal:
      "linear-gradient(135deg, #986f7a 0%, #e8c0c9 16%, #c598a3 34%, #efcbd2 51%, #ad7d88 72%, #dfb0bb 88%, #8d6570 100%)",
    strap:
      "linear-gradient(180deg, #b58490 0%, #e6bdc6 27%, #c99ba6 55%, #ebc4cc 76%, #a0737e 100%)",
  },
};

export function AppleWatchMockupCard({
  variant = "silver",
  children,
  className = "",
}: AppleWatchMockupCardProps) {
  const colors = VARIANTS[variant];

  return (
    <div className={`relative aspect-486/729 w-75 shrink-0 ${className}`}>
      <svg
        viewBox="0 0 486 729"
        className="pointer-events-none absolute inset-0 z-0 mt-2 h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <clipPath id="top-strap-clip">
            <path
              d="
                M 142 21
                C 137 27, 140 49, 136 72
                C 131 108, 114 135, 93 150
                C 83 157, 78 167, 78 180
                L 408 180
                C 408 167, 403 157, 393 150
                C 372 135, 355 108, 350 72
                C 346 49, 349 27, 344 21
                C 321 17, 165 17, 142 21
                Z
              "
            />
          </clipPath>

          <linearGradient id="watch-top-highlight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="35%" stopColor="rgba(255,255,255,.45)" />
            <stop offset="65%" stopColor="rgba(255,255,255,.2)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        <g clipPath="url(#top-strap-clip)">
          <foreignObject x="0" y="0" width="486" height="729">
            <div
              style={{
                width: "100%",
                height: "100%",
                background: colors.strap,
              }}
            />
          </foreignObject>
        </g>

        <path
          d="
            M 142 21
            C 137 27, 140 49, 136 72
            C 131 108, 114 135, 93 150
            C 83 157, 78 167, 78 180
            L 408 180
            C 408 167, 403 157, 393 150
            C 372 135, 355 108, 350 72
            C 346 49, 349 27, 344 21
            C 321 17, 165 17, 142 21
            Z
          "
          fill="url(#watch-top-highlight)"
          opacity=".45"
        />
      </svg>

      {/* BOTTOM STRAP */}
      <svg
        viewBox="0 0 486 729"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full pb-1"
        preserveAspectRatio="none"
      >
        <defs>
          <clipPath id="bottom-strap-clip">
            <path
              d="
                M 78 549
                C 78 562, 83 572, 93 579
                C 114 594, 131 621, 136 657
                C 140 680, 137 702, 142 708
                C 165 713, 321 713, 344 708
                C 349 702, 346 680, 350 657
                C 355 621, 372 594, 393 579
                C 403 572, 408 562, 408 549
                Z
              "
            />
          </clipPath>

          <linearGradient
            id="watch-bottom-highlight"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
          >
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="35%" stopColor="rgba(255,255,255,.45)" />
            <stop offset="65%" stopColor="rgba(255,255,255,.2)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        <g clipPath="url(#bottom-strap-clip)">
          <foreignObject x="0" y="0" width="486" height="729">
            <div
              style={{
                width: "100%",
                height: "100%",
                background: colors.strap,
              }}
            />
          </foreignObject>
        </g>

        <path
          d="
            M 78 549
            C 78 562, 83 572, 93 579
            C 114 594, 131 621, 136 657
            C 140 680, 137 702, 142 708
            C 165 713, 321 713, 344 708
            C 349 702, 346 680, 350 657
            C 355 621, 372 594, 393 579
            C 403 572, 408 562, 408 549
            Z
          "
          fill="url(#watch-bottom-highlight)"
          opacity=".4"
        />
      </svg>
      <div
        className="absolute top-[33.3%] right-[9%] z-2 h-[11%] w-[3.2%] overflow-hidden rounded-r-[40%]"
        style={{
          background: colors.metal,
          boxShadow:
            "inset 1px 0 rgba(255,255,255,.65), 1px 1px 2px rgba(0,0,0,.18)",
        }}
      >
        <div
          className="absolute inset-y-[7%] left-[25%] w-[30%] opacity-70"
          style={{
            background:
              "repeating-linear-gradient(to bottom,#777 0 1px,#ededed 1px 2px)",
          }}
        />
      </div>
      <div
        className="absolute top-[20.5%] left-[11.7%] z-3 h-[59.9%] w-[76.6%] rounded-[20.5%] p-[2.8%]"
        style={{
          background: colors.metal,
          boxShadow: `
            inset 0 1px 2px rgba(255,255,255,.7),
            inset 0 -2px 3px rgba(0,0,0,.3),
            0 2px 5px rgba(0,0,0,.16)
          `,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[20.5%]"
          style={{
            background:
              "linear-gradient(120deg,rgba(255,255,255,.42),transparent 24%,transparent 70%,rgba(255,255,255,.18))",
          }}
        />
        <div
          className="relative h-full w-full rounded-[18%] p-[2.8%]"
          style={{
            background:
              "linear-gradient(145deg,#555 0%,#080808 8%,#000 30%,#020202 70%,#333 94%,#080808 100%)",
            boxShadow:
              "inset 0 2px 3px rgba(255,255,255,.16), inset 0 -2px 4px rgba(0,0,0,.9)",
          }}
        >
          <div
            className="relative h-full w-full overflow-hidden rounded-[15.5%]"
            style={{
              background:
                "linear-gradient(145deg,#161616,#000 35%,#000 70%,#171717)",
              boxShadow:
                "inset 0 1px 2px rgba(255,255,255,.08), inset 0 -1px 2px rgba(255,255,255,.04)",
            }}
          >
            {/* ACTUAL DISPLAY */}
            <div className="absolute inset-[1.8%] overflow-hidden rounded-[14%] bg-black">
              <div className="h-full w-full overflow-hidden rounded-[14%]">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="pointer-events-none absolute top-[23.4%] left-[17%] z-5 h-[54.5%] w-[66%] rounded-[17%] opacity-[0.045]"
        style={{
          background:
            "linear-gradient(125deg,rgba(255,255,255,.95),transparent 30%)",
        }}
      />
    </div>
  );
}

export default AppleWatchMockupCard;
