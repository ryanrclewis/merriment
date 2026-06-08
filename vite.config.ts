import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Local dev: plain Vite + React SPA (for fast preview/iteration)
// Production: `npm run deploy` uses vinext + cloudflare via app/ directory
export default defineConfig({
  plugins: [react()],
});
