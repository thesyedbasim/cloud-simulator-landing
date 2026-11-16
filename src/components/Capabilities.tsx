import { CAPABILITIES } from '@/content/site'
import { Reveal } from './Reveal'
import { Container, SectionHead } from './ui'
import { Vignette } from './Vignettes'

/** Column spans on the 6-column desktop grid: 4+2, 2+2+2, 3+3, 2+2+2. One canvas, varied tiles. */
const SPAN = ['lg:col-span-4', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-3', 'lg:col-span-3', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2']

export function Capabilities() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <Container>
        <Reveal><SectionHead title="Everything is on one canvas." body="Traffic, saturation, failure and cost, shown on the objects themselves. Then the tools to understand what you see." /></Reveal>
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
          {CAPABILITIES.map((c, i) => (
            <li key={c.id} className={SPAN[i] ?? 'lg:col-span-2'}>
              <Reveal delay={(i % 3) * 50} className="h-full">
                <article className="bento panel-solid group flex h-full flex-col overflow-hidden transition-[border-color] duration-[var(--dur-base)] ease-[var(--ease-out)] hover:border-accent/30 ">
                  <div className="iso-grid min-h-[168px] flex flex-1 items-center border-b border-line/10 bg-bg p-3"><Vignette id={c.id} /></div>
                  <div className="overflow-hidden p-5 transition-[height] duration-[var(--dur-slow)] ease-[var(--ease-out)] sm:h-[196px] sm:group-hover:h-[172px]">
                    <h3 className="text-[1.1rem] font-semibold tracking-tight">{c.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-dim">{c.body}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
