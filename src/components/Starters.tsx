import { ArrowUpRight } from 'lucide-react'
import { STARTERS } from '@/content/designs'
import { SITE } from '@/content/site'
import { IsoDesign } from './iso/IsoDesign'
import { Reveal } from './Reveal'
import { Container, SectionHead } from './ui'

export function Starters() {
  return (
    <section id="starters" className="border-y border-line/10 bg-surface/60 py-20 sm:py-24">
      <Container>
        <Reveal><SectionHead eyebrow="Starter designs" title="Four designs, each with a weak point to find." body="Open one and run a scenario. The first run always teaches something." /></Reveal>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {STARTERS.map((s, i) => (
            <li key={s.query}>
              <Reveal delay={(i % 2) * 70} className="h-full">
                <a href={`${SITE.appUrl}/?design=${s.query}`} className="group panel-solid flex h-full flex-col overflow-hidden transition-[transform,box-shadow,border-color] duration-[var(--dur-base)] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_14px_30px_-18px_color-mix(in_srgb,var(--bp-line)_55%,transparent)]">
                  <div className="iso-grid border-b border-line/10 bg-bg px-2 py-3">
                    <IsoDesign design={s.design} packets={false} labels={false} className="mx-auto block h-[200px] w-full" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="flex items-center justify-between text-[1.15rem] font-semibold tracking-tight">{s.design.name}<ArrowUpRight size={18} className="text-dim transition-colors group-hover:text-accent" aria-hidden /></h3>
                    <p className="mt-1 text-[16px] text-dim">{s.blurb}</p>
                    <p className="mt-4 text-[15px]"><span className="label mr-2 !text-strained">Weak point</span>{s.weak}</p>
                  </div>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
