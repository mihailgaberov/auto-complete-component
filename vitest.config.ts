import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    globals: true,
    setupFiles: ["./src/setupTests.ts"],
    css: {
      modules: {
        classNameStrategy: "non-scoped",
      },
    },
    preprocessors: {
      "**/*.scss": "sass",
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/setupTests.ts",
        "src/main.jsx",
        "src/vite-env.d.ts",
      ],
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        charset: false,
      },
    },
  },
});
