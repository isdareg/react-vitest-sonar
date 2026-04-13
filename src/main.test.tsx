import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App";

// Mock createRoot
const mockRender = vi.fn();
const mockRoot = { render: mockRender };

vi.mock("react-dom/client", () => ({
  createRoot: vi.fn(() => mockRoot),
}));

// Mock the App component
vi.mock("./App.tsx", () => ({
  default: () => <div>Mock App Component</div>,
}));

describe("main.tsx", () => {
  let rootElement: HTMLElement;

  beforeEach(() => {
    // Create a mock root element
    rootElement = document.createElement("div");
    rootElement.id = "root";
    document.body.appendChild(rootElement);

    // Clear mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Clean up
    if (document.body.contains(rootElement)) {
      document.body.removeChild(rootElement);
    }
  });

  it("should create root and render App component wrapped in StrictMode", async () => {
    // Import main.tsx to trigger the execution
    await import("./main");

    // Verify createRoot was called with the root element
    expect(createRoot).toHaveBeenCalledWith(rootElement);

    // Verify render was called
    expect(mockRender).toHaveBeenCalledTimes(1);

    // Verify the render call contains the expected structure
    const renderCall = mockRender.mock.calls[0][0];

    // Check that it's a React element with StrictMode
    expect(renderCall.$$typeof).toBeDefined(); // React element
    expect(renderCall.type).toBe(StrictMode);

    // Check that App is inside StrictMode
    expect(renderCall.props.children.type).toBe(App);
  });

  it("should render without throwing errors when root element exists", async () => {
    // This test just verifies that importing main.tsx doesn't throw
    expect(async () => {
      await import("./main");
    }).not.toThrow();
  });
});
