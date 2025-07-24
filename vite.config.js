// vite.config.js
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import glsl from "vite-plugin-glsl";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  resolve: {
    alias: {
      "@core": path.resolve(__dirname, "./src/core"),
      "@shaders": path.resolve(__dirname, "./src/shaders"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@entities": path.resolve(__dirname, "./src/entities"),
    },
  },
  plugins: [glsl(), tailwindcss()],
});
