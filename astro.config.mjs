import { defineConfig, envField } from 'astro/config'
import react from '@astrojs/react'
import markdoc from '@astrojs/markdoc'
import keystatic from '@keystatic/astro'
import tailwind from '@astrojs/tailwind'
import { loadEnv } from 'vite'
import netlifyIntegration from '@astrojs/netlify'

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

  adapter: ASTRO_USE_NETLIFY_ADAPTER ? netlifyIntegration() : undefined,

  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    fallback: {
      es: 'en',
    },
  },

  env: {
    schema: {
      ASTRO_USE_NETLIFY_ADAPTER: envField.boolean({
        access: 'secret',
        context: 'server',
        optional: false,
      }),
      KEYSTATIC_STORAGE_KIND: envField.enum({
        values: ['local', 'github'],
        access: 'public',
        context: 'client',
        default: 'local',
        optional: true,
      }),
      ASTRO_ENV: envField.enum({
        values: ['development', 'staging', 'production'],
        access: 'public',
        context: 'client',
        optional: false,
      }),
    },
  },
})
