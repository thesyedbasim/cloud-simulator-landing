import type { Design } from '@/lib/iso'

/** The four starter designs, as in the app's Designs menu (app/src/presets). Positions and settings match the app. */
const chain = (...ids: string[]) => ids.slice(1).map((to, i) => ({ from: ids[i], to }))

export interface Starter { design: Design; blurb: string; weak: string; query: string }

export const LINK_SHORTENER: Design = {
  id: 'link', name: 'Link Shortener',
  components: [
    { id: 'client', kind: 'client', name: 'Clients', col: 0, row: 3, config: { rps: 600 } },
    { id: 'lb', kind: 'loadBalancer', name: 'Load Balancer', col: 3, row: 3, config: { targets: 2 } },
    { id: 'app', kind: 'appServers', name: 'App Servers', col: 6, row: 3, config: { instances: 2, vcpu: 4, ramGb: 8 } },
    { id: 'cache', kind: 'cache', name: 'Cache', col: 9, row: 3, config: { hitRate: 0.8 } },
    { id: 'db', kind: 'database', name: 'Database', col: 9, row: 7, config: { vcpu: 4, ramGb: 16, poolSize: 20 } },
  ],
  connections: chain('client', 'lb', 'app', 'cache', 'db'),
}

export const CHAT_APP: Design = {
  id: 'chat', name: 'Chat App',
  components: [
    { id: 'client', kind: 'client', name: 'Clients', col: 0, row: 2, config: { rps: 400 } },
    { id: 'lb', kind: 'loadBalancer', name: 'Load Balancer', col: 3, row: 2, config: { targets: 2 } },
    { id: 'gateway', kind: 'appServers', name: 'Chat Gateway', col: 6, row: 2, config: { instances: 2, vcpu: 4, ramGb: 8 } },
    { id: 'queue', kind: 'queue', name: 'Message Queue', col: 9, row: 2, config: { capacity: 450, maxDepth: 2000 } },
    { id: 'workers', kind: 'appServers', name: 'Message Workers', col: 9, row: 6, config: { instances: 1, vcpu: 6, ramGb: 12 } },
    { id: 'db', kind: 'database', name: 'Message Store', col: 13, row: 6, config: { vcpu: 8, ramGb: 32, poolSize: 40 } },
  ],
  connections: chain('client', 'lb', 'gateway', 'queue', 'workers', 'db'),
}

export const VIDEO: Design = {
  id: 'video', name: 'Video Streaming',
  components: [
    { id: 'client', kind: 'client', name: 'Viewers', col: 0, row: 3, config: { rps: 700 } },
    { id: 'lb', kind: 'loadBalancer', name: 'Load Balancer', col: 3, row: 3, config: { targets: 2 } },
    { id: 'cdn', kind: 'cache', name: 'CDN Cache', col: 6, row: 3, config: { hitRate: 0.85 } },
    { id: 'origin', kind: 'appServers', name: 'Origin Servers', col: 9, row: 3, config: { instances: 2, vcpu: 2, ramGb: 4 } },
    { id: 'store', kind: 'database', name: 'Media Store', col: 12, row: 6, config: { vcpu: 2, ramGb: 8, poolSize: 20 } },
  ],
  connections: chain('client', 'lb', 'cdn', 'origin', 'store'),
}

export const SHOP: Design = {
  id: 'shop', name: 'E-commerce Store',
  components: [
    { id: 'client', kind: 'client', name: 'Shoppers', col: 0, row: 3, config: { rps: 500 } },
    { id: 'lb', kind: 'loadBalancer', name: 'Load Balancer', col: 3, row: 3, config: { targets: 3 } },
    { id: 'web', kind: 'appServers', name: 'Web Servers', col: 6, row: 3, config: { instances: 3, vcpu: 4, ramGb: 8 } },
    { id: 'cache', kind: 'cache', name: 'Product Cache', col: 9, row: 3, config: { hitRate: 0.6 } },
    { id: 'db', kind: 'database', name: 'Order Database', col: 12, row: 6, config: { vcpu: 4, ramGb: 16, poolSize: 20 } },
  ],
  connections: chain('client', 'lb', 'web', 'cache', 'db'),
}

export const STARTERS: Starter[] = [
  { design: LINK_SHORTENER, query: 'link', blurb: 'Read-heavy lookups behind a cache.', weak: 'The app tier saturates in a spike.' },
  { design: CHAT_APP, query: 'chat', blurb: 'A queue decouples messages from storage.', weak: 'The queue drains slower than a spike arrives.' },
  { design: VIDEO, query: 'video', blurb: 'A CDN cache absorbs most plays.', weak: 'A small origin struggles when the cache misses.' },
  { design: SHOP, query: 'shop', blurb: 'A busy web tier over an order database.', weak: 'A low cache hit rate pushes reads onto the database.' },
]
