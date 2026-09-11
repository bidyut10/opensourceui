"use client";

import {
  Suspense,
  useSyncExternalStore,
  type MouseEvent,
  type ReactNode,
} from "react";
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

function MarketingGoBackLink({ className }: { className?: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.toString();

  const href = useSyncExternalStore(
    subscribe,
    () =>
      BACK_PAGES.has(pathname) ? getInternalBackHref(pathname, search) : null,
    () => null,
  );

  if (!href) return null;

  function handleBack(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const destination = consumeInternalBack(pathname, search);
    if (!destination) return;
    router.push(destination);
  }

  return (
    <Link
      href={href}
      onClick={handleBack}
      className={cn(
        "group ease-smooth mb-4 inline-flex items-center gap-0.5 font-sans text-sm text-neutral-500 transition-colors duration-300 hover:text-neutral-900 motion-safe:animate-[marketing-go-back-in_0.35s_var(--ease-smooth)_both]",
        className,
      )}
    >
      <ChevronLeft
        size={16}
        strokeWidth={2}
        aria-hidden
        className="ease-smooth transition-transform duration-300 group-hover:-translate-x-0.5"
      />
      Go back
    </Link>
  );
}

/**
 * Page titles must stay outside the useSearchParams Suspense boundary so
 * static HTML (and crawlers) always include the heading — not only the fallback.
 */
export function MarketingGoBack({ className, children }: MarketingGoBackProps) {
  return (
    <div className="mt-20">
      <Suspense fallback={null}>
        <MarketingGoBackLink className={className} />
      </Suspense>
      {children}
    </div>
  );
}
