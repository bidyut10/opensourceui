"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type ComponentPropsWithoutRef,
  type FocusEvent,
  type MutableRefObject,
  type Ref,
} from "react";

import { cn } from "@/lib/cn";

export type FloatingLabelFieldInputProps = Readonly<
  {
    label?: string;
    hint?: string;
    error?: boolean;
    errorMessage?: string;
    containerClassName?: string;
  } & Omit<ComponentPropsWithoutRef<"input">, "size" | "placeholder">
>;

function mergeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") ref(node);
      else (ref as MutableRefObject<T | null>).current = node;
    }
  };
}

export const FloatingLabelFieldInput = forwardRef<
  HTMLInputElement,
  FloatingLabelFieldInputProps
>(function FloatingLabelFieldInput(
  {
    className,
    containerClassName,
    id,
    label = "Email address",
    hint,
    error = false,
    errorMessage = "Enter a valid email address.",
    disabled,
    readOnly,
    required,
    type = "email",
    value,
    defaultValue = "",
    onChange,
    onFocus,
    onBlur,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;
  const localRef = useRef<HTMLInputElement | null>(null);

  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(() => String(defaultValue));
  const [focused, setFocused] = useState(false);
  const [autofilled, setAutofilled] = useState(false);

  const current = isControlled ? String(value ?? "") : internal;
  const floated = focused || current.length > 0 || autofilled;

  useEffect(() => {
    if (isControlled) return;
    setInternal(String(defaultValue));
  }, [defaultValue, isControlled]);

  useEffect(() => {
    const node = localRef.current;
    if (!node) return;

    const syncFromDom = () => {
      const domValue = node.value;
      if (domValue.length > 0) {
        if (!isControlled) setInternal(domValue);
        setAutofilled(true);
      }
    };

    syncFromDom();
    const timers = [
      window.setTimeout(syncFromDom, 100),
      window.setTimeout(syncFromDom, 500),
    ];

    return () => {
      for (const timer of timers) window.clearTimeout(timer);
    };
  }, [isControlled]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const next = event.target.value;
      if (!isControlled) setInternal(next);
      setAutofilled(false);
      onChange?.(event);
    },
    [isControlled, onChange],
  );

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      onFocus?.(event);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      const next = event.currentTarget.value;
      if (!isControlled) setInternal(next);
      if (next.length > 0) setAutofilled(true);
      onBlur?.(event);
    },
    [isControlled, onBlur],
  );

  return (
    <div
      data-slot="floating-label-field-input"
      data-error={error || undefined}
      data-floated={floated || undefined}
      className={cn("w-full max-w-sm font-sans", containerClassName)}
    >
      <div className="relative">
        <input
          ref={mergeRefs(ref, localRef)}
          id={inputId}
          type={type}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          value={isControlled ? current : undefined}
          defaultValue={isControlled ? undefined : String(defaultValue)}
          aria-invalid={error || undefined}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn(
            "h-12 w-full rounded-lg border bg-white px-3.5 pt-4 pb-2 font-sans text-sm text-neutral-900 ring-0 transition-[border-color] duration-200 outline-none read-only:cursor-default read-only:bg-neutral-50 focus:ring-0 disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-400",
            error
              ? "border-rose-400 focus:border-rose-500"
              : focused
                ? "border-neutral-900"
                : "border-neutral-300",
            className,
          )}
          {...props}
        />

        <label
          htmlFor={inputId}
          className={cn(
            "pointer-events-none absolute left-3 max-w-[calc(100%-1.5rem)] origin-left truncate transition-[top,padding,font-size,font-weight,color,background-color] duration-200 ease-[cubic-bezier(0.77,0,0.175,1)] motion-reduce:transition-[color]",
            floated
              ? "top-0 -translate-y-1/2 bg-white px-1 text-xs leading-none font-medium"
              : "top-1/2 -translate-y-1/2 bg-transparent px-0 text-sm leading-none",
            floated &&
              !error &&
              (focused ? "text-neutral-900" : "text-neutral-600"),
            !floated && "text-neutral-500",
            error && "text-rose-500",
            disabled && "text-neutral-400",
          )}
        >
          {label}
          {required ? (
            <span className="ml-0.5 text-rose-500" aria-hidden>
              *
            </span>
          ) : null}
        </label>
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

FloatingLabelFieldInput.displayName = "FloatingLabelFieldInput";
