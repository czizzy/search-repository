import { render, screen } from "@testing-library/react";
import React from "react";

import { SearchList } from "../src/components/SearchList";

import list from "./mock/list.json";

describe("render SearchList", () => {
  it("render", () => {
    render(<SearchList list={list.items} />);

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(10);
  });
});
