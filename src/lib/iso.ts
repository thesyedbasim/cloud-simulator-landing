/** Isometric 2:1 projection: the same maths as the app's canvas (diamonds 64 wide, 32 tall). */
export const TILE_W = 64
export const TILE_H = 32

export interface Pt { x: number; y: number }

export const gridToScreen = (col: number, row: number, lift = 0): Pt => ({ x: ((col - row) * TILE_W) / 2, y: ((col + row) * TILE_H) / 2 - lift })

/** Upgrade levels, same rules as the app (app/src/canvas/tier.ts), so the art matches what the product draws. */
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
export const cpuLevel = (vcpu: number) => clamp(Math.round(Math.log2(Math.max(1, vcpu))) + 1, 1, 6)
export const cacheLevel = (hit: number) => clamp(1 + Math.floor((hit - 0.5) / 0.15 + 1e-9), 1, 4)
export const balancerLevel = (targets: number) => (targets <= 2 ? 1 : targets <= 4 ? 2 : 3)
export const queueCrates = (drain: number) => clamp(Math.round(Math.log2(Math.max(50, drain) / 50)) + 1, 2, 7)
export const clientMonitors = (rps: number) => 1 + (rps > 150 ? 1 : 0) + (rps > 600 ? 1 : 0) + (rps > 1500 ? 1 : 0)

export type Kind = 'client' | 'loadBalancer' | 'appServers' | 'database' | 'cache' | 'queue'

export interface DesignComponent {
  id: string
  kind: Kind
  name: string
  col: number
  row: number
  config: Record<string, number>
}
export interface DesignConnection { from: string; to: string }
export interface Design { id: string; name: string; components: DesignComponent[]; connections: DesignConnection[] }

/** Route between two components: along columns, then along rows (the app's L-shaped connections). */
export function route(a: DesignComponent, b: DesignComponent): Pt[] {
  return [gridToScreen(a.col + 1, a.row + 1), gridToScreen(b.col + 1, a.row + 1), gridToScreen(b.col + 1, b.row + 1)]
}

export const pathD = (pts: Pt[]) => pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')

/** Rough drawn height of a component, for sizing the viewBox. */
export function heightOf(c: DesignComponent): number {
  const cfg = c.config
  switch (c.kind) {
    case 'appServers': return (cpuLevel(cfg.vcpu ?? 4) - 1) * 15 + 12 + (cpuLevel(cfg.vcpu ?? 4) >= 5 ? 22 : 0)
    case 'database': return 24 + (cpuLevel(cfg.vcpu ?? 4) - 1) * 14 + 14
    case 'cache': return 10 + (cacheLevel(cfg.hitRate ?? 0.8) - 1) * 12 + 2
    case 'loadBalancer': return 10 + (balancerLevel(cfg.targets ?? 2) - 1) * 8 + 10
    case 'queue': return 20
    case 'client': return 26
  }
}

/** A viewBox that frames every component, with room for names underneath. */
export function frameOf(components: DesignComponent[], pad = 36): { x: number; y: number; w: number; h: number } {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity
  for (const c of components) {
    for (const [dc, dr] of [[0, 0], [2, 0], [2, 2], [0, 2]]) {
      const p = gridToScreen(c.col + dc, c.row + dr)
      x0 = Math.min(x0, p.x); x1 = Math.max(x1, p.x)
      y0 = Math.min(y0, p.y - heightOf(c)); y1 = Math.max(y1, p.y + 34)
    }
  }
  return { x: x0 - pad, y: y0 - pad, w: x1 - x0 + pad * 2, h: y1 - y0 + pad * 2 }
}
