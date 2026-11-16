import { CAPABILITIES } from '@/content/site'
import { Reveal } from './Reveal'
import { Container, SectionHead } from './ui'
import { Vignette } from './Vignettes'

export function Capabilities() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <Container>
        <Reveal><SectionHead eyebrow="What you can do" title="Everything is on one canvas." body="Traffic, saturation, failure and cost, shown on the objects themselves. Then the tools to understand what you see." /></Reveal>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((c, i) => (
            <li key={c.id}>
              <Reveal delay={(i % 3) * 60} className="h-full">
                <article className="panel-solid flex h-full flex-col overflow-hidden">
                  <div className="iso-grid h-[132px] border-b border-line/10 bg-bg"><Vignette id={c.id} /></div>
                  <div className="p-6">
                    <h3 className="text-[1.1rem] font-semibold tracking-tight">{c.title}</h3>
                    <p className="mt-2 text-[16px] leading-relaxed text-dim">{c.body}</p>
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
