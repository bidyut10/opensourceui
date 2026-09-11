const KEYWORDS = new Set([
  "import",
  "export",
  "from",
  "const",
  "let",
  "var",
  "function",
  "return",
  "if",
  "else",
  "type",
  "interface",
  "readonly",
  "async",
  "await",
  "default",
  "new",
  "class",
  "extends",
  "as",
  "typeof",
  "keyof",
  "in",
  "of",
  "true",
  "false",
  "null",
  "undefined",
  "void",
  "switch",
  "case",
  "break",
  "continue",
  "for",
  "while",
  "do",
  "try",
  "catch",
  "finally",
  "throw",
  "yield",
  "static",
  "public",
  "private",
  "protected",
  "implements",
  "enum",
  "declare",
  "namespace",
  "satisfies",
]);

type TokenType =
  | "comment"
  | "string"
  | "keyword"
  | "type"
  | "function"
  | "jsx"
  | "attr"
  | "path"
  | "number"
  | "punctuation"
  | "plain";

type Token = Readonly<{ type: TokenType; value: string }>;

const TOKEN_CLASS: Record<TokenType, string> = {
  comment: "text-neutral-500",
  string: "text-lime-400/90",
  keyword: "text-sky-400",
  type: "text-fuchsia-400/90",
  function: "text-cyan-400",
  jsx: "text-amber-400/90",
  attr: "text-yellow-300/80",
  path: "text-emerald-400/90",
  number: "text-orange-400/90",
  punctuation: "text-neutral-500",
  plain: "text-neutral-300",
};

const DUAL_TONE_CLASS: Record<TokenType, string> = {
  comment: "text-neutral-500",
  string: "text-neutral-100",
  keyword: "text-neutral-100",
  type: "text-neutral-100",
  function: "text-neutral-100",
  jsx: "text-neutral-100",
  attr: "text-neutral-400",
  path: "text-neutral-100",
  number: "text-neutral-100",
  punctuation: "text-neutral-500",
  plain: "text-neutral-500",
};

type HighlightTone = "color" | "dual";

type TokenSlice = Readonly<{ token: Token; length: number }>;

function matchPrefix(pattern: RegExp, text: string): string | null {
  const match = pattern.exec(text);
  return match?.[0] ?? null;
}

function readStringToken(
  rest: string,
): Readonly<{ value: string; length: number }> {
  const quote = rest[0];
  let end = 1;

  while (end < rest.length) {
    if (rest[end] === "\\") {
      end += 2;
      continue;
    }
    if (rest[end] === quote) {
      end += 1;
      break;
    }
    end += 1;
  }

  return { value: rest.slice(0, end), length: end };
}

function readJsxToken(
  rest: string,
): Readonly<{ value: string; length: number }> {
  let end = rest.startsWith("</") ? 2 : 1;

  while (end < rest.length && /[\w.-]/.test(rest[end] ?? "")) {
    end += 1;
  }

  return { value: rest.slice(0, end), length: end };
}

function resolveWordType(
  word: string,
  nextChar: string | undefined,
  previousToken: Token | undefined,
): TokenType {
  if (KEYWORDS.has(word)) return "keyword";
  if (/^[A-Z]/.test(word)) return "type";
  if (nextChar === "(") return "function";
  if (previousToken?.type === "jsx" && nextChar === "=") return "attr";
  return "plain";
}

