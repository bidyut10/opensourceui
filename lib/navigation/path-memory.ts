const STACK_KEY = "osui:nav-stack";
const BOOT_KEY = "osui:nav-boot";
const BACKING_KEY = "osui:nav-backing";
const MAX_STACK = 24;

function fullPath(pathname: string, search: string) {
  const query = search.replace(/^\?/, "");
  return query ? `${pathname}?${query}` : pathname;
}

function readStack(): string[] {
  try {
    const raw = sessionStorage.getItem(STACK_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is string => typeof item === "string" && item.startsWith("/"),
    );
  } catch {
    return [];
  }
}

function writeStack(stack: string[]) {
  sessionStorage.setItem(
    STACK_KEY,
    JSON.stringify(stack.slice(-MAX_STACK)),
  );
}

/** Call on each client route change to keep an internal back stack. */
export function rememberPath(pathname: string, search = "") {
  if (typeof window === "undefined") return;

  const next = fullPath(pathname, search);
  const booted = sessionStorage.getItem(BOOT_KEY);

  if (!booted) {
    sessionStorage.setItem(BOOT_KEY, "1");
    const nav = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming | undefined;
    const referrer = document.referrer;
    const sameOrigin =
      Boolean(referrer) && referrer.startsWith(window.location.origin);

    if (nav?.type === "navigate" && !sameOrigin) {
      writeStack([next]);
      return;
    }

    if (sameOrigin) {
      try {
        const url = new URL(referrer);
        const from = fullPath(url.pathname, url.search.replace(/^\?/, ""));
        writeStack(from !== next ? [from, next] : [next]);
        return;
      } catch {
        writeStack([next]);
        return;
      }
    }

    writeStack([next]);
    return;
  }

  // Go-back click already popped the stack — don't re-push the destination.
  if (sessionStorage.getItem(BACKING_KEY) === "1") {
    sessionStorage.removeItem(BACKING_KEY);
    const stack = readStack();
    if (stack[stack.length - 1] !== next) {
      writeStack([...stack, next]);
    }
    return;
  }

  const stack = readStack();
  if (stack.length === 0) {
    writeStack([next]);
    return;
  }

  if (stack[stack.length - 1] === next) return;

  writeStack([...stack, next]);
}

/** Previous path in the stack when more than one page was visited internally. */
export function getInternalBackHref(
  currentPathname: string,
  search = "",
): string | null {
  if (typeof window === "undefined") return null;

  const current = fullPath(currentPathname, search);
  const stack = readStack();
  if (stack.length < 2) return null;

  const top = stack[stack.length - 1];
  const previous =
    top === current ? stack[stack.length - 2] : stack[stack.length - 1];

  if (!previous || previous === current || !previous.startsWith("/")) {
    return null;
  }

  return previous;
}

/**
 * Pop the current page off the stack before navigating back.
 * Returns the destination href, or null if there is nowhere to go.
 */
export function consumeInternalBack(
  currentPathname: string,
  search = "",
): string | null {
  if (typeof window === "undefined") return null;

  const current = fullPath(currentPathname, search);
  const stack = readStack();
  if (stack.length < 2) return null;

  let nextStack = [...stack];
  if (nextStack[nextStack.length - 1] === current) {
    nextStack = nextStack.slice(0, -1);
  }

  const destination = nextStack[nextStack.length - 1];
  if (!destination || !destination.startsWith("/")) return null;

  writeStack(nextStack);
  sessionStorage.setItem(BACKING_KEY, "1");
  return destination;
}
