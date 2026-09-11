import type { Metadata } from "next";
import Link from "next/link";

import { FooterSkyline } from "@/app/(marketing)/_components/footer-skyline";
import { MarketingGoBack } from "@/app/(marketing)/_components/marketing-go-back";
import { MarketingSiteNav } from "@/app/(marketing)/_components/marketing-site-nav";
import { CopyEmail } from "@/components/contact/copy-email";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: `Careers | ${siteConfig.displayName}`,
  description: `No open roles at ${siteConfig.displayName} right now. One-person project today — hiring only when there is real work to share.`,
  path: "/careers",
  keywords: [
    "opensource ui careers",
    "opensourceui jobs",
    "opensource ui hiring",
    siteConfig.displayName,
  ],
});

export default function CareersPage() {
  const { author, displayName, github } = siteConfig;

  return (
    <div className="flex min-h-screen w-full min-w-0 flex-col overflow-x-hidden selection:bg-neutral-800 selection:text-white">
      <div className="flex w-full min-w-0 flex-1 flex-col items-center px-3 pt-4 md:px-4">
        <article className="w-full max-w-xl">
          <MarketingSiteNav />

          <MarketingGoBack>
            <h1 className="font-serif text-3xl text-neutral-900">Careers</h1>
            <p className="mt-2 text-sm text-neutral-500">
              No open roles — and why I&apos;m not faking any
            </p>
          </MarketingGoBack>

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-neutral-700">
            <section>
              <h2 className="font-semibold text-neutral-900">
                No openings right now
              </h2>
              <p className="mt-2">
                There are no job positions at {displayName} today. Not a
                &quot;we&apos;re always hiring&quot; page with empty roles. Just
                the truth: this is still a one-person project, and I am not
                ready to hire yet.
              </p>
              <p className="mt-2">
                I would rather say that clearly than list phantom jobs or make
                people send resumes into a void.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-neutral-900">
                How it actually works
              </h2>
              <p className="mt-2">
                I built {displayName} on nights and weekends. Components, docs,
                the site, sponsorships, replies to email — that is mostly me.
                The library is free and MIT licensed because that is the point,
                not because there is a big company behind it.
              </p>
              <p className="mt-2">
                Growth has been real, and that is exciting. It is also why I am
                careful. Hiring too early, with no structure and no clear role,
                would waste someone&apos;s time and mine. When that changes,
                this page will change too.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-neutral-900">
                What the future might look like
              </h2>
              <p className="mt-2">
                Someday I want to open real roles — design, engineering, or
                someone who helps keep the library sharp while I focus on the
                harder bits. That is the plan. It is not a promise with a date
                attached.
              </p>
              <p className="mt-2">
                When there is a real opening, you will see it here with an
                honest description of the work, how we work together, and how to
                apply. No ghost listings.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-neutral-900">
                Want to stay close anyway?
              </h2>
              <p className="mt-2">
                If you like the project and want to help before there are jobs:
                star or contribute on{" "}
                <a
                  href={github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-2"
                >
                  GitHub
                </a>
                ,{" "}
                <Link
                  href={siteConfig.sponsorship.path}
                  className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-2"
                >
                  sponsor
                </Link>
                , or just email me. I read everything. Say what you are good at
                and why {displayName} matters to you — even without a role open,
                I like knowing who is out there.
              </p>
              <p className="mt-2">
                Me:{" "}
                <a
                  href={author.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-2"
                >
                  bidyut.cc
                </a>
                {" · "}
                <a
                  href={author.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-2"
                >
                  Twitter/X
                </a>
                {" · "}
                <CopyEmail />
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-neutral-900">Related</h2>
              <p className="mt-2">
                More of the story is on the{" "}
                <Link
                  href="/about"
                  className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-2"
                >
                  About
                </Link>{" "}
                page.
              </p>
            </section>
          </div>

          <div className="mt-10 mb-8 flex flex-wrap gap-4">
            <Link
              href="/about"
              className="text-sm font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-500"
            >
              About
            </Link>
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
          </div>
        </article>
      </div>

      <FooterSkyline className="mt-auto" />
    </div>
  );
}
