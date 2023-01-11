/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/search-repository/",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setup.ts",
  },
});
