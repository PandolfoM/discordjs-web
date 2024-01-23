import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { AuthContextProvider } from "./auth/context.tsx";
import App from "./App.tsx";
import { AppContextProvider } from "./context/appContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
