import { Github } from "@/icons/brands/github";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site";

const DEMO_BRAND = "Your brand";
const DEMO_LINE = "Short product line goes here";
const DEMO_DOMAIN = "yoursite.com";

/** Placement previews — demo-only labels, nothing clickable. */
export function SponsorPlacementPreviews() {
  return (
    <div className="mt-10 space-y-8">
      <div>
        <p className="font-sans text-sm font-semibold text-neutral-900">
          Silver · GitHub README
        </p>
        <p className="mt-1 text-sm tracking-tight text-neutral-500">
          Your name in the repo sponsors list.
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border border-neutral-100 bg-[#0d1117]">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
            <Github size={14} className="text-neutral-400" aria-hidden />
            <span className="font-mono text-[11px] text-neutral-400">
              {siteConfig.name}/opensourceui · README.md
            </span>
          </div>
          <div className="space-y-2 px-4 py-4 font-mono text-[12px] leading-relaxed text-neutral-300">
            <p className="text-neutral-500">## Sponsors</p>
            <p>
              <span className="text-neutral-500">- </span>
              <span className="text-neutral-200">{DEMO_BRAND}</span>
              <span className="text-neutral-500">
                {" "}
                — thanks for supporting the project
              </span>
            </p>
          </div>
        </div>
      </div>

      <div>
        <p className="font-sans text-sm font-semibold text-neutral-900">
          Gold · Homepage Sponsors
        </p>
        <p className="mt-1 text-sm tracking-tight text-neutral-500">
          Same row style as Resources &amp; Sponsors on the homepage — plus
          Silver.
        </p>
        <ul className="mt-4 flex flex-col gap-2.5 rounded-2xl border border-neutral-100 bg-white p-4">
          <li className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-dashed border-neutral-300">
              <span className="font-sans text-[10px] text-neutral-400">+</span>
            </div>
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <p className="min-w-0 flex-1 truncate font-sans text-sm leading-snug">
                <span className="font-semibold text-neutral-400">
                  {DEMO_BRAND}
                </span>
                <span className="text-neutral-300"> / </span>
                <span className="text-neutral-400">{DEMO_LINE}</span>
              </p>
              <span className="shrink-0 font-mono text-sm text-neutral-300">
                {DEMO_DOMAIN}
              </span>
            </div>
          </li>
        </ul>
      </div>

      <div>
        <p className="font-sans text-sm font-semibold text-neutral-900">
          Platinum · Docs sidebar
        </p>
        <p className="mt-1 text-sm tracking-tight text-neutral-500">
          Sticky card beside the component TOC — plus Gold and Silver.
        </p>
        <div className="mt-4 flex overflow-hidden rounded-2xl border border-neutral-100 bg-white">
          <div className="hidden w-24 shrink-0 border-r border-neutral-100 bg-neutral-50 p-3 md:block">
            <p className="font-mono text-[9px] tracking-widest text-neutral-400 uppercase">
              On this page
            </p>
            <div className="mt-2 space-y-1.5">
              <div className="h-1.5 w-14 rounded-full bg-neutral-200" />
              <div className="h-1.5 w-10 rounded-full bg-neutral-200" />
              <div className="h-1.5 w-12 rounded-full bg-neutral-200" />
            </div>
          </div>
          <div className="min-w-0 flex-1 p-3">
            <div
              className={cn(
                "rounded-lg border-2 border-neutral-900 bg-neutral-900 p-3 text-white",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[9px] tracking-[0.12em] text-neutral-400 uppercase">
                  Platinum slot
                </span>
                <span className="rounded-sm bg-rose-500 px-1.5 py-px font-sans text-[8px] font-medium tracking-wide uppercase">
                  Demo
                </span>
              </div>
              <p className="mt-2 font-serif text-base leading-snug">
                {DEMO_BRAND}
              </p>
              <p className="mt-1 font-sans text-[11px] leading-relaxed text-neutral-400">
                {DEMO_LINE}
              </p>
              <span className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-white px-2 py-1.5 font-sans text-[11px] font-semibold text-neutral-900">
                Your CTA
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
