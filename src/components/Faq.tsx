import { Plus } from 'lucide-react'
import { FAQ } from '@/content/site'
import { Reveal } from './Reveal'
import { Container, SectionHead } from './ui'

/** Native <details>: accessible, keyboard-operable, and the answers are in the HTML for search engines. */
export function Faq() {
  return (
    <section id="faq" className="border-t border-line/10 bg-surface/60 py-20 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <Reveal><SectionHead eyebrow="FAQ" title="Questions, answered plainly." /></Reveal>
        <Reveal delay={80}>
          <div className="divide-y divide-line/10 border-y border-line/10">
            {FAQ.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[1.1rem] font-medium [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Plus size={20} className="shrink-0 text-dim transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] group-open:rotate-45" aria-hidden />
                </summary>
                <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-dim">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
