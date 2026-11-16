import { BookOpen, Flame, Gauge, GitCompare, ShieldCheck, Target, ArrowRight } from 'lucide-react'
import { USE_CASES } from '@/content/site'
import { Reveal } from './Reveal'
import { Container, SectionHead } from './ui'

const ICONS = { target: Target, shield: ShieldCheck, compare: GitCompare, book: BookOpen, flame: Flame, gauge: Gauge } as const

export function UseCases() {
  return (
    <section id="use-cases" className="border-y border-line/10 bg-surface/60 py-20 sm:py-24">
      <Container>
        <Reveal><SectionHead title="Diagrams show what is connected. CloudSim shows how it behaves." body="A design with a load balancer, a cache and a replica looks resilient until real traffic exposes a slow query, an exhausted connection pool or a retry storm. Here is what that is useful for." /></Reveal>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((u, i) => {
            const Icon = ICONS[u.icon]
            return (
              <li key={u.id}>
                <Reveal delay={i * 50} className="h-full">
                  <a href={`#how-it-works-${u.scene}`} className="group panel-solid flex h-full flex-col p-6 transition-[transform,box-shadow,border-color] duration-[var(--dur-base)] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_14px_30px_-18px_color-mix(in_srgb,var(--bp-line)_55%,transparent)]">
                    <span className="grid size-10 place-items-center rounded-[8px] bg-accent/10 text-accent"><Icon size={20} strokeWidth={1.75} aria-hidden /></span>
                    <h3 className="mt-5 text-[1.15rem] font-semibold leading-snug tracking-tight">{u.title}</h3>
                    <p className="mt-2 flex-1 text-[16px] leading-relaxed text-dim">{u.story}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-medium text-accent">See it <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" aria-hidden /></span>
                  </a>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
