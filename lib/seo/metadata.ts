import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";
import { getCategoryPath } from "@/lib/showcase/category-slug";
import { getMockupComponentKeywords } from "@/lib/seo/components-seo";

const OG_IMAGE = {
  url: siteConfig.ogImage,
  width: 1200,
  height: 630,
  alt: `${siteConfig.displayName} — free React UI library`,
} as const;

type PageMetadataOptions = Readonly<{
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
  absoluteTitle?: boolean;
}>;

function absoluteUrl(path: string): string {
  if (path === "/") return siteConfig.url;
  return `${siteConfig.url}${path}`;
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  noIndex = false,
  absoluteTitle = false,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: keywords ?? [...siteConfig.keywords],
    alternates: {
      canonical: absoluteUrl(path),
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: siteConfig.displayName,
      title,
      description,
      images: [
        {
          url: OG_IMAGE.url,
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: siteConfig.author.twitter,
      site: siteConfig.author.twitter,
      images: [
        {
          url: OG_IMAGE.url,
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
          alt: title,
        },
      ],
    },
  };
}

export function createComponentMetadata(
  entry: Readonly<{
    title: string;
    description: string;
    slug: string;
    category: string;
    exportName: string;
  }>,
): Metadata {
  const title = `${entry.title} — Free React Component`;
  const description = `${entry.description} Free reusable copy-paste ${entry.exportName} from the Opensource UI library for React and Next.js. MIT licensed, TypeScript, Tailwind CSS v4.`;
  const path = `/components/${entry.slug}`;
  const mockupKeywords =
    entry.category === "Mockups"
      ? getMockupComponentKeywords(entry.title)
      : [];
  const keywords = [
    entry.title,
    entry.exportName,
    `${entry.category} component`,
    "ui library",
    "react ui library",
    "free ui library",
    "free react components",
    "free reusable react components",
    "react component",
    "react.js component",
    "next.js component",
    "free next.js library",
    "tailwind component",
    "tailwind blocks",
    "tailblocks",
    "copy paste ui",
    ...mockupKeywords,
    siteConfig.displayName,
  ];

  return createPageMetadata({ title, description, path, keywords });
}

export function getRootSiteJsonLd() {
  const featureList = [
    "Free React UI library",
    "Next.js UI components",
    "Copy-paste TypeScript source",
    "Tailwind CSS v4 blocks",
    "iPhone and MacBook device mockups",
    "MIT license for commercial use",
    "Live component previews",
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.displayName,
        alternateName: [
          siteConfig.name,
          "OpensourceUI",
          "opensourceui.in",
          "Opensource UI library",
        ],
        description: siteConfig.description,
        inLanguage: "en-US",
        publisher: { "@id": `${siteConfig.url}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteConfig.url}/components?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.displayName,
        legalName: siteConfig.displayName,
        alternateName: [siteConfig.name, "OpensourceUI"],
        url: siteConfig.url,
        logo: {
          "@type": "ImageObject",
          url: `${siteConfig.url}/osui-logo.png`,
          width: 512,
          height: 512,
        },
        image: `${siteConfig.url}${siteConfig.ogImage}`,
        description:
          "Opensource UI is the free React and Next.js UI library at opensourceui.in — copy-paste components, Tailwind blocks, and device mockups. Not affiliated with other UI kits.",
        foundingDate: siteConfig.launchedAt,
        sameAs: [
          siteConfig.github.url,
          siteConfig.author.url,
          siteConfig.author.portfolioUrl,
        ],
        founder: { "@id": `${siteConfig.url}/#person` },
        contactPoint: {
          "@type": "ContactPoint",
          email: siteConfig.author.email,
          contactType: "customer support",
        },
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: siteConfig.author.name,
        url: siteConfig.author.portfolioUrl,
        sameAs: [siteConfig.author.url, siteConfig.author.portfolioUrl],
        jobTitle: `Creator of ${siteConfig.displayName}`,
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteConfig.url}/#software`,
        name: siteConfig.displayName,
        alternateName: ["OpensourceUI", "opensourceui.in"],
        applicationCategory: "DeveloperApplication",
        applicationSubCategory: "UI Component Library",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        description: siteConfig.description,
        url: siteConfig.url,
        downloadUrl: `${siteConfig.url}/components`,
        screenshot: `${siteConfig.url}${siteConfig.ogImage}`,
        featureList,
        license: siteConfig.license.url,
        programmingLanguage: ["TypeScript", "JavaScript", "React", "Next.js"],
        keywords: [
          "ui library",
          "react ui library",
          "free ui library",
          "next.js ui library",
          "copy paste components",
          "tailwind ui",
          ...siteConfig.keywords.slice(0, 40),
        ].join(", "),
        author: { "@id": `${siteConfig.url}/#person` },
        publisher: { "@id": `${siteConfig.url}/#organization` },
        isAccessibleForFree: true,
      },
      {
        "@type": "FAQPage",
        "@id": `${siteConfig.url}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Will Opensource UI ever be paid?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Opensource UI components stay free under the MIT license for personal and commercial use — permanently. Optional sponsorships support the project; they do not unlock components or turn the library into a paid product.",
            },
          },
          {
            "@type": "Question",
            name: "Are Opensource UI components reusable across projects?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Every component is copy-paste TypeScript you own after pasting. Use the same pieces across React and Next.js apps with no Opensource UI npm package and no vendor lock-in.",
            },
          },
          {
            "@type": "Question",
            name: "What do I get in the Opensource UI library?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Live previews, copy-ready TypeScript source, Tailwind CSS blocks, buttons, widgets, forms, social cards, loaders, tables, and Apple-style device mockups including iPhone, MacBook, iPad, Watch, and browser frames at opensourceui.in/components.",
            },
          },
          {
            "@type": "Question",
            name: "Is Opensource UI code clean enough for production?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Source is TypeScript-first with readable props and Tailwind utilities in the file you paste — not a black-box package. Edit, delete, or restyle anything after it lands in your repo under the MIT license.",
            },
          },
          {
            "@type": "Question",
            name: "What design principles does Opensource UI follow?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Quiet neutral stage, clear type, hairline borders. Accents only for state or demos. No purple-gradient dashboard chrome. Motion respects reduced-motion. Responsive with base styles plus md breakpoints. Focus uses border change, not colored rings.",
            },
          },
          {
            "@type": "Question",
            name: "Why is there no dark mode on Opensource UI?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Craft Bench is intentionally light: paper white, ink text, quiet borders, so demos stay readable and consistent. Components you copy are yours — add dark variants in your app if needed. The catalog keeps one clear visual language.",
            },
          },
          {
            "@type": "Question",
            name: "How do I use Opensource UI components?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Open any component on opensourceui.in/components, copy the TypeScript source, paste it into your React or Next.js app, and adjust imports. No npm install of an Opensource UI package is required.",
            },
          },
          {
            "@type": "Question",
            name: "Is Opensource UI the same as shadcn/ui or Material UI?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Opensource UI is a separate open-source project at opensourceui.in by Bidyut Kundu — copy-paste React and Next.js UI with its own components, mockups, and design system. Not shadcn/ui, Material UI, or another kit rebranded.",
            },
          },
        ],
      },
    ],
  };
}

export function getComponentJsonLd(
  entry: Readonly<{
    title: string;
    description: string;
    slug: string;
    category: string;
    exportName: string;
  }>,
) {
  const pageUrl = `${siteConfig.url}/components/${entry.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Components",
            item: `${siteConfig.url}/components`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: entry.category,
            item: `${siteConfig.url}${getCategoryPath(entry.category)}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: entry.title,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "SoftwareSourceCode",
        name: entry.title,
        description: entry.description,
        url: pageUrl,
        codeRepository: siteConfig.github.url,
        programmingLanguage: ["TypeScript", "JavaScript"],
        runtimePlatform: "React",
        license: siteConfig.license.url,
        author: {
          "@type": "Person",
          name: siteConfig.author.name,
          url: siteConfig.author.url,
        },
        keywords: `${entry.exportName}, ${entry.category}, React, React.js, Next.js, Tailwind CSS, free reusable components, copy paste UI${
          entry.category === "Mockups"
            ? ", iphone mockup, device mockup, macbook mockup"
            : ""
        }`,
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `How do I use ${entry.title} in my project?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Copy the ${entry.exportName} source code from ${pageUrl}, add lib/cn.ts if needed, install clsx tailwind-merge and lucide-react, then import and render the component in your React or Next.js app.`,
            },
          },
          {
            "@type": "Question",
            name: `Can I use ${entry.title} in a commercial project?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Yes. ${siteConfig.displayName} is MIT licensed. You can use ${entry.exportName} in personal and commercial projects without UI attribution.`,
            },
          },
        ],
      },
    ],
  };
}

type ListItemEntry = Readonly<{
  slug: string;
  title: string;
  description: string;
}>;

export function getComponentsItemListJsonLd(
  items: readonly ListItemEntry[],
  listName: string,
  listUrl: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    url: listUrl,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      description: item.description,
      url: `${siteConfig.url}/components/${item.slug}`,
    })),
  };
}

export function getComponentsBreadcrumbJsonLd(
  crumbs: readonly { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
