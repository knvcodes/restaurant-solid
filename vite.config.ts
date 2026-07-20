import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import optimizeImagesPlugin from "./plugins/optimize-images";
import { seoPlugin } from "./plugins/vite-seo-plugin";

export default defineConfig({
  plugins: [
    solidPlugin(),
    optimizeImagesPlugin(),
    seoPlugin({
      hostname: "https://yourdomain.com", // REPLACE WITH YOUR ACTUAL DOMAIN
      outputDir: "dist",
    }),
  ],
  server: {
    port: 3001,
  },
  build: {
    target: "esnext",
  },
});
