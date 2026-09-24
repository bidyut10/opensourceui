import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { FooterSkyline } from "@/app/(marketing)/_components/footer-skyline";
import { Heading } from "@/app/(marketing)/_components/heading";
import { MarketingGoBack } from "@/app/(marketing)/_components/marketing-go-back";
import { MarketingSiteNav } from "@/app/(marketing)/_components/marketing-site-nav";
import { Paragraph } from "@/app/(marketing)/_components/paragraph";
import { PolarCheckoutButton } from "@/app/(marketing)/_components/polar-checkout-button";
import { SponsorPaymentSuccess } from "@/app/(marketing)/_components/sponsor-payment-success";
import { SponsorPlacementPreviews } from "@/app/(marketing)/_components/sponsor-placement-previews";
import { SponsorTrafficChart } from "@/app/(marketing)/_components/sponsor-traffic-chart";
import { Sentry } from "@/icons/brands/sentry";
import { cn } from "@/lib/cn";
import { getPolarCheckoutUrl } from "@/lib/polar";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig, type PolarCheckoutKey } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: `Become a Sponsor | ${siteConfig.displayName}`,
  description: `Sponsor ${siteConfig.displayName} — Silver, Gold, or Platinum via Polar. GitHub, homepage, and docs placements.`,
  path: siteConfig.sponsorship.path,
});

function formatMoney(amount: number) {
  return `$${amount}`;
}

