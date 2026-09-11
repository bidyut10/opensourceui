"use client";

import { useCallback, useState, type ReactNode } from "react";

import { Check, Copy } from "lucide-react";
import { HighlightedCode } from "@/lib/showcase/highlight-code";
import { siteConfig } from "@/lib/site";

function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      globalThis.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, []);

  return { copied, copy };
}

type CopyCodeBlockProps = Readonly<{
  code: string;
  filename: string;
  hint?: string;
  compact?: boolean;
}>;

export function CopyCodeBlock({
  code,
  filename,
  compact = false,
}: CopyCodeBlockProps) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <div className="overflow-hidden rounded-xl bg-neutral-900">
      <div className="relative z-0 flex items-center gap-2 border-b border-neutral-800 bg-neutral-900 py-2 pr-2 pl-3 md:py-2.5 md:pr-3 md:pl-4">
        <p className="min-w-0 flex-1 truncate font-mono text-[11px] text-neutral-400 md:text-xs">
          {filename}
        </p>
        <button
          type="button"
          onClick={() => copy(code)}
          aria-label={copied ? "Copied" : "Copy code"}
          className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center text-neutral-300 transition-colors hover:text-white"
        >
          {copied ? (
            <Check size={14} className="text-green-400" />
          ) : (
            <Copy size={14} />
          )}
        </button>
      </div>

      <div className="relative z-0 bg-neutral-900">
        <pre
          className={`scrollbar-none overflow-auto select-none ${compact ? "max-h-36 md:max-h-44" : "max-h-64 md:max-h-112"}`}
        >
          <HighlightedCode code={code} />
        </pre>
      </div>
    </div>
  );
}

function CopyIconButton({
  copied,
  onCopy,
  className,
}: Readonly<{
  copied: boolean;
  onCopy: () => void;
  className?: string;
}>) {
  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copied ? "Copied" : "Copy example"}
      className={
        className ??
        "inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
      }
    >
      {copied ? (
        <Check size={13} className="text-emerald-600" />
      ) : (
        <Copy size={13} />
      )}
    </button>
  );
}

function TerminalCommand({ command }: Readonly<{ command: string }>) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5">
      <span className="font-mono text-sm text-neutral-400 select-none">$</span>
      <code className="min-w-0 flex-1 font-mono text-sm text-neutral-800">
        {command}
      </code>
      <CopyIconButton copied={copied} onCopy={() => copy(command)} />
    </div>
  );
}

function ImportLine({
  exportName,
  importPath,
}: Readonly<{ exportName: string; importPath: string }>) {
  return (
    <p className="font-mono text-[13px] leading-6 break-all text-neutral-800">
      <span className="text-sky-700">import</span>
      <span> {"{ "}</span>
      <span className="text-violet-700">{exportName}</span>
      <span> {"}"} </span>
      <span className="text-sky-700">from</span>
      <span className="text-emerald-700"> &quot;{importPath}&quot;</span>
      <span>;</span>
    </p>
  );
}

function UsageLine({ line }: Readonly<{ line: string }>) {
  if (line.startsWith("{/*")) {
    return (
      <span className="font-mono text-[13px] leading-7 text-neutral-400 italic">
        {line}
      </span>
    );
  }

  const selfClosing = /^<(\w+)([^/>]*)\/>$/.exec(line);
  if (selfClosing) {
    const [, tag, attrs] = selfClosing;
    return (
      <span className="font-mono text-[13px] leading-7">
        <span className="text-violet-700">&lt;{tag}</span>
        <span className="text-amber-800">{attrs}</span>
        <span className="text-violet-700"> /&gt;</span>
      </span>
    );
  }

  const match = /^<(\w+)([^>]*)>(.*)<\/\1>$/.exec(line);
  if (!match) {
    return (
      <span className="font-mono text-[13px] leading-7 text-neutral-700">
        {line}
      </span>
    );
  }

  const [, tag, attrs, children] = match;

  return (
    <span className="font-mono text-[13px] leading-7">
      <span className="text-violet-700">&lt;{tag}</span>
      <span className="text-amber-800">{attrs}</span>
      <span className="text-violet-700">&gt;</span>
      <span className="text-neutral-800">{children}</span>
      <span className="text-violet-700">&lt;/{tag}&gt;</span>
    </span>
  );
}

