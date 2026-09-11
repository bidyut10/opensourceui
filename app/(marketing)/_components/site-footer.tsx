"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MoveRight } from "lucide-react";
import type { ReactNode } from "react";

import { CopyEmail } from "@/components/contact/copy-email";
import { siteConfig } from "@/lib/site";
import { FooterSkyline } from "./footer-skyline";

const SITE_LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/careers", label: "Careers" },
  { href: siteConfig.sponsorship.path, label: "Sponsor" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

function FooterLink({
  href,
  children,
  external = false,
}: Readonly<{
  href: string;
  children: ReactNode;
  external?: boolean;
}>) {
  const className =
    "block py-0.5 text-sm text-neutral-600 transition-colors hover:text-neutral-950";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  const { author } = siteConfig;

  return (
    <footer className="mt-36 w-full">
      <div className="relative z-10 mx-auto flex w-full justify-center px-3 md:px-4">
        <div className="w-full max-w-xl px-4 md:px-0">
          <div className="border-t border-neutral-100 pt-12 pb-6 md:pb-8">
            <Image
              src="/osui-logo.png"
              alt={siteConfig.displayName}
              width={500}
              height={500}
              sizes="500px"
              className="h-auto w-28"
            />

            <p className="mt-6 flex items-center gap-2 font-serif text-3xl text-neutral-900">
              Ready when you are.
              <Image
                src="/waving-hand.png"
                alt=""
                width={512}
                height={512}
                quality={100}
                className="size-6"
              />
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-500">
              Pick a component, copy the code, and ship.{" "}
              <a
                href={siteConfig.license.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-neutral-700 underline decoration-neutral-300 underline-offset-2 transition-colors hover:text-neutral-900 hover:decoration-neutral-500"
              >
                {`${siteConfig.license.name} licensed`}
              </a>{" "}
              — {siteConfig.license.shortNote} Made &amp; maintained by{" "}
              <a
                href={author.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-neutral-700 underline decoration-neutral-300 underline-offset-2 transition-colors hover:text-neutral-900 hover:decoration-neutral-500"
              >
                {author.name}
              </a>
              .
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                href="/components"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-500"
              >
                Browse components
                <span className="relative inline-flex size-3 shrink-0 items-center justify-center">
                  <ChevronRight
                    size={12}
                    strokeWidth={3}
                    className="ease-smooth transition-[opacity,transform] duration-500 group-hover:translate-x-0.5 group-hover:scale-95 group-hover:opacity-0"
                  />
                  <MoveRight
                    size={12}
                    strokeWidth={2.5}
                    className="ease-smooth absolute -translate-x-0.5 scale-95 opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100"
                  />
                </span>
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-1.5 text-sm text-neutral-500 underline decoration-neutral-200 underline-offset-4 transition-colors hover:text-neutral-700 hover:decoration-neutral-400"
              >
                Contact us
                <span className="relative inline-flex size-3 shrink-0 items-center justify-center">
                  <ChevronRight
                    size={12}
                    strokeWidth={3}
                    className="ease-smooth transition-[opacity,transform] duration-500 group-hover:translate-x-0.5 group-hover:scale-95 group-hover:opacity-0"
                  />
                  <MoveRight
                    size={12}
                    strokeWidth={2.5}
                    className="ease-smooth absolute -translate-x-0.5 scale-95 opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100"
                  />
                </span>
              </Link>
            </div>

            <div className="mt-8 border-t border-neutral-100 pt-5">
              <nav
                aria-label="Footer"
                className="grid grid-cols-2 gap-x-8 gap-y-1"
              >
                <ul className="space-y-1.5">
                  {SITE_LINKS.map((item) => (
                    <li key={item.href}>
                      <FooterLink href={item.href}>{item.label}</FooterLink>
                    </li>
                  ))}
                </ul>

                <ul className="space-y-1.5">
                  <li>
                    <FooterLink href={siteConfig.github.url} external>
                      GitHub
                    </FooterLink>
                  </li>
                  <li>
                    <FooterLink href={author.url} external>
                      Twitter/X
                    </FooterLink>
                  </li>
                  <li>
                    <FooterLink href={author.portfolioUrl} external>
                      Portfolio
                    </FooterLink>
                  </li>
                  <li>
                    <CopyEmail className="block w-full py-0.5 text-left text-sm font-normal text-neutral-600 underline-offset-2 transition-colors hover:text-neutral-950" />
                  </li>
                </ul>
              </nav>

              <p className="mt-5 border-t border-neutral-100 pt-4 text-xs leading-relaxed text-neutral-500">
                Built in public by{" "}
                <a
                  href={author.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-neutral-700 underline decoration-neutral-300 underline-offset-2 transition-colors hover:text-neutral-900 hover:decoration-neutral-500"
                >
                  {author.name}
                </a>
                <span className="mx-1.5 text-neutral-300" aria-hidden="true">
                  ·
                </span>
                <span className="font-mono tracking-[0.06em] text-neutral-400">
                  © {year}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <FooterSkyline />
    </footer>
  );
}
