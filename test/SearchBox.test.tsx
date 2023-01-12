import { vi } from "vitest";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import { SearchBox } from "../src/components/SearchBox";

describe("render SearchBox", () => {
  it("render", () => {
    const callback = vi.fn();

    render(<SearchBox onQueryChange={callback} onSortChange={callback} isSearching={false} />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});

it("should change input value", async () => {
  const callback = vi.fn();
  render(<SearchBox onQueryChange={callback} onSortChange={callback} isSearching={false} />);

  const input = screen.getByRole("textbox");
  expect(input).toBeInTheDocument();
  await userEvent.type(input, "test");
  expect(input).toHaveValue("test");
  await waitFor(() => expect(callback).toHaveBeenCalledTimes(1));
});

it("should change select value", async () => {
  const callback = vi.fn();
  render(<SearchBox onQueryChange={callback} onSortChange={callback} isSearching={false} />);

  const select = screen.getByRole("listbox");
  expect(select).toBeInTheDocument();
  await userEvent.selectOptions(select, "stars");
  await waitFor(() => expect(callback).toHaveBeenCalledTimes(1));
});
