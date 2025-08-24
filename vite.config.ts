import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/",
  ...(mode === "development"
    ? {
        server: {
          host: "sitportal.test",
          allowedHosts: [".sitportal.test"],
          port: 5173,
          strictPort: true,
          origin: "http://sitportal.test",
        },
      }
    : {}),
}));
