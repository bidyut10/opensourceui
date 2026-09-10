import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { FooterSkyline } from "@/app/(marketing)/_components/footer-skyline";
import { MarketingGoBack } from "@/app/(marketing)/_components/marketing-go-back";
import { MarketingSiteNav } from "@/app/(marketing)/_components/marketing-site-nav";
import { CopyEmail } from "@/components/contact/copy-email";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: `Terms of Use | ${siteConfig.displayName}`,
  description: `Terms of use and sponsorship rules for ${siteConfig.displayName}, including prohibited content, review, and refunds.`,
  path: "/terms",
});

export default function TermsPage() {
  const { author, displayName, url, sponsorship } = siteConfig;

  return (
    <div className="flex min-h-screen w-full min-w-0 flex-col overflow-x-hidden selection:bg-neutral-800 selection:text-white">
      <div className="flex w-full min-w-0 flex-1 flex-col items-center px-3 pt-4 md:px-4">
        <article className="w-full max-w-xl">
          <MarketingSiteNav />

          <Suspense fallback={<div className="mt-20" />}>
            <MarketingGoBack>
              <h1 className="font-serif text-3xl text-neutral-900">
                Terms of Use
              </h1>
              <p className="mt-2 text-sm text-neutral-500">
                Last updated: September 2026
              </p>
            </MarketingGoBack>
          </Suspense>

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-neutral-700">
            <section>
              <h2 className="font-semibold text-neutral-900">1. Overview</h2>
              <p className="mt-2">
                These Terms govern your use of {displayName} ({url}) and any
                paid sponsorship or placement purchased through our site
                (including Polar checkout). By using the site or paying for a
                sponsorship tier, you agree to these Terms. If you do not agree,
                do not use the site or purchase a placement.
              </p>
              <p className="mt-2">
                {displayName} is an open-source component library and marketing
                site operated by {author.name}. These Terms protect the project,
                visitors, and the maintainer from misuse, fraud, and harmful
                content.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-neutral-900">2. The site &amp; components</h2>
              <p className="mt-2">
                Components and code on {displayName} are offered under the{" "}
                <a
                  href={siteConfig.license.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-2"
                >
                  {siteConfig.license.name} License
                </a>{" "}
                unless a file says otherwise. You are responsible for how you
                use copied code in your own projects.
              </p>
              <p className="mt-2">
                The site is provided “as is.” We do not guarantee uninterrupted
                availability, specific traffic numbers, or that any sponsorship
                will produce sales or leads.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-neutral-900">3. Sponsorships</h2>
              <p className="mt-2">
                Paid tiers (Silver, Gold, Platinum) and prices are described on{" "}
                <Link
                  href={sponsorship.path}
                  className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-2"
                >
                  {url}
                  {sponsorship.path}
                </Link>
                . Payments are processed by Polar (merchant of record). Your
                subscription and billing relationship with Polar is also subject
                to Polar’s buyer terms.
              </p>
              <p className="mt-2">
                A payment does not guarantee immediate publication. We review
                assets and destination URLs before going live. We may request
                changes or refuse a placement that violates these Terms.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-neutral-900">
                4. Prohibited content &amp; destinations
              </h2>
              <p className="mt-2">
                You may not promote, link to, or submit branding for sites or
                products that involve any of the following (including after
                publication if discovered later):
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Gambling, betting, casinos, or similar services</li>
                <li>
                  Pornography, adult sexual content, or sexually explicit
                  material
                </li>
                <li>Illegal products, services, or content</li>
                <li>
                  Malware, phishing, scams, fraud, or deceptive “get rich”
                  schemes
                </li>
                <li>
                  Hate, harassment, exploitation of minors, or other harmful
                  content
                </li>
                <li>
                  Counterfeit goods, unauthorized pharmaceuticals, or other
                  regulated goods sold unlawfully
                </li>
                <li>
                  Anything that could reasonably damage {displayName}, its
                  visitors, or its reputation
                </li>
              </ul>
              <p className="mt-2">
                Destination URLs must match the brand you submit. Cloaking,
                redirects to prohibited content, or bait-and-switch after
                approval is forbidden.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-neutral-900">5. Review &amp; verification</h2>
              <p className="mt-2">
                We may review your brand name, assets, and links before and after
                publication. We may check your site again at any time. If we find
                prohibited content, fraud, or a policy violation, we may:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Refuse to publish the placement</li>
                <li>Remove or disable the placement immediately</li>
                <li>Cancel remaining sponsored time for that subscription</li>
                <li>Block future sponsorships from the same party</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-neutral-900">6. Refunds</h2>
              <p className="mt-2">
                <span className="font-medium text-neutral-900">
                  Policy violations are non-refundable.
                </span>{" "}
                If we refuse or remove a placement because it violates Section 4
                (or related fraud / misuse), you are not entitled to a refund for
                the current billing period or unused time.
              </p>
              <p className="mt-2">
                If we cannot fulfill a valid, approved sponsorship solely because
                of an error on our side (for example we permanently fail to
                publish after approving your assets), contact <CopyEmail />{" "}
                within 14 days and we will work with you and/or Polar on a fair
                remedy, which may include a refund or credit at our discretion.
              </p>
              <p className="mt-2">
                Canceling a Polar subscription stops future renewals; it does not
                by itself create a refund for the period already paid unless
                Polar’s own policies provide one.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-neutral-900">7. Your promises</h2>
              <p className="mt-2">You represent that:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>
                  You have the right to use the name, logo, and trademarks you
                  submit
                </li>
                <li>Your destination URL is accurate and lawful</li>
                <li>
                  Your content does not infringe others’ rights or these Terms
                </li>
                <li>
                  You will not use sponsorship to mislead visitors or harm{" "}
                  {displayName}
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-neutral-900">8. Our rights</h2>
              <p className="mt-2">
                We may change sponsorship prices, inventory, or placement
                designs. We may update these Terms; continued use or renewal
                after changes means you accept the updated Terms. We may refuse
                any sponsorship for any reason that protects the project or its
                users.
              </p>
              <p className="mt-2">
                Sponsorship is advertising, not an endorsement of your product.
                We may label placements as sponsored.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-neutral-900">9. Limitation of liability</h2>
              <p className="mt-2">
                To the fullest extent allowed by law, {displayName} and{" "}
                {author.name} are not liable for indirect, incidental, or
                consequential damages, lost profits, or loss of data arising from
                the site or sponsorships. Our total liability for any claim
                related to a sponsorship is limited to the fees you paid for that
                sponsorship in the three months before the claim.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-neutral-900">10. Contact</h2>
              <p className="mt-2">
                Questions about these Terms or sponsorships: <CopyEmail />. See
                also our{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-2"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </section>

            <p className="text-xs text-neutral-500">
              This page is a practical policy for {displayName}. It is not
              personalized legal advice. For high-risk situations, consult a
              lawyer in your jurisdiction.
            </p>
          </div>

          <div className="mt-10 mb-8 flex flex-wrap gap-4">
            <Link
              href={sponsorship.path}
              className="text-sm font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-500"
            >
              Become a sponsor
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-500"
            >
              About
            </Link>
            <Link
              href="/privacy"
              className="text-sm font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-500"
            >
              Privacy
            </Link>
          </div>
        </article>
      </div>

      <FooterSkyline className="mt-auto" />
    </div>
  );
}
