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

export type RadioGroupFieldOption = Readonly<{
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}>;

export type RadioGroupFieldInputProps = Readonly<
  {
    label?: string;
    hint?: string;
    error?: boolean;
    errorMessage?: string;
    options?: readonly RadioGroupFieldOption[];
    orientation?: "vertical" | "horizontal";
    containerClassName?: string;
    name?: string;
    required?: boolean;
    onValueChange?: (value: string) => void;
  } & Omit<ComponentPropsWithoutRef<"fieldset">, "onChange">
> & {
  value?: string;
  defaultValue?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const DEFAULT_OPTIONS: readonly RadioGroupFieldOption[] = [
  {
    value: "card",
    label: "Credit card",
    description: "Visa, Mastercard, Amex",
  },
  {
    value: "paypal",
    label: "PayPal",
    description: "Pay with your PayPal balance",
  },
  {
    value: "bank",
    label: "Bank transfer",
    description: "2–3 business days to clear",
  },
];

export const RadioGroupFieldInput = forwardRef<
  HTMLFieldSetElement,
  RadioGroupFieldInputProps
>(function RadioGroupFieldInput(
  {
    className,
    containerClassName,
    id,
    label = "Payment method",
    hint,
    error = false,
    errorMessage = "Choose a payment method.",
    options = DEFAULT_OPTIONS,
    orientation = "vertical",
    disabled,
    required,
    name,
    value,
    defaultValue = "",
    onChange,
    onValueChange,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const groupId = id ?? generatedId;
  const hintId = `${groupId}-hint`;
  const errorId = `${groupId}-error`;
  const groupName = name ?? groupId;

  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(String(defaultValue));
  const current = isControlled ? String(value ?? "") : internal;

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const next = event.target.value;
      if (!isControlled) setInternal(next);
      onValueChange?.(next);
      onChange?.(event);
    },
    [isControlled, onChange, onValueChange],
  );

  return (
    <fieldset
      ref={ref}
      id={groupId}
      disabled={disabled}
      aria-invalid={error || undefined}
      aria-describedby={error ? errorId : hint ? hintId : undefined}
      data-slot="radio-group-field-input"
      data-error={error || undefined}
      className={cn(
        "w-full max-w-sm border-0 p-0 font-sans",
        containerClassName,
        className,
      )}
      {...props}
    >
      <legend className="mb-2 block text-sm font-medium text-neutral-900">
        {label}
        {required ? (
          <span className="ml-0.5 text-rose-500" aria-hidden>
            *
          </span>
        ) : null}
      </legend>

      <div
        role="radiogroup"
        aria-required={required || undefined}
        className={cn(
          "flex gap-2",
          orientation === "vertical"
            ? "flex-col"
            : "flex-col md:flex-row md:flex-wrap",
        )}
      >
        {options.map((option) => {
          const inputId = `${groupId}-${option.value}`;
          const isSelected = current === option.value;

          return (
            <label
              key={option.value}
              htmlFor={inputId}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-lg border px-3.5 py-3 transition-[border-color,background-color] duration-200",
                orientation === "horizontal" && "md:min-w-44 md:flex-1",
                isSelected && !error && "border-neutral-900 bg-neutral-50",
                !isSelected &&
                  !error &&
                  "border-neutral-200 bg-white hover:border-neutral-300",
                error && isSelected && "border-rose-400 bg-rose-50/40",
                error && !isSelected && "border-rose-200 bg-white",
                option.disabled && "cursor-not-allowed opacity-50",
              )}
            >
              <span className="relative mt-0.5 shrink-0">
                <input
                  id={inputId}
                  type="radio"
                  name={groupName}
                  value={option.value}
                  disabled={option.disabled || disabled}
                  required={required}
                  checked={isSelected}
                  onChange={handleChange}
                  className="peer absolute size-4 cursor-pointer opacity-0 disabled:cursor-not-allowed"
                />
                <span
                  aria-hidden
                  className={cn(
                    "flex size-4 items-center justify-center rounded-full border-2 transition-[border-color,background-color] duration-200",
                    error
                      ? "border-rose-300 peer-focus:border-rose-400"
                      : "border-neutral-300 peer-focus:border-neutral-900",
                    isSelected && !error && "border-neutral-900",
                    isSelected && error && "border-rose-500",
                  )}
                >
                  <span
                    className={cn(
                      "size-2 rounded-full transition-[scale,opacity,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-[opacity,background-color]",
                      isSelected && !error && "scale-100 bg-neutral-900",
                      isSelected && error && "scale-100 bg-rose-500",
                      !isSelected && "scale-90 bg-transparent opacity-0",
                    )}
                  />
                </span>
              </span>

              <span className="min-w-0">
                <span className="block text-sm font-medium text-neutral-900">
                  {option.label}
                </span>
                {option.description ? (
                  <span className="mt-0.5 block text-xs text-neutral-500">
                    {option.description}
                  </span>
                ) : null}
              </span>
            </label>
          );
        })}
      </div>

      {error ? (
        <p id={errorId} role="alert" className="mt-2 text-xs text-rose-600">
          {errorMessage}
        </p>
      ) : hint ? (
        <p id={hintId} className="mt-2 text-xs text-neutral-500">
          {hint}
        </p>
      ) : null}
    </fieldset>
  );
});

RadioGroupFieldInput.displayName = "RadioGroupFieldInput";
