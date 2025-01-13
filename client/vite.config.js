import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false // For development
        // rewrite: (path) => path.replace(/^\/api/, "") // Optional: Remove /api prefix
      }
    }
  }
});
