import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import markdoc from '@astrojs/markdoc'
import keystatic from '@keystatic/astro'
import tailwind from '@astrojs/tailwind'
import { loadEnv } from 'vite'
const { ASTRO_OUTPUT_MODE, ASTRO_USE_NETLIFY_ADAPTER } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  ''
)
// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    markdoc(),
    ASTRO_OUTPUT_MODE === 'static' ? undefined : keystatic(),
    tailwind(),
  ],

  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    fallback: {
      es: 'en',
    },
  },
})
