import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const isTestEnvironment = process.env.NODE_ENV === "development";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  server: {
    proxy: isTestEnvironment
      ? {
          "/auth": {
            target: "http://localhost:5001/epicans-bot/us-central1",
            changeOrigin: true,
          },
        }
      : {
          "/auth": {
            target: "https://epicansmc.xyz",
            changeOrigin: true,
          },
        },
  },
  base: "/",
});
