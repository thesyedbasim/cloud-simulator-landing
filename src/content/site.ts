/**
 * All copy and links live here, as typed data, so wording changes never touch layout code.
 * Tone: an engineer explaining something to a colleague they respect. Precise, calm, a little dry. No hype.
 */
/** A production build must not ship a "Start Now" button that points at localhost, so a missing value fails the build. */
function requireInProduction(name: string, fallback: string): string {
  const v = process.env[name]
  if (!v && process.env.VERCEL_ENV === 'production') throw new Error(`${name} must be set for a production build`)
  return (v ?? fallback).replace(/\/$/, '')
}

export const SITE = {
  name: 'CloudSim',
  tagline: 'Break your architecture before production does.',
  description: 'CloudSim is a cloud architecture simulator. Build a design, push traffic through it, then take parts down on purpose. It shows what saturates, explains why, and tests the fix.',
  /** Public URL of this site (used for canonical links, the sitemap and social cards). */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000')).replace(/\/$/, ''),
  /** Where "Start Now" goes: the deployed simulator. */
  appUrl: requireInProduction('NEXT_PUBLIC_APP_URL', 'http://localhost:5173'),
  github: 'https://github.com/thesyedbasim/cloud-simulator-app',
  modelDoc: 'https://github.com/thesyedbasim/cloud-simulator-app/blob/main/docs/MODEL.md',
  author: 'Syed Basim',
} as const

export const NAV = [
  { href: '#how-it-works', label: 'How it works' },
  { href: '#features', label: 'Features' },
] as const

export const CAPABILITIES = [
  { id: 'state', title: 'State on the object', body: 'Every service shows its own state and its level: stacked servers, a taller database, more cache shelves, more crates on the queue.' },
  { id: 'break', title: 'Break it on purpose', body: 'Kill a component, slow it down, or lose an instance. Or run a one-click scenario: traffic spike, node failure, slow database.' },
  { id: 'why', title: 'It tells you why', body: 'A plain-language card names the bottleneck and the cause, down to the exhausted connection pool or the retry storm.' },
  { id: 'fixes', title: 'Fixes found by experiment', body: 'It tries each change, re-runs the stress test, and ranks them by measured improvement and cost.' },
  { id: 'compare', title: 'Compare designs', body: 'Pin a design as A, change something, and see both run the same scenario on the same chart.' },
  { id: 'capacity', title: 'Capacity finder', body: 'Turn the traffic up until it breaks. See where, what gives out first, and how much headroom each part has.' },
  { id: 'slo', title: 'SLOs and error budget', body: 'Set an availability and latency target and watch the budget burn while the simulation runs.' },
  { id: 'autoscale', title: 'Autoscaling, honestly', body: 'New instances take time to start, so a spike still hurts. Watch the ghost slots turn solid as capacity arrives.' },
  { id: 'trace', title: 'Trace one request', body: 'Follow a single request hop by hop and see where its time went, or exactly where it died.' },
  { id: 'rewind', title: 'Rewind', body: 'Drag the timeline back to the moment it broke and see the canvas, the numbers and the explanation as they were.' },
] as const

