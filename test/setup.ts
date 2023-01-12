import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { expect, afterAll, afterEach, beforeAll } from "vitest";

import { setupServer } from "msw/node";
import { rest } from "msw";
import fetch from "node-fetch";

import list from "./mock/list.json";
import empty from "./mock/empty.json";
import error from "./mock/error.json";

/** @ts-ignore */
global.fetch = fetch;

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

export const restHandlers = [
  rest.get("https://api.github.com/search/repositories", (req, res, ctx) => {
    if (req.url.searchParams.get("q") === "test") {
      return res(ctx.delay(200), ctx.status(200), ctx.json(list));
    } else if (req.url.searchParams.get("q") === "error") {
      return res(ctx.delay(200), ctx.status(403), ctx.json(error));
    } else if (req.url.searchParams.get("q") === "status") {
      return res(ctx.delay(200), ctx.status(404), ctx.json({ test: 404 }));
    } else {
      return res(ctx.delay(200), ctx.status(200), ctx.json(empty));
    }
  }),
];

const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