function UsageExample({
  exportName,
  importPath,
  usage,
}: Readonly<{
  exportName: string;
  importPath: string;
  usage: string;
}>) {
  const { copied, copy } = useCopyToClipboard();
  const displayUsage = usage.trim();
  const fullSnippet = `import { ${exportName} } from "${importPath}"\n\n${displayUsage}`;
  const usageBlocks = displayUsage.split(/\n\n+/).filter(Boolean);

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-neutral-100 bg-neutral-50/80 px-3 py-2 md:px-4">
        <span className="font-mono text-[10px] tracking-[0.12em] text-neutral-400 uppercase">
          Example
        </span>
        <CopyIconButton copied={copied} onCopy={() => copy(fullSnippet)} />
      </div>

      <div className="space-y-3 px-3 py-3 md:px-4 md:py-4">
        <ImportLine exportName={exportName} importPath={importPath} />

        <div className="max-h-72 scrollbar-none space-y-2 overflow-y-auto rounded-lg border border-neutral-100 bg-neutral-50/50 px-3 py-2.5 md:max-h-96">
          {usageBlocks.map((block, index) => (
            <div key={`${index}-${block}`} className="break-all">
              <UsageLine line={block} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InlineCode({ children }: Readonly<{ children: string }>) {
  return (
    <code className="mx-px inline-block max-w-full rounded border border-neutral-100 bg-neutral-50 px-1.5 py-0.5 font-mono text-[0.75rem] font-medium text-rose-800 md:text-xs">
      {children}
    </code>
  );
}

type SetupGuideProps = Readonly<{
  componentFile: string;
  exportName: string;
  usage: string;
}>;

export function SetupGuide({
  componentFile,
  exportName,
  usage,
}: SetupGuideProps) {
  const importPath = `@/${componentFile.replace(/\.tsx$/, "")}`;

  const steps: ReadonlyArray<{ id: string; content: ReactNode }> = [
    {
      id: "install",
      content: (
        <div className="space-y-2 text-base text-neutral-600">
          <p>Run in your terminal:</p>
          <TerminalCommand command="npm install clsx tailwind-merge lucide-react" />
        </div>
      ),
    },
    {
      id: "cn",
      content: (
        <p className="text-base text-neutral-600">
          Copy <InlineCode>lib/cn.ts</InlineCode> below. Skip if you already
          have <InlineCode>cn()</InlineCode>.
        </p>
      ),
    },
    {
      id: "component",
      content: (
        <p className="text-base text-neutral-600">
          Copy the code below and create{" "}
          <InlineCode>{componentFile}</InlineCode> in your project.
        </p>
      ),
    },
    {
      id: "usage",
      content: (
        <div className="space-y-2">
          <p className="text-base text-neutral-600">Import and render:</p>
          <UsageExample
            exportName={exportName}
            importPath={importPath}
            usage={usage}
          />
        </div>
      ),
    },
  ];

  return (
    <section className="rounded-xl border border-neutral-100">
      <div className="border-b border-neutral-100 px-4 py-3 md:px-5">
        <h2 className="text-base font-medium text-neutral-900">How to use</h2>
        <p className="mt-1 text-xs leading-relaxed text-neutral-500">
          {siteConfig.license.shortNote} {siteConfig.license.copyNote}{" "}
          <a
            href={siteConfig.license.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-neutral-700 underline decoration-neutral-300 underline-offset-2 transition-colors hover:text-neutral-900 hover:decoration-neutral-500"
          >
            Read the {siteConfig.license.name} license
          </a>
          .
        </p>
      </div>
      <ol>
        {steps.map((step, index) => (
          <li
            key={step.id}
            className="grid grid-cols-[1.25rem_1fr] items-start gap-x-3 border-b border-neutral-100 px-4 py-3.5 last:border-b-0 md:gap-x-4 md:px-5 md:py-4"
          >
            <span className="pt-0.5 font-mono text-xs text-neutral-400 tabular-nums">
              {index + 1}
            </span>
            <div className="min-w-0 text-sm leading-relaxed text-neutral-600">
              {step.content}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
