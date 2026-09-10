import type { Metadata } from "next";
import { Badge } from "./_components/badge";
import { Heading } from "./_components/heading";
import { Paragraph } from "./_components/paragraph";
import { BOX_PATTERN } from "@/lib/shared";
import { LinkedBlock } from "./_components/linked-block";
import { MockupStage } from "@/app/(marketing)/_components/mockup-stage";
import { CtaButtons } from "./_components/cta-buttons";
import { HomeStats } from "./_components/home-stats";
import { SiteFooter } from "./_components/site-footer";
import { AnnotatedText } from "@/components/underlines/annotated-text";
import { DndFaceWidget } from "@/components/widgets/dnd-face-widget";
import { TorchFaceWidget } from "@/components/widgets/torch-face-widget";
import { LaptopMockupCard } from "@/components/mockups/laptop-mockup-card";
import { LaptopShowcaseScreen } from "./_components/laptop-showcase-screen";
import { AppleWatchMockupCard } from "@/components/mockups/apple-watch-mockup-card";
import { WatchShowcaseScreen } from "./_components/watch-showcase-screen";
import { IpodMockupCard } from "@/components/mockups/apple-ipod-mockup-card";
import { IpodShowcaseScreen } from "./_components/ipod-showcase-screen";
import { BrowserMockupCard } from "@/components/mockups/browser-mockup-card";
import { BrowserShowcaseScreen } from "./_components/browser-showcase-screen";
import { AnalogClockWidget } from "@/components/widgets/analog-clock-widget";
import { JournalWritingCard } from "@/components/text/journal-writing-card";
import { BluetoothFaceWidget } from "@/components/widgets/bluetooth-face-widget";
import { TechStack, TECH_STACK_ITEMS } from "./_components/tech-stack";
import { InstallOptions } from "./_components/compoent-deisgn-copy-demo";
import { OpenSourcePanel } from "./_components/sponser-resource";
import { HomeTestimonials } from "./_components/home-testimonials";
import { ShowcaseScrollRestoration } from "@/app/_shared/scroll/showcase-scroll-restoration";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { MarketingSiteNav } from "./_components/marketing-site-nav";
import { PhoneCustomizeDemo } from "./_components/phone-customize-demo";
import { HomeSeoFaq } from "./_components/home-seo-faq";

