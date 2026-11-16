'use client'

import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { LINK_SHORTENER } from '@/content/designs'
import { frameOf, gridToScreen } from '@/lib/iso'
import { IsoDesign } from './iso/IsoDesign'
import { Container, SectionHead } from './ui'

/**
 * An animated, SVG-only walkthrough of the real app: the scene plays itself, brisk and eased, then holds its final state.
 * Each scene is data (timed appearances). A tiny compiler turns the timings into CSS
 * keyframes, so playback is pure CSS (transform and opacity only); React only picks the scene.
 */
const D = 4.6 // seconds per scene
const K = 0.52 // speeds every timing up; a scene is brisk, then holds its final state
const STATUS = { healthy: 'var(--status-healthy)', strained: 'var(--status-strained)', failed: 'var(--status-failed)' }
type St = keyof typeof STATUS

const base = frameOf(LINK_SHORTENER.components, 20)
const W = 1.72
const FRAME = { x: base.x - Math.max(0, (base.h * W - base.w) / 2), y: base.y, w: Math.max(base.w, base.h * W), h: Math.max(base.h, base.w / W) }
const P = (id: string) => { const c = LINK_SHORTENER.components.find((k) => k.id === id)!; return gridToScreen(c.col + 1, c.row + 1) }
const U = FRAME.w / 760 // one "UI pixel"

interface Scene { title: string; body: string; render: (fx: Fx) => ReactNode }
type Fx = (from: number, to?: number) => string

const pct = (t: number) => `${(((t * K) / D) * 100).toFixed(2)}%`

function Ground({ id, st, fx, from, to }: { id: string; st: St; fx: Fx; from: number; to?: number }) {
  const c = LINK_SHORTENER.components.find((k) => k.id === id)!
  const pts = [[0.1, 0.1], [1.9, 0.1], [1.9, 1.9], [0.1, 1.9]].map(([a, b]) => gridToScreen(c.col + a, c.row + b)).map((p) => `${p.x},${p.y}`).join(' ')
  return <polygon className={fx(from, to)} points={pts} fill={STATUS[st]} fillOpacity={st === 'failed' ? 0.16 : 0.1} stroke={STATUS[st]} strokeWidth={1.6} />
}

function Chip({ x, y, w, children, tone = 'var(--bp-line)', fx, from, to }: { x: number; y: number; w: number; children: ReactNode; tone?: string; fx: Fx; from: number; to?: number }) {
  return (
    <g className={fx(from, to)} transform={`translate(${x} ${y})`}>
      <rect width={w * U} height={26 * U} rx={0} fill="var(--bp-surface)" stroke={tone} strokeOpacity={0.5} />
      <text x={w * U / 2} y={17.5 * U} textAnchor="middle" fontSize={11.5 * U} fill={tone} style={{ fontFamily: 'var(--font-mono)' }}>{children}</text>
    </g>
  )
}

function Card({ x, y, w, h, fx, from, to, children }: { x: number; y: number; w: number; h: number; fx: Fx; from: number; to?: number; children: ReactNode }) {
  return (
    <g className={fx(from, to)} transform={`translate(${x} ${y})`}>
      <rect width={w * U} height={h * U} rx={0} fill="var(--bp-surface)" stroke="var(--bp-line)" strokeOpacity={0.25} />
      {children}
    </g>
  )
}
const T = ({ x, y, s = 12, w = 400, fill = 'var(--bp-text)', mono, children }: { x: number; y: number; s?: number; w?: number; fill?: string; mono?: boolean; children: ReactNode }) =>
  <text x={x * U} y={y * U} fontSize={s * U} fontWeight={w} fill={fill} style={mono ? { fontFamily: 'var(--font-mono)' } : undefined}>{children}</text>

const left = FRAME.x + 18 * U, top = FRAME.y + 14 * U
const app = P('app'), db = P('db'), cache = P('cache'), lb = P('lb')

