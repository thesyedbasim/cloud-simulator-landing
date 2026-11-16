/**
 * All copy and links live here, as typed data, so wording changes never touch layout code.
 * Tone: an engineer explaining something to a colleague they respect. Precise, calm, a little dry. No hype.
 */
export const SITE = {
  name: 'CloudSim',
  tagline: 'Break your architecture before production does.',
  description: 'CloudSim is a cloud architecture simulator. Build a design, push traffic through it, then take parts down on purpose. It shows what saturates, explains why, and tests the fix.',
  /** Public URL of this site (used for canonical links, the sitemap and social cards). */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, ''),
  /** Where "Start Now" goes: the deployed simulator. */
  appUrl: (process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:5173').replace(/\/$/, ''),
  github: 'https://github.com/thesyedbasim/cloud-simulator-app',
  modelDoc: 'https://github.com/thesyedbasim/cloud-simulator-app/blob/main/docs/MODEL.md',
  author: 'Syed Basim',
} as const

export const NAV = [
  { href: '#use-cases', label: 'Use cases' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#features', label: 'Features' },
] as const

export const USE_CASES = [
  { id: 'interview', icon: 'target', title: 'Prepare for system-design interviews', story: 'Open the chat-app design, run the traffic spike, and see why the queue backs up. Then fix it and prove it worked.', scene: 2 },
  { id: 'review', icon: 'shield', title: 'Sanity-check a design before review', story: 'Find the single points of failure, the load where it breaks, and the change that buys the most headroom.', scene: 6 },
  { id: 'change', icon: 'compare', title: 'Show the effect of a change', story: 'Pin the current design, apply a fix, and put the before and after in the same chart.', scene: 5 },
  { id: 'teach', icon: 'book', title: 'Teach system design', story: 'Start from a design with a weak point. Students predict what breaks, then run it. Share a design as one file.', scene: 1 },
  { id: 'learn', icon: 'flame', title: 'Learn why things fail', story: 'Retry storms, exhausted connection pools, slow dependencies: watch each one happen, then read the explanation.', scene: 3 },
  { id: 'plan', icon: 'gauge', title: 'Plan capacity and targets', story: 'Set an availability target, watch the error budget burn, and find the load at which the design stops meeting it.', scene: 6 },
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

export const HONESTY = [
  { title: 'A simplified model, on purpose', body: 'CloudSim shows behaviour. It is not a load tester and not a faithful clone of any cloud service. It will not tell you what your production system will do.' },
  { title: 'Every formula is written down', body: 'Capacity, latency under load, retries, autoscaling lag, the error budget: each rule and default is documented, and values the app assumed for you are marked “assumed”.' },
  { title: 'Estimates are labelled as estimates', body: 'Cost figures are rough, hourly and always marked “est.”. Nothing pretends to be precise when it is not.' },
  { title: 'Deterministic and tested', body: 'The simulation uses no randomness, and the engine, the analysis and the file format are covered by automated tests, so the same design gives the same result.' },
] as const

