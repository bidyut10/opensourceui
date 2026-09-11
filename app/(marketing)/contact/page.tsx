import type { Metadata } from "next";
import Link from "next/link";

import { FooterSkyline } from "@/app/(marketing)/_components/footer-skyline";
import { MarketingGoBack } from "@/app/(marketing)/_components/marketing-go-back";
import { MarketingSiteNav } from "@/app/(marketing)/_components/marketing-site-nav";
import { CopyEmail } from "@/components/contact/copy-email";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const linkClass =
  "font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-2";

export const metadata: Metadata = createPageMetadata({
  title: `Contact | ${siteConfig.displayName}`,
  description: `Contact ${siteConfig.author.name} about ${siteConfig.displayName} — support, sponsorships, bugs, pull requests, and contributions. Email, GitHub, and site links.`,
  path: "/contact",
  keywords: [
    "contact opensource ui",
    "opensourceui contact",
    "opensource ui support",
    "opensource ui contribute",
    "bidyut kundu email",
    siteConfig.displayName,
  ],
});

export default function ContactPage() {
  const { author, displayName, github, sponsorship, url } = siteConfig;
  const issuesUrl = `${github.url}/issues`;
  const newIssueUrl = `${github.url}/issues/new`;
  const pullRequestsUrl = `${github.url}/pulls`;

  return (
    <div className="flex min-h-screen w-full min-w-0 flex-col overflow-x-hidden selection:bg-neutral-800 selection:text-white">
      <div className="flex w-full min-w-0 flex-1 flex-col items-center px-3 pt-4 md:px-4">
        <article className="w-full max-w-xl">
          <MarketingSiteNav />

          <MarketingGoBack>
            <h1 className="font-serif text-3xl text-neutral-900">Contact</h1>
            <p className="mt-2 text-sm text-neutral-500">
              How to reach me — and what to include so I can actually help
            </p>
          </MarketingGoBack>

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-neutral-700">
            <section>
              <h2 className="font-semibold text-neutral-900">Start here</h2>
              <p className="mt-2">
                {displayName} is still in an early, hands-on phase. I maintain
                the site, ship components, answer mail, and handle sponsorships
                myself. That is why this page points at my personal inbox
                instead of some faceless support bot — one person reads the
                thread and replies.
              </p>
              <p className="mt-2">
                I am streamlining how people reach out so messages do not pile
                up as vague &quot;hi I want to contribute&quot; notes with no
                context. Tell me what you need, give enough detail, and I can
                answer faster.
              </p>
            </section>

            <section id="links">
              <h2 className="font-semibold text-neutral-900">
                Ways to connect
              </h2>
              <ul className="mt-3 space-y-2">
                <li>
                  Site:{" "}
                  <a href={url} className={linkClass}>
                    opensourceui.in
                  </a>
                </li>
                <li>
                  GitHub:{" "}
                  <a
                    href={github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {github.url.replace("https://", "")}
                  </a>
                </li>
                <li>
                  Portfolio:{" "}
                  <a
                    href={author.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    bidyut.cc
                  </a>
                </li>
                <li>
                  Twitter/X:{" "}
                  <a
                    href={author.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {author.twitter}
                  </a>
                </li>
                <li>
                  Email: <CopyEmail />
                </li>
              </ul>
              <p className="mt-3 text-neutral-500">
                Click the address to copy it — paste into your mail app when you
                write.
              </p>
            </section>

            <section id="email">
              <h2 className="font-semibold text-neutral-900">
                Why personal email
              </h2>
              <p className="mt-2">
                There is no support desk behind {displayName} yet. Early on I
                tried to keep everything simple: ship components, keep the MIT
                license clear, and stay reachable without building a ticket
                system I cannot staff. So mail comes to me — {author.name} — at{" "}
                <CopyEmail />.
              </p>
              <p className="mt-2">
                That also means reply time is not instant. Nights and weekends
                get most of the attention. If your message is clear, I can
                usually get back within a few days. Please skip marketing blasts
                and cold sales pitches; I ignore those.
              </p>
            </section>

            <section id="support">
              <h2 className="font-semibold text-neutral-900">
                Support questions
              </h2>
              <p className="mt-2">
                Stuck copying a component, confused by a prop, or unsure how
                something should look in your app? Email me. Include:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>
                  The component name or page URL (for example /components/phone)
                </li>
                <li>What you expected vs what happened</li>
                <li>
                  Framework (React / Next.js) and roughly which Tailwind setup
                  you use
                </li>
                <li>Short snippet or screenshot if it helps</li>
              </ul>
              <p className="mt-2">
                I cannot debug every private codebase end-to-end, but I will
                help you understand how the piece is meant to work and where to
                look next.
              </p>
            </section>

            <section id="sponsor">
              <h2 className="font-semibold text-neutral-900">
                Sponsorships and brand placement
              </h2>
              <p className="mt-2">
                Plans and checkout live on the{" "}
                <Link href={sponsorship.path} className={linkClass}>
                  sponsor page
                </Link>
                . After you pay, email your brand assets so I can publish the
                placement. Say which tier you bought (Silver, Gold, or Platinum)
                and attach what that tier needs — name, link, short line, logo.
              </p>
              <p className="mt-2">
                Questions before you buy — invoice needs, logo sizes, wording on
                the docs card — same inbox. Subject line tip: start with
                &quot;Sponsor:&quot; so I can spot it quickly.
              </p>
            </section>

            <section id="bugs">
              <h2 className="font-semibold text-neutral-900">
                Found a bug or issue
              </h2>
              <p className="mt-2">
                Prefer GitHub when something is broken in the library or the
                site. Open an issue on{" "}
                <a
                  href={issuesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  the issues list
                </a>{" "}
                or{" "}
                <a
                  href={newIssueUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  start a new issue
                </a>
                .
              </p>
              <p className="mt-2">Useful reports include:</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>Steps to reproduce</li>
                <li>What you saw vs what you expected</li>
                <li>Browser or environment notes if it matters</li>
                <li>Component slug or file path if you know it</li>
              </ul>
              <p className="mt-2">
                If you already have a fix, skip straight to a pull request (next
                section). If you only have a report, an issue is enough — do not
                email a huge dump unless GitHub is blocked for you.
              </p>
            </section>

            <section id="pull-requests">
              <h2 className="font-semibold text-neutral-900">Pull requests</h2>
              <p className="mt-2">
                Fixes and small improvements are welcome. Before you open a PR,
                check{" "}
                <a
                  href={pullRequestsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  existing pull requests
                </a>{" "}
                and related issues so we do not double work.
              </p>
              <p className="mt-2">Please follow this shape:</p>
              <ol className="mt-3 list-decimal space-y-1.5 pl-5">
                <li>Fork the repo and branch from the default branch</li>
                <li>
                  Keep the change focused — one problem per PR when you can
                </li>
                <li>
                  Match the project design rules (neutral stage, no purple
                  chrome, base +{" "}
                  <span className="font-mono text-[12px]">md:</span> only, no{" "}
                  <span className="font-mono text-[12px]">sm:</span>)
                </li>
                <li>Describe what changed and why in the PR body</li>
                <li>Link the issue if there is one</li>
              </ol>
              <p className="mt-2">
                Huge drive-by refactors or new components with no prior
                conversation are harder to review. If the change is large, email
                or open an issue first so we agree on direction.
              </p>
            </section>

            <section id="contribute">
              <h2 className="font-semibold text-neutral-900">
                Want to contribute
              </h2>
              <p className="mt-2">
                See{" "}
                <a
                  href={`${github.url}/blob/main/CONTRIBUTING.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  CONTRIBUTING.md
                </a>{" "}
                on GitHub for local setup and PR basics. Contribution paths are
                still being shaped in practice — docs, components, design
                polish, triage. I would rather align first than get a vague
                &quot;I just want to contribute&quot; message with no scope.
              </p>
              <p className="mt-2">
                Do not send only &quot;I want to contribute.&quot; Tell me what
                kind of help you mean, for example:
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                <li>New component idea (what it does, where it would live)</li>
                <li>Bug fix or accessibility pass on an existing piece</li>
                <li>Docs or copy improvements</li>
                <li>Design review / visual QA</li>
                <li>Something else — name it</li>
              </ul>
              <p className="mt-2">In that first email, include:</p>
              <ol className="mt-3 list-decimal space-y-1.5 pl-5">
                <li>Which contribution type from the list above</li>
                <li>One-paragraph proposal — scope, not a novel</li>
                <li>Your GitHub username</li>
                <li>Rough timeline if you have one</li>
                <li>Any constraints (time, stack comfort)</li>
              </ol>
              <p className="mt-2">
                Write to <CopyEmail /> with subject &quot;{displayName}{" "}
                contribution&quot;. I will reply with whether it fits right now,
                and the next step (issue, branch, or wait). Random drive-by PRs
                without that context may sit longer or get closed with a note to
                email first.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-neutral-900">Related</h2>
              <p className="mt-2">
                Story and roadmap vibes:{" "}
                <Link href="/about" className={linkClass}>
                  About
                </Link>
                . Hiring reality check:{" "}
                <Link href="/careers" className={linkClass}>
                  Careers
                </Link>
                . Legal:{" "}
                <Link href="/terms" className={linkClass}>
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className={linkClass}>
                  Privacy
                </Link>
                .
              </p>
            </section>
          </div>

          <div className="mt-10 mb-8 flex flex-wrap gap-4">
            <CopyEmail className="text-sm underline-offset-4 hover:decoration-neutral-500">
              Copy email
            </CopyEmail>
            <a
              href={github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-500"
            >
              GitHub
            </a>
            <Link
              href="/components"
              className="text-sm font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-500"
            >
              Browse components
            </Link>
            <Link
              href={sponsorship.path}
              className="text-sm font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-500"
            >
              Sponsor
            </Link>
          </div>
        </article>
      </div>

      <FooterSkyline className="mt-auto" />
    </div>
  );
}
