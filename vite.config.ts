import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Example: simple custom plugin that logs build start
const devLogger = () => ({
  name: "dev-logger",
  buildStart() {
    console.log("🚀 Starting Vite development server...");
  },
});

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && devLogger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
