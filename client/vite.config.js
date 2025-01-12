import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  server: {
    host: true,
    watch: {
      usePolling: true
    }
  },
  plugins: [react()]
});
