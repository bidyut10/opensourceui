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

export type OtpUnderlineInputProps = Readonly<
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
    onChange?: (value: string) => void;
    onComplete?: (value: string) => void;
  } & Omit<ComponentPropsWithoutRef<"div">, "onChange" | "defaultValue">
>;

export const OtpUnderlineInput = forwardRef<
  HTMLDivElement,
  OtpUnderlineInputProps
>(function OtpUnderlineInput(
  {
    className,
    length = 6,
    value,
    defaultValue = "",
    disabled = false,
    autoFocus = false,
    inputMode = "numeric",
    error = false,
    label = "Enter code",
    hint,
    onChange,
    onComplete,
    ...props
  },
  ref,
) {
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

  return (
    <div
      ref={ref}
      data-slot="otp-underline-input"
      data-error={error || undefined}
      className={cn("w-full max-w-96 px-6 py-6 font-sans", className)}
      {...props}
    >
      <div className="mb-6 text-center">
        <p
          id={`${otp.groupId}-label`}
          className="font-serif text-2xl text-neutral-900"
        >
          {label}
        </p>
        <p id={`${otp.groupId}-hint`} className="mt-2 text-sm text-neutral-500">
          {hint ?? `We sent a ${otp.length}-digit code to your inbox.`}
        </p>
      </div>

      <div
        role="group"
        aria-labelledby={`${otp.groupId}-label`}
        aria-describedby={`${otp.groupId}-hint`}
        className="flex items-end justify-center gap-3"
      >
        {otp.digits.map((digit, index) => (
          <div key={`${otp.groupId}-${index}`} className="relative w-10">
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
              onFocus={() => otp.handleFocus(index)}
              className={cn(
                "peer h-12 w-full border-0 border-b-2 bg-transparent text-center font-mono text-2xl font-medium text-neutral-900 ring-0 transition-[border-color,color] duration-200 outline-none focus:ring-0",
                error
                  ? "border-rose-400 focus:border-rose-500"
                  : "border-neutral-200 focus:border-neutral-900",
                digit && !error && "border-neutral-800",
                disabled && "cursor-not-allowed text-neutral-400",
              )}
            />
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-center scale-x-0 bg-neutral-900 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] peer-focus:scale-x-100 motion-reduce:transition-none",
                error && "bg-rose-500",
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
});

OtpUnderlineInput.displayName = "OtpUnderlineInput";
