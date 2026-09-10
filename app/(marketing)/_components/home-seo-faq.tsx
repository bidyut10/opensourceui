"use client";

import { useId, useState, type ReactNode } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { Badge } from "@/app/(marketing)/_components/badge";
import { Heading } from "@/app/(marketing)/_components/heading";
import { Paragraph } from "@/app/(marketing)/_components/paragraph";
import { AnnotatedText } from "@/components/underlines/annotated-text";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site";

type FaqItem = Readonly<{
  id: string;
  question: string;
  answer: ReactNode;
}>;

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "paid",
    question: `Will ${siteConfig.displayName} ever be paid?`,
    answer: (
      <>
        No. Components stay free under the MIT license — personal and commercial
        — for good. Not “free forever*” with a catch later. Sponsorships on the{" "}
        <Link
          href={siteConfig.sponsorship.path}
          className="font-medium text-neutral-800 underline decoration-neutral-300 underline-offset-2"
        >
          sponsor page
        </Link>{" "}
        are optional support so the project can keep shipping. They do not unlock
        components and they do not turn the library into a subscription product.
      </>
    ),
  },
  {
    id: "reuse",
    question: "Are components reusable across projects?",
    answer: (
      <>
        Yes. Every piece is copy-paste TypeScript you own after you paste it.
        Drop the same button, mockup, or widget into multiple React or Next.js
        apps, rename props, restyle with Tailwind — no vendor lock-in and no
        Opensource UI npm package to keep in sync.
      </>
    ),
  },
  {
    id: "features",
    question: "What do I get in the library?",
    answer: (
      <>
        Live previews, copy-ready source, and production-minded UI across
        categories: buttons, widgets, forms, social cards, loaders, tables, plus
        Apple-style device mockups (iPhone, MacBook, iPad, Watch, browser
        frames). Browse{" "}
        <Link
          href="/components"
          className="font-medium text-neutral-800 underline decoration-neutral-300 underline-offset-2"
        >
          all components
        </Link>{" "}
        or jump to{" "}
        <Link
          href="/components/category/mockups"
          className="font-medium text-neutral-800 underline decoration-neutral-300 underline-offset-2"
        >
          mockups
        </Link>
        .
      </>
    ),
  },
  {
    id: "code",
    question: "Is the code clean enough for production?",
    answer: (
      <>
        Yes. Source is TypeScript-first, readable props, Tailwind utility classes
        in the file you paste — not a black-box package. Built for real apps:
        clear structure, MIT license, no mystery runtime. You can edit, delete,
        or restyle anything after it lands in your repo.
      </>
    ),
  },
  {
    id: "principles",
    question: "What design principles does it follow?",
    answer: (
      <>
        Quiet neutral stage, clear type, hairline borders. Accents only where
        state or demos need them. No purple-gradient dashboard chrome, no glow
        for its own sake. Motion respects reduced-motion. Responsive with base
        styles plus{" "}
        <span className="font-mono text-[12px] text-neutral-700">md:</span> —
        not{" "}
        <span className="font-mono text-[12px] text-neutral-700">sm:</span>.
        Focus is border change, not colored rings. Goal: UI that feels shipped,
        not demo-reel.
      </>
    ),
  },
  {
    id: "dark",
    question: "Why is there no dark mode?",
    answer: (
      <>
        Craft Bench is intentionally light: paper white, ink text, quiet
        borders. That stage keeps demos readable and consistent across the
        catalog. Components you copy are yours — add dark variants in your app
        if you need them. The library itself stays on one clear visual language
        so previews do not fight each other.
      </>
    ),
  },
  {
    id: "use",
    question: "How do I use components in my project?",
    answer: (
      <>
        Open anything under{" "}
        <Link
          href="/components"
          className="font-medium text-neutral-800 underline decoration-neutral-300 underline-offset-2"
        >
          components
        </Link>
        , copy the TypeScript source, paste it into your React or Next.js app,
        and fix imports. You own the file after that — no Opensource UI package
        to install or update.
      </>
    ),
  },
  {
    id: "compare",
    question: `Is ${siteConfig.displayName} the same as shadcn or Material UI?`,
    answer: (
      <>
        No. {siteConfig.displayName} is its own open-source project — copy-paste
        UI with a separate design system and components. Official site is only
        opensourceui.in.
      </>
    ),
  },
];

/**
 * FAQ accordion — matches homepage section chrome (badge + heading).
 * No showcase; demos live higher on the page.
 */
export function HomeSeoFaq() {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  return (
    <section className="relative mt-36 max-w-xl px-4 md:px-0">
      <Badge className="-top-7 -left-1 -rotate-3 text-cyan-600 max-[499px]:left-4">
        faq
      </Badge>
      <Heading>
        Questions people{" "}
        <AnnotatedText variant="line" color="text-cyan-300">
          actually ask.
        </AnnotatedText>
      </Heading>
      <Paragraph>
        Pricing forever free, design rules, clean code, and why the stage stays
        light — straight answers.
      </Paragraph>

      <div className="mt-10 divide-y divide-neutral-100 border-y border-neutral-100">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openId === item.id;
          const panelId = `${baseId}-${item.id}-panel`;
          const buttonId = `${baseId}-${item.id}-button`;

          return (
            <div key={item.id}>
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() =>
                    setOpenId((current) =>
                      current === item.id ? null : item.id,
                    )
                  }
                  className="flex w-full items-center justify-between gap-4 py-4 text-left"
                >
                  <span className="pr-2 font-sans text-sm font-semibold text-neutral-900">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={16}
                    strokeWidth={2}
                    aria-hidden
                    className={cn(
                      "shrink-0 text-neutral-400 transition-transform duration-300 ease-smooth motion-reduce:transition-none",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-smooth motion-reduce:transition-none",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <p className="pb-4 text-sm leading-relaxed text-neutral-600">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
