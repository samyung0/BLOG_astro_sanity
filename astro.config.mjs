import {defineConfig} from 'astro/config'

import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), sitemap()],
  prefetch: {
    defaultStrategy: 'viewport',
    prefetchAll: true,
  },
  image: {
    domains: ["cdn.sanity.io"],
    remotePatterns: [{ protocol: "https" }]
  }
})
