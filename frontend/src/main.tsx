import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import "@/font";

// react router
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./assets/App";
import ErrorBoundary from "./components/error-boundary";
const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    ErrorBoundary: ErrorBoundary,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
