import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://kotaro9967.github.io",
  base: "/Student-Council",
  integrations: [react(), tailwind()],
});
