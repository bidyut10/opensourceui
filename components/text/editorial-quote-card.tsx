import { forwardRef, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

import { Quote } from "lucide-react";

export type EditorialQuoteCardProps = Readonly<
  {
    quote?: string;
    author?: string;
    role?: string;
    issue?: string;
    accentWord?: string;
  } & ComponentPropsWithoutRef<"div">
>;

// Production-ready Editorial Quote component — styled with Tailwind CSS.
export const EditorialQuoteCard = forwardRef<
  HTMLDivElement,
  EditorialQuoteCardProps
>(
  (
    {
      className,
      quote = "Good design is as little design as possible — but every pixel must earn its place.",
      author = "Dieter Rams",
      role = "Industrial Designer",
      issue = "Issue 06 · Design",
      accentWord = "pixel",
      ...props
    },
    ref,
  ) => {
    const parts = quote.split(new RegExp(`(${accentWord})`, "i"));
    let segmentOffset = 0;
    const segments = parts.map((part) => {
      const segment = {
        id: `quote-part-${segmentOffset}`,
        part,
      };
      segmentOffset += part.length;
      return segment;
    });

    return (
      <div
        ref={ref}
        data-slot="editorial-quote-card"
        className={cn(
          "w-sm border border-neutral-200 bg-[#f6f2eb] p-5 font-sans md:p-6",
          className,
        )}
        {...props}
      >
        <div
          data-slot="editorial-quote-card-meta"
          className="mb-4 flex items-center justify-between border-b border-neutral-200 pb-3"
        >
          <span className="font-mono text-[10px] font-semibold tracking-widest text-neutral-500 uppercase">
            {issue}
          </span>
          <Quote size={18} className="text-neutral-400" />
        </div>

        <blockquote
          data-slot="editorial-quote-card-quote"
          className="text-lg leading-snug font-semibold tracking-tight text-neutral-700 md:text-xl"
        >
          {segments.map(({ id, part }) =>
            part.toLowerCase() === accentWord.toLowerCase() ? (
              <span
                key={id}
                className="rounded-sm bg-neutral-300/60 px-1 text-neutral-800"
              >
                {part}
              </span>
            ) : (
              <span key={id}>{part}</span>
            ),
          )}
        </blockquote>

        <div
          data-slot="editorial-quote-card-author"
          className="mt-5 flex items-center gap-3"
        >
          <div className="h-px flex-1 bg-neutral-200" />
          <div className="text-right">
            <p className="text-sm font-medium text-neutral-600">{author}</p>
            <p className="text-[11px] text-neutral-500">{role}</p>
          </div>
        </div>
      </div>
    );
  },
);

EditorialQuoteCard.displayName = "EditorialQuoteCard";
