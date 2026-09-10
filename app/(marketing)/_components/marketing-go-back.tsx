"use client";

import { useSyncExternalStore, type MouseEvent, type ReactNode } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  consumeInternalBack,
  getInternalBackHref,
} from "@/lib/navigation/path-memory";
import { cn } from "@/lib/cn";

const BACK_PAGES = new Set([
  "/privacy",
  "/terms",
  "/sponsor",
  "/about",
  "/careers",
  "/contact",
]);

function subscribe() {
  return () => {};
}

type MarketingGoBackProps = Readonly<{
  className?: string;
  children?: ReactNode;
}>;

export function MarketingGoBack({ className, children }: MarketingGoBackProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.toString();

  const href = useSyncExternalStore(
    subscribe,
    () =>
      BACK_PAGES.has(pathname)
        ? getInternalBackHref(pathname, search)
        : null,
    () => null,
  );

  function handleBack(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const destination = consumeInternalBack(pathname, search);
    if (!destination) return;
    router.push(destination);
  }

  return (
    <>
      {href ? (
        <Link
          href={href}
          onClick={handleBack}
          className={cn(
            "group mt-20 inline-flex items-center gap-0.5 font-sans text-sm text-neutral-500 transition-colors duration-300 ease-smooth hover:text-neutral-900 motion-safe:animate-[marketing-go-back-in_0.35s_var(--ease-smooth)_both]",
            className,
          )}
        >
          <ChevronLeft
            size={16}
            strokeWidth={2}
            aria-hidden
            className="transition-transform duration-300 ease-smooth group-hover:-translate-x-0.5"
          />
          Go back
        </Link>
      ) : null}
      {children ? (
        <div className={href ? "mt-4" : "mt-20"}>{children}</div>
      ) : null}
    </>
  );
}