const SCENES: Scene[] = [
  {
    title: 'Open a design', body: 'Start from a design that already has a weak point, or draw your own on the grid.',
    render: (fx) => (<>
      <Chip x={left} y={top} w={160} fx={fx} from={0}>Link Shortener ▾</Chip>
      <Ground id="app" st="healthy" fx={fx} from={2.6} />
      <Chip x={FRAME.x + FRAME.w - 190 * U} y={top} w={170} tone="var(--status-healthy)" fx={fx} from={2.8}>live · all healthy</Chip>
    </>),
  },
  {
    title: 'Break it', body: 'Run a one-click scenario: a traffic spike, a failed node, a slow database.',
    render: (fx) => (<>
      <Chip x={FRAME.x + FRAME.w - 220 * U} y={top} w={200} fx={fx} from={0}>Scenario: traffic ×5</Chip>
      <Ground id="app" st="failed" fx={fx} from={2.6} />
      <Ground id="cache" st="strained" fx={fx} from={3.4} />
      <Ground id="db" st="strained" fx={fx} from={3.8} />
      <Chip x={left} y={top} w={130} tone="var(--status-failed)" fx={fx} from={3.4}>ERR 78.4%</Chip>
      <Chip x={left + 140 * U} y={top} w={130} tone="var(--status-failed)" fx={fx} from={3.6}>P99 13.3 s</Chip>
    </>),
  },
  {
    title: 'Understand it', body: 'Hover the red component. A plain sentence names the bottleneck and the cause.',
    render: (fx) => (<>
      <Ground id="app" st="failed" fx={fx} from={0} />
      <Card x={app.x + 46 * U} y={app.y - 120 * U} w={250} h={104} fx={fx} from={2.2}>
        <T x={14} y={26} s={13} w={600}>App Servers is the bottleneck</T>
        <T x={14} y={50} s={11.5} fill="var(--bp-text-dim)">Receiving 4,621 rps but it can handle</T>
        <T x={14} y={66} s={11.5} fill="var(--bp-text-dim)">about 1,000 rps, so 78% of requests</T>
        <T x={14} y={82} s={11.5} fill="var(--bp-text-dim)">are dropped.</T>
      </Card>
    </>),
  },
  {
    title: 'Fix it', body: 'Scale the component up, add an instance, and watch the error rate fall in real time.',
    render: (fx) => (<>
      <Ground id="app" st="failed" fx={fx} from={0} to={3.6} />
      <Ground id="app" st="healthy" fx={fx} from={3.6} />
      <Card x={app.x + 64 * U} y={app.y + 10 * U} w={176} h={64} fx={fx} from={0}>
        <T x={14} y={24} s={12} w={600}>App Servers</T>
        <T x={14} y={46} s={11.5} fill="var(--bp-text-dim)">Instances</T>
        <rect x={108 * U} y={32 * U} width={54 * U} height={22 * U} rx={0} fill="var(--bp-accent)" fillOpacity={0.12} />
        <T x={120} y={48} s={13} w={600} fill="var(--bp-accent)">+ 2 → 4</T>
      </Card>
      <Chip x={left} y={top} w={150} tone="var(--status-healthy)" fx={fx} from={3.8}>ERR 78% → 5%</Chip>
    </>),
  },
  {
    title: 'Compare two designs', body: 'Keep the version you like. Compare cost and failure side by side before you commit.',
    render: (fx) => {
      const x0 = FRAME.x + FRAME.w * 0.2, y0 = FRAME.y + FRAME.h * 0.22
      return (
        <Card x={x0} y={y0} w={460} h={200} fx={fx} from={0.6}>
          <T x={20} y={32} s={12} fill="var(--bp-text-dim)" mono>BEFORE → AFTER</T>
          {[['Error rate', 78, 5, '78% → 5%'], ['p99 latency', 100, 8, '13.3 s → 0.4 s'], ['Cost', 40, 62, '$0.82 → $1.16 /hr']].map(([l, a, b, t], i) => (
            <g key={l as string}>
              <T x={20} y={66 + i * 46} s={12.5} w={500}>{l as string}</T>
              <T x={300} y={66 + i * 46} s={12} fill="var(--bp-text-dim)" mono>{t as string}</T>
              <rect x={20 * U} y={(74 + i * 46) * U} width={420 * U} height={7 * U} rx={0} fill="var(--bp-line)" fillOpacity={0.1} />
              <rect className={fx(1.4 + i * 0.3)} x={20 * U} y={(74 + i * 46) * U} width={4.2 * (a as number) * U} height={7 * U} rx={0} fill="var(--status-failed)" fillOpacity={0.4} />
              <rect className={fx(2.6 + i * 0.3)} x={20 * U} y={(74 + i * 46) * U} width={4.2 * (b as number) * U} height={7 * U} rx={0} fill="var(--bp-accent)" />
            </g>
          ))}
        </Card>
      )
    },
  },
  {
    title: 'Find the limit', body: 'One button finds the traffic level where it breaks and which component gives out first.',
    render: (fx) => (<>
      <Chip x={left} y={top} w={150} fx={fx} from={0}>Find capacity</Chip>
      <Ground id="app" st="strained" fx={fx} from={4.4} />
      <Card x={app.x + 46 * U} y={app.y - 110 * U} w={230} h={92} fx={fx} from={4.2}>
        <T x={14} y={26} s={11} fill="var(--bp-text-dim)" mono>BREAKS AT</T>
        <T x={14} y={56} s={26} w={500} mono>1,000 rps</T>
        <T x={14} y={78} s={11.5} fill="var(--bp-text-dim)">1.67× today · App Servers first</T>
      </Card>
    </>),
  },
]

