import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { HoldToDeleteButton } from "@/components/buttons/hold-to-delete-button";

describe("HoldToDeleteButton", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the default label", () => {
    render(<HoldToDeleteButton />);
    expect(
      screen.getByRole("button", { name: /hold to delete/i }),
    ).toBeInTheDocument();
  });

  it("calls onHoldComplete after holding long enough", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const onHoldComplete = vi.fn();
    render(<HoldToDeleteButton holdMs={500} onHoldComplete={onHoldComplete} />);

    const button = screen.getByRole("button", { name: /hold to delete/i });
    await user.pointer({ keys: "[MouseLeft>]", target: button });

    await act(async () => {
      vi.advanceTimersByTime(600);
    });

    expect(onHoldComplete).toHaveBeenCalledTimes(1);
    expect(
      screen.getByRole("button", { name: /deleted/i }),
    ).toBeInTheDocument();
  });

  it("cancels when released early", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const onHoldComplete = vi.fn();
    render(
      <HoldToDeleteButton holdMs={1000} onHoldComplete={onHoldComplete} />,
    );

    const button = screen.getByRole("button", { name: /hold to delete/i });
    await user.pointer({ keys: "[MouseLeft>]", target: button });
    await act(async () => {
      vi.advanceTimersByTime(200);
    });
    await user.pointer({ keys: "[/MouseLeft]", target: button });

    expect(onHoldComplete).not.toHaveBeenCalled();
    expect(
      screen.getByRole("button", { name: /hold to delete/i }),
    ).toBeInTheDocument();
  });
});
