import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { SlideToConfirmButton } from "@/components/buttons/slide-to-confirm-button";

describe("SlideToConfirmButton", () => {
  it("renders the slide label", () => {
    render(<SlideToConfirmButton />);
    expect(screen.getByText(/slide to confirm/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /slide to confirm/i }),
    ).toBeInTheDocument();
  });

  it("accepts a custom label on the knob", () => {
    render(<SlideToConfirmButton label="Slide to pay" />);
    expect(screen.getByText(/slide to pay/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /slide to pay/i }),
    ).toBeInTheDocument();
  });
});
