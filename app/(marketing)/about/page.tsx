import type { Metadata } from "next";
import Link from "next/link";

import { FooterSkyline } from "@/app/(marketing)/_components/footer-skyline";
import { MarketingGoBack } from "@/app/(marketing)/_components/marketing-go-back";
import { MarketingSiteNav } from "@/app/(marketing)/_components/marketing-site-nav";
import { CopyEmail } from "@/components/contact/copy-email";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: `About | ${siteConfig.displayName}`,
  description: `${siteConfig.displayName} — free React and Next.js components by ${siteConfig.author.name}. How the library started and how to get involved.`,
  path: "/about",
  keywords: [
    "about opensource ui",
    "opensourceui about",
    "bidyut kundu",
    "free react component library",
    "copy paste ui story",
    siteConfig.displayName,
  ],
});

export default function AboutPage() {
  const { author, displayName, github, launchedAt, license, stats, url } =
    siteConfig;
  const launchLabel = new Date(`${launchedAt}T12:00:00Z`).toLocaleDateString(
    "en-US",
    { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" },
  );

  return (
    <div className="flex min-h-screen w-full min-w-0 flex-col overflow-x-hidden selection:bg-neutral-800 selection:text-white">
      <div className="flex w-full min-w-0 flex-1 flex-col items-center px-3 pt-4 md:px-4">
        <article className="w-full max-w-xl">
          <MarketingSiteNav />

          <MarketingGoBack>
            <h1 className="font-serif text-3xl text-neutral-900">About</h1>
            <p className="mt-2 text-sm text-neutral-500">
              Who runs {displayName}, and why it exists
            </p>
          </MarketingGoBack>

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-neutral-700">
            <section>
              <h2 className="font-semibold text-neutral-900">
                Hey — I&apos;m Bidyut
              </h2>
              <p className="mt-2">
                I build {displayName}. Not a big team, not a funded design
                system company — just me, shipping components when I have nights
                and weekends free. If something feels uneven or unfinished,
                that&apos;s usually because one person is balancing this with
                everything else. I still answer emails myself.
              </p>
              <p className="mt-2">
                You can find me on{" "}
                <a
                  href={author.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-2"
                >
                  bidyut.cc
                </a>
                ,{" "}
                <a
                  href={author.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-2"
                >
                  Twitter/X
                </a>
                , or write to <CopyEmail />.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-neutral-900">
                Why this exists
              </h2>
              <p className="mt-2">
                It started selfishly. I kept rebuilding the same little pieces —
                clocks, mockups, buttons with slightly nicer motion — for my own
                projects. In June I tossed a rough prototype online. People
                actually used it. So on {launchLabel} I launched the site for
                real at{" "}
                <a
                  href={url}
                  className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-2"
                >
                  opensourceui.in
                </a>
                .
              </p>
              <p className="mt-2">
                The idea was simple then, and it still is: copy the source,
                paste it into your app, own it. No install lock-in. No
                &quot;import thirty packages to get a card.&quot; React,
                Next.js, TypeScript, Tailwind — the stack most of us already
                live in.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-neutral-900">What you get</h2>
              <p className="mt-2">
                A growing set of production-ready UI pieces across categories —
                widgets, mockups (phones, laptops, watches), forms, social
                cards, loaders, and more. Each one has a live preview and the
                code sitting right there. MIT licensed. Free for personal and
                commercial work. {license.shortNote}
              </p>
              <p className="mt-2">
                Since launch the site has seen {stats.pageViews} page views and{" "}
                {stats.visitors} visitors. That still surprises me. It also
                means I care a lot about not shipping junk just to pad the
                count.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-neutral-900">
                How I like to build
              </h2>
              <p className="mt-2">
                Quiet over flashy. Hairline borders, clear type, motion that
                respects reduced-motion. I avoid the purple-gradient dashboard
                look that every AI template dumps on the internet. If a
                component feels like it belongs in a real product — not a demo
                reel — that&apos;s the bar.
              </p>
              <p className="mt-2">
                I watch what people actually open with PostHog, then build more
                of what gets used. Mockups and buttons got a lot of love
                recently, so those sections grew. If something&apos;s missing,
                tell me — half the roadmap is just people asking nicely.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-neutral-900">Support</h2>
              <p className="mt-2">
                The library stays free. If it saved you an afternoon and you
                want to keep it alive, you can{" "}
                <Link
                  href={siteConfig.sponsorship.path}
                  className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-2"
                >
                  sponsor the project
                </Link>{" "}
                or star it on{" "}
                <a
                  href={github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-2"
                >
                  GitHub
                </a>
                . Both help more than you&apos;d think.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-neutral-900">Related</h2>
              <p className="mt-2">
                Practical rules for using the site and sponsorships live in the{" "}
                <Link
                  href="/terms"
                  className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-2"
                >
                  Terms
                </Link>
                . How we handle analytics is in the{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-2"
                >
                  Privacy Policy
                </Link>
                . Hiring status (honest version) is on{" "}
                <Link
                  href="/careers"
                  className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-2"
                >
                  Careers
                </Link>
                . How to reach me is on{" "}
                <Link
                  href="/contact"
                  className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-2"
                >
                  Contact
                </Link>
                .
              </p>
            </section>
          </div>

          <div className="mt-10 mb-8 flex flex-wrap gap-4">
            <Link
              href="/components"
              className="text-sm font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-500"
            >
              Browse components
            </Link>
            <Link
              href={siteConfig.sponsorship.path}
              className="text-sm font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-500"
            >
              Sponsor
            </Link>
            <Link
              href="/careers"
              className="text-sm font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-500"
            >
              Careers
            </Link>
            <Link
              href="/privacy"
              className="text-sm font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-500"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-500"
            >
              Terms
            </Link>
          </div>
        </article>
      </div>

      <FooterSkyline className="mt-auto" />
    </div>
  );
}
