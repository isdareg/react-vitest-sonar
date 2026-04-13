import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App Component", () => {
  it("renders the App component", () => {
    render(<App />);
    expect(screen.getByText(/Get started/i)).toBeInTheDocument();
  });

  it("renders the counter button", () => {
    render(<App />);
    const button = screen.getByRole("button", { name: /Count is/i });
    expect(button).toBeInTheDocument();
  });

  it("increments counter when button is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);
    const button = screen.getByRole("button", { name: /Count is 0/i });

    await user.click(button);

    expect(
      screen.getByRole("button", { name: /Count is 1/i }),
    ).toBeInTheDocument();
  });

  it("increments counter multiple times", async () => {
    const user = userEvent.setup();
    render(<App />);
    const button = screen.getByRole("button", { name: /Count is 0/i });

    await user.click(button);
    await user.click(button);
    await user.click(button);

    expect(
      screen.getByRole("button", { name: /Count is 3/i }),
    ).toBeInTheDocument();
  });
});
