import { defineConfig } from "vite";
import { compression } from "vite-plugin-compression2";

import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), compression({ algorithm: "brotliCompress" })],
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
      },
      format: {
        comments: false,
      },
    },
  },
});
