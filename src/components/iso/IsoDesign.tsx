import type { ReactNode } from 'react'
import { Art } from './Art'
import { frameOf, gridToScreen, pathD, route, type Design, type DesignComponent, type Pt } from '@/lib/iso'

export type Status = 'healthy' | 'strained' | 'failed'
const STATUS = { healthy: 'var(--status-healthy)', strained: 'var(--status-strained)', failed: 'var(--status-failed)' } as const

/** The ring under a component, tinted by its health. Colour means state here exactly as it does in the app. */
function Ground({ c, status }: { c: DesignComponent; status: Status }) {
  const a = gridToScreen(c.col + 0.1, c.row + 0.1), b = gridToScreen(c.col + 1.9, c.row + 0.1), d = gridToScreen(c.col + 1.9, c.row + 1.9), e = gridToScreen(c.col + 0.1, c.row + 1.9)
  const col = STATUS[status]
  return <polygon points={[a, b, d, e].map((p) => `${p.x},${p.y}`).join(' ')} fill={col} fillOpacity={status === 'failed' ? 0.14 : 0.05} stroke={col} strokeOpacity={status === 'healthy' ? 0.35 : 0.8} strokeWidth={1.5} />
}

function Connection({ pts, delay = 0, packets = true, rate = 1 }: { pts: Pt[]; delay?: number; packets?: boolean; rate?: number }) {
  const d = pathD(pts)
  const end = pts[2], prev = pts[1].x === end.x && pts[1].y === end.y ? pts[0] : pts[1]
  const ang = Math.atan2(end.y - prev.y, end.x - prev.x)
  const tip = { x: end.x - Math.cos(ang) * 40, y: end.y - Math.sin(ang) * 20 }
  const tri = [tip, { x: tip.x - Math.cos(ang - 0.5) * 8, y: tip.y - Math.sin(ang - 0.5) * 8 }, { x: tip.x - Math.cos(ang + 0.5) * 8, y: tip.y - Math.sin(ang + 0.5) * 8 }]
  return (
    <g>
      <path d={d} fill="none" stroke="var(--bp-line)" strokeOpacity={0.07} strokeWidth={4} strokeLinejoin="round" />
      <path d={d} fill="none" stroke="var(--bp-line)" strokeOpacity={0.55} strokeWidth={1} strokeLinejoin="round" />
      <polygon points={tri.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')} fill="var(--bp-line)" fillOpacity={0.7} />
      {packets && [0, 1, 2].map((i) => (
        <circle key={i} r={2.2} fill="var(--bp-accent)" fillOpacity={0.95}>
          <animateMotion dur={`${(3.4 / rate).toFixed(2)}s`} begin={`${(delay + i * (1.13 / rate)).toFixed(2)}s`} repeatCount="indefinite" path={d} />
        </circle>
      ))}
    </g>
  )
}

/**
 * A whole design as an SVG: grid-aligned components, connections, flowing packets, and names. Server-rendered,
 * so it is in the HTML. Packets use SVG animation, which costs no JavaScript.
 */
export function IsoDesign({
  design, status = {}, packets = true, labels = true, stats = {}, className, overlay, frame, title,
}: {
  design: Design
  status?: Record<string, Status>
  packets?: boolean
  labels?: boolean
  /** Small line under each name, e.g. "60%". */
  stats?: Record<string, string>
  className?: string
  /** Extra SVG drawn on top, in the design's coordinate space. */
  overlay?: ReactNode
  frame?: { x: number; y: number; w: number; h: number }
  title?: string
}) {
  const f = frame ?? frameOf(design.components)
  const byId = new Map(design.components.map((c) => [c.id, c]))
  const sorted = [...design.components].sort((a, b) => a.col + a.row - (b.col + b.row))
  return (
    <svg viewBox={`${f.x} ${f.y} ${f.w} ${f.h}`} className={className} role="img" aria-label={title ?? `${design.name}: ${design.components.map((c) => c.name).join(', ')}`} xmlns="http://www.w3.org/2000/svg">
      {design.connections.map((cn, i) => {
        const a = byId.get(cn.from), b = byId.get(cn.to)
        return a && b ? <Connection key={i} pts={route(a, b)} delay={i * 0.45} packets={packets} /> : null
      })}
      {sorted.map((c) => {
        const base = gridToScreen(c.col + 1, c.row + 2)
        return (
          <g key={c.id}>
            <Ground c={c} status={status[c.id] ?? 'healthy'} />
            <Art c={c} />
            {labels && (
              <g textAnchor="middle" fontFamily="var(--font-mono)">
                <text x={base.x} y={base.y + 16} fontSize={10} letterSpacing={1} fill="var(--bp-text-dim)">{c.name.toUpperCase()}</text>
                {stats[c.id] && <text x={base.x} y={base.y + 28} fontSize={8} letterSpacing={0.4} fill={status[c.id] && status[c.id] !== 'healthy' ? STATUS[status[c.id]] : 'var(--bp-text-dim)'}>{stats[c.id]}</text>}
              </g>
            )}
          </g>
        )
      })}
      {overlay}
    </svg>
  )
}
