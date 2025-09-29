import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import mainRouter from "@/routes/main-router.tsx";
import "@/index.css";

const router = createBrowserRouter(mainRouter, {
  basename: import.meta.env.VITE_PATH_PREFIX,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
