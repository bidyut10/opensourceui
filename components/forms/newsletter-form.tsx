"use client";

import {
  forwardRef,
  useCallback,
  useId,
  useState,
  type ComponentPropsWithoutRef,
  type FormEvent,
} from "react";

import { AlertCircle, Check, ChevronRight, Loader2 } from "lucide-react";

import { cn } from "@/lib/cn";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type NewsletterFormProps = Readonly<
  {
    title?: string;
    subtitle?: string;
    placeholder?: string;
    submitLabel?: string;
    successMessage?: string;
    privacyNote?: string;
    submitErrorMessage?: string;
    loading?: boolean;
    onSubmit?: (email: string) => void | Promise<void>;
  } & Omit<ComponentPropsWithoutRef<"form">, "onSubmit">
>;

export const NewsletterForm = forwardRef<HTMLFormElement, NewsletterFormProps>(
  function NewsletterForm(
    {
      className,
      title = "Stay in the loop",
      subtitle = "Weekly updates on new components and releases. No spam.",
      placeholder = "Enter your email",
      submitLabel = "Subscribe",
      successMessage = "You're subscribed. Check your inbox to confirm.",
      privacyNote = "Unsubscribe anytime. We never share your email.",
      submitErrorMessage = "We couldn't add you to the list. Please try again.",
      loading = false,
      onSubmit,
      onReset,
      ...props
    },
    ref,
  ) {
    const formId = useId();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [submitError, setSubmitError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const busy = loading || submitting;

    const handleSubmit = useCallback(
      async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (busy || success) return;

        const trimmed = email.trim();
        if (!trimmed) {
          setError("Email is required.");
          return;
        }
        if (!EMAIL_RE.test(trimmed)) {
          setError("Enter a valid email address.");
          return;
        }

        setError("");
        setSubmitError("");
        setSubmitting(true);
        try {
          await onSubmit?.(trimmed);
          setSuccess(true);
        } catch {
          setSubmitError(submitErrorMessage);
        } finally {
          setSubmitting(false);
        }
      },
      [busy, email, onSubmit, submitErrorMessage, success],
    );

    const handleReset = useCallback(
      (event: FormEvent<HTMLFormElement>) => {
        onReset?.(event);
        if (event.defaultPrevented) return;
        setEmail("");
        setError("");
        setSubmitError("");
        setSuccess(false);
      },
      [onReset],
    );

    return (
      <form
        ref={ref}
        data-slot="newsletter-form"
        data-success={success || undefined}
        aria-busy={busy}
        noValidate
        onSubmit={handleSubmit}
        onReset={handleReset}
        className={cn(
          "w-full max-w-md rounded-3xl bg-white p-6 font-sans md:p-8",
          className,
        )}
        {...props}
      >
        <div className="mb-6">
          <h2 className="font-sans text-2xl font-semibold tracking-tight text-neutral-950">
            {title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-neutral-500">{subtitle}</p>
        </div>

        {success ? (
          <div role="status" aria-live="polite" className="flex items-start gap-2 border-l-2 border-emerald-500 bg-emerald-50 px-3.5 py-3">
            <Check size={16} className="mt-0.5 shrink-0 text-emerald-600" aria-hidden />
            <p className="text-sm text-emerald-700">{successMessage}</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2 md:flex-row">
              <input
                id={`${formId}-email`}
                name="email"
                type="email"
                autoComplete="email"
                disabled={busy}
                value={email}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${formId}-email-error` : `${formId}-privacy`}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setSubmitError("");
                  if (error) setError("");
                }}
                className={cn(
                  "h-11 min-w-0 flex-1 rounded-md border bg-white px-3.5 text-sm outline-none ring-0 transition-colors focus:ring-0 disabled:bg-neutral-50",
                  error ? "border-rose-300" : "border-neutral-200 focus:border-neutral-900",
                )}
                placeholder={placeholder}
              />
              <button
                type="submit"
                disabled={busy}
                className="flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md bg-neutral-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 disabled:cursor-not-allowed disabled:opacity-60 md:px-6"
              >
                {busy ? <Loader2 size={16} className="animate-spin" aria-hidden /> : null}
                {busy ? "Joining…" : submitLabel}
                {!busy ? <ChevronRight size={15} aria-hidden /> : null}
              </button>
            </div>

            {error ? (
              <p id={`${formId}-email-error`} role="alert" className="mt-1.5 text-xs text-rose-600">
                {error}
              </p>
            ) : (
              <p id={`${formId}-privacy`} className="mt-2 text-xs text-neutral-400">
                {privacyNote}
              </p>
            )}
            {submitError ? (
              <div
                role="alert"
                className="mt-3 flex items-start gap-2.5 border-l-2 border-rose-500 bg-rose-50 px-3 py-2.5 text-sm text-rose-700"
              >
                <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden />
                <span>{submitError}</span>
              </div>
            ) : null}
          </>
        )}
      </form>
    );
  },
);

NewsletterForm.displayName = "NewsletterForm";
