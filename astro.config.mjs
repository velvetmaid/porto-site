import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
// import vercel from "@astrojs/vercel";

// https://astro.build/config
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'https://velvetmaid.my.id',
  integrations: [sitemap(), react(), tailwind(), mdx()],
  output: "static"
  // adapter: vercel()
});