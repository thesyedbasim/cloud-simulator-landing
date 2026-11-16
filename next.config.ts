import type { NextConfig } from 'next'

/**
 * A fully static site: every page is rendered to plain HTML at build time (`next build` writes ./out), so the
 * text is in the markup for search engines and works with no JavaScript. There is no server.
 */
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true, // /faq/ -> out/faq/index.html, works on any static host
  images: { unoptimized: true }, // the optimiser needs a server; we ship pre-sized SVG and PNG
}

export default nextConfig
