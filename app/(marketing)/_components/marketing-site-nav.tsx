import Link from "next/link";

import { GithubRepoLink } from "@/app/_shared/github-repo-link";
import { LogoIcon } from "@/app/(marketing)/_components/Logo";
import { siteConfig } from "@/lib/site";

export function MarketingSiteNav() {
  return (
    <div className="flex w-full max-w-full items-center justify-between">
      <Link
        href="/"
        className="hover:bg-muted flex items-center gap-2 transition-colors"
      >
        <LogoIcon className="w-6" />
        <span className="font-sans text-lg font-medium tracking-tighter">
          {siteConfig.displayName}
        </span>
      </Link>

      <GithubRepoLink />
    </div>
  );
}
