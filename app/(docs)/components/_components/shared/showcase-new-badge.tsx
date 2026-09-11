import { cn } from "@/lib/cn";

type ShowcaseNewBadgeProps = Readonly<{
  className?: string;
}>;

export function ShowcaseNewBadge({ className }: ShowcaseNewBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-[14px] shrink-0 items-center justify-center rounded-sm bg-rose-500 px-1.5 align-middle font-sans text-[8px] leading-none font-semibold tracking-wide text-white",
        className,
      )}
    >
      New
    </span>
  );
}
