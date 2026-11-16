import type { ReactNode } from 'react'
import { balancerLevel, cacheLevel, clientMonitors, cpuLevel, gridToScreen, queueCrates, type DesignComponent, type Pt } from '@/lib/iso'

/*
 * The app's components, drawn as server-rendered SVG. Faces are opaque (a blend of the paper colour and the ink
 * colour) so nothing shows through, exactly like the app. Everything references the design tokens.
 */

const INK = 'var(--bp-line)'
const ACCENT = 'var(--bp-accent)'
/** An opaque tint: `n` of the ink colour over the paper-white surface. */
const mix = (n: number) => `color-mix(in srgb, var(--bp-surface) ${Math.round((1 - n) * 100)}%, var(--bp-line))`
const lineProps = { stroke: INK, strokeOpacity: 0.85, strokeWidth: 1, strokeLinejoin: 'round' as const }

const poly = (pts: Pt[]) => pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')

export function Box({ col, row, w, d, h, lift = 0, tint = 0.18 }: { col: number; row: number; w: number; d: number; h: number; lift?: number; tint?: number }) {
  const t = gridToScreen(col, row, lift), r = gridToScreen(col + w, row, lift), b = gridToScreen(col + w, row + d, lift), l = gridToScreen(col, row + d, lift)
  const up = (p: Pt): Pt => ({ x: p.x, y: p.y - h })
  return (
    <g>
      <polygon points={poly([l, b, up(b), up(l)])} fill={mix(tint * 0.9)} {...lineProps} />
      <polygon points={poly([b, r, up(r), up(b)])} fill={mix(tint * 1.5)} {...lineProps} />
      <polygon points={poly([up(t), up(r), up(b), up(l)])} fill={mix(tint * 0.35)} {...lineProps} strokeOpacity={1} />
    </g>
  )
}

export function Tube({ pts, width = 4 }: { pts: Pt[]; width?: number }) {
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} stroke={INK} strokeOpacity={0.9} strokeWidth={width + 2.2} />
      <path d={d} stroke={mix(0.3)} strokeWidth={width} />
    </g>
  )
}

export function Cylinder({ cx, cy, rx, ry, ht, bands = [], ring = false }: { cx: number; cy: number; rx: number; ry: number; ht: number; bands?: number[]; ring?: boolean }) {
  const front = (lift: number) => `M${cx - rx} ${cy - lift} A${rx} ${ry} 0 0 0 ${cx + rx} ${cy - lift}`
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={mix(0.16)} {...lineProps} />
      <rect x={cx - rx} y={cy - ht} width={rx * 2} height={ht} fill={mix(0.16)} />
      <line x1={cx - rx} y1={cy} x2={cx - rx} y2={cy - ht} {...lineProps} />
      <line x1={cx + rx} y1={cy} x2={cx + rx} y2={cy - ht} {...lineProps} />
      <path d={front(0)} fill="none" {...lineProps} />
      {bands.map((b) => <path key={b} d={front(b)} fill="none" stroke={INK} strokeOpacity={0.5} strokeWidth={1} />)}
      <ellipse cx={cx} cy={cy - ht} rx={rx} ry={ry} fill={mix(0.06)} stroke={INK} strokeWidth={1} />
      {ring && <ellipse cx={cx} cy={cy - ht} rx={rx * 0.55} ry={ry * 0.55} fill="none" stroke={ACCENT} strokeWidth={1.5} />}
    </g>
  )
}

/** One component, drawn at its upgrade level. */
export function Art({ c }: { c: DesignComponent }): ReactNode {
  const { col, row, config: cfg } = c
  const x = col + 0.25, y = row + 0.25
  switch (c.kind) {
    case 'client': {
      const n = clientMonitors(cfg.rps ?? 500)
      const s = n === 1 ? 0.6 : n === 2 ? 0.46 : 0.34
      const step = s + 0.08
      const x0 = col + 0.3 + (1.4 - (n * step - 0.08)) / 2
      const y0 = row + 0.3 + (1.4 - s) / 2
      return (
        <g>
          <Box col={col + 0.3} row={row + 0.3} w={1.4} d={1.4} h={4} tint={0.1} />
          {Array.from({ length: n }, (_, i) => <Box key={i} col={x0 + i * step} row={y0} w={s} d={s} h={n === 1 ? 22 : n === 2 ? 20 : 18} lift={4} tint={0.2} />)}
        </g>
      )
    }
    case 'loadBalancer': {
      // a distribution hub: one pipe in, a round hub, one pipe out per target
      const L = balancerLevel(cfg.targets ?? 2)
      const arms = Math.min(6, cfg.targets ?? 2)
      const lift = 5
      const hub = gridToScreen(col + 0.8, row + 1)
      const inlet = gridToScreen(col + 0.1, row + 1)
      return (
        <g>
          <Tube pts={[{ x: inlet.x, y: inlet.y - lift }, { x: hub.x, y: hub.y - lift }]} />
          {Array.from({ length: arms }, (_, i) => {
            const end = gridToScreen(col + 1.85, row + 0.3 + (arms === 1 ? 0.7 : (i / (arms - 1)) * 1.4))
            return <Tube key={i} pts={[{ x: hub.x, y: hub.y - lift }, { x: end.x, y: end.y - lift }]} />
          })}
          <Cylinder cx={hub.x} cy={hub.y} rx={14} ry={7} ht={10 + (L - 1) * 8} />
        </g>
      )
    }
    case 'appServers': {
      const L = cpuLevel(cfg.vcpu ?? 4)
      const z = (L - 1) * 15 + 12
      const p = gridToScreen(x + 1.1, y + 0.4)
      return (
        <g>
          {Array.from({ length: L }, (_, i) => <Box key={i} col={x} row={y} w={1.5} d={1.5} h={12} lift={i * 15} tint={0.16} />)}
          {L >= 5 && (
            <g>
              <line x1={p.x} y1={p.y - z} x2={p.x} y2={p.y - z - 12 - (L - 5) * 5} stroke={ACCENT} strokeWidth={1.5} />
              <circle cx={p.x} cy={p.y - z - 12 - (L - 5) * 5} r={2.4} fill={ACCENT} />
            </g>
          )}
        </g>
      )
    }
    case 'database': {
      const L = cpuLevel(cfg.vcpu ?? 4)
      const ht = 24 + (L - 1) * 14
      const bands: number[] = []
      for (let lift = 12; lift < ht; lift += 14) bands.push(lift)
      const g = gridToScreen(col + 1, row + 1)
      return <Cylinder cx={g.x} cy={g.y} rx={25.6} ry={12.8} ht={ht} bands={bands} ring={L >= 5} />
    }
    case 'cache': {
      const L = cacheLevel(cfg.hitRate ?? 0.8)
      return (
        <g>
          <Box col={col + 0.2} row={row + 0.3} w={1.6} d={1.4} h={6} tint={0.12} />
          {Array.from({ length: L - 1 }, (_, k) => <Box key={k} col={col + 0.2} row={row + 0.3} w={1.6} d={1.4} h={2} lift={10 + k * 12} tint={0.1} />)}
        </g>
      )
    }
    case 'queue': {
      const n = queueCrates(cfg.capacity ?? 400)
      const step = Math.min(0.4, 1.7 / n)
      return <g>{Array.from({ length: n }, (_, i) => <Box key={i} col={col + 0.15 + i * step} row={row + 0.7} w={step * 0.88} d={0.6} h={5 + Math.min(i, 5) * 2} tint={0.18} />)}</g>
    }
  }
}
