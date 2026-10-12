import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  base: "./",
  define: {
    __HAS_VOICE_NOTE__: JSON.stringify(
      existsSync(
        fileURLToPath(new URL("./public/audio/coisinhas.m4a", import.meta.url)),
      ),
    ),
  },
});
