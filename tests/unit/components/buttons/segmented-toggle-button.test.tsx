import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SegmentedToggleButton } from "@/components/buttons/segmented-toggle-button";

describe("SegmentedToggleButton", () => {
  it("renders tabs with correct roles and initial selection", () => {
    render(<SegmentedToggleButton options={["Day", "Week", "Month"]} />);
    const tablist = screen.getByRole("tablist");
    expect(tablist).toBeInTheDocument();

    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(3);
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    expect(tabs[0]).toHaveAttribute("tabindex", "0");
    expect(tabs[1]).toHaveAttribute("aria-selected", "false");
    expect(tabs[1]).toHaveAttribute("tabindex", "-1");
    expect(tabs[2]).toHaveAttribute("aria-selected", "false");
    expect(tabs[2]).toHaveAttribute("tabindex", "-1");
  });

  it("selects a tab on click and calls onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <SegmentedToggleButton
        options={["Day", "Week", "Month"]}
        onChange={onChange}
      />,
    );

    const tabs = screen.getAllByRole("tab");
    await user.click(tabs[1]);

    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    expect(tabs[0]).toHaveAttribute("aria-selected", "false");
    expect(onChange).toHaveBeenCalledWith(1, "Week");
  });

  it("navigates forward with ArrowRight and wraps with keyboard", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <SegmentedToggleButton
        options={["Day", "Week", "Month"]}
        onChange={onChange}
      />,
    );

    const tabs = screen.getAllByRole("tab");
    tabs[0].focus();
    expect(tabs[0]).toHaveFocus();

    await user.keyboard("{ArrowRight}");
    expect(tabs[1]).toHaveFocus();
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    expect(onChange).toHaveBeenCalledWith(1, "Week");

    await user.keyboard("{ArrowRight}");
    expect(tabs[2]).toHaveFocus();
    expect(tabs[2]).toHaveAttribute("aria-selected", "true");

    // Wrap around to first tab
    await user.keyboard("{ArrowRight}");
    expect(tabs[0]).toHaveFocus();
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
  });

  it("navigates backward with ArrowLeft and wraps to end", async () => {
    const user = userEvent.setup();
    render(<SegmentedToggleButton options={["Day", "Week", "Month"]} />);

    const tabs = screen.getAllByRole("tab");
    tabs[0].focus();

    await user.keyboard("{ArrowLeft}");
    expect(tabs[2]).toHaveFocus();
    expect(tabs[2]).toHaveAttribute("aria-selected", "true");
  });

  it("jumps to first and last tabs with Home and End keys", async () => {
    const user = userEvent.setup();
    render(
      <SegmentedToggleButton
        options={["Day", "Week", "Month", "Year"]}
        defaultIndex={1}
      />,
    );

    const tabs = screen.getAllByRole("tab");
    tabs[1].focus();

    await user.keyboard("{End}");
    expect(tabs[3]).toHaveFocus();
    expect(tabs[3]).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{Home}");
    expect(tabs[0]).toHaveFocus();
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
  });
});
