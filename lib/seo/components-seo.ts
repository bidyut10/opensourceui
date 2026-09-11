import { siteConfig } from "@/lib/site";

const MOCKUP_KEYWORDS = [
  "device mockup components",
  "apple device mockups",
  "iphone mockup",
  "iphone 15 pro mockup",
  "apple iphone mockup",
  "macbook mockup",
  "ipad mockup",
  "apple watch mockup",
  "ipod mockup",
  "browser mockup",
  "react device mockups",
  "next.js device mockups",
  "ui device frames",
  "phone mockup component",
] as const;

const CATEGORY_EXTRA_KEYWORDS: Record<string, readonly string[]> = {
  Mockups: MOCKUP_KEYWORDS,
  Buttons: [
    "free react buttons",
    "tailwind button components",
    "copy paste buttons",
  ],
  Widgets: ["react widgets", "free ui widgets", "dashboard widgets"],
  Forms: ["react form components", "tailwind form blocks", "free form ui"],
  Inputs: ["react input components", "tailwind inputs"],
  Loaders: ["react loaders", "tailwind loading spinners"],
  Gallery: ["react gallery components", "image gallery ui"],
  Socials: ["social media ui components", "react social cards"],
  Tables: ["react table components", "tailwind data tables"],
  Audio: ["react audio player", "music player ui components"],
  Notifications: ["react toast notifications", "notification ui components"],
};

export function getCategorySeoDescription(
  category: string,
  itemCount: number,
): string {
  const noun = itemCount === 1 ? "component" : "components";

  if (category === "Mockups") {
    return `Browse ${itemCount} free Apple device mockup ${noun} for React and Next.js — iPhone, MacBook, iPad, Watch, iPod, and browser frames. MIT-licensed, copy-paste TypeScript with Tailwind CSS on ${siteConfig.displayName}.`;
  }

  return `Browse ${itemCount} free ${category.toLowerCase()} ${noun} for React and Next.js on ${siteConfig.displayName}. MIT-licensed, copy-paste TypeScript source with Tailwind CSS v4 and live previews.`;
}

export function getCategorySeoTitle(category: string): string {
  if (category === "Mockups") {
    return "Free iPhone, MacBook & Device Mockups for React";
  }

  return `${category} React Components — Copy & Paste UI`;
}

export function getCategorySeoKeywords(category: string): string[] {
  const extras = CATEGORY_EXTRA_KEYWORDS[category] ?? [
    `${category.toLowerCase()} react components`,
    `free ${category.toLowerCase()} components`,
    `tailwind ${category.toLowerCase()}`,
  ];

  return [
    ...extras,
    "free react components",
    "free next.js library",
    "tailwind blocks",
    "copy paste ui",
    siteConfig.displayName,
  ];
}

export function getBrowseAllSeoDescription(totalCount: number): string {
  return `Browse ${totalCount}+ free UI components in the Opensource UI library — React and Next.js copy-paste blocks, Tailwind CSS components, iPhone and MacBook mockups, widgets, and TypeScript source with live previews.`;
}

export function getBrowseAllSeoTitle(): string {
  return "Free UI Library — React & Next.js Components | Opensource UI";
}

export function getBrowseAllSeoKeywords(): string[] {
  return [...siteConfig.keywords];
}

export function getMockupComponentKeywords(title: string): string[] {
  const lower = title.toLowerCase();
  const specific: string[] = [];

  if (lower.includes("iphone")) {
    specific.push(
      "iphone mockup",
      "iphone 15 mockup",
      "iphone 15 pro mockup",
      "apple iphone mockup",
      "iphone frame mockup",
      "react iphone mockup",
    );
  }
  if (lower.includes("macbook") || lower.includes("mac book")) {
    specific.push(
      "macbook mockup",
      "apple macbook mockup",
      "laptop mockup react",
    );
  }
  if (lower.includes("ipad")) {
    specific.push("ipad mockup", "apple ipad mockup");
  }
  if (lower.includes("watch")) {
    specific.push("apple watch mockup", "watch mockup react");
  }
  if (lower.includes("ipod")) {
    specific.push("ipod mockup", "apple ipod mockup");
  }
  if (lower.includes("browser")) {
    specific.push(
      "browser mockup",
      "safari browser mockup",
      "desktop browser frame",
    );
  }

  return [...specific, ...MOCKUP_KEYWORDS];
}
