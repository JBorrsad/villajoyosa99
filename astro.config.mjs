import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://sadaborras.com",
  base: "/",
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
    assets: "assets",
  },
  vite: {
    build: {
      cssCodeSplit: true,
      minify: "esbuild",
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    server: {
      headers: {
        "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com https://cdn.jsdelivr.net https://*.googleapis.com https://maps.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; frame-src 'self' https://www.google.com https://maps.google.com https://*.google.com; connect-src 'self' https://*.googleapis.com https://maps.googleapis.com https://www.google.com;"
      }
    }
  }
});
