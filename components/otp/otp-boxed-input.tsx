"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ClipboardEvent,
  type ComponentPropsWithoutRef,
  type FormEvent,
  type KeyboardEvent,
} from "react";

import { Mail } from "lucide-react";

import { cn } from "@/lib/cn";

type OtpInputMode = "numeric" | "alphanumeric";

type OtpFieldOptions = Readonly<{
  length: number;
  value: string | undefined;
  defaultValue: string;
  disabled: boolean;
  autoFocus: boolean;
  inputMode: OtpInputMode;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
}>;

function sanitizeChar(char: string, mode: OtpInputMode): string | null {
  if (!char) return null;
  const next = char.slice(0, 1);
  if (mode === "numeric") return /^\d$/.test(next) ? next : null;
  return /^[a-zA-Z0-9]$/.test(next) ? next.toUpperCase() : null;
}

function sanitizeValue(
  raw: string,
  length: number,
  mode: OtpInputMode,
): string {
  const filtered =
    mode === "numeric"
      ? raw.replace(/\D/g, "")
      : raw.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  return filtered.slice(0, length);
}

function useOtpField({
  length,
  value,
  defaultValue,
  disabled,
  autoFocus,
  inputMode,
  onChange,
  onComplete,
}: OtpFieldOptions) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(() =>
    sanitizeValue(defaultValue, length, inputMode),
  );
  const current = isControlled
    ? sanitizeValue(value, length, inputMode)
    : internal;

  const digits = Array.from({ length }, (_, index) => current[index] ?? "");
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const groupId = useId();
  const completedRef = useRef("");

  const focusAt = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(length - 1, index));
      const node = inputRefs.current[clamped];
      if (!node) return;
      node.focus();
      node.select();
    },
    [length],
  );

  const commit = useCallback(
    (next: string) => {
      const sanitized = sanitizeValue(next, length, inputMode);
      if (!isControlled) setInternal(sanitized);
      onChange?.(sanitized);

      if (sanitized.length === length && sanitized !== completedRef.current) {
        completedRef.current = sanitized;
        onComplete?.(sanitized);
      }

      if (sanitized.length < length) completedRef.current = "";
    },
    [inputMode, isControlled, length, onChange, onComplete],
  );

  useEffect(() => {
    if (!autoFocus || disabled) return;
    const frame = requestAnimationFrame(() => focusAt(0));
    return () => cancelAnimationFrame(frame);
  }, [autoFocus, disabled, focusAt]);

  const setDigit = useCallback(
    (index: number, char: string | null) => {
      const next = [...digits];
      next[index] = char ?? "";
      commit(next.join(""));
    },
    [commit, digits],
  );

  const handleChange = useCallback(
    (index: number, event: FormEvent<HTMLInputElement>) => {
      if (disabled) return;

      const raw = event.currentTarget.value;
      if (raw.length > 1) {
        const sanitized = sanitizeValue(raw, length, inputMode);
        commit(sanitized);
        focusAt(Math.min(sanitized.length, length - 1));
        return;
      }

      const char = sanitizeChar(raw, inputMode);
      if (!char) {
        event.currentTarget.value = digits[index] ?? "";
        return;
      }

      setDigit(index, char);
      if (index < length - 1) focusAt(index + 1);
    },
    [commit, digits, disabled, focusAt, inputMode, length, setDigit],
  );

  const handleKeyDown = useCallback(
    (index: number, event: KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;

      const key = event.key;

      if (key === "ArrowLeft") {
        event.preventDefault();
        focusAt(index - 1);
        return;
      }

      if (key === "ArrowRight") {
        event.preventDefault();
        focusAt(index + 1);
        return;
      }

      if (key === "Home") {
        event.preventDefault();
        focusAt(0);
        return;
      }

      if (key === "End") {
        event.preventDefault();
        focusAt(length - 1);
        return;
      }

      if (key === "Backspace") {
        event.preventDefault();
        if (digits[index]) {
          setDigit(index, null);
          return;
        }
        if (index > 0) {
          setDigit(index - 1, null);
          focusAt(index - 1);
        }
        return;
      }

      if (key === "Delete") {
        event.preventDefault();
        setDigit(index, null);
        return;
      }

      if (key.length === 1 && digits[index]) {
        const char = sanitizeChar(key, inputMode);
        if (char) {
          event.preventDefault();
          setDigit(index, char);
          if (index < length - 1) focusAt(index + 1);
        }
      }
    },
    [digits, disabled, focusAt, inputMode, length, setDigit],
  );

  const handlePaste = useCallback(
    (index: number, event: ClipboardEvent<HTMLInputElement>) => {
      if (disabled) return;
      event.preventDefault();

      const pasted = event.clipboardData.getData("text");
      const sanitized = sanitizeValue(pasted, length - index, inputMode);
      if (!sanitized) return;

      const next = [...digits];
      for (let offset = 0; offset < sanitized.length; offset += 1) {
        next[index + offset] = sanitized[offset] ?? "";
      }
      commit(next.join("").slice(0, length));
      focusAt(Math.min(index + sanitized.length, length - 1));
    },
    [commit, digits, disabled, focusAt, inputMode, length],
  );

  const handleFocus = useCallback((index: number) => {
    inputRefs.current[index]?.select();
  }, []);

  const setInputRef = useCallback((index: number) => {
    return (node: HTMLInputElement | null) => {
      inputRefs.current[index] = node;
    };
  }, []);

  return {
    digits,
    groupId,
    length,
    handleChange,
    handleKeyDown,
    handlePaste,
    handleFocus,
    setInputRef,
  };
}

