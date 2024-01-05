import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation.tsx";
import Home from "./pages/Home.tsx";
import NoPage from "./pages/NoPage.tsx";
import Dashboard from "./pages/Dashboard.tsx";
// import NoPage from "./pages/NoPage.tsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//   },
//   {
//     path: "/success",
//     element: <Success />,
//   },
//   {
//     path: "*",
//     element: <NoPage />,
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme appearance="dark" accentColor="cyan" panelBackground="solid">
      <BrowserRouter basename="/">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NoPage />} />
          {/* <RouterProvider router={router} /> */}
        </Routes>
      </BrowserRouter>
    </Theme>
  </React.StrictMode>
);
