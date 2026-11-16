import { ArrowUpRight } from 'lucide-react'
import { HONESTY, SITE } from '@/content/site'
import { Reveal } from './Reveal'
import { Container, SectionHead } from './ui'

export function Honesty() {
  return (
    <section id="model" className="py-20 sm:py-28">
      <Container>
        <Reveal><SectionHead eyebrow="How honest is it?" title="Simplified on purpose, and it shows its work." body="A model you cannot inspect is a model you should not trust. Everything CloudSim assumes is written down." /></Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <ul className="grid gap-5 sm:grid-cols-2">
            {HONESTY.map((h, i) => (
              <li key={h.title}>
                <Reveal delay={i * 60} className="h-full">
                  <article className="panel-solid h-full p-6">
                    <h3 className="text-[1.1rem] font-semibold tracking-tight">{h.title}</h3>
                    <p className="mt-2 text-[16px] leading-relaxed text-dim">{h.body}</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal delay={120} className="h-full">
            <aside className="panel-solid flex h-full flex-col p-6" aria-label="How a number is computed">
              <p className="label">How a number is computed</p>
              <pre className="data mt-4 flex-1 overflow-x-auto whitespace-pre-wrap rounded-[8px] bg-bg p-4 text-[13px] leading-relaxed text-text"><code>{`latency   = base ÷ (1 − utilisation)

capacity  = min(CPU limit, RAM limit)

budget    = failed ÷ (requests × (1 − target))`}</code></pre>
              <p className="mt-4 text-[15px] text-dim">Capped at 50× base once a component saturates. Every rule and default is in the model write-up.</p>
              <a href={SITE.modelDoc} rel="noopener" className="mt-4 inline-flex items-center gap-1.5 text-[16px] font-medium text-accent underline-offset-4 hover:underline">Read the model <ArrowUpRight size={16} aria-hidden /></a>
            </aside>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
