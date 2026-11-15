"use client";

import { forwardRef, useState, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

import { Check } from "lucide-react";

/**
 * Toggle pricing cards built with Next.js, React,
 * TypeScript, and Tailwind CSS.
 *
 * Replace the plans, pricing, and discount values
 * with your own data.
 *
 * Need icons? Visit nexticons.in for free copy-paste icons.
 */
export type PricingPlan = {
  name: string;
  price: number;
  yearlyPrice?: number;
  popular?: boolean;
  features: string[];
};

export type TogglePricingCardsProps = Readonly<
  {
    defaultYearly?: boolean;

    monthlyLabel?: string;
    yearlyLabel?: string;

    discountLabel?: string;

    plans?: PricingPlan[];
  } & ComponentPropsWithoutRef<"div">
>;

// Production-ready Toggle Pricing Cards component — styled with Tailwind CSS.
export const TogglePricingCards = forwardRef<
  HTMLDivElement,
  TogglePricingCardsProps
>(
  (
    {
      className,

      defaultYearly = false,

      monthlyLabel = "Monthly",
      yearlyLabel = "Yearly",

      discountLabel = "-20%",

      plans = [
        {
          name: "Starter",
          price: 0,
          yearlyPrice: 0,
          features: ["10 components", "Community support"],
        },
        {
          name: "Pro",
          price: 29,
          yearlyPrice: 24,
          popular: true,
          features: ["50+ components", "Priority support", "Custom themes"],
        },
        {
          name: "Team",
          price: 99,
          yearlyPrice: 79,
          features: ["Unlimited", "SSO", "Dedicated support"],
        },
      ],

      ...props
    },
    ref,
  ) => {
    const [yearly, setYearly] = useState(defaultYearly);

    return (
      <div
        ref={ref}
        data-slot="toggle-pricing-cards"
        className={cn("w-96 font-sans", className)}
        {...props}
      >
        {/* Billing Toggle */}
        <div
          data-slot="toggle-pricing-cards-switch"
          className="mb-4 flex items-center justify-center gap-3"
        >
          <span
            className={cn(
              "text-xs font-medium",
              !yearly ? "text-neutral-900" : "text-neutral-400",
            )}
          >
            {monthlyLabel}
          </span>

          <button
            type="button"
            aria-label="Toggle billing period"
            onClick={() => setYearly((prev) => !prev)}
            className={cn(
              "relative h-6 w-11 cursor-pointer rounded-full transition-[background-color,scale] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] motion-reduce:transition-[background-color]",
              yearly ? "bg-neutral-800" : "bg-neutral-200",
            )}
          >
            <div
              className={cn(
                "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-[cubic-bezier(0.77,0,0.175,1)] motion-reduce:transition-none",
                yearly ? "translate-x-5.5" : "translate-x-0.5",
              )}
            />
          </button>

          <span
            className={cn(
              "text-xs font-medium",
              yearly ? "text-neutral-900" : "text-neutral-400",
            )}
          >
            {yearlyLabel}

            <span className="ml-1 text-[10px] font-semibold text-emerald-600">
              {discountLabel}
            </span>
          </span>
        </div>

        {/* Plans */}
        <div data-slot="toggle-pricing-cards-plans" className="flex gap-2">
          {plans.map((plan) => {
            const price = yearly
              ? (plan.yearlyPrice ?? plan.price)
              : plan.price;

            return (
              <div
                key={plan.name}
                data-slot="toggle-pricing-cards-plan"
                className={cn(
                  "flex-1 rounded-xl border p-3 transition-[color,background-color,border-color,box-shadow]",
                  plan.popular
                    ? "border-neutral-900 bg-neutral-900 text-white shadow-lg"
                    : "border-neutral-100 bg-white",
                )}
              >
                {plan.popular && (
                  <span className="font-mono text-[8px] tracking-wider text-teal-300 uppercase">
                    Popular
                  </span>
                )}

                <p
                  className={cn(
                    "mt-1 text-[10px] font-medium",
                    plan.popular ? "text-neutral-400" : "text-neutral-500",
                  )}
                >
                  {plan.name}
                </p>

                <p className="mt-1 text-lg font-light tracking-tight">
                  ${price}
                  <span
                    className={cn(
                      "text-[10px]",
                      plan.popular ? "text-neutral-500" : "text-neutral-400",
                    )}
                  >
                    /mo
                  </span>
                </p>

                <ul className="mt-2 space-y-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={cn(
                        "flex items-center gap-1 text-[9px]",
                        plan.popular ? "text-neutral-400" : "text-neutral-500",
                      )}
                    >
                      <Check
                        size={8}
                        className={
                          plan.popular ? "text-teal-400" : "text-emerald-500"
                        }
                      />

                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);

TogglePricingCards.displayName = "TogglePricingCards";
