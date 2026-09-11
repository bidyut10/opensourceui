"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Check } from "lucide-react";

import { CopyEmail } from "@/components/contact/copy-email";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site";

const PLAN_ASSETS: Record<string, { title: string; items: string[] }> = {
  silver: {
    title: "Silver — send these",
    items: ["Brand / company name", "Optional link for the README"],
  },
  gold: {
    title: "Gold — send these",
    items: [
      "Brand / company name",
      "One short line (what you do)",
      "Domain or product URL",
      "Logo (PNG or SVG)",
    ],
  },
  platinum: {
    title: "Platinum — send these",
    items: [
      "Brand / company name",
      "One short pitch for the docs card",
      "Product URL",
      "Logo (PNG or SVG)",
    ],
  },
};

function normalizePlan(value: string | null): keyof typeof PLAN_ASSETS | null {
  if (!value) return null;
  const key = value.trim().toLowerCase();
  if (key in PLAN_ASSETS) return key as keyof typeof PLAN_ASSETS;
  return null;
}

/** Shown after Polar redirects back with ?plan=…&checkout_id=… */
export function SponsorPaymentSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const plan = normalizePlan(searchParams.get("plan"));
  const checkoutId = searchParams.get("checkout_id");
  const paid = Boolean(plan || checkoutId);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!paid) return;
    const id = globalThis.requestAnimationFrame(() => setVisible(true));
    return () => globalThis.cancelAnimationFrame(id);
  }, [paid]);

  if (!paid) return null;

  const assets = plan ? PLAN_ASSETS[plan] : null;
  const planLabel = plan
    ? plan.charAt(0).toUpperCase() + plan.slice(1)
    : "your";

  function dismiss() {
    router.replace(siteConfig.sponsorship.path);
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "ease-smooth mb-8 rounded-2xl border border-neutral-900 bg-neutral-900 p-5 text-white transition-[opacity,transform] duration-500",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-2 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100",
      )}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-neutral-900">
          <Check size={14} strokeWidth={2.5} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] tracking-[0.12em] text-neutral-400 uppercase">
            Payment received
          </p>
          <p className="mt-1 font-serif text-xl text-white">
            Thanks — {planLabel} sponsorship is confirmed
          </p>
          <p className="mt-2 text-sm leading-relaxed text-neutral-400">
            Polar handled the payment. Send your brand details next so we can
            publish your placement.
          </p>

          {assets ? (
            <div className="mt-4">
              <p className="font-sans text-xs font-semibold text-neutral-200">
                {assets.title}
              </p>
              <ul className="mt-2 space-y-1.5 text-sm text-neutral-300">
                {assets.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="text-neutral-500">
                      –
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="mt-4 text-sm text-neutral-300">
              Email your brand name, link, and logo (PNG/SVG) based on your
              plan.
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <CopyEmail className="inline-flex items-center justify-center rounded-md bg-white px-3.5 py-2 font-sans text-xs font-semibold text-neutral-900 no-underline decoration-transparent transition-colors hover:bg-neutral-100 hover:decoration-transparent">
              Copy email
            </CopyEmail>
            <Link
              href="/contact#sponsor"
              className="inline-flex items-center justify-center rounded-md border border-neutral-600 px-3.5 py-2 font-sans text-xs text-neutral-200 transition-colors hover:border-neutral-400 hover:text-white"
            >
              Contact page
            </Link>
            <button
              type="button"
              onClick={dismiss}
              className="inline-flex items-center justify-center rounded-md px-3 py-2 font-sans text-xs text-neutral-400 transition-colors hover:text-neutral-200"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
