import { AnnotatedText } from "@/components/underlines/annotated-text";

const VARIANTS = [
  { variant: "wavy", text: "Wavy underline", color: "text-purple-300" },
  { variant: "circle", text: "Circled text", color: "text-cyan-200" },
  { variant: "highlight", text: "Highlighted text", color: "text-yellow-100" },
  { variant: "underline", text: "Simple underline", color: "text-cyan-200" },
  { variant: "line", text: "Straight line", color: "text-orange-300" },
  { variant: "dottedUnderline", text: "Dotted underline" },
  { variant: "doubleUnderline", text: "Double underline" },
  { variant: "crossOut", text: "Crossed out", color: "text-red-400" },
  { variant: "arrow", text: "Arrow underline", color: "text-rose-300" },
] as const;

function usageLine(item: (typeof VARIANTS)[number]): string {
  const color = "color" in item ? item.color : undefined;
  const colorProp = color ? ` color="${color}"` : "";
  return `<AnnotatedText variant="${item.variant}"${colorProp}>${item.text}</AnnotatedText>`;
}

export const ANNOTATED_TEXT_USAGE = VARIANTS.map(usageLine).join("\n\n");

export function AnnotatedTextShowcase() {
  return (
    <div className="flex max-h-[22rem] scrollbar-none flex-col items-start gap-2.5 overflow-y-auto py-1 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {VARIANTS.map((item) => (
        <AnnotatedText
          key={item.variant}
          variant={item.variant}
          color={"color" in item ? item.color : undefined}
        >
          {item.text}
        </AnnotatedText>
      ))}
    </div>
  );
}