function useResendTimer(initialSeconds: number, onResend?: () => void) {
  const [remaining, setRemaining] = useState(initialSeconds);
  const canResend = remaining <= 0;

  useEffect(() => {
    if (canResend) return;
    const timer = window.setInterval(() => {
      setRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [canResend]);

  const resend = useCallback(() => {
    if (!canResend) return;
    onResend?.();
    setRemaining(initialSeconds);
  }, [canResend, initialSeconds, onResend]);

  return { remaining, canResend, resend };
}

export type OtpBoxedInputProps = Readonly<
  {
    length?: number;
    value?: string;
    defaultValue?: string;
    disabled?: boolean;
    autoFocus?: boolean;
    inputMode?: OtpInputMode;
    error?: boolean;
    label?: string;
    hint?: string;
    destination?: string;
    errorMessage?: string;
    resendCooldown?: number;
    onResend?: () => void;
    onChange?: (value: string) => void;
    onComplete?: (value: string) => void;
  } & Omit<ComponentPropsWithoutRef<"div">, "onChange" | "defaultValue">
>;

export const OtpBoxedInput = forwardRef<HTMLDivElement, OtpBoxedInputProps>(
  function OtpBoxedInput(
    {
      className,
      length = 6,
      value,
      defaultValue = "",
      disabled = false,
      autoFocus = false,
      inputMode = "numeric",
      error = false,
      label = "Check your email",
      hint,
      destination = "j•••@gmail.com",
      errorMessage = "That code didn't match. Try again or request a new one.",
      resendCooldown = 30,
      onResend,
      onChange,
      onComplete,
      ...props
    },
    ref,
  ) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const resend = useResendTimer(resendCooldown, onResend);

    const otp = useOtpField({
      length,
      value,
      defaultValue,
      disabled,
      autoFocus,
      inputMode,
      onChange,
      onComplete,
    });

    const filledCount = otp.digits.filter(Boolean).length;
    const isComplete = filledCount === otp.length;

    return (
      <div
        ref={ref}
        data-slot="otp-boxed-input"
        data-error={error || undefined}
        data-complete={isComplete || undefined}
        className={cn("w-full max-w-md px-6 py-7 font-sans", className)}
        {...props}
      >
        <div className="mb-6 flex flex-col items-center text-center">
          <div
            className={cn(
              "mb-4 flex size-12 items-center justify-center rounded-full transition-colors duration-300",
              error
                ? "text-rose-500"
                : isComplete
                  ? "text-emerald-600"
                  : "text-neutral-700",
            )}
          >
            <Mail size={20} strokeWidth={1.75} aria-hidden />
          </div>

          <p
            id={`${otp.groupId}-label`}
            className="font-serif text-2xl text-neutral-900"
          >
            {label}
          </p>
          <p
            id={`${otp.groupId}-hint`}
            className="mt-2 max-w-xs text-sm leading-relaxed text-neutral-500"
          >
            {hint ?? (
              <>
                We sent a {otp.length}-digit code to{" "}
                <span className="font-medium text-neutral-700">
                  {destination}
                </span>
              </>
            )}
          </p>
        </div>

        <div
          role="group"
          aria-labelledby={`${otp.groupId}-label`}
          aria-describedby={`${otp.groupId}-hint${error ? ` ${otp.groupId}-error` : ""}`}
          className={cn(
            "flex justify-center gap-2 md:gap-2.5",
            error && "rounded-xl border border-rose-200 px-1 py-1",
          )}
        >
          {otp.digits.map((digit, index) => (
            <div
              key={`${otp.groupId}-${index}`}
              className={cn(
                "relative transition-transform duration-200 ease-out",
                activeIndex === index && "z-10 scale-105",
              )}
            >
              <input
                ref={otp.setInputRef(index)}
                type="text"
                inputMode={inputMode === "numeric" ? "numeric" : "text"}
                autoComplete={index === 0 ? "one-time-code" : "off"}
                name={index === 0 ? "one-time-code" : undefined}
                pattern={inputMode === "numeric" ? "[0-9]*" : "[A-Za-z0-9]*"}
                maxLength={otp.length}
                value={digit}
                disabled={disabled}
                aria-label={`Digit ${index + 1} of ${otp.length}`}
                aria-invalid={error || undefined}
                onChange={(event) => otp.handleChange(index, event)}
                onKeyDown={(event) => otp.handleKeyDown(index, event)}
                onPaste={(event) => otp.handlePaste(index, event)}
                onFocus={() => {
                  setActiveIndex(index);
                  otp.handleFocus(index);
                }}
                onBlur={() => setActiveIndex(null)}
                className={cn(
                  "size-12 rounded-xl border-2 bg-neutral-50/30 text-center font-mono text-2xl font-semibold text-neutral-900 ring-0 transition-[border-color,background-color,transform,color] duration-200 outline-none focus:ring-0 md:size-14",
                  error
                    ? "border-rose-200 bg-rose-50/40 focus:border-rose-400"
                    : "border-neutral-100 focus:border-neutral-900 focus:bg-white",
                  digit && !error && "border-neutral-900 bg-white",
                  disabled &&
                    "cursor-not-allowed bg-neutral-50 text-neutral-400",
                )}
              />
              {activeIndex === index && !digit ? (
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-6 w-0.5 -translate-y-1/2 animate-pulse bg-neutral-400"
                />
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center gap-1.5" aria-hidden>
          {otp.digits.map((digit, index) => (
            <span
              key={`${otp.groupId}-dot-${index}`}
              className={cn(
                "size-1.5 rounded-full transition-all duration-300",
                digit ? "scale-125 bg-neutral-900" : "bg-neutral-200",
                activeIndex === index && "scale-150 bg-neutral-900",
                error && digit && "bg-rose-400",
                isComplete && "bg-emerald-500",
              )}
            />
          ))}
        </div>

        <div className="mt-6 space-y-2 text-center">
          {error ? (
            <p
              id={`${otp.groupId}-error`}
              role="alert"
              className="text-sm text-rose-600"
            >
              {errorMessage}
            </p>
          ) : isComplete ? (
            <p className="text-sm font-medium text-emerald-600">
              Code entered — verifying…
            </p>
          ) : (
            <p className="text-sm text-neutral-500">
              Paste from clipboard or type each digit
            </p>
          )}

          <p className="text-sm text-neutral-500">
            Didn&apos;t receive it?{" "}
            {resend.canResend ? (
              <button
                type="button"
                disabled={disabled}
                onClick={resend.resend}
                className="font-medium text-neutral-900 underline-offset-2 transition-opacity hover:underline disabled:cursor-not-allowed disabled:opacity-50"
              >
                Resend code
              </button>
            ) : (
              <span className="text-neutral-400 tabular-nums">
                Resend in {resend.remaining}s
              </span>
            )}
          </p>
        </div>
      </div>
    );
  },
);

OtpBoxedInput.displayName = "OtpBoxedInput";
