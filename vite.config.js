import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueI18n({
      compositionOnly: false,
      runtimeOnly: false,
      include: path.resolve(__dirname, "./src/plugins/i18n.js"),
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "~": fileURLToPath(new URL("./src", import.meta.url)),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js'
    },
  },
  define: {
    "process.platform": null,
    "global.setImmediate": null,
  },
});
