import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
import { SITE } from '@/content/site'

const title = `${SITE.name}: ${SITE.tagline}`

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: title, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.author }],
  keywords: ['cloud architecture simulator', 'system design', 'load testing', 'capacity planning', 'resilience', 'chaos engineering', 'SLO', 'error budget', 'autoscaling'],
  alternates: { canonical: '/' },
  openGraph: { type: 'website', siteName: SITE.name, title, description: SITE.description, url: '/', images: [{ url: '/og.png', width: 1200, height: 630, alt: `${SITE.name}: a cloud architecture simulator` }] },
  twitter: { card: 'summary_large_image', title, description: SITE.description, images: ['/og.png'] },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = { themeColor: '#f2f6fb' }

/** Structured data: tells search engines (and AI tools) what this is. Static, rendered into the HTML. */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: SITE.name,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any (runs in the browser)',
      description: SITE.description,
      url: SITE.url,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Person', name: SITE.author },
    },
    { '@type': 'WebSite', name: SITE.name, url: SITE.url },
  ],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* marks the page as script-enabled, so scroll-reveal effects never hide content from people without JS */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
