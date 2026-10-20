import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import {
  TECH_STACK_ITEMS,
  TechStack,
} from "@/app/(marketing)/_components/tech-stack";

beforeAll(() => {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
});

describe("TechStack", () => {
  it("renders the default center logo when center is omitted", () => {
    render(<TechStack items={TECH_STACK_ITEMS} />);
    expect(screen.getByAltText("Opensource UI")).toBeInTheDocument();
  });

  it("falls back to the default center logo when center is null", () => {
    render(<TechStack items={TECH_STACK_ITEMS} center={null} />);
    expect(screen.getByAltText("Opensource UI")).toBeInTheDocument();
  });

  it("renders a custom center logo when provided", () => {
    render(
      <TechStack
        items={TECH_STACK_ITEMS}
        center={{ src: "/custom.png", alt: "Custom logo" }}
      />,
    );
    expect(screen.getByAltText("Custom logo")).toBeInTheDocument();
  });
});