function nextToken(
  line: string,
  index: number,
  tokens: readonly Token[],
): TokenSlice | null {
  const rest = line.slice(index);
  const whitespace = matchPrefix(/^\s+/, rest);

  if (whitespace) {
    return {
      token: { type: "plain", value: whitespace },
      length: whitespace.length,
    };
  }

  if (rest.startsWith("//")) {
    return { token: { type: "comment", value: rest }, length: rest.length };
  }

  const first = rest[0];

  if (first === '"' || first === "'" || first === "`") {
    const stringToken = readStringToken(rest);
    return {
      token: { type: "string", value: stringToken.value },
      length: stringToken.length,
    };
  }

  if (first === "<" && /^<\/?[A-Za-z]/.test(rest)) {
    const jsxToken = readJsxToken(rest);
    return {
      token: { type: "jsx", value: jsxToken.value },
      length: jsxToken.length,
    };
  }

  const path = matchPrefix(/^@[\w/.-]+/, rest);
  if (path) {
    return { token: { type: "path", value: path }, length: path.length };
  }

  const word = matchPrefix(/^[\w$]+/, rest);
  if (word) {
    const nextChar = line[index + word.length];
    const type = resolveWordType(word, nextChar, tokens.at(-1));
    return { token: { type, value: word }, length: word.length };
  }

  const number = matchPrefix(/^\d[\d._]*/, rest);
  if (number) {
    return { token: { type: "number", value: number }, length: number.length };
  }

  if (first) {
    return { token: { type: "punctuation", value: first }, length: 1 };
  }

  return null;
}

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let index = 0;

  while (index < line.length) {
    const slice = nextToken(line, index, tokens);
    if (slice === null) break;

    tokens.push(slice.token);
    index += slice.length;

    if (slice.token.type === "comment") break;
  }

  return tokens;
}

type CodeLineEntry = Readonly<{
  line: string;
  lineNumber: number;
  key: string;
}>;

function parseCodeLines(code: string): CodeLineEntry[] {
  let offset = 0;
  return code.split("\n").map((line, index) => {
    const key = `${offset}:${line.length}:${line.trimStart().slice(0, 24)}`;
    offset += line.length + 1;
    return { line, lineNumber: index + 1, key };
  });
}

function tokenKey(lineNumber: number, token: Token, offset: number): string {
  return `${lineNumber}:${offset}:${token.type}:${token.value}`;
}

function renderLineContent(
  line: string,
  lineNumber: number,
  tone: HighlightTone = "color",
) {
  if (line.length === 0) return "\u00a0";

  const classes = tone === "dual" ? DUAL_TONE_CLASS : TOKEN_CLASS;
  let offset = 0;
  return tokenizeLine(line).map((token) => {
    const key = tokenKey(lineNumber, token, offset);
    offset += token.value.length;
    return (
      <span key={key} className={classes[token.type]}>
        {token.value}
      </span>
    );
  });
}

export function HighlightedPartialLine({
  text,
  lineNumber,
  tone = "color",
}: Readonly<{
  text: string;
  lineNumber: number;
  tone?: HighlightTone;
}>) {
  return (
    <span className="wrap-break-word whitespace-pre-wrap">
      {renderLineContent(text, lineNumber, tone)}
    </span>
  );
}

type CodeLineProps = Readonly<{
  line: string;
  lineNumber: number;
}>;

function CodeLine({ line, lineNumber }: CodeLineProps) {
  return (
    <div className="whitespace-pre">{renderLineContent(line, lineNumber)}</div>
  );
}

type GutterLineProps = Readonly<{
  lineNumber: number;
  minWidthCh: number;
}>;

function GutterLine({ lineNumber, minWidthCh }: GutterLineProps) {
  return <div style={{ minWidth: `${minWidthCh}ch` }}>{lineNumber}</div>;
}

export function HighlightedCode({ code }: Readonly<{ code: string }>) {
  const lines = parseCodeLines(code);
  const gutterWidth = String(lines.length).length;

  return (
    <div className="flex min-w-0 font-mono text-xs leading-[1.65] tracking-tight select-none md:min-w-max md:text-[13px] md:leading-[1.7]">
      <div
        aria-hidden
        className="sticky left-0 hidden shrink-0 border-r border-neutral-700/60 bg-neutral-900 py-3 pr-2 pl-1.5 text-right text-neutral-600 tabular-nums select-none md:block md:py-4 md:pr-3 md:pl-2"
      >
        {lines.map(({ lineNumber, key }) => (
          <GutterLine
            key={key}
            lineNumber={lineNumber}
            minWidthCh={gutterWidth}
          />
        ))}
      </div>
      <code className="block min-w-0 py-3 pr-3 pl-3 md:py-4 md:pr-4 md:pl-4">
        {lines.map(({ line, lineNumber, key }) => (
          <CodeLine key={key} line={line} lineNumber={lineNumber} />
        ))}
      </code>
    </div>
  );
}
