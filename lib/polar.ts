import { siteConfig, type PolarCheckoutKey } from "@/lib/site";

const ENV_BY_KEY: Record<PolarCheckoutKey, string | undefined> = {
  silverCheckoutUrl: process.env.NEXT_PUBLIC_POLAR_SILVER_CHECKOUT_URL,
  goldCheckoutUrl: process.env.NEXT_PUBLIC_POLAR_GOLD_CHECKOUT_URL,
  platinumCheckoutUrl: process.env.NEXT_PUBLIC_POLAR_PLATINUM_CHECKOUT_URL,
  supportCheckoutUrl: process.env.NEXT_PUBLIC_POLAR_SUPPORT_CHECKOUT_URL,
};

/** Checkout URL from env (build-time) or siteConfig.polar fallback. Static-export safe. */
export function getPolarCheckoutUrl(key: PolarCheckoutKey): string {
  const fromEnv = ENV_BY_KEY[key]?.trim();
  if (fromEnv) return fromEnv;
  return siteConfig.polar[key] ?? "";
}

export function hasPolarCheckout(key: PolarCheckoutKey): boolean {
  return Boolean(getPolarCheckoutUrl(key));
}