export const metadata: Metadata = createPageMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <div className="flex min-h-screen w-full min-w-0 flex-col overflow-x-hidden selection:bg-neutral-800 selection:text-white">
      <div className="flex w-full min-w-0 flex-col items-center gap-6 px-3 md:px-4">
        <ShowcaseScrollRestoration />

        <div className="mt-4 mb-10 max-w-xl px-4 md:px-0">
        <MarketingSiteNav />
        <Heading className="mt-36">
          Build Better{" "}
          <span className="relative inline-block">
            <AnnotatedText variant="underline" color="text-cyan-200">
              Interfaces
            </AnnotatedText>
            <Badge className="-top-5 -right-1 rotate-6 text-green-500">
              Free
            </Badge>
          </span>
        </Heading>
        <Paragraph>
          {siteConfig.displayName} is a free React UI library and Next.js
          component library — copy-paste production-ready components, Tailwind
          CSS blocks, and device mockups. Pick one, drop the code in, and ship
          interfaces that feel polished and intentional.{" "}
          <a
            href={siteConfig.license.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-neutral-800 underline decoration-neutral-300 underline-offset-2 transition-colors hover:text-neutral-950 hover:decoration-neutral-500"
          >
            {siteConfig.license.name} licensed
          </a>{" "}
          — free for personal and commercial use.
        </Paragraph>
        <CtaButtons />
      </div>

      <div className="w-full max-w-7xl px-4 md:px-0">
        <HomeStats />
      </div>

      <div className="relative mt-36 max-w-xl px-4 md:px-0">
        <Badge className="-top-7 -left-1 -rotate-3 text-neutral-500">
          why us?
        </Badge>
        <Heading>
          Obsessively Detailed. Effortlessly{" "}
          <AnnotatedText variant="doubleUnderline">Beautiful.</AnnotatedText>
        </Heading>
        <Paragraph>
          Designed with precision, from the frame curves to the smallest
          hardware details, so your apps and websites look as polished as the
          products they deserve.
        </Paragraph>
      </div>

      <LinkedBlock
        className="relative mx-auto w-full max-w-xl px-4 pb-14 md:px-0"
        link="view more variants"
        href="/components/phone"
      >
        <PhoneCustomizeDemo />
      </LinkedBlock>

      <div className="my-10 max-w-xl px-4 md:px-0">
        <Heading>
          Premium{" "}
          <AnnotatedText variant="arrow" color="text-rose-300">
            Finishes,
          </AnnotatedText>
          Endless Possibilities.
        </Heading>
        <Paragraph>
          Choose from beautifully crafted color variants like Titanium, Space
          Gray, and more. Every finish is meticulously designed with realistic
          materials, accurate hardware details, and pixel-perfect precision to
          make every presentation feel premium.
        </Paragraph>
      </div>

      <LinkedBlock
        className="relative mx-auto w-full pb-14 md:w-xl"
        link="view more variants"
        href="/components/laptop"
      >
          <LaptopMockupCard>
            <LaptopShowcaseScreen />
          </LaptopMockupCard>
      </LinkedBlock>

      <div className="my-10 max-w-xl px-4 md:px-0">
        <Heading>
          Built for the{" "}
          <AnnotatedText variant="underline" color="text-cyan-200">
            Watch
          </AnnotatedText>
          . Ready for Your UI.
        </Heading>
        <Paragraph>
          Apple Watch frames with sport band, rounded display, and seven metal
          finishes. Drop in complications, fitness rings, or now-playing screens
          — and present wrist UI that feels native, not pasted on.
        </Paragraph>
      </div>

      <LinkedBlock
        className="relative mx-auto w-full pb-14 md:w-xl"
        link="view more variants"
        href="/components/apple-watch"
      >
        <MockupStage pattern="watch">
          <AppleWatchMockupCard variant="black">
            <WatchShowcaseScreen />
          </AppleWatchMockupCard>
        </MockupStage>
      </LinkedBlock>

      <div className="my-10 max-w-xl px-4 md:px-0">
        <Heading>
          The Classic{" "}
          <AnnotatedText variant="highlight" color="text-yellow-100">
            iPod
          </AnnotatedText>
          . Your Screen Inside.
        </Heading>
        <Paragraph>
          Screen slot, click wheel, and nostalgic colorways — silver, black,
          pink, blue, and more. Drop in music players, menus, or retro UI and
          make every presentation feel instantly memorable.
        </Paragraph>
      </div>

      <LinkedBlock
        className="relative mx-auto w-full pb-14 md:w-xl"
        link="view more variants"
        href="/components/ipod"
      >
        <MockupStage pattern="grid">
          <IpodMockupCard variant="black">
            <IpodShowcaseScreen />
          </IpodMockupCard>
        </MockupStage>
      </LinkedBlock>

      <div className="my-10 max-w-xl px-4 md:px-0">
        <Heading>
          Designed to Blend In.{" "}
          <AnnotatedText variant="wavy">Built to Stand Out.</AnnotatedText>
        </Heading>
        <Paragraph>
          Wrap your UI in light, dark, or transparent browser chrome. Pick a
          theme, drop in your screenshot, and present web work that feels
          finished before you ship.
        </Paragraph>
      </div>

      <LinkedBlock
        className="relative mx-auto w-full max-w-xl px-4 pb-14 md:px-0"
        link="view more themes"
        href="/components/browser"
      >
          <BrowserMockupCard theme="transparent">
            <BrowserShowcaseScreen />
          </BrowserMockupCard>
      </LinkedBlock>

      <LinkedBlock
        className="relative mx-auto my-10 max-w-xl px-4 pb-14 md:px-0"
        link="view more annotations"
        href="/components/annotated-text"
      >
        <Paragraph tone="dark">
          Draw attention where it matters most with clean, customizable{" "}
          <AnnotatedText variant="circle"> annotations</AnnotatedText>. Add{" "}
          <AnnotatedText variant="underline">
            arrows, labels, and callouts
          </AnnotatedText>{" "}
          to explain features, document interfaces, and create presentations
          that communicate with{" "}
          <AnnotatedText variant="highlight">
            clarity and confidence.
          </AnnotatedText>
        </Paragraph>
      </LinkedBlock>

      <LinkedBlock
        className="relative mx-auto my-10 max-w-xl px-4 pb-14 md:px-0"
        link="view more variants"
        href="/components/category/widgets"
      >
        <Heading>
          <AnnotatedText variant="line" color="text-orange-300">
            Designed to Keep
          </AnnotatedText>{" "}
          Time in Style.
        </Heading>
        <Paragraph>
          Explore carefully designed clock variants that balance functionality,
          elegance, and customization for any project.
        </Paragraph>
        <div className="mt-16 flex flex-col items-center justify-between gap-6 md:flex-row">
          <AnalogClockWidget variant="roman" />
          <AnalogClockWidget variant="minimal" />
          <AnalogClockWidget variant="numeric" />
        </div>
      </LinkedBlock>

      <LinkedBlock
        className="relative mx-auto my-10 max-w-xl px-4 pb-14 md:px-0"
        link="view more widgets"
        href="/components?q=face"
      >
        <Heading>
          Interactive Components{" "}
          <AnnotatedText variant="wavy" color="text-rose-300">
            {" "}
            That Feel Alive.
          </AnnotatedText>
        </Heading>
        <Paragraph>
          Polished widgets inspired by modern design systems, built with smooth
          interactions and thoughtful details that users notice.
        </Paragraph>
        <div className="mt-16 flex flex-col items-center justify-between gap-6 md:flex-row">
          <BluetoothFaceWidget />
          <TorchFaceWidget />
          <DndFaceWidget />
        </div>
      </LinkedBlock>

      <LinkedBlock
        className="relative mx-auto my-10 max-w-xl px-4 pb-14 md:px-0"
        link="view more notebooks"
        href="/components/journal-writing"
      >
        <Heading>
          Writing That Feels{" "}
          <AnnotatedText variant="underline" color="text-green-300">
            {" "}
            Natural.
          </AnnotatedText>
        </Heading>
        <Paragraph>
          Designed to feel like a real writing space, complete with a notebook
          layout, live word count, save indicators, and an experience that
          encourages focused writing.
        </Paragraph>
        <div
          className="mt-16 flex w-full items-center justify-center rounded-2xl border border-neutral-100 p-10"
          style={BOX_PATTERN}
        >
          <JournalWritingCard />
        </div>
      </LinkedBlock>

      <div className="relative mt-36 max-w-xl px-4 md:px-0">
        <Badge className="-top-7 -left-1 -rotate-3 text-neutral-500">
          under the hood
        </Badge>
        <Heading>
          How They&apos;re{" "}
          <AnnotatedText variant="underline" color="text-cyan-200">
            Crafted.
          </AnnotatedText>
        </Heading>
        <Paragraph>
          Built on the stack you already trust —{" "}
          <AnnotatedText variant="highlight" color="text-yellow-100">
            React
          </AnnotatedText>{" "}
          and{" "}
          <AnnotatedText variant="underline" color="text-cyan-200">
            Next.js
          </AnnotatedText>{" "}
          for components that fit your app,{" "}
          <AnnotatedText variant="wavy" color="text-rose-300">
            TypeScript
          </AnnotatedText>{" "}
          for props you can rely on,{" "}
          <AnnotatedText variant="underline" color="text-green-300">
            Tailwind CSS v4
          </AnnotatedText>{" "}
          for styling that stays in your codebase, and{" "}
          <AnnotatedText variant="circle" color="text-orange-300">
            Lucide
          </AnnotatedText>{" "}
          for icons. Every file is production-ready, readable, and yours to own.
        </Paragraph>
        <div className="mt-16">
          <TechStack items={TECH_STACK_ITEMS} />
        </div>
      </div>

      <div className="my-10 max-w-xl px-4 md:px-0">
        <Heading>
          A Developer Experience{" "}
          <AnnotatedText variant="highlight" color="text-yellow-100">
            You&apos;ll Love.
          </AnnotatedText>
        </Heading>
        <Paragraph>
          Search for a component, open it, and everything is right there —
          preview up top, details and code below. No digging, no extra steps.{" "}
          <AnnotatedText variant="underline" color="text-green-300">
            Copy and paste
          </AnnotatedText>{" "}
          into your project when you&apos;re ready —{" "}
          <a
            href={siteConfig.license.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-neutral-800 underline decoration-neutral-300 underline-offset-2 transition-colors hover:text-neutral-950 hover:decoration-neutral-500"
          >
            {siteConfig.license.name} licensed
          </a>
          , free for personal and commercial use. No install, no lock-in.
        </Paragraph>
        <InstallOptions />
      </div>

      <div className="relative mt-36 max-w-xl px-4 md:px-0">
        <Badge className="-top-7 -left-1 -rotate-3 text-rose-500 max-[499px]:left-4">
          community
        </Badge>
        <Heading>
          What People Are{" "}
          <AnnotatedText variant="line" color="text-cyan-300">
            Saying.
          </AnnotatedText>
        </Heading>
        <Paragraph>
          Real feedback from Product Hunt and Twitter — on cohesion, spacing,
          typography, and how easy the components are to drop into real
          projects.
        </Paragraph>
      </div>

      <div className="w-full max-w-340 px-4 md:px-0">
        <HomeTestimonials />
      </div>

      <div className="relative mt-36 max-w-xl px-4 md:px-0">
        <Badge className="-top-7 -left-1 -rotate-3 text-green-500 max-[499px]:left-4">
          built with
        </Badge>
        <Heading>
          Resources &{" "}
          <AnnotatedText variant="wavy" color="text-rose-300">
            Sponsors.
          </AnnotatedText>
        </Heading>
        <Paragraph>
          Tools, people, and services that power {siteConfig.displayName} — plus
          a spot for sponsors who want to support the project.
        </Paragraph>
        <OpenSourcePanel />
      </div>

      <HomeSeoFaq />
      </div>

      <SiteFooter />
    </div>
  );
}
