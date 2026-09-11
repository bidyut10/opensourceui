import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ContactForm } from "@/components/forms/contact-form";

describe("ContactForm", () => {
  it("shows field errors when submitted empty", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(
      await screen.findByText(/please enter your name/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  });

  it("submits trimmed values and shows success", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<ContactForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/^name$/i), "Bidyut");
    await user.type(screen.getByLabelText(/^email$/i), "you@site.com");
    await user.type(screen.getByLabelText(/^subject$/i), "Hello there");
    await user.type(
      screen.getByLabelText(/^message$/i),
      "This is a long enough message for validation.",
    );
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await vi.waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
    expect(await screen.findByText(/message sent/i)).toBeInTheDocument();
  });
});
