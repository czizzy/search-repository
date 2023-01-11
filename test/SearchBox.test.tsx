import { vi } from "vitest";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import { SearchBox } from "../src/components/SearchBox";

describe("render SearchBox", () => {
  it("render", () => {
    const handleClick = vi.fn();

    render(<SearchBox onChange={handleClick} isSearching={false} />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});

it("should change input value", async () => {
  const handleClick = vi.fn();
  render(<SearchBox onChange={handleClick} isSearching={false} />);

  const input = screen.getByRole("textbox");
  expect(input).toBeInTheDocument();
  await userEvent.type(input, "test");
  expect(input).toHaveValue("test");
  await waitFor(() => expect(handleClick).toHaveBeenCalledTimes(1));
});