export default function SponsorPage() {
  const { sponsorship, launchedAt } = siteConfig;
  const { tiers, rateLabel } = sponsorship;
  const launchLabel = new Date(`${launchedAt}T12:00:00Z`).toLocaleDateString(
    "en-US",
    { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" },
  );

  return (
    <div className="flex min-h-screen w-full min-w-0 flex-col overflow-x-hidden selection:bg-neutral-800 selection:text-white">
      <div className="flex w-full min-w-0 flex-1 flex-col items-center gap-6 px-6 pt-4 md:px-4">
        <div className="w-full max-w-xl px-4 md:px-0">
          <MarketingSiteNav />

          <MarketingGoBack>
            <Heading>Become a sponsor</Heading>
            <Paragraph>
              Pick a tier, pay on Polar, send your brand assets. We place you on
              GitHub, the homepage, and — for Platinum — the docs sidebar.{" "}
              {rateLabel}.
            </Paragraph>
          </MarketingGoBack>

          <Suspense fallback={null}>
            <div className="mt-8">
              <SponsorPaymentSuccess />
            </div>
          </Suspense>
        </div>

        <div className="mt-10 w-full max-w-5xl px-4 md:px-0">
          <div className="grid w-full grid-cols-1 gap-5 pt-2 md:grid-cols-3 md:items-stretch md:gap-6 md:pt-4">
            {tiers.map((tier) => {
              const checkoutUrl = getPolarCheckoutUrl(
                tier.checkoutKey as PolarCheckoutKey,
              );
              const isPlatinum = tier.id === "platinum";
              const isSilver = tier.id === "silver";

              return (
                <div
                  key={tier.id}
                  id={tier.id}
                  className={cn(
                    "relative h-full min-h-0 w-full md:min-w-0",
                    isPlatinum
                      ? "z-10 order-first md:order-2"
                      : isSilver
                        ? "md:order-1"
                        : "md:order-3",
                  )}
                >
                  {isPlatinum ? (
                    <div className="pointer-events-none absolute -top-1 right-4 z-20 flex flex-col items-center md:right-5">
                      <span
                        aria-hidden="true"
                        className="h-3.5 w-px bg-neutral-300"
                      />
                      <span className="relative -rotate-2 border border-neutral-200 bg-white px-2.5 py-2 shadow-[0_6px_16px_-8px_rgba(0,0,0,0.2)]">
                        <span
                          aria-hidden="true"
                          className="absolute top-1.5 left-1.5 size-1 rounded-full bg-rose-500"
                        />
                        <span className="block pl-2.5 font-mono text-[9px] leading-none tracking-[0.18em] text-neutral-800 uppercase">
                          Recommended
                        </span>
                        <span className="mt-1 block pl-2.5 font-serif text-[11px] leading-none text-neutral-500 italic">
                          full reach
                        </span>
                      </span>
                    </div>
                  ) : null}

                  <article
                    className={cn(
                      "flex h-full flex-col overflow-hidden rounded-2xl border bg-white",
                      isPlatinum
                        ? "border-neutral-200 bg-neutral-50/40 shadow-[0_12px_32px_-18px_rgba(0,0,0,0.18)]"
                        : "border-neutral-100",
                    )}
                  >
                    <div className="relative h-32 shrink-0 overflow-hidden md:h-36">
                      <Image
                        src={tier.image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className={cn(
                          "object-cover",
                          isPlatinum ? "opacity-80" : "opacity-45",
                        )}
                      />
                      <div
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-0",
                          isPlatinum
                            ? "bg-[linear-gradient(to_bottom,rgba(255,255,255,0.25)_0%,rgba(255,255,255,0.7)_55%,#fff_100%)]"
                            : "bg-[linear-gradient(to_bottom,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.88)_55%,#fff_100%)]",
                        )}
                      />
                    </div>

                    <div className="relative flex flex-1 flex-col px-5 pt-1 pb-5 md:px-5 md:pb-5">
                      <div className="min-w-0">
                        <p className="font-mono text-[10px] tracking-[0.12em] text-neutral-400 uppercase">
                          {tier.summary}
                        </p>
                        <h2 className="mt-1 font-serif text-2xl text-balance text-neutral-900">
                          {tier.name}
                        </h2>
                      </div>

                      <p className="mt-4">
                        <span className="font-sans text-2xl font-medium tracking-tight text-neutral-900">
                          {formatMoney(tier.priceMonthly)}
                        </span>
                        <span className="text-sm text-neutral-500"> / mo</span>
                      </p>

                      <p
                        className={cn(
                          "mt-3 min-h-11 text-sm leading-snug text-pretty",
                          isPlatinum ? "text-neutral-600" : "text-neutral-500",
                        )}
                      >
                        {isPlatinum
                          ? "All three placements — GitHub, homepage, and the docs sidebar."
                          : isSilver
                            ? "One placement. Quiet support."
                            : "Two placements. Site + GitHub."}
                      </p>

                      <ul
                        className={cn(
                          "mt-4 space-y-2 text-sm leading-snug",
                          isPlatinum
                            ? "font-medium text-neutral-800"
                            : "text-neutral-500",
                        )}
                      >
                        {tier.includes.map((item) => (
                          <li key={item} className="flex gap-2.5">
                            <span
                              aria-hidden="true"
                              className={cn(
                                "mt-2 size-1.5 shrink-0 rounded-full",
                                isPlatinum
                                  ? "bg-neutral-900"
                                  : "bg-neutral-300",
                              )}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto pt-6">
                        <PolarCheckoutButton
                          href={checkoutUrl}
                          theme={isPlatinum ? "dark" : "light"}
                          className={
                            isPlatinum
                              ? "bg-neutral-900 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800"
                              : "border border-neutral-200 bg-neutral-50 py-2.5 text-sm text-neutral-600 hover:border-neutral-300 hover:bg-white"
                          }
                        >
                          {isPlatinum ? "Get Platinum" : "Choose plan"}
                        </PolarCheckoutButton>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-center text-xs leading-relaxed text-neutral-500">
            Prefer a lighter touch? Silver or Gold still work. Cancel anytime in
            Polar. By paying you agree to our{" "}
            <Link
              href="/terms"
              className="font-medium text-neutral-700 underline decoration-neutral-300 underline-offset-2 hover:decoration-neutral-500"
            >
              Terms
            </Link>{" "}
            (no gambling, adult, or fraud — violations are non-refundable).
          </p>
        </div>

        <div className="mt-36 w-full max-w-xl px-4 md:px-0">
          <Heading>What you get from this audience</Heading>
          <Paragraph>
            {`Launched ${launchLabel} — ${siteConfig.stats.pageViews} visits and ${siteConfig.stats.visitors} unique users since. More views means more people learn your name.`}
          </Paragraph>
          <div className="mt-10">
            <SponsorTrafficChart />
          </div>
        </div>

        <div className="mt-36 w-full max-w-xl px-4 md:px-0">
          <Heading>How your brand appears</Heading>
          <Paragraph>
            Each tier shows up in a different place. Gold adds the homepage row;
            Platinum adds the docs sidebar on top of Gold.
          </Paragraph>
          <SponsorPlacementPreviews />
        </div>

        <div className="mt-36 w-full max-w-xl px-4 md:px-0">
          <Heading>Open-source program sponsors</Heading>
          <Paragraph>
            Separate from the paid tiers above — some companies support this
            project with product credits through their OSS programs. They keep
            the site running; they are not brand placements you buy here.
          </Paragraph>

          <ul className="mt-8 divide-y divide-neutral-100 border-y border-neutral-100">
            <li>
              <a
                href="https://sentry.io/for/open-source/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 py-5 transition-colors"
              >
                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-neutral-100 bg-neutral-50 text-neutral-900">
                  <Sentry size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <span className="font-sans text-sm font-semibold text-neutral-900 group-hover:text-neutral-700">
                      Sentry
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.12em] text-neutral-400 uppercase">
                      OSS program
                    </span>
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-neutral-500">
                    Selected Opensource UI for their open-source sponsorship —
                    they provide error monitoring so we can catch and fix bugs
                    in production.
                  </span>
                  <span className="mt-2 inline-block font-mono text-xs text-neutral-400 underline decoration-neutral-200 underline-offset-2 group-hover:text-neutral-600 group-hover:decoration-neutral-400">
                    sentry.io/for/open-source
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-36 mb-8 w-full max-w-xl px-4 md:px-0">
          <Heading>After payment</Heading>
          <Paragraph>
            Polar sends you back here. A success panel asks for the assets for
            your plan — then email them and we publish within a few days. All
            placements must follow our{" "}
            <Link
              href="/terms"
              className="font-medium text-neutral-800 underline decoration-neutral-300 underline-offset-2 hover:decoration-neutral-500"
            >
              Terms
            </Link>
            .
          </Paragraph>
        </div>
      </div>

      <FooterSkyline className="mt-auto" />
    </div>
  );
}
