import type { ReactNode } from 'react'
import { Art } from './iso/Art'
import type { DesignComponent } from '@/lib/iso'

/** Small illustrations for the capability cards. Same visual language as the app; SVG only, no JavaScript. */
const mono = { fontFamily: 'var(--font-mono)' } as const
const INK = 'var(--bp-line)'
const mix = (n: number) => `color-mix(in srgb, var(--bp-surface) ${Math.round((1 - n) * 100)}%, var(--bp-line))`

const comp = (kind: DesignComponent['kind'], config: Record<string, number>): DesignComponent => ({ id: kind, kind, name: kind, col: 0, row: 0, config })
const S = ({ x, y, k = 0.55, children }: { x: number; y: number; k?: number; children: ReactNode }) => <g transform={`translate(${x} ${y}) scale(${k})`}>{children}</g>

const VIGNETTES: Record<string, () => ReactNode> = {
  state: () => (
    <>
      <S x={58} y={92}><Art c={comp('appServers', { vcpu: 1 })} /></S>
      <S x={142} y={92}><Art c={comp('appServers', { vcpu: 4 })} /></S>
      <S x={226} y={92}><Art c={comp('appServers', { vcpu: 32 })} /></S>
      {['Lv 1', 'Lv 3', 'Lv 6'].map((t, i) => <text key={t} x={58 + i * 84} y={112} textAnchor="middle" fontSize={9} fill="var(--bp-text-dim)" {...mono}>{t}</text>)}
    </>
  ),
  break: () => (
    <>
      <polygon points="100,98 140,78 180,98 140,118" fill="var(--status-failed)" fillOpacity={0.14} stroke="var(--status-failed)" strokeWidth={1.5} />
      <S x={140} y={92}><Art c={comp('appServers', { vcpu: 4 })} /></S>
      <g>
        <rect x={104} y={6} width={72} height={16} rx={8} fill="var(--status-failed)" />
        <text x={140} y={17.5} textAnchor="middle" fontSize={8.5} letterSpacing={0.8} fill="#fff" {...mono}>BOTTLENECK</text>
      </g>
    </>
  ),
  why: () => (
    <g>
      <rect x={24} y={18} width={232} height={84} rx={8} fill="var(--bp-surface)" stroke={INK} strokeOpacity={0.2} />
      <circle cx={42} cy={36} r={8} fill="var(--status-failed)" fillOpacity={0.15} />
      <path d="M42 31v6M42 40v.5" stroke="var(--status-failed)" strokeWidth={1.6} strokeLinecap="round" />
      <text x={58} y={40} fontSize={11.5} fontWeight={600} fill="var(--bp-text)">App Servers is the bottleneck</text>
      <text x={36} y={60} fontSize={9.5} fill="var(--bp-text-dim)">Receiving 4,621 rps but can only</text>
      <text x={36} y={73} fontSize={9.5} fill="var(--bp-text-dim)">handle about 1,000 rps, so 78% of</text>
      <text x={36} y={86} fontSize={9.5} fill="var(--bp-text-dim)">requests are dropped.</text>
    </g>
  ),
  fixes: () => (
    <g {...mono}>
      <text x={24} y={30} fontSize={9.5} fill="var(--bp-text-dim)">Add 2 instances, enlarge cache</text>
      <rect x={24} y={40} width={150} height={10} rx={5} fill="var(--status-failed)" fillOpacity={0.85} />
      <text x={182} y={49} fontSize={10} fill="var(--bp-text-dim)">78%</text>
      <rect x={24} y={58} width={9} height={10} rx={5} fill="var(--status-healthy)" />
      <text x={182} y={67} fontSize={10} fill="var(--status-healthy)">0%</text>
      <rect x={24} y={82} width={96} height={22} rx={6} fill="var(--bp-accent)" fillOpacity={0.1} />
      <text x={72} y={97} textAnchor="middle" fontSize={10} fontWeight={500} fill="var(--bp-accent)">+$0.34/hr</text>
    </g>
  ),
  compare: () => (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 100H256M24 100V20" stroke={INK} strokeOpacity={0.15} />
      <path d="M24 98H86L100 30H168L182 98H256" stroke="var(--bp-text-dim)" strokeWidth={2} strokeDasharray="5 4" />
      <path d="M24 98H92L104 90H168L180 98H256" stroke="var(--bp-accent)" strokeWidth={2.4} />
      <text x={210} y={30} fontSize={9.5} fill="var(--bp-text-dim)" stroke="none" {...mono}>A</text>
      <text x={228} y={30} fontSize={9.5} fill="var(--bp-accent)" stroke="none" {...mono}>B</text>
    </g>
  ),
  capacity: () => (
    <g {...mono}>
      {[['App', 78, 'var(--status-strained)'], ['DB', 130, 'var(--status-healthy)'], ['LB', 190, 'var(--status-healthy)']].map(([n, w, c], i) => (
        <g key={n as string}>
          <text x={24} y={34 + i * 24} fontSize={9.5} fill="var(--bp-text-dim)">{n as string}</text>
          <rect x={52} y={26 + i * 24} width={190} height={8} rx={4} fill={mix(0.1)} />
          <rect x={52} y={26 + i * 24} width={w as number} height={8} rx={4} fill={c as string} />
        </g>
      ))}
      <line x1={52 + 31} y1={20} x2={52 + 31} y2={94} stroke={INK} strokeOpacity={0.45} />
      <text x={24} y={112} fontSize={10.5} fontWeight={500} fill="var(--bp-text)">1,000 rps · 1.67× today</text>
    </g>
  ),
  slo: () => (
    <g {...mono}>
      <text x={24} y={34} fontSize={9.5} fill="var(--bp-text-dim)">SLO</text>
      <text x={52} y={34} fontSize={14} fontWeight={500} fill="var(--status-failed)">33.0%</text>
      <rect x={24} y={46} width={232} height={10} rx={5} fill={mix(0.1)} />
      <rect x={24} y={46} width={232} height={10} rx={5} fill="var(--status-failed)" />
      <text x={24} y={76} fontSize={9.5} fill="var(--status-failed)">&gt;999% of the error budget used</text>
      <text x={24} y={94} fontSize={9.5} fill="var(--bp-text-dim)">p99 within target 43% of the time</text>
    </g>
  ),
  autoscale: () => (
    <g>
      {Array.from({ length: 8 }, (_, i) => {
        const x = 30 + (i % 4) * 58, y = 26 + Math.floor(i / 4) * 40
        if (i < 2) return <rect key={i} x={x} y={y} width={44} height={28} rx={5} fill={mix(0.2)} stroke={INK} strokeOpacity={0.8} />
        if (i < 5) return <rect key={i} x={x} y={y} width={44} height={28} rx={5} fill="var(--status-strained)" fillOpacity={0.25} stroke="var(--status-strained)" style={{ animation: `cs-pulse 1.6s ease-in-out ${(i - 2) * 0.2}s infinite` }} />
        return <rect key={i} x={x} y={y} width={44} height={28} rx={5} fill="none" stroke={INK} strokeOpacity={0.3} strokeDasharray="4 3" />
      })}
    </g>
  ),
  trace: () => (
    <g fill="none">
      <path d="M32 70H96L150 40H212" stroke={INK} strokeOpacity={0.4} strokeWidth={1.5} id="vtrace" />
      {[[32, 70], [96, 70], [150, 40]].map(([x, y]) => <circle key={x} cx={x} cy={y} r={5} fill="var(--bp-surface)" stroke={INK} strokeOpacity={0.7} />)}
      <circle cx={212} cy={40} r={9} fill="var(--status-healthy)" />
      <path d="M208 40l3 3 5-6" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <circle r={5} fill="var(--bp-accent)" stroke="#fff" strokeWidth={1.6}><animateMotion dur="3s" repeatCount="indefinite" path="M32 70H96L150 40H212" /></circle>
      <text x={24} y={104} fontSize={9.5} fill="var(--bp-text-dim)" {...mono}>completed in 73 ms</text>
    </g>
  ),
  rewind: () => (
    <g>
      <polygon points="24,86 24,86 96,86 104,40 150,36 168,86 256,86 256,92 24,92" fill="var(--status-failed)" fillOpacity={0.16} />
      <line x1={102} y1={34} x2={102} y2={92} stroke="var(--status-failed)" />
      <rect x={24} y={60} width={232} height={4} rx={2} fill={mix(0.12)} transform="translate(0 34)" />
      <circle cx={70} cy={96} r={7} fill="var(--bp-accent)" stroke="#fff" strokeWidth={2} />
      <text x={24} y={112} fontSize={9.5} fill="var(--bp-text-dim)" {...mono}>−33.0 s · before it broke</text>
    </g>
  ),
}

export function Vignette({ id }: { id: string }) {
  const draw = VIGNETTES[id]
  return (
    <svg viewBox="0 0 280 124" className="block h-full w-full" aria-hidden>
      <style>{`@keyframes cs-pulse{0%,100%{fill-opacity:.12}50%{fill-opacity:.42}}@media (prefers-reduced-motion: reduce){rect{animation:none!important}}`}</style>
      {draw?.()}
    </svg>
  )
}
