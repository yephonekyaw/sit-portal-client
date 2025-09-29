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
  base: "/certificate/",
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // DnD Kit
          if (id.includes("@dnd-kit")) {
            return "dnd-kit";
          }

          // Radix UI components
          if (id.includes("@radix-ui/react")) {
            return "radix-ui";
          }

          // Tanstack libraries
          if (id.includes("@tanstack/react-query")) {
            return "tanstack-query";
          }
          if (id.includes("@tanstack/react-table")) {
            return "tanstack-table";
          }

          // Form handling
          if (
            id.includes("react-hook-form") ||
            id.includes("@hookform/resolvers")
          ) {
            return "form-handling";
          }
          if (id.includes("zod")) {
            return "zod";
          }

          // Date utilities
          if (id.includes("date-fns") || id.includes("@date-fns/tz")) {
            return "date-fns";
          }
          if (id.includes("react-day-picker")) {
            return "day-picker";
          }

          // React core
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/")
          ) {
            return "react-core";
          }
          if (id.includes("react-router-dom")) {
            return "react-router";
          }

          // Icons
          if (id.includes("lucide-react")) {
            return "icons";
          }

          // UI utilities
          if (
            id.includes("class-variance-authority") ||
            id.includes("clsx") ||
            id.includes("tailwind-merge")
          ) {
            return "ui-utils";
          }

          // Animation and motion
          if (id.includes("motion")) {
            return "motion";
          }

          // HTTP client
          if (id.includes("axios")) {
            return "axios";
          }

          // State management
          if (id.includes("zustand")) {
            return "zustand";
          }

          // Markdown
          if (id.includes("react-markdown")) {
            return "markdown";
          }

          // Theming
          if (id.includes("next-themes")) {
            return "themes";
          }

          // Command palette
          if (id.includes("cmdk")) {
            return "cmdk";
          }

          // Notifications
          if (id.includes("sonner")) {
            return "sonner";
          }

          // Error handling
          if (id.includes("react-error-boundary")) {
            return "error-boundary";
          }

          // Utilities
          if (id.includes("js-cookie")) {
            return "cookies";
          }
          if (id.includes("uuid")) {
            return "uuid";
          }

          // Default - will be split by Vite's default algorithm
          return null;
        },
      },
    },
  },
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
