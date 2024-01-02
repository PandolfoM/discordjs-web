import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Navigation from "./components/Navigation.tsx";
import Home from "./pages/Home.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme appearance="dark" accentColor="cyan" panelBackground="solid">
      <Navigation />
      <RouterProvider router={router} />
    </Theme>
  </React.StrictMode>
);
