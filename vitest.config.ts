import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/vitest.setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      exclude: [
        "node_modules/",
        "dist/",
        ".eslintrc.cjs",
        "**/*.test.*",
        "**/*.spec.*",
        "**/__tests__/**",
        "**/*.config.*",
        "**/vitest.config.*",
        "**/vite.config.*",
        "**/eslint.config.*",
        "**/tsconfig.*",
        "**/setupTests.*",
        "**/vitest.setup.*",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
