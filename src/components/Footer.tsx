import { NAV, SITE } from '@/content/site'
import { Logo } from './Nav'
import { Container, StartButton } from './ui'

export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32">
      <div className="iso-grid iso-grid-fade absolute inset-0 -z-10" aria-hidden />
      <Container className="text-center">
        <h2 className="mx-auto max-w-3xl text-[2.25rem] font-semibold leading-[1.1] tracking-tight sm:text-[3rem]">Ready to break something?</h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-dim">Open a design, run a scenario, and see exactly why it fails. Free, with no sign-up.</p>
        <div className="mt-9 flex justify-center"><StartButton>Start Now</StartButton></div>
      </Container>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-line/10 py-5">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <Logo />
          <p className="text-[15px] text-dim">by <a href="https://thesyedbasim.com" rel="noopener" className="text-text underline-offset-4 hover:underline">{SITE.author}</a></p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
          {NAV.map((n) => <a key={n.href} href={n.href} className="text-dim hover:text-text">{n.label}</a>)}
          <a href={SITE.github} className="text-dim hover:text-text" rel="noopener">GitHub</a>
          <a href={SITE.modelDoc} className="text-dim hover:text-text" rel="noopener">Model write-up</a>
        </nav>
      </Container>
    </footer>
  )
}
