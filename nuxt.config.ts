import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/icon',
    '@nuxt/ui',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
  ],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [nodePolyfills()]
  },
})