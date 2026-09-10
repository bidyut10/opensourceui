"use client";

import { useEffect } from "react";

import { cn } from "@/lib/cn";

type PolarCheckoutButtonProps = Readonly<{
  href: string;
  children: React.ReactNode;
  className?: string;
  theme?: "light" | "dark";
}>;

/**
 * Polar Checkout Link trigger. Works on static export — no backend.
 * Prefers embedded checkout when the Polar script loads; otherwise opens the link.
 * @see https://polar.sh/docs/features/checkout/links
 */
export function PolarCheckoutButton({
  href,
  children,
  className,
  theme = "light",
}: PolarCheckoutButtonProps) {
  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-polar-embed="true"]',
    );
    if (existing) return;

    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/@polar-sh/checkout@0.1/dist/embed.global.js";
    script.defer = true;
    script.dataset.autoInit = "true";
    script.dataset.polarEmbed = "true";
    document.body.appendChild(script);
  }, []);

  if (!href) {
    return (
      <span
        className={cn(
          "inline-flex w-full cursor-not-allowed items-center justify-center rounded-md px-3 py-2 font-sans text-xs font-semibold opacity-50",
          className,
        )}
        title="Add your Polar Checkout Link in lib/site.ts"
      >
        Checkout soon
      </span>
    );
  }

  return (
    <a
      href={href}
      data-polar-checkout
      data-polar-checkout-theme={theme}
      className={cn(
        "inline-flex w-full items-center justify-center rounded-md px-3 py-2 font-sans text-xs font-semibold transition-colors",
        className,
      )}
    >
      {children}
    </a>
  );
}