/** Builds the keyframes for every appearance, once per scene. */
function compile(scene: Scene) {
  const rules = new Map<string, string>()
  const fx: Fx = (from, to) => {
    const name = `wt-${String(from).replace('.', '_')}-${to === undefined ? 'x' : String(to).replace('.', '_')}`
    if (!rules.has(name)) {
      const a = pct(from), b = pct(from + 0.3)
      const out = to === undefined ? '' : `${pct(to)}{opacity:1}${pct(to + 0.3)}{opacity:0}`
      rules.set(name, `@keyframes ${name}{0%,${a}{opacity:0}${b}{opacity:1}${out}100%{opacity:${to === undefined ? 1 : 0}}}.${name}{opacity:0;animation:${name} ${D}s cubic-bezier(.22,1,.36,1) both}`)
    }
    return name
  }
  const body = scene.render(fx)
  return { body, css: [...rules.values()].join('') }
}

export function Walkthrough() {
  const [i, setI] = useState(0)
  const [seen, setSeen] = useState(false)
  const [reduced, setReduced] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.35 })
    if (root.current) io.observe(root.current)
    const fromHash = () => { const m = /^#how-it-works-(\d)$/.exec(location.hash); if (m) setI(Math.min(5, Math.max(0, Number(m[1]) - 1))) }
    fromHash(); addEventListener('hashchange', fromHash)
    return () => { io.disconnect(); removeEventListener('hashchange', fromHash) }
  }, [])

  useEffect(() => {
    if (!seen || reduced) return
    timer.current = setTimeout(() => setI((n) => (n + 1) % SCENES.length), (D + 1) * 1000)
    return () => clearTimeout(timer.current)
  }, [i, seen, reduced])

  const scene = SCENES[i]
  const { body, css } = useMemo(() => compile(scene), [scene])

  return (
    <section id="how-it-works" ref={root} className="py-20 sm:py-28">
      <Container>
        <SectionHead title="Open it, break it, understand it, fix it." body="This is the real workflow, six steps long. Nothing here is a mock-up of a feature that does not exist." />
        <div className="mt-12 grid gap-8 lg:grid-cols-[320px_1fr]">
          <ol className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible" aria-label="Walkthrough steps">
            {SCENES.map((s, n) => (
              <li key={s.title} className="shrink-0 lg:shrink">
                <a href={`#how-it-works-${n + 1}`} onClick={(e) => { e.preventDefault(); setI(n) }} aria-current={n === i ? 'step' : undefined}
                  className={`block border p-4 transition-colors duration-[var(--dur-base)] ${n === i ? 'border-accent/40 bg-surface' : 'border-transparent hover:bg-surface/70'}`}>
                  <span className="flex items-center gap-3">
                    <span className={`data grid size-6 place-items-center text-[12px] ${n === i ? 'bg-accent text-white' : 'bg-line/10 text-dim'}`}>{n + 1}</span>
                    <span className="font-medium">{s.title}</span>
                  </span>
                  {n === i && <span className="mt-2 hidden pl-9 text-[15px] leading-relaxed text-dim lg:block">{s.body}</span>}
                </a>
              </li>
            ))}
          </ol>
          <div>
            <div className="panel-solid iso-grid overflow-hidden">
              <div className="relative" style={{ aspectRatio: `${FRAME.w} / ${FRAME.h}` }}>
                <IsoDesign design={LINK_SHORTENER} frame={FRAME} labels packets className="absolute inset-0 h-full w-full" title="Animated walkthrough of CloudSim: it opens a design, runs a traffic spike, reads the bottleneck, scales it up and finds the capacity limit." />
                <svg key={i} viewBox={`${FRAME.x} ${FRAME.y} ${FRAME.w} ${FRAME.h}`} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
                  <style>{css + `@media (prefers-reduced-motion: reduce){[class^="wt-"]{animation:none!important;opacity:1!important}}`}</style>
                  {body}
                </svg>
              </div>
            </div>
            <p className="mt-4 text-[16px] leading-relaxed text-dim lg:hidden"><strong className="font-medium text-text">{scene.title}.</strong> {scene.body}</p>
          </div>
        </div>
      </Container>
    </section>
  )
}
