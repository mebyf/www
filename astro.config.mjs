import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import markdoc from '@astrojs/markdoc'
import keystatic from '@keystatic/astro'
import tailwind from '@astrojs/tailwind'
import { loadEnv } from 'vite'
import cloudflare from '@astrojs/cloudflare'

const { ASTRO_OUTPUT_MODE, ASTRO_USE_CLOUDFLARE_ADAPTER } = loadEnv(
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

  adapter: ASTRO_USE_CLOUDFLARE_ADAPTER ? cloudflare() : undefined,

  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    fallback: {
      es: 'en',
    },
  },
})
