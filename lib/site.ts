export const siteConfig = {
  name: "opensourceui",
  displayName: "Opensource UI",
  title:
    "Opensource UI — Free React UI Library & Next.js Components (Copy-Paste)",
  description:
    "Opensource UI is a free UI library for React and Next.js — 200+ MIT-licensed copy-paste components, Tailwind CSS blocks, iPhone and MacBook mockups, and TypeScript source. Browse live previews at opensourceui.in.",
  url: "https://opensourceui.in",
  ogImage: "/opensourceui-banner.png",
  launchedAt: "2026-07-09",
  github: {
    url: "https://github.com/bidyut10/opensourceui",
    sponsorsUrl: "https://github.com/sponsors/bidyut10",
  },
  /**
   * Polar Checkout Links (public URLs — safe in source).
   * Paste buy.polar.sh links here after creating each Checkout Link.
   * @see https://polar.sh/docs/features/checkout/links
   */
  polar: {
    silverCheckoutUrl:
      "https://buy.polar.sh/polar_cl_X17QR8vfvPg2VSEEaIvhznXpAu9v1eiS8Yf0F4PEv2s",
    goldCheckoutUrl:
      "https://buy.polar.sh/polar_cl_TemsSc6MFyIV42LBzqEAoe2I9o1lh2svr9vSQ0glT1v",
    platinumCheckoutUrl:
      "https://buy.polar.sh/polar_cl_mGvH3f7Yo632JVnkq42WRCg6Za66BgMMcKkFf0fs5sF",
    supportCheckoutUrl: "",
  },
  sponsorship: {
    path: "/sponsor",
    currency: "USD",
    rateLabel: "Founding rates",
    tiers: [
      {
        id: "silver",
        name: "Silver",
        priceMonthly: 25,
        checkoutKey: "silverCheckoutUrl",
        featured: false,
        summary: "Name on GitHub",
        image: "/background1.webp",
        includes: ["Listed by name in the GitHub README"],
      },
      {
        id: "gold",
        name: "Gold",
        priceMonthly: 50,
        checkoutKey: "goldCheckoutUrl",
        featured: false,
        summary: "GitHub + homepage",
        image: "/wallpaper-2.png",
        includes: ["GitHub README listing", "Homepage Sponsors row"],
      },
      {
        id: "platinum",
        name: "Platinum",
        priceMonthly: 100,
        checkoutKey: "platinumCheckoutUrl",
        featured: true,
        summary: "All placements",
        image: "/background6.webp",
        includes: [
          "Everything in Gold",
          "Docs right sidebar card",
          "Sticky while people browse components",
        ],
      },
    ],
  },
  stats: {
    pageViews: "500K+",
    visitors: "70K+",
    avgVisitMinutes: 4,
  },
  keywords: [
    // Brand (entity clarity for Google)
    "opensource ui",
    "opensourceui",
    "opensourceui.in",
    "opensource ui library",
    "opensource ui components",
    "open source ui",
    "open source ui library",
    "open source ui components",
    "open source react ui",

    // High-intent library searches
    "ui library",
    "free ui library",
    "react ui library",
    "react component library",
    "next.js ui library",
    "nextjs ui library",
    "free react ui library",
    "free react component library",
    "javascript ui library",
    "frontend ui library",
    "web ui library",
    "ui component library",

    // Free / reusable / copy-paste
    "free react components",
    "free reusable react components",
    "free react.js library",
    "free react js library",
    "free next.js library",
    "free nextjs library",
    "free next.js ui library",
    "free nextjs components",
    "free ui components",
    "free ui kit",
    "reusable react components",
    "reusable ui components",
    "copy paste components",
    "copy paste ui",
    "copy paste react components",
    "copy paste next.js components",
    "mit licensed ui components",

    // Stack
    "react.js ui library",
    "react js components",
    "react typescript components",
    "next.js ui components",
    "nextjs components",
    "next.js component library",
    "typescript react components",
    "tailwind css components",
    "tailwind v4 components",
    "tailwind css blocks",
    "tailwind blocks",
    "tailblocks",
    "tailwind ui",
    "tailwind ui blocks",
    "tailwind react components",
    "tailwind component library",

    // Alternatives / intent
    "shadcn alternative",
    "free shadcn alternative",
    "shadcn ui alternative",
    "mui alternative free",
    "production ready components",
    "dashboard components",
    "dashboard ui components",
    "ui widgets",
    "react ui kit",
    "next.js ui kit",
    "react hooks components",

    // Device mockups
    "iphone mockup",
    "iphone 15 mockup",
    "iphone 15 pro mockup",
    "apple iphone mockup",
    "iphone frame mockup",
    "iphone ui mockup",
    "react iphone mockup",
    "next.js iphone mockup",
    "macbook mockup",
    "apple macbook mockup",
    "laptop mockup react",
    "ipad mockup",
    "apple ipad mockup",
    "apple watch mockup",
    "watch mockup react",
    "ipod mockup",
    "browser mockup",
    "safari browser mockup",
    "device mockup components",
    "apple device mockups",
    "react device mockups",
    "ui device frames",
    "phone mockup component",
  ],
  author: {
    name: "Bidyut Kundu",
    url: "https://x.com/BidyutKundu12",
    portfolioUrl: "https://bidyut.cc",
    twitter: "@BidyutKundu12",
    email: "bidyut.kundu.dev@gmail.com",
  },
  license: {
    name: "MIT",
    url: "https://github.com/bidyut10/opensourceui/blob/main/LICENSE",
    shortNote:
      "Free for personal and commercial use. No UI attribution required.",
    copyNote:
      "Include the MIT copyright notice when copying component source into your project.",
  },
} as const;

export type SponsorshipTier = typeof siteConfig.sponsorship.tiers;
export type SponsorshipTierId = SponsorshipTier[number]["id"];
export type PolarCheckoutKey =
  | "silverCheckoutUrl"
  | "goldCheckoutUrl"
  | "platinumCheckoutUrl"
  | "supportCheckoutUrl";
