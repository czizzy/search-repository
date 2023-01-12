import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { vi } from "vitest";

import { Pagination } from "../src/components/Pagination";

describe("render SearchList", () => {
  it("render 1 page", () => {
    const handleChange = vi.fn();

    render(<Pagination totalCount={1} currentPage={1} onChange={handleChange} />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText(/^1$/)).toBeInTheDocument();
  });

  it("render left DOTS", () => {
    const handleChange = vi.fn();
    render(<Pagination totalCount={80} currentPage={5} onChange={handleChange} />);
    expect(screen.getByText(/^\.\.\.$/)).toBeInTheDocument();
  });

  it("render right DOTS", () => {
    const handleChange = vi.fn();
    render(<Pagination totalCount={80} currentPage={2} onChange={handleChange} />);
    expect(screen.getByText(/^\.\.\.$/)).toBeInTheDocument();
  });

  it("render both DOTS", () => {
    const handleChange = vi.fn();
    render(<Pagination totalCount={100} currentPage={5} onChange={handleChange} />);
    expect(screen.getAllByText(/^\.\.\.$/)).toHaveLength(2);
  });

  it("should change active page", async () => {
    const handleChange = vi.fn();
    render(<Pagination totalCount={100} currentPage={5} onChange={handleChange} />);

    const prev = screen.getByText(/Previous/);
    expect(prev).toBeInTheDocument();
    await userEvent.click(prev);
    await waitFor(() => expect(handleChange).toHaveBeenCalledTimes(1));

    const next = screen.getByText(/Next/);
    expect(next).toBeInTheDocument();
    await userEvent.click(next);
    await waitFor(() => expect(handleChange).toHaveBeenCalledTimes(2));

    const page4 = screen.getByText(/^4$/);
    expect(page4).toBeInTheDocument();
    await userEvent.click(page4);
    await waitFor(() => expect(handleChange).toHaveBeenCalledTimes(3));
  });
});
