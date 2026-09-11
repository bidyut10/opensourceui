"use client";

import {
  forwardRef,
  useCallback,
  useId,
  useState,
  type ChangeEvent,
  type ComponentPropsWithoutRef,
} from "react";

import { cn } from "@/lib/cn";

export type PhoneFieldInputProps = Readonly<
  {
    label?: string;
    hint?: string;
    error?: boolean;
    errorMessage?: string;
    dialCode?: string;
    containerClassName?: string;
  } & Omit<ComponentPropsWithoutRef<"input">, "size" | "type" | "onChange">
> & {
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
};

function formatPhoneDisplay(raw: string, dialCode: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 15);
  if (dialCode.replace(/\s/g, "") !== "+1") return digits;
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function digitsOnly(raw: string): string {
  return raw.replace(/\D/g, "").slice(0, 15);
}

export const PhoneFieldInput = forwardRef<
  HTMLInputElement,
  PhoneFieldInputProps
>(function PhoneFieldInput(
  {
    className,
    containerClassName,
    id,
    label = "Phone number",
    hint = "We will send a verification code by SMS.",
    error = false,
    errorMessage = "Enter a valid phone number.",
    dialCode = "+1",
    disabled,
    required,
    value,
    defaultValue = "",
    autoComplete = "tel-national",
    onChange,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;

  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(() =>
    digitsOnly(String(defaultValue)),
  );
  const display = isControlled
    ? formatPhoneDisplay(String(value), dialCode)
    : formatPhoneDisplay(internal, dialCode);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const nextRaw = digitsOnly(event.target.value);
      if (!isControlled) setInternal(nextRaw);
      onChange?.(nextRaw, event);
    },
    [isControlled, onChange],
  );

  return (
    <div
      data-slot="phone-field-input"
      data-error={error || undefined}
      className={cn("w-full max-w-sm font-sans", containerClassName)}
    >
      <label
        htmlFor={inputId}
        className="mb-1.5 block text-sm font-medium text-neutral-900"
      >
        {label}
        {required ? (
          <span className="ml-0.5 text-rose-500" aria-hidden>
            *
          </span>
        ) : null}
      </label>

      <div
        className={cn(
          "flex overflow-hidden rounded-lg border bg-white transition-[border-color] duration-200",
          error
            ? "border-rose-300 focus-within:border-rose-400"
            : "border-neutral-200 focus-within:border-neutral-900",
          disabled && "bg-neutral-50",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "flex shrink-0 items-center border-r border-neutral-200 bg-neutral-50 px-3 font-mono text-sm text-neutral-600",
            disabled && "text-neutral-400",
          )}
        >
          {dialCode}
        </span>

        <input
          ref={ref}
          id={inputId}
          type="tel"
          inputMode="tel"
          autoComplete={autoComplete}
          disabled={disabled}
          required={required}
          value={display}
          aria-invalid={error || undefined}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          placeholder="(555) 000-0000"
          onChange={handleChange}
          className={cn(
            "h-10 min-w-0 flex-1 bg-transparent px-3.5 font-sans text-sm text-neutral-900 ring-0 outline-none placeholder:text-neutral-400 focus:ring-0 disabled:cursor-not-allowed disabled:text-neutral-400",
            className,
          )}
          {...props}
        />
      </div>

      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-rose-600">
          {errorMessage}
        </p>
      ) : hint ? (
        <p id={hintId} className="mt-1.5 text-xs text-neutral-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
});

PhoneFieldInput.displayName = "PhoneFieldInput";
