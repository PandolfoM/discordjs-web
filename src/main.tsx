import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { AuthContextProvider } from "./auth/context.tsx";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
