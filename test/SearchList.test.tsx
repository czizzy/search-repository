import { render, screen } from "@testing-library/react";
import React from "react";

import { SearchList } from "../src/components/SearchList";

import list from "./mock/list.json";
import empty from "./mock/empty.json";

describe("render SearchList", () => {
  it("render", () => {
    render(<SearchList result={list} q={"test"} />);

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(10);
  });

  it("render empty", () => {
    render(<SearchList result={empty} q={"test"} />);
    expect(screen.getByText(/We couldn’t /)).toBeInTheDocument();
  });

  it("render error", () => {
    render(<SearchList result={"error message"} q={"test"} />);
    expect(screen.getByText(/Error/)).toBeInTheDocument();
  });
});
