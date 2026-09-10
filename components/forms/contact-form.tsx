"use client";

import {
  forwardRef,
  useCallback,
  useId,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type FormEvent,
} from "react";

import { AlertCircle, ChevronRight, Loader2 } from "lucide-react";

import { cn } from "@/lib/cn";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactFormValues = Readonly<{
  name: string;
  email: string;
  subject: string;
  message: string;
}>;

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export type ContactFormProps = Readonly<
  {
    title?: string;
    subtitle?: string;
    submitLabel?: string;
    successTitle?: string;
    successMessage?: string;
    submitErrorMessage?: string;
    maxMessageLength?: number;
    loading?: boolean;
    onSubmit?: (values: ContactFormValues) => void | Promise<void>;
  } & Omit<ComponentPropsWithoutRef<"form">, "onSubmit">
>;

function validateContact(values: ContactFormValues, maxLength: number): ContactFormErrors {
  const errors: ContactFormErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();

  if (name.length < 2) errors.name = "Please enter your name.";
  if (!email) errors.email = "Email is required.";
  else if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";
  if (subject.length < 3) errors.subject = "Subject must be at least 3 characters.";
  if (message.length < 10) errors.message = "Message must be at least 10 characters.";
  else if (message.length > maxLength) errors.message = `Message cannot exceed ${maxLength} characters.`;

  return errors;
}

