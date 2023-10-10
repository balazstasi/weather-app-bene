import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import linaria from "@linaria/vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    linaria({
      include: ["**/*.{ts,tsx}"],
      babelOptions: {
        presets: ["@babel/preset-typescript", "@babel/preset-react"],
      },
    }),
  ],
  server: {
    open: false,
    watch: {
      usePolling: true,
    },
    host: true,
    port: 8000,
    strictPort: true,
  },
  build: {
    outDir: "build",
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },

  /* Aliasing */
  resolve: {
    alias: {
      "@": "/src",
    },
  },
})
