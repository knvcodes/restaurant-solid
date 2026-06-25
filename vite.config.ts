import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import optimizeImagesPlugin from "./plugins/optimize-images";

export default defineConfig({
  plugins: [solidPlugin(), optimizeImagesPlugin()],
  server: {
    port: 3001,
  },
  build: {
    target: "esnext",
  },
});
