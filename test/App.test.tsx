import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import App from "../src/App";

describe("render", () => {
  it("render", () => {
    render(<App />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});

it("search and display list", async () => {
  render(<App />);

  const input = screen.getByRole("textbox");
  expect(input).toBeInTheDocument();
  await userEvent.type(input, "test");
  await screen.findByRole("list");
  expect(screen.getAllByRole("listitem")).toHaveLength(10);
});

it("search result is empty", async () => {
  render(<App />);

  const input = screen.getByRole("textbox");
  expect(input).toBeInTheDocument();
  await userEvent.type(input, "testdfdasfasdfsafdas");
  // await screen.findByRole("list")
  await waitFor(
    () => {
      return new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
    },
    { timeout: 2000 },
  );
  expect(screen.queryByRole("list")).toBeNull();
});
