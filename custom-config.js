import { defineConfig as _defineConfig } from "astro/config";

export function defineConfig(config) {
  return _defineConfig({
    ...config,
    server: {
      headers: {
        "Access-Control-Allow-Origin":
          "https://a1xp8ym5wle2pctckmfw-src.halkinsesi.com"
      }
    },
    vite: {
      server: {
        proxy: {
          "^/src/.+.(jpg|jpeg|png|gif|webp).*":
            "https://a1xp8ym5wle2pctckmfw-src.halkinsesi.com",
          "^.+.(jpg|jpeg|png|gif|webp).*": {
            target: "https://a1xp8ym5wle2pctckmfw-src.halkinsesi.com",
            changeOrigin: true,
            rewrite: (path) => "/public" + path
          }
        }
      }
    }
  });
}