export const ContactForm = forwardRef<HTMLDivElement, ContactFormProps>(
  function ContactForm(
    {
      className,
      title = "Get in touch",
      subtitle = "We usually reply within one business day.",
      submitLabel = "Send message",
      successTitle = "Message sent",
      successMessage = "Thanks for reaching out. We'll get back to you soon.",
      submitErrorMessage = "Your message wasn't sent. Please try again.",
      maxMessageLength = 1000,
      loading = false,
      onSubmit,
      onReset,
      ...props
    },
    ref,
  ) {
    const formId = useId();
    const honeypotRef = useRef<HTMLInputElement>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState<ContactFormErrors>({});
    const [submitError, setSubmitError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const busy = loading || submitting;
    const messageLimit = Math.max(10, Math.floor(maxMessageLength));

    const clearError = useCallback((key: keyof ContactFormValues) => {
      setSubmitError("");
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }, []);

    const handleSubmit = useCallback(
      async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (busy || success) return;

        if (honeypotRef.current?.value.trim()) {
          setSuccess(true);
          return;
        }

        const values: ContactFormValues = { name, email, subject, message };
        const nextErrors = validateContact(values, messageLimit);
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;

        setSubmitting(true);
        setSubmitError("");
        try {
          await onSubmit?.({
            name: name.trim(),
            email: email.trim(),
            subject: subject.trim(),
            message: message.trim(),
          });
          setSuccess(true);
        } catch {
          setSubmitError(submitErrorMessage);
        } finally {
          setSubmitting(false);
        }
      },
      [busy, email, message, messageLimit, name, onSubmit, subject, submitErrorMessage, success],
    );

    const handleReset = useCallback(
      (event: FormEvent<HTMLFormElement>) => {
        onReset?.(event);
        if (event.defaultPrevented) return;
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setErrors({});
        setSubmitError("");
      },
      [onReset],
    );

    if (success) {
      return (
        <div
          ref={ref}
          data-slot="contact-form"
          data-success
          role="status"
          aria-live="polite"
          className={cn(
            "w-full max-w-md rounded-3xl bg-white p-6 font-sans md:p-8",
            className,
          )}
        >
          <h2 className="font-sans text-2xl font-semibold tracking-tight text-neutral-950">
            {successTitle}
          </h2>
          <p className="mt-3 text-sm leading-6 text-neutral-500">{successMessage}</p>
        </div>
      );
    }

    return (
      <div ref={ref} className={cn("w-full max-w-md", className)}>
      <form
        data-slot="contact-form"
        aria-busy={busy}
        noValidate
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="rounded-3xl bg-white p-6 font-sans md:p-8"
        {...props}
      >
        <input
          ref={honeypotRef}
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="sr-only"
        />

        <div className="mb-7">
          <h2 className="font-sans text-2xl font-semibold tracking-tight text-neutral-950">
            {title}
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-500">{subtitle}</p>
        </div>

        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor={`${formId}-name`} className="mb-1.5 block text-sm font-medium text-neutral-900">
                Name
              </label>
              <input
                id={`${formId}-name`}
                name="name"
                type="text"
                autoComplete="name"
                disabled={busy}
                value={name}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? `${formId}-name-error` : undefined}
                onChange={(event) => {
                  setName(event.target.value);
                  clearError("name");
                }}
                className={cn(
                  "h-11 w-full rounded-md border bg-white px-3.5 text-sm outline-none ring-0 transition-colors focus:ring-0 disabled:bg-neutral-50",
                  errors.name ? "border-rose-300" : "border-neutral-200 focus:border-neutral-900",
                )}
                placeholder="Your name"
              />
              {errors.name ? <p id={`${formId}-name-error`} role="alert" className="mt-1.5 text-xs text-rose-600">{errors.name}</p> : null}
            </div>

            <div>
              <label htmlFor={`${formId}-email`} className="mb-1.5 block text-sm font-medium text-neutral-900">
                Email
              </label>
              <input
                id={`${formId}-email`}
                name="email"
                type="email"
                autoComplete="email"
                disabled={busy}
                value={email}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? `${formId}-email-error` : undefined}
                onChange={(event) => {
                  setEmail(event.target.value);
                  clearError("email");
                }}
                className={cn(
                  "h-11 w-full rounded-md border bg-white px-3.5 text-sm outline-none ring-0 transition-colors focus:ring-0 disabled:bg-neutral-50",
                  errors.email ? "border-rose-300" : "border-neutral-200 focus:border-neutral-900",
                )}
                placeholder="you@email.com"
              />
              {errors.email ? <p id={`${formId}-email-error`} role="alert" className="mt-1.5 text-xs text-rose-600">{errors.email}</p> : null}
            </div>
          </div>

          <div>
            <label htmlFor={`${formId}-subject`} className="mb-1.5 block text-sm font-medium text-neutral-900">
              Subject
            </label>
            <input
              id={`${formId}-subject`}
              name="subject"
              type="text"
              disabled={busy}
              value={subject}
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={errors.subject ? `${formId}-subject-error` : undefined}
              onChange={(event) => {
                setSubject(event.target.value);
                clearError("subject");
              }}
              className={cn(
                "h-11 w-full rounded-md border bg-white px-3.5 text-sm outline-none ring-0 transition-colors focus:ring-0 disabled:bg-neutral-50",
                errors.subject ? "border-rose-300" : "border-neutral-200 focus:border-neutral-900",
              )}
              placeholder="How can we help?"
            />
            {errors.subject ? <p id={`${formId}-subject-error`} role="alert" className="mt-1.5 text-xs text-rose-600">{errors.subject}</p> : null}
          </div>

          <div>
            <div className="mb-1.5 flex items-baseline justify-between gap-2">
              <label htmlFor={`${formId}-message`} className="text-sm font-medium text-neutral-900">
                Message
              </label>
              <span className="text-xs tabular-nums text-neutral-400">
                {message.length}/{messageLimit}
              </span>
            </div>
            <textarea
              id={`${formId}-message`}
              name="message"
              rows={4}
              disabled={busy}
              value={message}
              maxLength={messageLimit}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? `${formId}-message-error` : `${formId}-message-count`}
              onChange={(event) => {
                setMessage(event.target.value);
                clearError("message");
              }}
              className={cn(
                "min-h-28 w-full resize-y rounded-md border bg-white px-3.5 py-2.5 text-sm leading-relaxed outline-none ring-0 transition-colors focus:ring-0 disabled:bg-neutral-50",
                errors.message ? "border-rose-300" : "border-neutral-200 focus:border-neutral-900",
              )}
              placeholder="Tell us more about your project…"
            />
            <span id={`${formId}-message-count`} className="sr-only">
              {message.length} of {messageLimit} characters used
            </span>
            {errors.message ? <p id={`${formId}-message-error`} role="alert" className="mt-1.5 text-xs text-rose-600">{errors.message}</p> : null}
          </div>
        </div>

        {submitError ? (
          <div
            role="alert"
            className="mt-5 flex items-start gap-2.5 border-l-2 border-rose-500 bg-rose-50 px-3 py-2.5 text-sm text-rose-700"
          >
            <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden />
            <span>{submitError}</span>
          </div>
        ) : null}

        <button
          type="submit"
          disabled={busy}
          className="mt-6 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-neutral-950 px-4 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? <Loader2 size={16} className="animate-spin" aria-hidden /> : null}
          {busy ? "Sending…" : submitLabel}
          {!busy ? <ChevronRight size={15} aria-hidden /> : null}
        </button>
      </form>
      </div>
    );
  },
);

ContactForm.displayName = "ContactForm";
