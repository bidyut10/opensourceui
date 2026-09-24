import type { Metadata } from "next";
import Link from "next/link";

import { FooterSkyline } from "@/app/(marketing)/_components/footer-skyline";
import { MarketingGoBack } from "@/app/(marketing)/_components/marketing-go-back";
import { MarketingSiteNav } from "@/app/(marketing)/_components/marketing-site-nav";
import { CopyEmail } from "@/components/contact/copy-email";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: `Privacy Policy | ${siteConfig.displayName}`,
  description: `How ${siteConfig.displayName} handles analytics, cookies, and visitor data on opensourceui.in.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  const { author, displayName, url } = siteConfig;

  return (
    <div className="flex min-h-screen w-full min-w-0 flex-col overflow-x-hidden selection:bg-neutral-800 selection:text-white">
      <div className="flex w-full min-w-0 flex-1 flex-col items-center px-6 pt-4 md:px-4">
        <article className="w-full max-w-xl">
          <MarketingSiteNav />

          <MarketingGoBack>
            <h1 className="font-serif text-3xl text-neutral-900">
              Privacy Policy
            </h1>
            <p className="mt-2 text-sm text-neutral-500">
              Last updated: March 2026
            </p>
          </MarketingGoBack>

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-neutral-700">
            <section>
              <h2 className="font-semibold text-neutral-900">Overview</h2>
              <p className="mt-2">
                {displayName} ({url}) is a free component library site. We
                collect minimal data needed to operate the site and understand
                usage. We do not sell personal data.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-neutral-900">Analytics</h2>
              <p className="mt-2">
                When configured, we use{" "}
                <a
                  href="https://posthog.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-2"
                >
                  PostHog
                </a>{" "}
                for privacy-friendly analytics (page views and component
                interactions). PostHog may use cookies or local storage.
                Analytics is disabled when no PostHog key is set.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-neutral-900">
                Error monitoring
              </h2>
              <p className="mt-2">
                We use{" "}
                <a
                  href="https://sentry.io/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-2"
                >
                  Sentry
                </a>{" "}
                (via their open-source sponsorship program) to capture
                application errors so we can fix bugs. We configure Sentry to
                limit personally identifiable information. See Sentry&apos;s
                privacy policy for how they process that data.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-neutral-900">Contact</h2>
              <p className="mt-2">
                If you email us about the site, we use your message only to
                reply. We do not add you to marketing lists without consent.
                Prefer the{" "}
                <Link
                  href="/contact"
                  className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-2"
                >
                  contact page
                </Link>{" "}
                for how to reach the maintainer.
              </p>
              <p className="mt-2">
                Maintainer:{" "}
                <a
                  href={author.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-2"
                >
                  {author.name}
                </a>{" "}
                · <CopyEmail />
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-neutral-900">
                Third-party hosting
              </h2>
              <p className="mt-2">
                The site is hosted on Vercel and/or Cloudflare Pages. Those
                providers process standard server logs (IP, user agent,
                requested URLs) under their own privacy policies.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-neutral-900">
                Open source components
              </h2>
              <p className="mt-2">
                Components you copy from this site run in your own project. You
                are responsible for privacy practices in your application after
                copying code.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-neutral-900">Changes</h2>
              <p className="mt-2">
                We may update this policy. Continued use of the site after
                changes means you accept the revised policy.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-neutral-900">Related</h2>
              <p className="mt-2">
                Sponsorship rules, prohibited content, and refunds are covered
                in our{" "}
                <Link
                  href="/terms"
                  className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-2"
                >
                  Terms of Use
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
              href="/about"
              className="text-sm font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-500"
            >
              About
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
