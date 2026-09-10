import Image from "next/image";

import { cn } from "@/lib/cn";

type FooterSkylineProps = {
  className?: string;
};

/** Full-bleed London skyline mark. Desktop-only pull; not selectable/draggable. */
export function FooterSkyline({ className }: FooterSkylineProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none relative z-0 w-full min-[1100px]:[margin-top:calc(100vw*-1479/4134*0.42)]",
        className,
      )}
    >
      <Image
        src="/footer.webp"
        alt=""
        width={4134}
        height={1479}
        sizes="100vw"
        quality={100}
        draggable={false}
        className="block h-auto w-full max-w-none select-none [-webkit-user-drag:none]"
      />
    </div>
  );
}
